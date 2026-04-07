'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { ExternalLink, Github, Code, Briefcase } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url: string
  technologies: string[]
  created_at: any
}

export default function Projects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Project[]
      
      setProjects(projectsData)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching projects:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm shadow-emerald-200/50">
            <Briefcase className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
             My Recent <span className="text-emerald-500">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-[400px]" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-medium">{t.projects.noProjects}</p>
            <p className="text-gray-400 mt-2 text-sm italic">Add something amazing via the Admin dashboard!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-64 bg-gray-50 overflow-hidden">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 text-emerald-500 text-7xl font-black italic opacity-20">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  {/* Badge */}
                   <div className="absolute top-6 right-6">
                     <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-emerald-500">
                       <Code className="w-5 h-5" />
                     </div>
                   </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed tracking-tight font-medium">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-full text-xs font-bold uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Footer links */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm active:scale-95"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
