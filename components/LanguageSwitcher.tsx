'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
        aria-label="Switch to English"
      >
        <span className="text-xl">🇺🇸</span>
        <span className="text-sm font-medium">EN</span>
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
          language === 'es'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
        aria-label="Cambiar a Español"
      >
        <span className="text-xl">🇪🇸</span>
        <span className="text-sm font-medium">ES</span>
      </button>
    </div>
  )
}
