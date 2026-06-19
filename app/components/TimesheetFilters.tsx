'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'
import InvoiceButton from './InvoiceButton'

const calcAmount = (reg: number, ot: number, rate: number) => (reg * rate) + (ot * rate * 1.5)
const HST = 0.13

const statusConfig: Record<string, { bg: string; color: string }> = {
  Approved: { bg: '#E8F5E9', color: '#388E3C' },
  Pending:  { bg: '#FFF3E0', color: '#C4841D' },
  Rejected: { bg: '#FDECEA', color: '#B5623E' },
}

interface Props {
  timesheets: any[]
  clients: any[]
  candidates: any[]
}

export default function TimesheetFilters({ timesheets, clients, candidates }: Props) {
  const router = useRouter()
  const [clientFilter, setClientFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [weekFilter, setWeekFilter] = useState('all')
  const [workerFilter, setWorkerFilter] = useState('')

  // Get unique weeks
  const weeks = useMemo(() => {
    const w = Array.from(new Set(timesheets.map((t: any) => t.week_start))).sort().reverse()
    return w
  }, [timesheets])

  const filtered = useMemo(() => timesheets.filter((t: any) => {
    if (clientFilter !== 'all' && t.client_id !== clientFilter) return false
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (weekFilter !== 'all' && t.week_start !== weekFilter) return false
    if (workerFilter && !t.candidates?.full_name?.toLowerCase().includes(workerFilter.toLowerCase())) return false
    return true
  }), [timesheets, clientFilter, statusFilter, weekFilter, workerFilter])

  const approvedFiltered = filtered.filter((t: any) => t.status === 'Approved')
  const pendingFiltered = filtered.filter((t: any) => t.status === 'Pending')
  const totalBillable = approvedFiltered.reduce((a: number, t: any) => a + calcAmount(t.regular_hours, t.overtime_hours, t.hourly_rate), 0)

  const selectedClient = clients.find((c: any) => c.id === clientFilter)

  const inputStyle = { background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none' }

  return (
    <>
      {/* Filters bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center', background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4 }}>Filter:</span>

        <select value={clientFilter} onChange={e => setClientFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Clients</option>
          {clients.map((c: any) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={weekFilter} onChange={e => setWeekFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Weeks</option>
          {weeks.map((w: string) => <option key={w} value={w}>Week of {w}</option>)}
        </select>

        <input
          value={workerFilter}
          onChange={e => setWorkerFilter(e.target.value)}
          placeholder="Search worker name..."
          style={{ ...inputStyle, minWidth: 180 }}
        />

        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
          {filtered.length} of {timesheets.length} shown
        </span>

        <AddTimesheetInline clients={clients} candidates={candidates} onSave={() => router.refresh()} />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 8 }}>No timesheets match this filter</div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ background: 'var(--sand-dark)', borderBottom: '1px solid var(--border)' }}>
                {['Worker', 'Client', 'Week', 'Reg.Hrs', 'OT (1.5×)', 'Rate', 'Amount', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 14px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t: any) => {
                const sc = statusConfig[t.status] || statusConfig['Pending']
                const amount = calcAmount(t.regular_hours, t.overtime_hours, t.hourly_rate)
                return (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--sand-dark)', background: t.status === 'Rejected' ? '#FFFAFA' : 'white' }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--espresso)' }}>{t.candidates?.full_name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.candidates?.role}</div>
                    </td>
                    <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>{t.clients?.company_name}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{t.week_start} – {t.week_end}</td>
                    <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 500 }}>{t.regular_hours}h</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{ fontSize: 13, fontWeight: t.overtime_hours > 0 ? 700 : 400, color: t.overtime_hours > 0 ? 'var(--clay)' : 'var(--text-muted)' }}>
                        {t.overtime_hours > 0 ? `+${t.overtime_hours}h` : '—'}
                      </span>
                    </td>
                    <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>${t.hourly_rate}/hr</td>
                    <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: 'var(--sage)', whiteSpace: 'nowrap' }}>${amount.toLocaleString()}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {t.status}
                      </span>
                      {t.rejection_note && <div style={{ fontSize: 10, color: 'var(--clay)', marginTop: 3 }}>⚠ {t.rejection_note}</div>}
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      {t.status === 'Pending' && <TimesheetActionInline id={t.id} />}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Per-client billing box */}
      {approvedFiltered.length > 0 && (
        <div style={{ marginTop: 20, padding: '18px 24px', borderRadius: 10, background: 'var(--amber-pale)', border: '1px solid #F0D5A0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 4 }}>
                {selectedClient ? `Invoice — ${selectedClient.company_name}` : 'Billing Summary — All Clients'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {approvedFiltered.length} approved timesheets · {approvedFiltered.reduce((a: number, t: any) => a + t.regular_hours + t.overtime_hours, 0)} total hours
                {!selectedClient && <span style={{ marginLeft: 8, color: 'var(--clay)', fontWeight: 500 }}>⚠ Select a client above for a per-client invoice</span>}
              </div>

              {/* Per-client breakdown when showing all */}
              {!selectedClient && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {clients.map((c: any) => {
                    const clientApproved = approvedFiltered.filter((t: any) => t.client_id === c.id)
                    if (clientApproved.length === 0) return null
                    const clientTotal = clientApproved.reduce((a: number, t: any) => a + calcAmount(t.regular_hours, t.overtime_hours, t.hourly_rate), 0)
                    return (
                      <button key={c.id} onClick={() => setClientFilter(c.id)} style={{ padding: '6px 12px', borderRadius: 8, background: 'white', border: '1px solid var(--border)', fontSize: 12, cursor: 'pointer', color: 'var(--espresso)' }}>
                        <span style={{ fontWeight: 600 }}>{c.company_name}</span>
                        <span style={{ color: 'var(--sage)', marginLeft: 6 }}>${(clientTotal*(1+HST)/1000).toFixed(1)}k</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Subtotal: <strong>${totalBillable.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>HST (13%): <strong>${(totalBillable*HST).toLocaleString(undefined, {maximumFractionDigits:0})}</strong></div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--amber)' }}>
                ${(totalBillable*(1+HST)).toLocaleString(undefined, {maximumFractionDigits:0})}
              </div>
              <InvoiceButton
                timesheets={approvedFiltered}
                totalBillable={totalBillable}
                hst={totalBillable * HST}
                clientName={selectedClient?.company_name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Inline approve/reject actions
function TimesheetActionInline({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [showReject, setShowReject] = useState(false)
  const [note, setNote] = useState('')

  const update = async (status: string, rejNote?: string) => {
    setLoading(status)
    await getSupabase().from('timesheets').update({ status, reviewed_at: new Date().toISOString(), rejection_note: rejNote || null }).eq('id', id)
    setLoading(null)
    router.refresh()
  }

  if (showReject) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 160 }}>
      <input value={note} onChange={e => setNote(e.target.value)} placeholder="Reason..." style={{ padding: '4px 7px', fontSize: 11, border: '1px solid var(--border)', borderRadius: 5, outline: 'none' }} />
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => update('Rejected', note)} style={{ flex: 1, padding: '4px 0', fontSize: 11, fontWeight: 600, background: 'var(--clay)', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Confirm</button>
        <button onClick={() => setShowReject(false)} style={{ flex: 1, padding: '4px 0', fontSize: 11, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 5 }}>
      <button onClick={() => update('Approved')} disabled={!!loading} style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: 'var(--sage)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        {loading === 'Approved' ? '...' : 'Approve'}
      </button>
      <button onClick={() => setShowReject(true)} style={{ padding: '5px 10px', fontSize: 11, background: 'var(--sand)', color: 'var(--clay)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>
        Reject
      </button>
    </div>
  )
}

// Add timesheet inline modal
function AddTimesheetInline({ clients, candidates, onSave }: { clients: any[], candidates: any[], onSave: () => void }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ candidate_id: '', client_id: '', week_start: '', regular_hours: '40', overtime_hours: '0', hourly_rate: '22' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    if (!form.candidate_id || !form.client_id || !form.week_start) return
    setSaving(true)
    const ws = new Date(form.week_start)
    const we = new Date(ws); we.setDate(ws.getDate() + 4)
    await getSupabase().from('timesheets').insert({
      agency_id: '00000000-0000-0000-0000-000000000001',
      candidate_id: form.candidate_id,
      client_id: form.client_id,
      placement_id: null,
      week_start: form.week_start,
      week_end: we.toISOString().split('T')[0],
      regular_hours: parseInt(form.regular_hours),
      overtime_hours: parseInt(form.overtime_hours),
      hourly_rate: parseFloat(form.hourly_rate),
      status: 'Pending',
      submitted_at: new Date().toISOString(),
    })
    setSaving(false)
    setOpen(false)
    onSave()
  }

  const iStyle = { width: '100%', background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 7, padding: '8px 10px', fontSize: 13, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' as const }
  const lStyle = { fontSize: 12, fontWeight: 500 as const, color: 'var(--text-secondary)', display: 'block' as const, marginBottom: 4 }

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: 7, cursor: 'pointer' }}>
        + Add Timesheet
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 480, padding: 26 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--espresso)' }}>Add Timesheet</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-muted)' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lStyle}>Worker *</label>
                <select style={iStyle} value={form.candidate_id} onChange={e => set('candidate_id', e.target.value)}>
                  <option value="">Select worker...</option>
                  {candidates.map((c: any) => <option key={c.id} value={c.id}>{c.full_name} — {c.role}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lStyle}>Client *</label>
                <select style={iStyle} value={form.client_id} onChange={e => set('client_id', e.target.value)}>
                  <option value="">Select client...</option>
                  {clients.map((c: any) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                </select>
              </div>
              <div>
                <label style={lStyle}>Week Start (Monday) *</label>
                <input type="date" style={iStyle} value={form.week_start} onChange={e => set('week_start', e.target.value)} />
              </div>
              <div>
                <label style={lStyle}>Hourly Rate ($)</label>
                <input type="number" style={iStyle} value={form.hourly_rate} onChange={e => set('hourly_rate', e.target.value)} />
              </div>
              <div>
                <label style={lStyle}>Regular Hours (max 44)</label>
                <input type="number" min="0" max="44" style={iStyle} value={form.regular_hours} onChange={e => set('regular_hours', e.target.value)} />
              </div>
              <div>
                <label style={lStyle}>OT Hours (over 44 only)</label>
                <input type="number" min="0" style={iStyle} value={form.overtime_hours} onChange={e => set('overtime_hours', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button onClick={() => setOpen(false)} style={{ flex: 1, padding: '10px 0', fontSize: 13, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
              <button onClick={save} disabled={saving || !form.candidate_id || !form.client_id || !form.week_start} style={{ flex: 2, padding: '10px 0', fontSize: 13, fontWeight: 600, background: saving ? 'var(--text-muted)' : 'var(--espresso)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Add Timesheet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
