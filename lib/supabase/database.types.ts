// Tipos de base de datos para tu portafolio
// Ajusta según las tablas que crees en Supabase

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date?: string
  current: boolean
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
  created_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at'>>
      }
      experiences: {
        Row: Experience
        Insert: Omit<Experience, 'id' | 'created_at'>
        Update: Partial<Omit<Experience, 'id' | 'created_at'>>
      }
      skills: {
        Row: Skill
        Insert: Omit<Skill, 'id' | 'created_at'>
        Update: Partial<Omit<Skill, 'id' | 'created_at'>>
      }
      contacts: {
        Row: Contact
        Insert: Omit<Contact, 'id' | 'created_at'>
        Update: Partial<Omit<Contact, 'id' | 'created_at'>>
      }
    }
  }
}
