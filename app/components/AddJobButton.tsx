'use client'
import { useState, useEffect } from 'react'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AddJobButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [form, setForm] = useState({
    title: '', job_type: '', city: '', openings: '1',
    rate_min: '', rate_max: '', status: 'Active',
    description: '', requirements: '', client_id: '', deadline: '',
  })

  useEffect(() => {
    if (open && clients.length === 0) {
      getSupabase().from('clients').select('id,company_name').eq('agency_id', AGENCY_ID).order('company_name')
        .then(({ data }) => setClients(data || []))
    }
  }, [open])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    if (!form.title || !form.job_type || !form.city) return
    setSaving(true)
    await getSupabase().from('jobs').insert({
      agency_id: AGENCY_ID,
      client_id: form.client_id || null,
      title: form.title,
      job_type: form.job_type,
      city: form.city,
      openings: parseInt(form.openings) || 1,
      filled: 0,
      rate_min: form.rate_min ? parseFloat(form.rate_min) : null,
      rate_max: form.rate_max ? parseFloat(form.rate_max) : null,
      status: form.status,
      description: form.description || null,
      requirements: form.requirements.split(',').map((s: string) => s.trim()).filter(Boolean),
      deadline: form.deadline || null,
      posted_at: new Date().toISOString(),
    })
    setSaving(false)
    setOpen(false)
    setForm({ title: '', job_type: '', city: '', openings: '1', rate_min: '', rate_max: '', status: 'Active', description: '', requirements: '', client_id: '', deadline: '' })
    router.refresh()
  }

  const inputStyle = { width: '100%', background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: 12, fontWeight: 500 as const, color: 'var(--text-secondary)', display: 'block' as const, marginBottom: 5 }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--amber)', color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'center', whiteSpace: 'nowrap' as const }}>
        <Plus size={15} /> New Order
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: 'var(--espresso)' }}>New Job Order</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Job Title *</label>
                <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. AZ Highway Driver" />
              </div>
              <div>
                <label style={labelStyle}>Type *</label>
                <select style={inputStyle} value={form.job_type} onChange={e => set('job_type', e.target.value)}>
                  <option value="">Select type...</option>
                  <option>Transport</option><option>General Labour</option><option>Industrial</option><option>Professional</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                  <option>Active</option><option>Urgent</option><option>Filled</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Client</label>
                <select style={inputStyle} value={form.client_id} onChange={e => set('client_id', e.target.value)}>
                  <option value="">Select client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>City *</label>
                <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Brampton, ON" />
              </div>
              <div>
                <label style={labelStyle}>Openings</label>
                <input style={inputStyle} type="number" min="1" value={form.openings} onChange={e => set('openings', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Deadline</label>
                <input style={inputStyle} type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Rate Min ($/hr)</label>
                <input style={inputStyle} type="number" value={form.rate_min} onChange={e => set('rate_min', e.target.value)} placeholder="22" />
              </div>
              <div>
                <label style={labelStyle}>Rate Max ($/hr)</label>
                <input style={inputStyle} type="number" value={form.rate_max} onChange={e => set('rate_max', e.target.value)} placeholder="26" />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Requirements (comma separated)</label>
              <input style={inputStyle} value={form.requirements} onChange={e => set('requirements', e.target.value)} placeholder="Class AZ, CVOS Clean, 2+ yrs exp" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' as const }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Role details, shift info, start date..." />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setOpen(false)} style={{ flex: 1, padding: '11px 0', fontSize: 14, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 9, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
              <button onClick={save} disabled={saving || !form.title || !form.job_type || !form.city} style={{ flex: 2, padding: '11px 0', fontSize: 14, fontWeight: 600, background: saving ? 'var(--text-muted)' : 'var(--espresso)', color: 'white', border: 'none', borderRadius: 9, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : 'Create Job Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
