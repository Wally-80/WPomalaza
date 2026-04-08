'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { useLanguage } from '@/context/LanguageContext'
import { Github, Twitter, Linkedin, Heart, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    email: 'contact@wpomalaza.com'
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        setSocials({
          github: data.socials?.github || '',
          linkedin: data.socials?.linkedin || '',
          twitter: data.socials?.twitter || '',
          email: data.socials?.email || 'contact@wpomalaza.com'
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="relative w-8 h-8 bg-emerald-50 rounded-lg overflow-hidden border border-emerald-100/50 group-hover:shadow-emerald-500/10 transition-all">
                <Image 
                  src="/icon.png" 
                  alt="WP Logo" 
                  fill 
                  className="object-cover p-1"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                WPomalaza
              </span>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              A modern portfolio showcasing professional web development work, built with high-performance technologies.
            </p>
            <div className="flex gap-4">
               <a href={socials.github || '#'} target="_blank" className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <Github className="w-5 h-5" />
              </a>
              <a href={socials.linkedin || '#'} target="_blank" className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${socials.email}`} className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <nav className="flex flex-col gap-4">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">{t.nav.home}</span>
              <Link href="#about" className="text-gray-900 font-bold hover:text-emerald-500 transition-colors">{t.nav.about}</Link>
              <Link href="#projects" className="text-gray-900 font-bold hover:text-emerald-500 transition-colors">{t.nav.projects}</Link>
              <Link href="#services" className="text-gray-900 font-bold hover:text-emerald-500 transition-colors">{t.nav.services}</Link>
            </nav>
            <nav className="flex flex-col gap-4">
               <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Social</span>
               <a href={socials.linkedin || '#'} target="_blank" className="text-gray-900 font-bold hover:text-emerald-500 transition-colors">LinkedIn</a>
               <a href={socials.github || '#'} target="_blank" className="text-gray-900 font-bold hover:text-emerald-500 transition-colors">GitHub</a>
               <Link href="/admin/login" className="text-gray-400 font-bold hover:text-emerald-500 transition-colors pt-4 border-t border-gray-50 mt-4 text-xs italic">
                 Admin Portal
               </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-50 text-sm text-gray-400 font-bold">
          <p>© {year} Walter Pomalaza — {t.footer.rights}</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
             {t.footer.builtWith} <Heart className="w-4 h-4 text-emerald-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
