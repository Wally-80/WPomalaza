'use client'

import { useState, useMemo } from 'react'
import { 
  User, Mail, Phone, Calendar, Clock, 
  MessageSquare, FileText, ChevronRight, 
  Search, Filter, ArrowUpRight, CheckCircle2,
  Inbox, Briefcase, Building2
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
        title: 'New Inquiry Received',
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
      // Update company if found in proposal
      if (prop.companyName) client.company = prop.companyName
      
      client.events.push({
        id: prop.id!,
        type: 'proposal_created',
        title: 'Project Proposal Generated',
        description: `Proposal for ${prop.companyName} with ${prop.packages.length} packages.`,
        date: prop.createdAt?.toDate() || new Date(),
        metadata: { status: prop.status }
      })

      if (prop.acceptedAt) {
        client.events.push({
          id: `${prop.id}-accepted`,
          type: 'proposal_accepted',
          title: 'Proposal Officially Accepted',
          description: `Contract signed and project authorized.`,
          date: prop.acceptedAt.toDate(),
        })
      }

      const activityDate = prop.acceptedAt?.toDate() || prop.createdAt?.toDate() || new Date()
      if (client.lastActivity < activityDate) {
        client.lastActivity = activityDate
      }
    })

    // Sort events for each client
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

  return (
    <div className="flex flex-col xl:flex-row gap-10 h-[calc(100vh-200px)] animate-in fade-in duration-500">
      
      {/* Client List Section */}
      <div className="w-full xl:w-[450px] flex flex-col bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col gap-6 bg-gray-50/30">
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Client Hub</h2>
             <p className="text-gray-400 font-medium text-sm">Unified profile and relationship tracking</p>
           </div>
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search clients..."
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none font-bold text-sm shadow-sm transition-all focus:border-emerald-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
           {filteredClients.map((client) => (
             <button
              key={client.email}
              onClick={() => setSelectedEmail(client.email)}
              className={`w-full p-6 mb-3 rounded-[2rem] flex items-center gap-5 transition-all group ${
                selectedEmail === client.email 
                  ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                  : 'hover:bg-gray-50 text-gray-900 border border-transparent hover:border-gray-100'
              }`}
             >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-colors ${
                  selectedEmail === client.email ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-500'
                }`}>
                   {client.name.charAt(0)}
                </div>
                <div className="flex-1 text-left min-w-0">
                   <h4 className="font-black text-lg tracking-tight truncate leading-tight mb-1">{client.name}</h4>
                   <p className={`text-xs font-bold truncate tracking-tight uppercase opacity-60 ${selectedEmail === client.email ? 'text-white' : 'text-emerald-600'}`}>
                     {client.company}
                   </p>
                </div>
                <ChevronRight className={`w-5 h-5 opacity-20 ${selectedEmail === client.email ? 'opacity-50' : ''}`} />
             </button>
           ))}

           {filteredClients.length === 0 && (
             <div className="p-20 text-center opacity-30">
                <User className="w-16 h-16 mx-auto mb-4" />
                <p className="font-black italic">No clients found</p>
             </div>
           )}
        </div>
      </div>

      {/* History Timeline Section */}
      <div className="flex-1 bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
         {selectedClient ? (
           <>
              {/* Header Info */}
              <div className="p-10 md:p-14 border-b border-gray-50 bg-gray-50/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Building2 className="w-48 h-48" />
                 </div>
                 
                 <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-8">
                       <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center text-4xl font-black shadow-2xl shadow-emerald-500/20">
                          {selectedClient.name.charAt(0)}
                       </div>
                       <div>
                          <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-3">{selectedClient.name}</h3>
                          <p className="text-xl text-emerald-600 font-black uppercase tracking-widest">{selectedClient.company}</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-bold text-gray-600">{selectedClient.email}</p>
                       </div>
                       <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-bold text-gray-600">Active: {selectedClient.lastActivity.toLocaleDateString()}</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 overflow-y-auto p-10 md:p-14 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
                 <div className="relative pl-12 space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gray-100" />

                    {selectedClient.events.map((event, idx) => (
                      <div key={event.id} className="relative animate-in slide-in-from-left-4 fade-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                         {/* Dot */}
                         <div className={`absolute left-[-51px] top-1.5 w-11 h-11 rounded-2xl border-4 border-white flex items-center justify-center shadow-md z-10 ${
                           event.type === 'proposal_accepted' ? 'bg-emerald-500 text-white' :
                           event.type === 'proposal_created' ? 'bg-blue-500 text-white' :
                           'bg-gray-900 text-white'
                         }`}>
                            {event.type === 'inquiry' && <MessageSquare className="w-4 h-4" />}
                            {event.type === 'proposal_created' && <FileText className="w-4 h-4" />}
                            {event.type === 'proposal_accepted' && <CheckCircle2 className="w-4 h-4" />}
                         </div>

                         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/20 transition-all flex flex-col md:flex-row justify-between items-start gap-6 group">
                            <div className="space-y-3">
                               <div className="flex items-center gap-3">
                                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{event.date.toLocaleDateString()} @ {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  {event.metadata?.status === 'accepted' && (
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-full uppercase tracking-widest">Signed</span>
                                  )}
                               </div>
                               <h5 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-emerald-500 transition-colors">{event.title}</h5>
                               <p className="text-gray-500 font-medium italic leading-relaxed pr-10">"{event.description}"</p>
                            </div>
                            
                            {event.type !== 'inquiry' && (
                              <button 
                                className="px-6 py-3 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
                                onClick={() => {
                                  if (event.type.includes('proposal')) {
                                     // Logic to view proposal could go here
                                  }
                                }}
                              >
                                View Entry
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center p-20 opacity-30 text-center">
              <div className="w-32 h-32 bg-gray-50 rounded-[4rem] flex items-center justify-center mb-10">
                 <Inbox className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">No Profiles Selected</h3>
              <p className="text-xl font-medium max-w-sm italic">"Select a client from the directory to review their professional history and transaction timeline."</p>
           </div>
         )}
      </div>
    </div>
  )
}
