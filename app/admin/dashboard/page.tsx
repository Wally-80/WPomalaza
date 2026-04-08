'use client'

import { useState, useEffect } from 'react'
import { db, auth } from '@/lib/firebase/client'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import ProjectForm from '../components/ProjectForm'
import ProfileSettings from '../components/ProfileSettings'
import InquiryInbox from '../components/InquiryInbox'
import { 
  Plus, Edit2, Trash2, LogOut, LayoutDashboard, 
  Settings, User, ExternalLink, Github, Loader2,
  AlertCircle, CheckCircle2, Briefcase, Mail,
  LayoutGrid, ChevronRight, Menu, X
} from 'lucide-react'
import Image from 'next/image'

type Tab = 'projects' | 'profile' | 'inbox'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url: string
  technologies: string[]
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [status, setStatus] = useState({ type: '', message: '' })
  const router = useRouter()

  useEffect(() => {
    if (authLoading || !user) return

    const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]
      setProjects(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, authLoading])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id))
        setStatus({ type: 'success', message: 'Project deleted successfully!' })
        setTimeout(() => setStatus({ type: '', message: '' }), 3000)
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to delete project.' })
      }
    }
  }

  const openEdit = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    )
  }

  const navItems = [
    { id: 'projects', label: 'Project Catalog', icon: Briefcase },
    { id: 'profile', label: 'Profile & Identity', icon: User },
    { id: 'inbox', label: 'Inquiry Inbox', icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      {/* Mobile Nav Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-[60]">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-white shadow-xl rounded-2xl text-gray-900 border border-gray-100"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Modern Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-100 p-10 z-50 transition-all duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-16">
          <div className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-4">
             <div className="relative w-12 h-12 bg-emerald-50 rounded-2xl overflow-hidden shadow-sm border border-emerald-100/50">
               <Image 
                src="/icon.png" 
                alt="WP Logo" 
                fill 
                className="object-cover p-1.5"
               />
             </div>
             Admin Portal
          </div>
          <p className="text-[10px] text-emerald-600 font-black tracking-[0.2em] uppercase opacity-40 italic mt-3 pl-1">Premium Identity v2.0</p>
        </div>

        <nav className="space-y-3 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab)
                setIsSidebarOpen(false)
              }}
              className={`w-full group px-6 py-4 rounded-[1.5rem] flex items-center gap-4 font-extrabold text-sm transition-all relative ${
                activeTab === item.id 
                  ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              {item.label}
              {activeTab === item.id && (
                <div className="absolute right-4 p-1 bg-white/20 rounded-lg">
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-10 right-10">
           <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-4 py-5 bg-red-50 text-red-500 rounded-[1.5rem] font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Responsive Main Content */}
      <main className={`transition-all duration-500 lg:ml-80 p-8 md:p-12 lg:p-20 min-h-screen ${isSidebarOpen ? 'blur-sm lg:blur-0' : ''}`}>
        
        {/* Content Tabs */}
        <div className="relative">
          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">Project Catalog</h1>
                  <p className="text-lg text-gray-400 font-medium tracking-tight">Showcase your latest professional milestones</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingProject(null)
                    setIsFormOpen(true)
                  }}
                  className="flex items-center gap-4 px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-emerald-500/20 active:scale-95"
                >
                  <Plus className="w-6 h-6" />
                  Add New Work
                </button>
              </div>

              {/* Status Alerts */}
              {status.message && (
                <div className={`mb-12 p-8 rounded-[2.5rem] flex items-center gap-4 border-2 animate-in slide-in-from-top-4 duration-500 ${
                  status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                  <p className="text-lg font-black">{status.message}</p>
                </div>
              )}

              {/* Project Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <div key={project.id} className="group h-full bg-white rounded-[3rem] border border-gray-100 hover:border-emerald-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-700 flex flex-col">
                    <div className="relative aspect-video bg-gray-50/80 overflow-hidden flex items-center justify-center">
                      {project.image_url ? (
                        <Image 
                          src={project.image_url} 
                          alt={project.title} 
                          fill 
                          className="object-contain p-4 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-100 italic font-black text-6xl opacity-20">WP</div>
                      )}
                      
                      {/* Floating Actions */}
                      <div className="absolute top-8 right-8 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <button 
                          onClick={() => openEdit(project)}
                          className="p-4 bg-white/95 backdrop-blur text-gray-900 rounded-2xl shadow-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-4 bg-white/95 backdrop-blur text-red-500 rounded-2xl shadow-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                        <p className="text-gray-500 font-medium text-sm line-clamp-3 mb-8 leading-relaxed italic pr-4">"{project.description}"</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map(tech => (
                            <span key={tech} className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-gray-100 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-8 border-t border-gray-50 mt-6">
                         <a href={project.live_url} target="_blank" className="flex-1 h-14 flex items-center justify-center bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:bg-emerald-600 shadow-lg active:scale-95">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State / Add New Card */}
                <div 
                  onClick={() => setIsFormOpen(true)}
                  className="group cursor-pointer bg-emerald-50/20 rounded-[3rem] border-4 border-dashed border-emerald-100 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[450px]"
                >
                  <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-emerald-500/20">
                    <Plus className="w-12 h-12" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">Build Something New</h4>
                    <p className="text-gray-400 font-medium">Capture a new milestone for your catalog</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'inbox' && <InquiryInbox />}
        </div>
      </main>

      {/* Project Form Modal */}
      {isFormOpen && (
        <ProjectForm 
          initialData={editingProject || undefined}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setStatus({ type: 'success', message: 'Project Catalog Updated!' })
            setTimeout(() => setStatus({ type: '', message: '' }), 5000)
          }}
        />
      )}

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
        />
      )}
    </div>
  )
}
