'use client'
import { useState } from 'react'
import { MapPin, Users, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, ShieldCheck } from "lucide-react"
import JobActions from './JobActions'

const JOB_TYPE_TO_ROLES: Record<string, string[]> = {
  'Transport': ['AZ Driver', 'DZ Driver', 'G Driver'],
  'General Labour': ['General Labour', 'Warehouse Associate'],
  'Industrial': ['Forklift Operator', 'Industrial Worker'],
}

const typeColors: Record<string, { bg: string; color: string }> = {
  "Transport":      { bg: "#E8F0F8", color: "#1565C0" },
  "General Labour": { bg: "#F5F0E8", color: "#7A5C3C" },
  "Industrial":     { bg: "#E8F5E9", color: "#2E7D32" },
  "Professional":   { bg: "#F3E5F5", color: "#6A1B9A" },
}

const statusConfig: Record<string, { bg: string; color: string; icon: any }> = {
  Urgent: { bg: "#FDECEA", color: "#B5623E", icon: AlertTriangle },
  Active: { bg: "#E8F4FD", color: "#1976D2", icon: Clock },
  Filled: { bg: "#E8F5E9", color: "#388E3C", icon: CheckCircle },
}

function jobNumber(id: string, idx: number) {
  return `JO-${String(2000 + idx + 1).padStart(4, '0')}`
}

export default function JobList({ jobs, clients }: { jobs: any[], clients: any[] }) {
  const [clientFilter, setClientFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = jobs.filter((j: any) => {
    if (clientFilter !== 'all' && j.client_id !== clientFilter) return false
    if (typeFilter !== 'all' && j.job_type !== typeFilter) return false
    if (statusFilter !== 'all' && j.status !== statusFilter) return false
    if (search && !j.title?.toLowerCase().includes(search.toLowerCase()) &&
        !j.clients?.company_name?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const inputStyle = { background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none' }

  return (
    <>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap', background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Filter:</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..."
          style={{ ...inputStyle, minWidth: 160 }} />
        <select value={clientFilter} onChange={e => setClientFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Clients</option>
          {clients.map((c: any) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Types</option>
          <option>Transport</option><option>General Labour</option><option>Industrial</option><option>Professional</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={inputStyle}>
          <option value="all">All Statuses</option>
          <option>Active</option><option>Urgent</option><option>Filled</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} of {jobs.length} orders</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 8 }}>No job orders match this filter</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((job: any, idx: number) => {
            const sc = statusConfig[job.status] || statusConfig['Active']
            const StatusIcon = sc.icon
            const tc = typeColors[job.job_type] || typeColors['General Labour']
            const fillPct = job.openings > 0 ? (job.filled / job.openings) * 100 : 0
            const reqs: string[] = job.requirements || []
            const needsCVOS = reqs.some((r: string) => r.toLowerCase().includes('cvos'))
            const needsWHMIS = reqs.some((r: string) => r.toLowerCase().includes('whmis'))
            const rateStr = job.rate_min && job.rate_max ? `$${job.rate_min}–${job.rate_max}/hr` : job.rate_min ? `$${job.rate_min}/hr` : 'Rate TBD'
            const matchRoles = JOB_TYPE_TO_ROLES[job.job_type] || []

            return (
              <div key={job.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', borderLeft: job.status === 'Urgent' ? '4px solid var(--clay)' : '4px solid transparent' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 600 }}>{jobNumber(job.id, jobs.indexOf(job))}</span>
                      <span style={{ ...tc, fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 20 }}>{job.job_type}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 20 }}>
                        <StatusIcon size={10} /> {job.status}
                      </span>
                      {job.status === 'Urgent' && <span style={{ fontSize: 11, color: 'var(--clay)' }}>⚡ Fill by {job.deadline}</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: 'var(--espresso)', marginBottom: 4 }}>{job.title}</h3>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{job.clients?.company_name}</div>
                    {job.description && <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 560 }}>{job.description}</p>}

                    {reqs.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                        {reqs.map((r: string) => {
                          const isC = r.includes('CVOS') || r.includes('WHMIS') || r.includes('Background') || r.includes('Class A')
                          return (
                            <span key={r} style={{ background: isC ? '#FFF3E0' : 'var(--sand)', color: isC ? 'var(--amber)' : 'var(--text-secondary)', fontSize: 11, padding: '3px 9px', borderRadius: 20, border: isC ? '1px solid #F0C060' : '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              {isC && <ShieldCheck size={9} />}{r}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    {(needsCVOS || needsWHMIS) && (
                      <div style={{ marginTop: 10, fontSize: 11, color: '#5A7A9A', display: 'flex', gap: 10 }}>
                        {needsCVOS && <span>🔵 CVOS abstract required</span>}
                        {needsWHMIS && <span>🟡 WHMIS certification required</span>}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 175 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {job.city}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><DollarSign size={11} /> {rateStr}</span>
                    {job.posted_at && (
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={11} /> Posted {new Date(job.posted_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} /> Filled</span>
                        <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>{job.filled}/{job.openings}</span>
                      </div>
                      <div style={{ background: 'var(--sand-dark)', borderRadius: 6, height: 6 }}>
                        <div style={{ height: '100%', borderRadius: 6, background: fillPct === 100 ? 'var(--sage)' : fillPct > 0 ? 'var(--amber)' : 'var(--clay)', width: `${fillPct}%` }} />
                      </div>
                    </div>
                    <JobActions jobId={job.id} jobType={job.job_type} status={job.status} matchRoles={matchRoles} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
