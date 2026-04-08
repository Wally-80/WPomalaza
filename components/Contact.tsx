'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useLanguage } from '@/context/LanguageContext'
import { Mail, MessageSquare, User, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    try {
      // 1. Save to main contacts collection (for Admin Dashboard)
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false
      })

      // 2. Save to 'mail' collection (Trigger Email extension)
      // This will automatically trigger an email notification if the extension is installed
      await addDoc(collection(db, 'mail'), {
        to: ['contact@wpomalaza.com'], // The recipient email
        replyTo: formData.email,      // This allows you to just click "Reply" in your email app!
        message: {
          subject: `New Portfolio Message from ${formData.name}`,
          replyTo: formData.email,    // Also inside message object for extra compatibility
          text: `You have a new message from your portfolio website.\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #10b981;">New Inquiry Received</h2>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${formData.message}</p>
            </div>
          `
        }
      })

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* Info Side */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm shadow-emerald-200/50">
              <Mail className="w-4 h-4" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Ready to start your next <span className="text-emerald-500">project?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              {t.contact.subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.contact.info.email.title}</p>
                  <a href={`mailto:${t.contact.info.email.value}`} className="text-lg font-bold text-gray-900 hover:text-emerald-500 transition-colors">
                    {t.contact.info.email.value}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all"
                    placeholder={t.contact.form.name}
                    required
                    suppressHydrationWarning
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all"
                    placeholder={t.contact.form.email}
                    required
                    suppressHydrationWarning
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all resize-none"
                    placeholder={t.contact.form.message}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
                    status === 'loading' 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/40'
                  }`}
                  suppressHydrationWarning
                >
                  {status === 'loading' ? t.contact.form.sending : (
                    <>
                      {t.contact.form.submit}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Success/Error Overlays */}
              {status === 'success' && (
                <div className="absolute inset-0 bg-emerald-500/95 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-20 h-20 mb-4 animate-bounce" />
                  <p className="text-3xl font-bold text-center mb-2">Message Sent!</p>
                  <p className="text-center font-medium opacity-90">{t.contact.form.success}</p>
                </div>
              )}
              {status === 'error' && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-red-500 text-white flex items-center gap-3 animate-in slide-in-from-bottom-full">
                  <AlertCircle className="w-6 h-6" />
                  <p className="font-bold">{t.contact.form.error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
