'use client'

import { useState, useMemo, useEffect } from 'react'
import { Bell, CheckCircle2, MessageSquare, Clock, X, FileText, ChevronRight } from 'lucide-react'
import { Proposal } from '@/lib/firebase/proposals'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: any
  read: boolean
}

interface NotificationItem {
  id: string
  type: 'inquiry' | 'acceptance' | 'new_proposal'
  title: string
  description: string
  time: Date
  unread: boolean
}

interface NotificationTrayProps {
  proposals: Proposal[]
  inquiries: ContactMessage[]
  activeTab: string
  onTabChange: (tab: any) => void
}

export default function NotificationTray({ proposals, inquiries, activeTab, onTabChange }: NotificationTrayProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Generate notification items sorted by time
  const notifications = useMemo(() => {
    const items: NotificationItem[] = []

    // Add accepted proposals
    proposals.forEach(prop => {
      if (prop.status === 'accepted' && prop.acceptedAt) {
        items.push({
          id: `acc-${prop.id}`,
          type: 'acceptance',
          title: 'Proposal Signed!',
          description: `${prop.clientName} (${prop.companyName}) accepted your proposal.`,
          time: prop.acceptedAt.toDate(),
          unread: true // In a real app, this would be tracked in DB
        })
      } else if (prop.createdAt) {
        // Just as an example of recent activity
        items.push({
          id: `new-${prop.id}`,
          type: 'new_proposal',
          title: 'Proposal Generated',
          description: `You created a proposal for ${prop.clientName}.`,
          time: prop.createdAt.toDate(),
          unread: false
        })
      }
    })

    // Add unread inquiries
    inquiries.forEach(inq => {
      items.push({
        id: `inq-${inq.id}`,
        type: 'inquiry',
        title: 'New Client Inquiry',
        description: `Message from ${inq.name}: "${inq.message.substring(0, 40)}..."`,
        time: inq.timestamp?.toDate() || new Date(),
        unread: !inq.read
      })
    })

    return items.sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 10)
  }, [proposals, inquiries])

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-2xl transition-all active:scale-90 ${
          isOpen ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-gray-400 border border-gray-100'
        }`}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-4 w-[400px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 z-[70] overflow-hidden animate-in zoom-in-95 fade-in duration-300 origin-top-right">
             <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h4 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                   Activity Hub
                   <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] rounded-full uppercase tracking-widest">{unreadCount} New</span>
                </h4>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900">
                   <X className="w-5 h-5" />
                </button>
             </div>

             <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-16 text-center opacity-30">
                     <Clock className="w-12 h-12 mx-auto mb-4" />
                     <p className="font-black italic">No recent activity</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-6 hover:bg-emerald-50/30 transition-all group relative cursor-pointer ${n.unread ? 'bg-emerald-50/10' : ''}`}
                        onClick={() => {
                          if (n.type === 'inquiry') onTabChange('inbox')
                          if (n.type.includes('proposal')) onTabChange('proposals')
                          setIsOpen(false)
                        }}
                      >
                         <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              n.type === 'acceptance' ? 'bg-emerald-500 text-white' :
                              n.type === 'inquiry' ? 'bg-gray-900 text-white' :
                              'bg-blue-500 text-white'
                            }`}>
                               {n.type === 'acceptance' && <CheckCircle2 className="w-5 h-5" />}
                               {n.type === 'inquiry' && <MessageSquare className="w-5 h-5" />}
                               {n.type === 'new_proposal' && <FileText className="w-5 h-5" />}
                            </div>
                            <div className="space-y-1 pr-4">
                               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                  {n.time.toLocaleDateString()} &bull; {n.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                               </p>
                               <h5 className={`text-sm font-black text-gray-900 tracking-tight ${n.unread ? 'text-emerald-600' : ''}`}>{n.title}</h5>
                               <p className="text-xs text-gray-500 font-medium leading-relaxed italic">{n.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:translate-x-1 transition-transform" />
                         </div>
                         {n.unread && (
                           <div className="absolute top-1/2 -translate-y-1/2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                         )}
                      </div>
                    ))}
                  </div>
                )}
             </div>

             <div className="p-6 bg-gray-50/80 border-t border-gray-50 flex justify-center">
                <button 
                  onClick={() => {
                    onTabChange('clients')
                    setIsOpen(false)
                  }}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                   View All Client History
                   <ChevronRight className="w-3 h-3" />
                </button>
             </div>
          </div>
        </>
      )}
    </div>
  )
}
