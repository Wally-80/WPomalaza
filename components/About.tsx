'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { useLanguage } from '@/context/LanguageContext'
import { GraduationCap, Cpu, Sparkles } from 'lucide-react'

export default function About() {
  const { t } = useLanguage()
  const [bio, setBio] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        setBio(doc.data().bio || '')
      }
    })
    return () => unsubscribe()
  }, [])

  const skills = [
    { name: 'HTML', icon: '🧱', color: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white' },
    { name: 'CSS', icon: '🎨', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' },
    { name: 'JavaScript', icon: '⚡', color: 'bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-600 hover:text-white' },
    { name: 'React', icon: '⚛️', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' },
    { name: 'Next.js', icon: '🚀', color: 'bg-black text-white border-gray-900 hover:bg-emerald-600' },
    { name: 'Node.js', icon: '🟢', color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white' },
    { name: 'TypeScript', icon: '🔷', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white' },
    { name: 'Tailwind CSS', icon: '🌊', color: 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-600 hover:text-white' },
    { name: 'Firebase', icon: '🔥', color: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white' },
    { name: 'PWA', icon: '📱', color: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white' },
  ]

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative text-center">
        {/* Soft centered background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50/30 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-10 shadow-sm shadow-emerald-200/50">
          <GraduationCap className="w-4 h-4" />
          {t.about.title}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
          {t.about.catchphrase} <span className="text-emerald-500 underline decoration-emerald-200 decoration-4 underline-offset-8">{t.about.webApps}</span>.
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
          {bio || t.about.description}
        </p>
 
        {/* Skills Section */}
        <div className="pt-8 border-t border-gray-100">
           <h3 className="text-lg font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 flex items-center justify-center gap-3">
             <Cpu className="w-5 h-5 text-emerald-500" />
             {t.about.techStack}
           </h3>
           <div className="flex flex-wrap justify-center gap-3 md:gap-5">
             {skills.map((skill, index) => (
               <div 
                 key={index} 
                 style={{ minWidth: '150px' }}
                 className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-default ${skill.color}`}
               >
                 <span className="text-xl">{skill.icon}</span>
                 <span className="font-extrabold text-sm tracking-tight whitespace-nowrap">{skill.name}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  )
}
