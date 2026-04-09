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
    <section className="pt-20 pb-20 md:pt-40 md:pb-32 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20">
          
          <div className="text-center lg:text-left space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 lg:flex-1 order-1 lg:order-none">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase shadow-sm shadow-emerald-200/50">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {t.hero.welcome}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] md:leading-[1.1] md:mt-6">
                {t.hero.intro} <span className="text-emerald-500">{settings.name}</span>, <br className="hidden md:block" /> {t.hero.professionalIntro} <span className="relative inline-block whitespace-nowrap">{t.hero.professionalTitle}<span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100 -z-10 -rotate-1 rounded-full opacity-60"></span></span>
              </h1>
            </div>
            
            <p className="hidden lg:block text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed italic border-l-4 border-emerald-500 pl-8">
              {settings.title}
            </p>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-8">
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

          <div className="relative animate-in fade-in zoom-in duration-1000 delay-200 lg:flex-1 order-2 lg:order-none">
             <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] mx-auto">
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

          {/* Mobile Description & Buttons */}
          <div className="lg:hidden space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 order-3">
             <p className="text-lg text-gray-500 font-medium italic leading-relaxed">
               {settings.title}
             </p>
             <div className="flex flex-col gap-4">
                <Link
                  href="#projects"
                  className="w-full flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg active:scale-95 transition-all shadow-xl"
                >
                  {t.hero.viewProjects}
                </Link>
                <Link
                  href="#contact"
                  className="w-full flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-black text-lg active:scale-95 transition-all"
                >
                  {t.hero.contactMe}
                </Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
