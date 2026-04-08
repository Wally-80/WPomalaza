'use client'

import { useState } from 'react'
import { auth, googleProvider } from '@/lib/firebase/client'
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Mail, Lock, LogIn, AlertCircle, CheckCircle2, Chrome, KeyRound, X } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isResetMode, setIsResetMode] = useState(false)
  const router = useRouter()

  // Handle identity and redirect result for mobile logins
  useEffect(() => {
    // 1. Check if we already have a user (from a previous session or successful redirect)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/dashboard')
      } else {
        setIsAuthenticating(false)
      }
    })

    // 2. Explicitly handle the return from a Google Redirect
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          router.push('/admin/dashboard')
        }
      } catch (err: any) {
        console.error('Redirect login error:', err)
        if (err.code !== 'auth/popup-closed-by-user') {
          setError('Google login failed. Please try again.')
        }
        setIsAuthenticating(false)
      }
    }

    handleRedirect()
    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.code === 'auth/user-not-found' ? 'Admin account not found.' : 'Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      // Detect if user is on mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Use redirect for mobile to avoid popup blockers
        await signInWithRedirect(auth, googleProvider)
      } else {
        // Use popup for desktop for better UX
        await signInWithPopup(auth, googleProvider)
        router.push('/admin/dashboard')
      }
    } catch (err: any) {
      console.error('Google login error:', err)
      setError('Google match failed or was cancelled.')
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address to reset password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess('Reset link sent to your email!')
      setIsResetMode(false)
    } catch (err: any) {
      setError('Could not send reset link. Check your email address.')
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-6 animate-pulse shadow-sm">
          <Chrome className="w-10 h-10 animate-spin" />
        </div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Authenticating...</h2>
        <p className="text-gray-500 mt-2 font-medium">Please wait while we verify your account</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 border border-gray-100 relative overflow-hidden">
        
        {/* Soft decorative background circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60" />

        <div className="text-center mb-12 relative">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
            {isResetMode ? <KeyRound className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            {isResetMode ? 'Reset Password' : 'Admin Portal'}
          </h1>
          <p className="text-gray-500 mt-3 font-medium">
             {isResetMode ? 'We will send you a recovery link' : 'Manage your professional portfolio'}
          </p>
        </div>

        {isResetMode ? (
          <form onSubmit={handleResetPassword} className="space-y-6 relative">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold transition-all"
                placeholder="Admin Email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Send Reset Link
            </button>
            <button 
              type="button" 
              onClick={() => setIsResetMode(false)}
              className="w-full text-center text-sm font-bold text-gray-400 hover:text-emerald-500 transition-colors"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-6 relative">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold transition-all"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-gray-900 font-bold transition-all"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex justify-end pt-1">
                <button 
                  type="button"
                  onClick={() => setIsResetMode(true)}
                  className="text-sm font-bold text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 disabled:bg-gray-100 disabled:text-gray-400"
              >
                {loading ? 'Processing...' : (
                  <>
                    Sign In
                    <LogIn className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-10 text-center">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
               <span className="relative bg-white px-4 text-xs font-black text-gray-300 uppercase tracking-widest leading-none">Or social login</span>
            </div>

            <button
               onClick={handleGoogleLogin}
               disabled={loading}
               className="w-full flex items-center justify-center gap-4 py-5 bg-white border-2 border-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-100 transition-all active:scale-[0.98]"
            >
               <Chrome className="w-6 h-6 text-emerald-500" />
               Log in with Google
            </button>
          </>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="mt-8 flex items-center gap-4 p-5 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AlertCircle className="w-6 h-6" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-8 flex items-center gap-4 p-5 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle2 className="w-6 h-6" />
            <p>{success}</p>
          </div>
        )}
      </div>
    </div>
  )
}
