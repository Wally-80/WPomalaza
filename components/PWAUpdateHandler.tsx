'use client'

import React, { useEffect, useState } from 'react'
import { RefreshCw, X, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function PWAUpdateHandler() {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.ready
        
        // Check for updates every time the page becomes visible
        const checkUpdate = () => {
          if (registration) {
            registration.update()
          }
        }
        
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            checkUpdate()
          }
        })

        // Listen for the "waiting" service worker (new version available)
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available; show the notification
                setShow(true)
              }
            })
          }
        })

      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    }

    registerServiceWorker()

    // Also handle immediate reload when the new SW takes over
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    })
  }, [])

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        } else {
          // Fallback refresh
          window.location.reload()
        }
      })
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] md:left-auto md:right-8 md:max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 border border-emerald-50 relative overflow-hidden group">
        {/* Decorative background sparkle */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-50 rounded-full blur-2xl opacity-60 group-hover:scale-150 transition-transform duration-700" />
        
        <div className="flex items-start gap-4 p-1">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="flex-1">
            <h4 className="text-gray-900 font-black text-lg leading-tight mb-1">
              {t.pwa.updateTitle}
            </h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              {t.pwa.updateMessage}
            </p>
            
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                {t.pwa.updateButton}
              </button>
              <button
                onClick={() => setShow(false)}
                className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
