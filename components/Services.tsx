'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Code2, Smartphone, Palette, Zap, Wrench, Cloud, Sparkles } from 'lucide-react'

export default function Services() {
  const { t } = useLanguage()
  
  const services = [
    {
      icon: <Code2 className="w-10 h-10" />,
      title: t.services.items.webDev.title,
      description: t.services.items.webDev.description,
      color: 'bg-emerald-50 text-emerald-600 shadow-emerald-100/50'
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: t.services.items.pwa.title,
      description: t.services.items.pwa.description,
      color: 'bg-blue-50 text-blue-600 shadow-blue-100/50'
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: t.services.items.uiux.title,
      description: t.services.items.uiux.description,
      color: 'bg-purple-50 text-purple-600 shadow-purple-100/50'
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: t.services.items.optimization.title,
      description: t.services.items.optimization.description,
      color: 'bg-orange-50 text-orange-600 shadow-orange-100/50'
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: t.services.items.maintenance.title,
      description: t.services.items.maintenance.description,
      color: 'bg-gray-100 text-gray-700 shadow-gray-200/50'
    },
    {
      icon: <Cloud className="w-10 h-10" />,
      title: t.services.items.cloud.title,
      description: t.services.items.cloud.description,
      color: 'bg-cyan-50 text-cyan-600 shadow-cyan-100/50'
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm shadow-emerald-200/50">
            <Sparkles className="w-4 h-4" />
            {t.services.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
             {t.services.mainTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 duration-500 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors group-hover:text-emerald-600">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
