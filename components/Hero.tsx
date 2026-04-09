'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { useLanguage } from '@/context/LanguageContext'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState({
    name: 'Walter Pomalaza',
    title: 'React, Next.js & Node.js Developer',
    profile_image_url: ''
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as any)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-2 shadow-sm shadow-emerald-200/50">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              {t.hero.welcome}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] md:leading-[1.1]">
              {t.hero.intro} <span className="text-emerald-500">{settings.name}</span>, {t.hero.professionalIntro} <span className="relative inline-block">{t.hero.professionalTitle}<span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100 -z-10 -rotate-1 rounded-full opacity-60"></span></span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed italic">
              {settings.title}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-6">
              <Link
                href="#projects"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gray-900/10"
              >
                {t.hero.viewProjects}
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-black text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all active:scale-95 shadow-sm"
              >
                {t.hero.contactMe}
              </Link>
            </div>
          </div>

          <div className="flex-1 relative animate-in fade-in zoom-in duration-1000 delay-200">
             <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] mx-auto">
                <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] rotate-6 opacity-10 animate-pulse transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[3rem] -rotate-3" />
                <div className="relative w-full h-full rounded-[3.5rem] bg-gray-50 overflow-hidden border-8 border-white shadow-2xl shadow-gray-200/50">
                  {settings.profile_image_url ? (
                     <Image 
                      src={settings.profile_image_url} 
                      alt={settings.name}
                      fill 
                      className="object-cover hover:scale-110 transition-transform duration-1000 ease-out" 
                      priority 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 text-9xl font-black opacity-10">WP</div>
                  )}
                </div>
                

             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
