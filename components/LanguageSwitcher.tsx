'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative flex items-center bg-gray-50/50 backdrop-blur-sm p-1 rounded-xl border border-gray-100 shadow-inner max-w-[180px] sm:max-w-none">
      {/* Sliding Background */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm ring-1 ring-black/[0.03] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          language === 'es' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 flex-1 px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-500 ${
          language === 'en'
            ? 'text-emerald-600'
            : 'text-gray-400 hover:text-gray-500'
        }`}
        aria-label="Switch to English"
        suppressHydrationWarning
      >
        <span className="text-[10px] sm:text-xs font-black tracking-[0.1em] uppercase block text-center">
          English
        </span>
      </button>

      <button
        onClick={() => setLanguage('es')}
        className={`relative z-10 flex-1 px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-500 ${
          language === 'es'
            ? 'text-emerald-600'
            : 'text-gray-400 hover:text-gray-500'
        }`}
        aria-label="Cambiar a Español"
        suppressHydrationWarning
      >
        <span className="text-[10px] sm:text-xs font-black tracking-[0.1em] uppercase block text-center">
          Español
        </span>
      </button>
    </div>
  )
}
