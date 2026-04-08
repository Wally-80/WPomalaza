'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Mail, Menu, X, Globe } from 'lucide-react'
import { db } from '@/lib/firebase/client'
import { doc, onSnapshot } from 'firebase/firestore'
import { useLanguage } from '@/context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
    email: 'contact@wpomalaza.com'
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        setSocials(doc.data().socials || {})
      }
    })

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      unsubscribe()
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="relative w-10 h-10 bg-emerald-50 rounded-xl overflow-hidden shadow-sm group-hover:shadow-emerald-500/10 transition-all border border-emerald-100/50">
            <Image 
              src="/icon.png" 
              alt="WP Logo" 
              fill 
              className="object-cover p-1"
            />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors">
            WPomalaza
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">
            {t.nav.about}
          </Link>
          <Link href="#projects" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">
             {t.nav.projects}
          </Link>
          <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Search" suppressHydrationWarning>
              <Search className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
            <Link 
              href="#contact" 
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
              suppressHydrationWarning
            >
              {t.nav.contact}
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
           <button className="p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6">
            <Link 
              href="#about" 
              className="text-lg font-medium text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Link 
              href="#projects" 
              className="text-lg font-medium text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.projects}
            </Link>
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Language / Idioma</span>
                <LanguageSwitcher />
              </div>
              <Link 
                href="#contact" 
                className="w-full py-4 bg-emerald-500 text-white rounded-xl text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
