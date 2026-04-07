'use client'

import { useState, useEffect } from 'react'
import { db, storage } from '@/lib/firebase/client'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { 
  Save, User, Globe, Github, Linkedin, Twitter, 
  Image as ImageIcon, Loader2, CheckCircle2, AlertCircle,
  Plus, FileText
} from 'lucide-react'

export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: 'Walter Pomalaza',
    title: 'React, Next.js & Node.js Developer',
    bio: '',
    profile_image_url: '',
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      email: 'contact@wpomalaza.com'
    }
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'main')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setFormData({
          ...formData,
          ...data,
          socials: {
            ...formData.socials,
            ...(data.socials || {})
          }
        } as any)
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    const storageRef = ref(storage, `profile/avatar_${Date.now()}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus({ type: '', message: '' })

    try {
      let imageUrl = formData.profile_image_url
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile)
      }

      const updatedData = {
        ...formData,
        profile_image_url: imageUrl,
        updated_at: serverTimestamp()
      }

      await setDoc(doc(db, 'settings', 'main'), updatedData, { merge: true })
      setFormData(updatedData)
      setImageFile(null)
      setStatus({ type: 'success', message: 'Profile updated successfully!' })
      setTimeout(() => setStatus({ type: '', message: '' }), 5000)
    } catch (err) {
      console.error('Error saving settings:', err)
      setStatus({ type: 'error', message: 'Failed to update profile.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profile & Identity</h2>
          <p className="text-gray-500 font-medium">Control how you appear on your main portfolio page</p>
        </div>
        {status.message && (
          <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border text-sm font-bold shadow-sm ${
            status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* Profile Picture Header */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gray-100 overflow-hidden border-4 border-white shadow-xl">
              {imageFile ? (
                <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover" />
              ) : formData.profile_image_url ? (
                <img src={formData.profile_image_url} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*"
              className="hidden" 
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <label 
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 p-3 bg-emerald-500 text-white rounded-2xl shadow-lg border-4 border-white cursor-pointer hover:bg-emerald-600 transition-all active:scale-90"
            >
              <Plus className="w-5 h-5" />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
             <div className="space-y-1">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Professional Name</label>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full text-2xl font-black text-gray-900 border-none bg-transparent h-auto p-0 focus:ring-0 placeholder:text-gray-200"
                 placeholder="Your Full Name"
               />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Job Title / Role</label>
               <input 
                 type="text" 
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 className="w-full text-lg font-bold text-emerald-600 border-none bg-transparent h-auto p-0 focus:ring-0 placeholder:text-emerald-100"
                 placeholder="e.g. Senior Full-Stack Developer"
               />
             </div>

          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
           <div className="flex items-center gap-3 mb-2">
             <FileText className="w-6 h-6 text-emerald-500" />
             <h3 className="text-xl font-extrabold text-gray-900">Personal Bio</h3>
           </div>
           <textarea
             value={formData.bio}
             onChange={(e) => setFormData({...formData, bio: e.target.value})}
             rows={6}
             className="w-full p-6 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-emerald-500 text-gray-700 font-medium leading-relaxed transition-all"
             placeholder="Tell the world about your journey and expertise..."
           />
        </div>

        {/* Social Connectivity */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
           <div className="flex items-center gap-3 mb-2">
             <Globe className="w-6 h-6 text-emerald-500" />
             <h3 className="text-xl font-extrabold text-gray-900">Social Connections</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.socials.github}
                  onChange={(e) => setFormData({...formData, socials: {...formData.socials, github: e.target.value}})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold text-sm"
                  placeholder="GitHub URL"
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.socials.linkedin}
                  onChange={(e) => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold text-sm"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="relative">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.socials.twitter}
                  onChange={(e) => setFormData({...formData, socials: {...formData.socials, twitter: e.target.value}})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold text-sm"
                  placeholder="Twitter (X) URL"
                />
              </div>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.socials.email}
                  onChange={(e) => setFormData({...formData, socials: {...formData.socials, email: e.target.value}})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold text-sm"
                  placeholder="Public Email"
                />
              </div>
           </div>
        </div>

        {/* Sticky Actions Bar */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 lg:left-[calc(50%+144px)] flex gap-4 animate-in slide-in-from-bottom-10 duration-700">
           <button
             type="submit"
             disabled={saving}
             className="flex items-center gap-3 px-12 py-5 bg-gray-900 text-white rounded-3xl font-black text-lg shadow-2xl shadow-gray-900/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
           >
             {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6 text-emerald-400" />}
             Publish Changes
           </button>
        </div>
      </form>
    </div>
  )
}
