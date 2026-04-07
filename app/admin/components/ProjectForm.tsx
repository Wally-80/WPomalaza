'use client'

import { useState } from 'react'
import { db, storage } from '@/lib/firebase/client'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Plus, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface Project {
  id?: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url: string
  technologies: string[]
}

interface ProjectFormProps {
  initialData?: Project
  onClose: () => void
  onSuccess: () => void
}

export default function ProjectForm({ initialData, onClose, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(initialData || {
    title: '',
    description: '',
    image_url: '',
    live_url: '',
    github_url: '',
    technologies: []
  })
  const [techInput, setTechInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault()
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData({
          ...formData,
          technologies: [...formData.technologies, techInput.trim()]
        })
      }
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Starting project save flow...');
      let imageUrl = formData.image_url

      // Handle Image Upload
      if (imageFile) {
        console.log('Uploading image to Firebase Storage...');
        const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`)
        try {
          await uploadBytes(storageRef, imageFile)
          imageUrl = await getDownloadURL(storageRef)
          console.log('Image uploaded successfully:', imageUrl);
        } catch (storageErr: any) {
          console.error('Firebase Storage Error:', storageErr);
          throw new Error(`Storage Error: ${storageErr.message}`);
        }
      }

      const projectData = {
        ...formData,
        image_url: imageUrl,
        updated_at: serverTimestamp()
      }

      console.log('Saving document to Firestore...');
      try {
        if (initialData?.id) {
          await updateDoc(doc(db, 'projects', initialData.id), projectData)
        } else {
          await addDoc(collection(db, 'projects'), {
            ...projectData,
            created_at: serverTimestamp()
          })
        }
        console.log('Firestore document saved successfully!');
      } catch (firestoreErr: any) {
        console.error('Firestore Error:', firestoreErr);
        throw new Error(`Database Error: ${firestoreErr.message}`);
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Submission failed:', error)
      alert(error.message || 'Error saving project. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white max-w-2xl w-full rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold transition-all"
              placeholder="e.g. E-commerce Platform"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all"
              placeholder="Tell us about this project..."
              rows={4}
              required
            />
          </div>

          {/* Project Image */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Project Mockup / Logo</label>
            <div className="flex items-center gap-6 p-6 md:p-8 bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-[2rem] hover:bg-emerald-50 transition-colors">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm overflow-hidden flex-shrink-0">
                {imageFile ? (
                  <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-contain p-1" />
                ) : formData.image_url ? (
                  <img src={formData.image_url} className="w-full h-full object-contain p-1" />
                ) : (
                  <ImageIcon className="w-10 h-10" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Choose Image
                </label>
                <p className="text-xs text-emerald-600/60 mt-2 font-medium italic">Recommended: 1200x800px</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Live Demo URL</label>
              <input
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">GitHub Repo URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-medium transition-all"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Tech Stack</label>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl">
              {formData.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold shadow-sm border border-gray-100"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="text-red-400 hover:text-red-600 p-0.5 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="flex-1 min-w-[150px] bg-transparent border-none focus:ring-0 text-gray-900 font-bold placeholder:text-gray-300 placeholder:italic"
                placeholder="Add skill + Enter..."
              />
            </div>
          </div>
        </form>

        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-[2] flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
              loading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/40'
            }`}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <Save className="w-5 h-5" />
                {initialData ? 'Update Project' : 'Save Project'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
