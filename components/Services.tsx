'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  
  const services = [
    {
      icon: '💻',
      title: t.services.items.webDev.title,
      description: t.services.items.webDev.description,
    },
    {
      icon: '📱',
      title: t.services.items.pwa.title,
      description: t.services.items.pwa.description,
    },
    {
      icon: '🎨',
      title: t.services.items.uiux.title,
      description: t.services.items.uiux.description,
    },
    {
      icon: '⚡',
      title: t.services.items.optimization.title,
      description: t.services.items.optimization.description,
    },
    {
      icon: '🔧',
      title: t.services.items.maintenance.title,
      description: t.services.items.maintenance.description,
    },
    {
      icon: '☁️',
      title: t.services.items.cloud.title,
      description: t.services.items.cloud.description,
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
          <div className="w-20 h-1 bg-blue-500 mb-4"></div>
          <p className="text-gray-600 max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-xl hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
