'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Trash2, Check, Loader2, DollarSign, List, Briefcase, ShieldCheck, Box, ChevronDown } from 'lucide-react'
import { Proposal, DEFAULT_PROPOSAL, PREDEFINED_SERVICES, createProposal, updateProposal } from '@/lib/firebase/proposals'

interface ProposalFormProps {
  initialData?: Proposal
  onClose: () => void
  onSuccess: () => void
}

export default function ProposalForm({ initialData, onClose, onSuccess }: ProposalFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Proposal>>(initialData || {
    ...DEFAULT_PROPOSAL,
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    startDate: '',
    status: 'draft'
  })

  const [activeSubTab, setActiveSubTab] = useState<'client' | 'packages' | 'maintenance' | 'features'>('client')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (initialData?.id) {
        await updateProposal(initialData.id, formData)
      } else {
        await createProposal(formData as Omit<Proposal, 'id' | 'createdAt'>)
      }
      onSuccess()
      onClose()
    } catch (err) {
      console.error('Error saving proposal:', err)
      alert('Failed to save proposal.')
    } finally {
      setLoading(false)
    }
  }

  const updateArrayField = (field: keyof Proposal, index: number, value: any) => {
    const arr = [...(formData[field] as any[])]
    arr[index] = { ...arr[index], ...value }
    setFormData({ ...formData, [field]: arr })
  }

  const addArrayItem = (field: keyof Proposal, defaultItem: any) => {
    const arr = [...(formData[field] as any[] || []), defaultItem]
    setFormData({ ...formData, [field]: arr })
  }

  const removeArrayItem = (field: keyof Proposal, index: number) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      const arr = [...(formData[field] as any[])]
      arr.splice(index, 1)
      setFormData({ ...formData, [field]: arr })
    }
  }

  const subTabs = [
    { id: 'client', label: 'Client Info', icon: Briefcase },
    { id: 'packages', label: 'Packages', icon: Box },
    { id: 'maintenance', label: 'Maintenance', icon: ShieldCheck },
    { id: 'features', label: 'Features', icon: List },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="p-8 md:p-12 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {initialData ? 'Edit Proposal' : 'Building New Proposal'}
            </h2>
            <p className="text-gray-400 font-medium">Design a professional service offering for your client</p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm hover:shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex px-8 md:px-12 py-4 gap-2 bg-white overflow-x-auto no-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
                activeSubTab === tab.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
          
          {activeSubTab === 'client' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Client Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full p-5 bg-gray-50 border border-transparent focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Company Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme Corp"
                  className="w-full p-5 bg-gray-50 border border-transparent focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-5 bg-gray-50 border border-transparent focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-5 bg-gray-50 border border-transparent focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Estimated Start Date</label>
                <input
                  type="text"
                  placeholder="e.g. May 2026"
                  className="w-full p-5 bg-gray-50 border border-transparent focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2 col-span-full">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Preferred Payment Model</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentType: 'one-time' })}
                    className={`flex-1 p-5 rounded-2xl font-black text-sm border-2 transition-all ${
                      formData.paymentType === 'one-time'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                        : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    ONE-TIME PAYMENT
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentType: 'monthly' })}
                    className={`flex-1 p-5 rounded-2xl font-black text-sm border-2 transition-all ${
                      formData.paymentType === 'monthly'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                        : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    MONTHLY SUBSCRIPTION
                  </button>
                </div>
              </div>

              <div className="space-y-2 col-span-full">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-2">Personal Note (Optional)</label>
                <textarea
                  placeholder="A personal message to be displayed at the top of the proposal..."
                  rows={4}
                  className="w-full p-5 bg-gray-100 border border-gray-200 focus:border-emerald-500/50 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm resize-none italic"
                  value={formData.customNotes}
                  onChange={e => setFormData({ ...formData, customNotes: e.target.value })}
                />
              </div>
            </div>
          )}

          {activeSubTab === 'packages' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <p className="text-gray-400 font-bold text-sm">Select a predefined package or add a custom one</p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto items-center">
                  <div className="relative group/select flex-1 md:w-64">
                    <select 
                      className="w-full p-4 bg-gray-100 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer transition-all pr-12 text-gray-900"
                      onChange={(e) => {
                        const val = e.target.value
                        if (!val) return
                        let newItem;
                        if (val === 'custom') {
                          newItem = { name: 'New Custom Package', oneTime: '$0', monthly: '$0', description: '' }
                        } else {
                          const selected = PREDEFINED_SERVICES.packages?.find(p => p.name === val)
                          if (selected) {
                            newItem = { ...selected }
                          }
                        }
                        if (newItem) {
                          // Dynamic Features Sync: Start with standard features + package specific ones
                          const standardFeatures = PREDEFINED_SERVICES.features || []
                          const packageSpecific = newItem.description.split(',').map(s => s.trim())
                          const syncFeatures = Array.from(new Set([...standardFeatures, ...packageSpecific]))
                          
                          setFormData({ 
                            ...formData, 
                            packages: [newItem],
                            features: syncFeatures
                          })
                        }
                        e.target.value = ""
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>-- Select Package Area --</option>
                      {PREDEFINED_SERVICES.packages?.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                      <option value="custom">+ Create Custom Package</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within/select:rotate-180 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {formData.packages?.map((pkg, idx) => (
                    <div key={idx} className="p-10 bg-white rounded-[3rem] border-2 border-emerald-100/30 flex flex-col md:flex-row gap-8 relative shadow-xl shadow-emerald-500/5 animate-in zoom-in-95">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">

                      <div className="col-span-1 md:col-span-3 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Package Name</label>
                        <input
                          placeholder="Package Name"
                          className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 text-xl focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                          value={pkg.name}
                          onChange={e => updateArrayField('packages', idx, { name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">One-Time Fee</label>
                        <input
                          placeholder="$0"
                          className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                          value={pkg.oneTime}
                          onChange={e => updateArrayField('packages', idx, { oneTime: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Monthly Fee</label>
                        <input
                          placeholder="$0"
                          className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                          value={pkg.monthly}
                          onChange={e => updateArrayField('packages', idx, { monthly: e.target.value })}
                        />
                      </div>
                      <div className="col-span-1 md:col-span-3 space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Full Service Scope</label>
                         <textarea
                          placeholder="Detailed description of what's included..."
                          rows={4}
                          className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 text-sm italic focus:bg-white focus:border-emerald-500 transition-all shadow-inner resize-none"
                          value={pkg.description}
                          onChange={e => updateArrayField('packages', idx, { description: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'maintenance' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <p className="text-gray-400 font-bold text-sm">Select a predefined maintenance tier or add custom</p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto items-center">
                  <div className="relative group/select flex-1 md:w-64">
                    <select 
                      className="w-full p-4 bg-gray-100 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer transition-all pr-12 text-gray-900"
                      onChange={(e) => {
                        const val = e.target.value
                        if (!val) return
                        let newItem;
                        if (val === 'custom') {
                          newItem = { name: 'Custom Tier', price: '$0', includes: '' }
                        } else {
                          const selected = PREDEFINED_SERVICES.maintenanceTiers?.find(t => t.name === val)
                          if (selected) {
                            newItem = { ...selected }
                          }
                        }
                        if (newItem) {
                          setFormData({ ...formData, maintenanceTiers: [newItem] })
                        }
                        e.target.value = ""
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>-- Select Maintenance Tier --</option>
                      {PREDEFINED_SERVICES.maintenanceTiers?.map(t => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                      ))}
                      <option value="custom">+ Create Custom Maintenance</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within/select:rotate-180 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                 {formData.maintenanceTiers?.map((tier, idx) => (
                    <div key={idx} className="p-10 bg-white rounded-[3rem] border-2 border-emerald-100/30 flex flex-col md:flex-row gap-8 relative shadow-xl shadow-emerald-500/5 animate-in zoom-in-95">
                       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Tier Name</label>
                          <input
                            placeholder="Tier Name"
                            className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 text-xl focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                            value={tier.name}
                            onChange={e => updateArrayField('maintenanceTiers', idx, { name: e.target.value })}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Pricing Plan</label>
                          <input
                            placeholder="Price"
                            className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                            value={tier.price}
                            onChange={e => updateArrayField('maintenanceTiers', idx, { price: e.target.value })}
                          />
                       </div>
                        <div className="col-span-full space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1">Key Deliverables (Inclusions)</label>
                           <textarea
                            placeholder="What does it include? (e.g. Backups, 2 updates ...)"
                            rows={3}
                            className="w-full p-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none font-bold text-gray-900 text-sm italic focus:bg-white focus:border-emerald-500 transition-all shadow-inner resize-none"
                            value={tier.includes}
                            onChange={e => updateArrayField('maintenanceTiers', idx, { includes: e.target.value })}
                          />
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'features' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                   <p className="text-gray-400 font-bold text-sm">Standard features included in all plans</p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                   <div className="relative group/select flex-1 md:w-64">
                      <select 
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl outline-none font-bold text-xs appearance-none cursor-pointer focus:border-emerald-500 transition-all pr-10 text-gray-900"
                        onChange={(e) => {
                          const val = e.target.value
                          if (!val) return
                          if (formData.features?.includes(val)) {
                            alert('This feature is already added.')
                            return
                          }
                          const feats = [...(formData.features || [])]
                          feats.push(val)
                          setFormData({ ...formData, features: feats })
                          e.target.value = ""
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>-- Add Standard Feature --</option>
                        {PREDEFINED_SERVICES.features?.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within/select:rotate-180 transition-transform" />
                   </div>

                    <button 
                      type="button"
                      onClick={() => {
                        const feats = [...(formData.features || [])]
                        feats.push('New Custom Feature')
                        setFormData({ ...formData, features: feats })
                      }}
                      className="p-3 bg-emerald-50 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center gap-2 whitespace-nowrap text-xs font-black uppercase"
                    >
                      <Plus className="w-4 h-4" />
                      Add Custom
                    </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {formData.features?.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 group/item">
                       <input
                        className="flex-1 p-4 bg-gray-50 border border-transparent focus:border-emerald-500/30 focus:bg-white rounded-xl outline-none font-bold text-gray-700 transition-all text-sm"
                        value={feat}
                        onChange={e => {
                          const feats = [...formData.features!]
                          feats[idx] = e.target.value
                          setFormData({ ...formData, features: feats })
                        }}
                      />
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('features', idx)}
                        className="p-3 text-red-400 hover:text-red-500 transition-colors"
                      >
                         <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                 ))}
              </div>
            </div>
          )}
        </form>

        {/* Action Footer */}
        <div className="p-8 md:p-12 border-t border-gray-50 flex flex-col md:flex-row gap-6 items-center justify-between bg-white">
           <div className="flex items-center gap-3 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
              <p className="text-sm font-black uppercase tracking-widest">Premium Workflow Mode</p>
           </div>
           
           <div className="flex gap-4 w-full md:w-auto">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 md:flex-none px-10 py-5 bg-gray-50 text-gray-500 rounded-[2rem] font-black text-lg hover:bg-gray-100 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 md:flex-none flex items-center justify-center gap-4 px-12 py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Check className="w-6 h-6" />}
                {initialData ? 'Update Proposal' : 'Launch Proposal'}
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
