'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase/client'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export function useAuth(requireAuth = true) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      
      if (requireAuth && !user) {
        router.push('/admin/login')
      }
    })

    return () => unsubscribe()
  }, [requireAuth, router])

  return { user, loading }
}
