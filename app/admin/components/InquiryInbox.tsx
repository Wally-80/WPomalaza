'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { 
  Mail, MessageSquare, Trash2, Calendar, User, 
  Loader2, CheckCircle2, AlertCircle, Inbox, 
  ExternalLink, Search
} from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: any
  read: boolean
}

export default function InquiryInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactMessage[]
      setMessages(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const markAsRead = async (id: string, currentRead: boolean) => {
    if (currentRead) return
    try {
      await updateDoc(doc(db, 'contacts', id), { read: true })
    } catch (err) {
      console.error('Error marking as read:', err)
    }
  }

  const deleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id))
      } catch (err) {
        console.error('Error deleting message:', err)
      }
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read
    if (filter === 'read') return msg.read
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Inquiry Inbox</h2>
          <p className="text-gray-500 font-medium">Manage messages from potential clients and partners</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200/50">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === 'unread' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Unread
          </button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border-4 border-dashed border-gray-50 flex flex-col items-center text-center opacity-40">
          <Inbox className="w-20 h-20 text-gray-200 mb-6" />
          <p className="text-2xl font-black text-gray-300 italic">Your inbox is currently empty</p>
          <p className="text-gray-400 font-medium mt-2">Check back later for new professional inquiries</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => markAsRead(msg.id, msg.read)}
              className={`group bg-white p-8 rounded-[2.5rem] border transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 ${
                !msg.read ? 'border-emerald-200 bg-emerald-50/10 shadow-sm' : 'border-gray-100 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sender Info */}
                <div className="md:w-64 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black ${!msg.read ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 leading-tight truncate max-w-[150px]">{msg.name}</h4>
                      <p className="text-xs text-gray-400 font-bold tracking-tight uppercase">{msg.timestamp?.toDate().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-2 group/link text-sm font-bold text-gray-500 hover:text-emerald-500 transition-colors bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{msg.email}</span>
                  </a>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-between pt-2">
                   <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <MessageSquare className={`w-5 h-5 flex-shrink-0 mt-1 ${!msg.read ? 'text-emerald-500' : 'text-gray-300'}`} />
                         <p className="text-gray-600 font-medium leading-relaxed italic pr-6 group-hover:text-gray-900 transition-colors">
                           "{msg.message}"
                         </p>
                      </div>
                   </div>

                   <div className="flex justify-end pt-6 border-t border-gray-50 mt-6 md:mt-0">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMessage(msg.id)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Message
                      </button>
                   </div>
                </div>
              </div>
              
              {!msg.read && (
                <div className="absolute top-6 left-6 translate-x-[-50%] translate-y-[-50%]">
                   <span className="flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                   </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
