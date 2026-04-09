'use client'

import { useState, useEffect } from 'react'
import { 
  FileText, Plus, Search, Filter, MoreVertical, 
  Send, Copy, MessageCircle, Mail, Trash2, 
  Edit2, ExternalLink, Calendar, User, 
  CheckCircle2, Loader2, AlertCircle, Clock,
  ChevronRight, Share2
} from 'lucide-react'
import { Proposal, subscribeToProposals, updateProposal } from '@/lib/firebase/proposals'
import { db } from '@/lib/firebase/client'
import { deleteDoc, doc } from 'firebase/firestore'
import ProposalForm from './ProposalForm'

export default function ProposalManager() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'accepted'>('all')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProposal, setEditingProposal] = useState<Proposal | undefined>()
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    const unsubscribe = subscribeToProposals((data) => {
      setProposals(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      try {
        await deleteDoc(doc(db, 'proposals', id))
        setStatus({ type: 'success', message: 'Proposal deleted successfully' })
        setTimeout(() => setStatus({ type: '', message: '' }), 3000)
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to delete proposal' })
      }
    }
  }

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/proposal?id=${id}`
    navigator.clipboard.writeText(link)
    setStatus({ type: 'success', message: 'Proposal link copied to clipboard!' })
    setTimeout(() => setStatus({ type: '', message: '' }), 3000)
  }

  const shareProposalEmail = (proposal: Proposal) => {
    const link = `${window.location.origin}/proposal?id=${proposal.id}`
    const subject = encodeURIComponent(`Digital Service Proposal for ${proposal.companyName}`)
    const body = encodeURIComponent(`Hi ${proposal.clientName},\n\nI have prepared a customized digital service proposal for ${proposal.companyName}. You can review the details, pricing, and confirm your project here:\n\n${link}\n\nBest regards,\nWalter Pomalaza`)
    window.location.href = `mailto:${proposal.email}?subject=${subject}&body=${body}`
  }

  const shareWhatsApp = (proposal: Proposal) => {
    const link = `${window.location.origin}/proposal?id=${proposal.id}`
    const text = `Hi ${proposal.clientName}, I've prepared a digital service proposal for ${proposal.companyName}. You can review it here: ${link}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || p.status === filter
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">Service Proposals</h1>
          <p className="text-lg text-gray-400 font-medium tracking-tight">Generate and track professional offerings for your clients</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-80 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search clients..."
              className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none font-bold text-gray-900 shadow-sm focus:border-emerald-500/50 transition-all"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => {
              setEditingProposal(undefined)
              setIsFormOpen(true)
            }}
            className="flex items-center gap-4 px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-6 h-6" />
            New Proposal
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex bg-gray-100/50 p-2 rounded-[2rem] border border-gray-100 mb-10 w-fit">
        {(['all', 'draft', 'sent', 'accepted'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all ${
              filter === tab 
                ? 'bg-white text-emerald-600 shadow-md' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Status Alert */}
      {status.message && (
        <div className={`mb-10 p-6 rounded-[2rem] flex items-center gap-4 border-2 animate-in slide-in-from-top-4 duration-500 ${
          status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          <p className="font-black">{status.message}</p>
        </div>
      )}

      {/* Proposals Grid */}
      {filteredProposals.length === 0 ? (
        <div className="bg-white p-32 rounded-[4rem] border-4 border-dashed border-gray-50 flex flex-col items-center text-center opacity-40">
          <FileText className="w-24 h-24 text-gray-200 mb-8" />
          <h3 className="text-3xl font-black text-gray-300 italic mb-2">No Proposals Found</h3>
          <p className="text-gray-400 font-medium max-w-sm">Start your professional workflow by creating your first service proposal today.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredProposals.map((proposal) => (
            <div 
              key={proposal.id}
              className="group bg-white rounded-[3.5rem] border border-gray-100 hover:border-emerald-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-700 flex flex-col relative p-10"
            >
              {/* Status Badge */}
              <div className="absolute top-8 right-8">
                 <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${
                   proposal.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                   proposal.status === 'sent' ? 'bg-blue-50 text-blue-600' :
                   'bg-gray-50 text-gray-400'
                 }`}>
                   <div className={`w-2 h-2 rounded-full ${
                     proposal.status === 'accepted' ? 'bg-emerald-500 animate-pulse' :
                     proposal.status === 'sent' ? 'bg-blue-500' :
                     'bg-gray-300'
                   }`} />
                   {proposal.status}
                 </div>
              </div>

              <div className="mb-10">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-500">
                  <User className="w-8 h-8 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight pr-12">{proposal.clientName}</h3>
                <p className="text-emerald-600 font-black text-sm uppercase tracking-widest">{proposal.companyName}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                 <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {proposal.createdAt?.toDate().toLocaleDateString()}</span>
                 </div>
                 {proposal.acceptedAt && (
                   <div className="flex items-center gap-4 text-emerald-600 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accepted: {proposal.acceptedAt.toDate().toLocaleDateString()}</span>
                   </div>
                 )}
                 <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Target Start: {proposal.startDate || 'TBD'}</span>
                 </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex items-center gap-3">
                 <a 
                  href={`/proposal?id=${proposal.id}`}
                  target="_blank"
                  className="flex-1 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                 >
                   <ExternalLink className="w-5 h-5" />
                 </a>
                 <button 
                  onClick={() => copyLink(proposal.id!)}
                  title="Copy share link"
                  className="flex-1 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                 >
                   <Copy className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => shareWhatsApp(proposal)}
                  title="Share via WhatsApp"
                  className="flex-1 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                 >
                   <MessageCircle className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => shareProposalEmail(proposal)}
                  title="Share via Email"
                  className="flex-1 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all active:scale-95"
                 >
                   <Mail className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => {
                    setEditingProposal(proposal)
                    setIsFormOpen(true)
                  }}
                  title="Edit Proposal"
                  className="flex-1 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all active:scale-95 shadow-md"
                 >
                   <Edit2 className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => handleDelete(proposal.id!)}
                  title="Delete Proposal"
                  className="flex-1 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95"
                 >
                   <Trash2 className="w-5 h-5" />
                 </button>
              </div>
              
              {/* Live Link Button */}
              <a 
                href={`/proposal?id=${proposal.id}`} 
                target="_blank"
                className="mt-6 w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-emerald-500 flex items-center justify-center gap-2 transition-colors border border-dashed border-gray-100 rounded-xl"
              >
                <ExternalLink className="w-3 h-3" />
                Preview Public Page
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Form Modal */}
      {isFormOpen && (
        <ProposalForm 
          initialData={editingProposal}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setStatus({ type: 'success', message: 'Proposal system updated successfully!' })
            setTimeout(() => setStatus({ type: '', message: '' }), 5000)
          }}
        />
      )}
    </div>
  )
}
