'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Plus, X } from 'lucide-react'

const AGENCY_ID = '00000000-0000-0000-0000-000000000001'

export default function AddCandidateButton() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    full_name: '', role: '', license_class: '', city: '', phone: '', email: '',
    status: 'Applied', skills: '',
    criminal_check: false, cvos_abstract: false, whmis_cert: false,
    reference_verified: false, drug_test: false,
  })

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    if (!form.full_name || !form.role) return
    setSaving(true)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { db: { schema: 'staffflow' } }
    )
    await supabase.from('candidates').insert({
      agency_id: AGENCY_ID,
      full_name: form.full_name,
      role: form.role,
      license_class: form.license_class || null,
      city: form.city,
      phone: form.phone,
      email: form.email,
      status: form.status,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      criminal_check: form.criminal_check,
      cvos_abstract: form.cvos_abstract,
      whmis_cert: form.whmis_cert,
      reference_verified: form.reference_verified,
      drug_test: form.drug_test,
    })
    setSaving(false)
    setOpen(false)
    window.location.reload()
  }

  const inputStyle = {
    width: '100%', background: 'var(--sand)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--espresso)',
    outline: 'none', boxSizing: 'border-box' as const
  }
  const labelStyle = { fontSize: 12, fontWeight: 500 as const, color: 'var(--text-secondary)', display: 'block' as const, marginBottom: 5 }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: 'var(--amber)', color: 'white', border: 'none',
        borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
      }}><Plus size={15} /> Add Worker</button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 540, maxHeight: '90vh', overflow: 'auto', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: 'var(--espresso)' }}>Add Worker</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Gurpreet Singh" />
              </div>
              <div>
                <label style={labelStyle}>Role *</label>
                <select style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)}>
                  <option value="">Select role...</option>
                  <option>AZ Driver</option><option>DZ Driver</option><option>G Driver</option>
                  <option>General Labour</option><option>Forklift Operator</option>
                  <option>Warehouse Associate</option><option>Industrial Worker</option><option>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>License Class</label>
                <select style={inputStyle} value={form.license_class} onChange={e => set('license_class', e.target.value)}>
                  <option value="">None</option>
                  <option>AZ</option><option>DZ</option><option>G</option><option>Forklift</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                  {['Applied','Screened','Background Check','Shortlisted','Interview','Offered','Placed'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1-905-555-0100" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="worker@email.com" />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Brampton, ON" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Skills (comma separated)</label>
              <input style={inputStyle} value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="Highway Transport, Shunting, TDG" />
            </div>

            {/* Compliance */}
            <div style={{ background: 'var(--sand)', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Compliance Checks</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { key: 'criminal_check', label: '✓ Criminal Background' },
                  { key: 'cvos_abstract', label: '✓ CVOS Abstract' },
                  { key: 'whmis_cert', label: '✓ WHMIS Certified' },
                  { key: 'reference_verified', label: '✓ References Verified' },
                  { key: 'drug_test', label: '✓ Drug Test' },
                ].map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form[key as keyof typeof form] as boolean} onChange={e => set(key, e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: 'var(--amber)', cursor: 'pointer' }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setOpen(false)} style={{ flex: 1, padding: '11px 0', fontSize: 14, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 9, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Cancel
              </button>
              <button onClick={save} disabled={saving || !form.full_name || !form.role} style={{
                flex: 2, padding: '11px 0', fontSize: 14, fontWeight: 600,
                background: saving ? 'var(--text-muted)' : 'var(--espresso)',
                color: 'white', border: 'none', borderRadius: 9, cursor: saving ? 'not-allowed' : 'pointer'
              }}>
                {saving ? 'Saving...' : 'Add Worker'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
