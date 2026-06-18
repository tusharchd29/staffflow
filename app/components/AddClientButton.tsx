'use client'
import { useState } from 'react'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import { Building2, Users, Phone, Mail, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AddClientButton() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    company_name: '', contact_name: '', phone: '', email: '',
    city: '', industry: '', notes: '',
    needs_cvos: false, needs_criminal: false, needs_whmis: false,
    needs_drug: false, needs_reference: false, needs_tdg: false,
    worker_types: [] as string[],
  })

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))
  const toggleType = (t: string) => setForm(f => ({
    ...f,
    worker_types: f.worker_types.includes(t)
      ? f.worker_types.filter(x => x !== t)
      : [...f.worker_types, t]
  }))

  const save = async () => {
    if (!form.company_name) return
    setSaving(true)
    const supabase = getSupabase()
    const complianceNotes = [
      form.needs_cvos && 'CVOS Abstract',
      form.needs_criminal && 'Criminal Background Check',
      form.needs_whmis && 'WHMIS Certification',
      form.needs_drug && 'Drug Test',
      form.needs_reference && 'Reference Check',
      form.needs_tdg && 'TDG',
    ].filter(Boolean).join(', ')

    await supabase.from('clients').insert({
      agency_id: AGENCY_ID,
      company_name: form.company_name,
      contact_name: form.contact_name || null,
      phone: form.phone || null,
      email: form.email || null,
      city: form.city || null,
      industry: form.industry || null,
      notes: [
        form.notes,
        form.worker_types.length > 0 ? `Worker types needed: ${form.worker_types.join(', ')}` : '',
        complianceNotes ? `Compliance: ${complianceNotes}` : '',
      ].filter(Boolean).join('\n'),
    })
    setSaving(false)
    setDone(true)
    setTimeout(() => {
      setDone(false)
      setForm({ company_name: '', contact_name: '', phone: '', email: '', city: '', industry: '', notes: '', needs_cvos: false, needs_criminal: false, needs_whmis: false, needs_drug: false, needs_reference: false, needs_tdg: false, worker_types: [] })
      router.refresh()
    }, 2000)
  }

  const inputStyle = {
    width: '100%', background: 'var(--sand)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--espresso)',
    outline: 'none', boxSizing: 'border-box' as const
  }
  const labelStyle = { fontSize: 12, fontWeight: 500 as const, color: 'var(--text-secondary)', display: 'block' as const, marginBottom: 5 }

  const workerTypes = ["AZ Driver", "DZ Driver", "G Driver", "General Labour", "Forklift Operator", "Warehouse Associate", "Industrial Worker", "Other"]
  const complianceOptions = [
    { key: 'needs_cvos', label: 'CVOS Abstract' },
    { key: 'needs_criminal', label: 'Criminal Background Check' },
    { key: 'needs_whmis', label: 'WHMIS Certification' },
    { key: 'needs_drug', label: 'Drug Test' },
    { key: 'needs_reference', label: 'Reference Check' },
    { key: 'needs_tdg', label: 'TDG (Dangerous Goods)' },
  ]

  return (
    <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24, height: "fit-content" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>
        New Client Intake
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        Tell us your staffing needs and we'll find the right workers.
      </p>

      {[
        { label: "Company Name *", key: "company_name", placeholder: "e.g. TruckPro Logistics", icon: Building2 },
        { label: "Contact Name", key: "contact_name", placeholder: "Hiring manager name", icon: Users },
        { label: "Phone", key: "phone", placeholder: "+1 (905) 000-0000", icon: Phone },
        { label: "Email", key: "email", placeholder: "hr@company.ca", icon: Mail },
        { label: "Location (City, ON)", key: "city", placeholder: "e.g. Brampton, ON", icon: MapPin },
      ].map(({ label, key, placeholder, icon: Icon }) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <label style={labelStyle}>{label}</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", overflow: "hidden" }}>
            <Icon size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--espresso)", width: "100%" }}
              value={(form as any)[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        </div>
      ))}

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Industry</label>
        <select style={inputStyle} value={form.industry} onChange={e => set('industry', e.target.value)}>
          <option value="">Select industry...</option>
          <option>Transport</option>
          <option>Construction</option>
          <option>Logistics</option>
          <option>Manufacturing</option>
          <option>Warehousing</option>
          <option>Other</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Workers Needed (select all that apply)</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {workerTypes.map(t => {
            const selected = form.worker_types.includes(t)
            return (
              <span key={t} onClick={() => toggleType(t)} style={{
                padding: "5px 11px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                background: selected ? "var(--amber)" : "var(--sand)",
                color: selected ? "white" : "var(--text-secondary)",
                border: selected ? "none" : "1px solid var(--border)",
                fontWeight: selected ? 600 : 400, userSelect: "none"
              }}>{t}</span>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Compliance Requirements</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {complianceOptions.map(({ key, label }) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={(form as any)[key]}
                onChange={e => set(key, e.target.checked)}
                style={{ width: 16, height: 16, accentColor: "var(--amber)", cursor: "pointer" }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Additional Notes</label>
        <textarea
          style={{ ...inputStyle, minHeight: 72, resize: "vertical" as const }}
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          placeholder="Shift details, contract length, start date..."
        />
      </div>

      <button
        onClick={save}
        disabled={saving || !form.company_name || done}
        style={{
          width: "100%", padding: "11px 0", fontSize: 14, fontWeight: 600,
          background: done ? "var(--sage)" : saving ? "var(--text-muted)" : "var(--espresso)",
          color: "white", border: "none", borderRadius: 9,
          cursor: saving || !form.company_name || done ? "not-allowed" : "pointer"
        }}
      >
        {done ? "✓ Client Added!" : saving ? "Saving..." : "Submit Request"}
      </button>
      <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 10 }}>
        We'll follow up within 24 hours · info@labourmax.ca
      </p>
    </div>
  )
}
