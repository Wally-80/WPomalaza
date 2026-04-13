'use client'

import { useState, useMemo } from 'react'
import { 
  User, Mail, Phone, Calendar, Clock, 
  MessageSquare, FileText, ChevronRight, 
  Search, Filter, ArrowUpRight, CheckCircle2,
  Inbox, Briefcase, Building2, MapPin, MoreVertical
} from 'lucide-react'
import { Proposal } from '@/lib/firebase/proposals'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: any
  read: boolean
}

interface ClientHistoryProps {
  proposals: Proposal[]
  inquiries: ContactMessage[]
}

interface TimelineEvent {
  id: string
  type: 'inquiry' | 'proposal_created' | 'proposal_accepted'
  title: string
  description: string
  date: Date
  metadata?: any
}

interface ClientProfile {
  email: string
  name: string
  company: string
  lastActivity: Date
  events: TimelineEvent[]
}

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-orange-500',
  'bg-teal-500'
]

export default function ClientHistory({ proposals, inquiries }: ClientHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)

  // Aggregate data by Client Email
  const clients = useMemo(() => {
    const map = new Map<string, ClientProfile>()

    // Process Inquiries
    inquiries.forEach(inq => {
      const email = inq.email.toLowerCase()
      if (!map.has(email)) {
        map.set(email, {
          email,
          name: inq.name,
          company: 'Unknown Entity',
          lastActivity: inq.timestamp?.toDate() || new Date(),
          events: []
        })
      }
      const client = map.get(email)!
      client.events.push({
        id: inq.id,
        type: 'inquiry',
        title: 'Initial Inquiry',
        description: inq.message,
        date: inq.timestamp?.toDate() || new Date()
      })
      if (client.lastActivity < (inq.timestamp?.toDate() || 0)) {
        client.lastActivity = inq.timestamp?.toDate()
      }
    })

    // Process Proposals
    proposals.forEach(prop => {
      const email = prop.email.toLowerCase()
      if (!map.has(email)) {
        map.set(email, {
          email,
          name: prop.clientName,
          company: prop.companyName,
          lastActivity: prop.createdAt?.toDate() || new Date(),
          events: []
        })
      }
      const client = map.get(email)!
      if (prop.companyName) client.company = prop.companyName
      
      client.events.push({
        id: prop.id!,
        type: 'proposal_created',
        title: 'Proposal Generated',
        description: `Scope: ${prop.packages[0]?.name || 'Custom Project'}`,
        date: prop.createdAt?.toDate() || new Date(),
        metadata: { status: prop.status }
      })

      if (prop.acceptedAt) {
        client.events.push({
          id: `${prop.id}-accepted`,
          type: 'proposal_accepted',
          title: 'Contract Authorized',
          description: `Terms accepted and signatures finalized.`,
          date: prop.acceptedAt.toDate(),
        })
      }

      const activityDate = prop.acceptedAt?.toDate() || prop.createdAt?.toDate() || new Date()
      if (client.lastActivity < activityDate) {
        client.lastActivity = activityDate
      }
    })

    map.forEach(client => {
      client.events.sort((a, b) => b.date.getTime() - a.date.getTime())
    })

    return Array.from(map.values()).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
  }, [proposals, inquiries])

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedClient = selectedEmail ? clients.find(c => c.email === selectedEmail) : null

  const getAvatarColor = (name: string) => {
    const index = name.length % AVATAR_COLORS.length
    return AVATAR_COLORS[index]
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-180px)] animate-in fade-in duration-500">
      
      {/* Client List Sidebar */}
      <div className="w-full xl:w-[400px] flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col gap-6">
           <div className="flex items-center justify-between">
             <div>
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">Client Hub</h2>
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">CRM Dashboard</p>
             </div>
             <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                <Filter className="w-4 h-4" />
             </div>
           </div>
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search database..."
                className="w-full pl-12 pr-6 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none font-bold text-sm transition-all focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/5"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
           {filteredClients.map((client) => (
             <button
              key={client.email}
              onClick={() => setSelectedEmail(client.email)}
              className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all group relative overflow-hidden ${
                selectedEmail === client.email 
                  ? 'bg-emerald-50 border border-emerald-100' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
             >
                {selectedEmail === client.email && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-lg shrink-0 ${getAvatarColor(client.name)}`}>
                   {client.name.charAt(0)}
                </div>
                <div className="flex-1 text-left min-w-0">
                   <h4 className={`font-black text-base tracking-tight truncate mb-0.5 ${selectedEmail === client.email ? 'text-emerald-900' : 'text-gray-900'}`}>
                     {client.name}
                   </h4>
                   <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 truncate">
                     {client.company}
                   </p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${selectedEmail === client.email ? 'text-emerald-500 translate-x-1' : 'text-gray-200'}`} />
             </button>
           ))}

           {filteredClients.length === 0 && (
             <div className="p-12 text-center opacity-20">
                <User className="w-12 h-12 mx-auto mb-3" />
                <p className="font-black text-sm uppercase tracking-widest">Database Empty</p>
             </div>
           )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden flex flex-col">
         {selectedClient ? (
           <>
              {/* Refined Profile Header */}
              <div className="p-10 md:p-12 border-b border-gray-50">
                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="flex items-center gap-6">
                       <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl ${getAvatarColor(selectedClient.name)}`}>
                          {selectedClient.name.charAt(0)}
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedClient.name}</h3>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">Active Client</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em]">
                            <Building2 className="w-3.5 h-3.5" />
                            {selectedClient.company}
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                       <a href={`mailto:${selectedClient.email}`} className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all group">
                          <Mail className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                          <span className="text-xs font-black tracking-tight">{selectedClient.email}</span>
                       </a>
                       <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-black tracking-tight">Last Activity: {selectedClient.lastActivity.toLocaleDateString()}</span>
                       </div>
                       <button className="p-3 bg-gray-900 text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-900/10">
                          <MoreVertical className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
              </div>

              {/* Modern Timeline */}
              <div className="flex-1 overflow-y-auto p-10 md:p-12 custom-scrollbar bg-gray-50/30">
                 <div className="relative pl-8 space-y-10">
                    {/* Simplified Timeline Line */}
                    <div className="absolute left-[3px] top-2 bottom-8 w-0.5 bg-gray-200" />

                    {selectedClient.events.map((event, idx) => (
                      <div key={event.id} className="relative animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${idx * 80}ms` }}>
                         {/* More Professional Dot Indicator */}
                         <div className={`absolute left-[-32px] top-4 w-4 h-4 rounded-full border-2 border-white ring-4 ring-transparent flex items-center justify-center shadow-lg z-10 ${
                           event.type === 'proposal_accepted' ? 'bg-emerald-500 ring-emerald-50' :
                           event.type === 'proposal_created' ? 'bg-blue-500 ring-blue-50' :
                           'bg-gray-900 ring-gray-100'
                         }`} />

                         <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/30 transition-all flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-3 flex-1 min-w-0">
                               <div className="flex flex-wrap items-center gap-3">
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    <span className="text-[10px] font-black uppercase">{event.date.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[10px] font-black uppercase">{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                  {event.metadata?.status === 'accepted' && (
                                    <span className="px-2.5 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-emerald-500/20">Signature Verified</span>
                                  )}
                               </div>
                               <div>
                                  <h5 className="text-xl font-black text-gray-900 tracking-tight leading-tight mb-1">{event.title}</h5>
                                  <p className="text-gray-500 text-sm font-medium leading-relaxed italic line-clamp-2 md:line-clamp-none pr-4">
                                    "{event.description}"
                                  </p>
                               </div>
                            </div>
                            
                            {event.type !== 'inquiry' && (
                              <button 
                                className="px-5 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-lg shadow-gray-900/10 shrink-0"
                              >
                                View Entry
                                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                              </button>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
                 <Search className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Select a Profile</h3>
              <p className="text-gray-400 font-medium max-w-xs text-sm leading-relaxed">
                Choose a client from the directory to review their interaction history and project timeline.
              </p>
           </div>
         )}
      </div>
    </div>
  )
}
