'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { isValidEmail } from '@/lib/utils'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Validación
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage('Todos los campos son requeridos')
      return
    }

    if (!isValidEmail(formData.email)) {
      setStatus('error')
      setErrorMessage('Email inválido')
      return
    }

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            read: false
          }
        ])

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setErrorMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.')
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Contacto</h2>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                ¡Mensaje enviado exitosamente! Te contactaré pronto.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
