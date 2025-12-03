'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  
  const skills = [
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
    'Supabase', 'Node.js', 'PostgreSQL', 'Git', 'PWA'
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
          <div className="w-20 h-1 bg-blue-500"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t.about.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">3+</div>
                <div className="text-sm text-gray-600">{t.about.stats.experience}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">50+</div>
                <div className="text-sm text-gray-600">{t.about.stats.projects}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">30+</div>
                <div className="text-sm text-gray-600">{t.about.stats.clients}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.about.skillsTitle}</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{skill}</span>
                    <span className="text-gray-500">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 group-hover:scale-105"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
