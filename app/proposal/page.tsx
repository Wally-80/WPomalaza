'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getProposal, updateProposal, Proposal } from '@/lib/firebase/proposals'
import { 
  CheckCircle2, Loader2, ArrowRight, ShieldCheck, 
  Clock, Mail, Phone, Building2, User, Landmark,
  Calendar, Check, Copy, Share2, AlertCircle,
  Gem, Award, Sparkles
} from 'lucide-react'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'

function ProposalContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [signature, setSignature] = useState('')

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    const fetchProposal = async () => {
      const data = await getProposal(id as string)
      if (data) {
        setProposal(data)
        if (data.status === 'accepted') setAccepted(true)
      }
      setLoading(false)
    }
    fetchProposal()
  }, [id])

  const handleAccept = async () => {
    if (!signature.trim()) {
      alert('Please enter your full name as a digital signature.')
      return
    }

    setSubmitting(true)
    try {
      await updateProposal(id as string, {
        status: 'accepted',
        acceptedAt: Timestamp.now()
      })
      setAccepted(true)
    } catch (err) {
      console.error('Error accepting proposal:', err)
      alert('Failed to accept proposal. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 font-sans">
        <div className="relative w-24 h-24 mb-8">
           <div className="absolute inset-0 border-4 border-emerald-50 rounded-full" />
           <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
        </div>
        <p className="text-xl font-black text-gray-900 tracking-tight animate-pulse uppercase tracking-[0.2em]">Authenticating Secure Portal...</p>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10 font-sans">
        <div className="max-w-md text-center">
            <AlertCircle className="w-20 h-20 text-red-100 mx-auto mb-6" />
            <h1 className="text-3xl font-black text-gray-900 mb-4">Proposal Not Found</h1>
            <p className="text-gray-500 font-medium mb-10 italic">"The request you're looking for might have expired or been removed."</p>
            <a href="/" className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl">Return to Identity</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-emerald-100/50 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      {/* Modern Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
         <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="relative w-12 h-12 bg-gray-900 rounded-2xl overflow-hidden shadow-xl shadow-gray-200">
                  <Image src="/icon.png" alt="WP" fill className="object-cover p-2" />
               </div>
               <div>
                  <h1 className="text-xl font-black text-gray-900 tracking-tighter">WP DIGITAL</h1>
                  <p className="text-[8px] text-emerald-600 font-black tracking-[0.2em] uppercase">Service Proposals v2.0</p>
               </div>
            </div>
            
            <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border shadow-sm ${
              accepted ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue-50 border-blue-100 text-blue-600 animate-pulse'
            }`}>
               <div className={`w-1.5 h-1.5 rounded-full ${accepted ? 'bg-emerald-500' : 'bg-blue-500'}`} />
               {accepted ? 'Contract Officially Accepted' : 'Awaiting Your Review'}
            </div>
         </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
         
         {/* Premium Personal Intro */}
         <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row gap-12 items-start bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-500/5 relative overflow-hidden group">
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors" />
               
               <div className="flex-shrink-0 relative">
                  <div className="w-24 h-24 bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200">
                     <Image src="/icon.png" alt="WP" fill className="object-cover p-3" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                     <CheckCircle2 className="w-4 h-4" />
                  </div>
               </div>

               <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">A Personal Message from Walter</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                       Let's build something exceptional.
                    </h2>
                  </div>
                  
                  <div className="relative">
                    <p className="text-xl md:text-2xl text-gray-500 font-medium tracking-tight italic leading-relaxed border-l-4 border-emerald-500 pl-8">
                       This proposal outlines clear pricing, strategic features, and flexible maintenance options to scale your business online.
                       {proposal.customNotes ? <><br /><br /><span className="text-gray-400 text-lg">{proposal.customNotes}</span></> : null}
                    </p>
                  </div>

                  <div className="pt-4">
                     <p className="font-black text-gray-900 text-lg">Walter Pomalaza</p>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Lead Digital Architect</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Hero / Intro */}
         <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="max-w-3xl">
               <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.9] mb-8">
                  Digital Service <br/>
                  <span className="text-emerald-500">Proposal.</span>
               </h2>
               
               <div className="flex flex-wrap gap-12 pt-8">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-50">Prepared for</p>
                     <p className="text-xl font-black text-gray-900 uppercase">{proposal.companyName}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-50">Release Date</p>
                     <p className="text-xl font-black text-gray-900">{proposal.createdAt?.toDate().toLocaleDateString() || 'April 2026'}</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Packages Table Container */}
         {proposal.packages && proposal.packages.length > 0 && (
           <section className="mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <div className="flex items-center gap-4 mb-10">
               <Landmark className="w-8 h-8 text-emerald-500" />
               <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Implementation Packages</h3>
            </div>
            
            <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-gray-900 text-white">
                           <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Package Level</th>
                           <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">
                             {proposal.paymentType === 'monthly' ? 'Initial Setup' : 'One-Time Fee'}
                           </th>
                           {proposal.paymentType === 'monthly' && (
                             <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10 text-emerald-400">Monthly Subscription</th>
                           )}
                           <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em]">Scope & Strategy</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {proposal.packages.map((pkg, idx) => (
                          <tr key={idx} className="group hover:bg-emerald-50/30 transition-colors">
                             <td className="px-10 py-10 text-xl font-black text-gray-900 border-r border-gray-50">{pkg.name}</td>
                             <td className="px-10 py-10 text-xl font-black text-emerald-600 border-r border-gray-50">{pkg.oneTime}</td>
                             {proposal.paymentType === 'monthly' && (
                               <td className="px-10 py-10 text-xl font-black text-emerald-600 border-r border-gray-50">{pkg.monthly}</td>
                             )}
                             <td className="px-10 py-10 text-sm font-medium text-gray-500 italic max-w-sm">{pkg.description}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </section>
         )}

         {/* Maintenance & Additional Benefits */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* Maintenance Tiers */}
            {proposal.maintenanceTiers && proposal.maintenanceTiers.length > 0 && (
              <section>
                 <div className="flex items-center gap-4 mb-10">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Maintenance Tiers</h3>
                 </div>
                 <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-6 md:p-10 space-y-6">
                    {proposal.maintenanceTiers.map((tier, idx) => (
                      <div key={idx} className="flex justify-between items-start p-6 rounded-[2.5rem] bg-gray-50/50 hover:bg-emerald-50 transition-all group">
                         <div className="flex-1 pr-6">
                            <h4 className="text-lg font-black text-gray-900 mb-1">{tier.name}</h4>
                            <p className="text-xs text-gray-400 font-medium italic">{tier.includes}</p>
                         </div>
                         <div className="text-xl font-black text-emerald-600 bg-white px-6 py-2 rounded-2xl shadow-sm border border-emerald-100/50 group-hover:scale-110 transition-transform">
                            {tier.price}
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Additional Benefits */}
            <section>
               <div className="flex items-center gap-4 mb-10">
                  <Award className="w-8 h-8 text-emerald-500" />
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Additional Benefits</h3>
               </div>
               <div className="bg-gray-900 rounded-[3.5rem] shadow-2xl shadow-emerald-950/20 p-8 md:p-10 text-white space-y-8 h-full">
                  <div className="flex items-start gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-emerald-400" />
                     </div>
                     <div>
                        <h4 className="font-black text-lg mb-2">Free Domain Management</h4>
                        <p className="text-gray-400 text-sm italic font-medium">Free domain registration & management for the first year (with one-time or annual payment).</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-emerald-400" />
                     </div>
                     <div>
                        <h4 className="font-black text-lg mb-2">Expert Onboarding</h4>
                        <p className="text-gray-400 text-sm italic font-medium">1-hour personalized training session included to master your new platform.</p>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Features Checklist */}
         {proposal.features && proposal.features.length > 0 && (
           <section className="mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
             <div className="bg-emerald-500 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative flex flex-col lg:flex-row gap-16 items-start lg:items-center">
                   <div className="lg:w-1/3">
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] mb-6">What Your Website Includes.</h3>
                      <p className="text-emerald-100 font-bold italic leading-relaxed">
                        Every package is built upon a foundation of absolute quality and forward-thinking standards.
                      </p>
                   </div>
                   <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {proposal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                           <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                           </div>
                           <span className="font-black tracking-tight text-lg">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>
         )}

         {/* Review & Acceptance Footer */}
         <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
             <div className="max-w-4xl mx-auto bg-white rounded-[4rem] border-4 border-emerald-50 p-12 md:p-20 shadow-2xl shadow-emerald-100/30">
                {!accepted ? (
                  <div className="space-y-12">
                     <div className="text-center">
                        <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Accept Proposal & Start Project.</h3>
                        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 max-w-xl mx-auto mb-10">
                           <p className="text-emerald-700 font-bold text-xs uppercase tracking-widest mb-2">Contract Terms</p>
                           <p className="text-emerald-900/60 font-medium text-sm italic">
                              {proposal.paymentType === 'monthly' 
                               ? "Minimum Contract for Monthly Options: 3 months (then month-to-month with 30 days’ written notice)."
                               : "One-time payments have no minimum contract duration."
                              }
                           </p>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest pl-2">Your Digital Signature (Full Name)</label>
                           <input 
                              type="text"
                              placeholder="e.g. Johnathan Smith"
                              className="w-full p-6 bg-gray-100 border-2 border-gray-200 rounded-[2.5rem] outline-none font-black text-2xl focus:border-emerald-500 focus:bg-white transition-all text-center italic placeholder:opacity-20 text-gray-900 shadow-inner"
                              value={signature}
                              onChange={e => setSignature(e.target.value)}
                           />
                        </div>

                        <button 
                           onClick={handleAccept}
                           disabled={submitting}
                           className="w-full h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center gap-6 font-black text-3xl shadow-2xl shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
                        >
                           {submitting ? (
                             <Loader2 className="w-10 h-10 animate-spin" />
                           ) : (
                             <>
                                Confirm & Accept
                                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                             </>
                           )}
                        </button>
                     </div>
                  </div>
                ) : (
                  <div className="text-center space-y-10 animate-in zoom-in-95 duration-700">
                     <div className="w-32 h-32 bg-emerald-500 text-white rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40">
                        <CheckCircle2 className="w-16 h-16" />
                     </div>
                     <div>
                        <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Contract Confirmed!</h3>
                        <p className="text-gray-500 font-medium italic max-w-md mx-auto">
                           Thank you for your trust. We have received your acceptance and will contact you shortly to begin the onboarding process.
                        </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-50 max-w-xl mx-auto">
                        <div className="text-left">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Confirmation ID</p>
                           <p className="font-black text-gray-900 font-mono">{id}</p>
                        </div>
                        <div className="text-left">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Acceptance Date</p>
                           <p className="font-black text-gray-900">{proposal.acceptedAt?.toDate().toLocaleString() || new Date().toLocaleString()}</p>
                        </div>
                     </div>
                  </div>
                )}
             </div>
         </section>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 text-center relative z-10">
         <div className="flex items-center justify-center gap-4 mb-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default group">
            < Landmark className="w-6 h-6" />
            <h4 className="font-black text-xl tracking-tighter">WP DESIGN SYSTEMS INC.</h4>
         </div>
         <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Built for Professional Excellence &copy; 2026</p>
      </footer>
    </div>
  )
}

export default function PublicProposalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 font-sans">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest">Loading Proposal...</p>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  )
}
