'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070')`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl text-gray-400 mb-2">{t.hero.greeting}</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              {t.hero.cta.primary}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
            >
              {t.hero.cta.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl z-0" />
    </section>
  )
}
