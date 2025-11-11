'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <p className="text-gray-400">
            &copy; {currentYear} WPomalaza. {t.footer.builtWith}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
