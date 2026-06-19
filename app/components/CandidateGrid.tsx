'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, ShieldCheck, ShieldAlert, Car, Phone, Mail, ChevronRight } from "lucide-react";

const statusColors: Record<string, { bg: string; color: string }> = {
  Applied:           { bg: '#F0EDE8', color: '#9C8472' },
  Screened:          { bg: '#FFF3E0', color: '#C4841D' },
  'Background Check':{ bg: '#FFF8E1', color: '#F57F17' },
  Shortlisted:       { bg: '#FFF8E1', color: '#F9A825' },
  Interview:         { bg: '#E8F4FD', color: '#1976D2' },
  Offered:           { bg: '#F3E5F5', color: '#7B1FA2' },
  Placed:            { bg: '#E8F5E9', color: '#388E3C' },
}

const complianceKeys = [
  { key: 'criminal_check', label: 'Criminal' },
  { key: 'cvos_abstract', label: 'CVOS' },
  { key: 'whmis_cert', label: 'WHMIS' },
  { key: 'reference_verified', label: 'Refs' },
  { key: 'drug_test', label: 'Drug' },
]

const STAGES = ['All', 'Applied', 'Screened', 'Background Check', 'Shortlisted', 'Interview', 'Offered', 'Placed']
const PAGE_SIZE = 24

export default function CandidateGrid({ candidates }: { candidates: any[] }) {
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [complianceFilter, setComplianceFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  // Pick up search from URL param (from header search)
  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
    const roleParam = searchParams.get('role')
    const allRoles = searchParams.get('allRoles')
    if (allRoles) {
      // Match Workers sends comma-separated roles
      setRoleFilter(allRoles.split(',')[0] || 'All')
    } else if (roleParam && roleParam !== 'All') {
      setRoleFilter(roleParam)
    }
    if (q) setSearch(q)
  }, [searchParams])

  const roles = ['All', ...Array.from(new Set(candidates.map(c => c.role).filter(Boolean))).sort()]

  const filtered = candidates.filter(c => {
    if (filter !== 'All' && c.status !== filter) return false
    if (roleFilter !== 'All' && c.role !== roleFilter) return false
    if (complianceFilter) {
      if (!complianceKeys.every(({ key }) => c[key])) return false
    }
    if (search) {
      const q = search.toLowerCase()
      if (!c.full_name?.toLowerCase().includes(q) &&
          !c.role?.toLowerCase().includes(q) &&
          !c.city?.toLowerCase().includes(q) &&
          !c.skills?.some((s: string) => s.toLowerCase().includes(q))) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const resetPage = () => setPage(1)

  return (
    <>
      {/* Search bar */}
      <div style={{ marginBottom: 12 }}>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); resetPage() }}
          placeholder="Search by name, role, city, skill..."
          style={{
            width: '100%', background: 'white', border: '1px solid var(--border)',
            borderRadius: 8, padding: '9px 14px', fontSize: 13, color: 'var(--espresso)',
            outline: 'none', boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Stage pills */}
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {STAGES.map(f => {
          const count = f === 'All' ? candidates.length : candidates.filter(c => c.status === f).length
          const active = filter === f
          return (
            <button key={f} onClick={() => { setFilter(f); resetPage() }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              cursor: 'pointer', border: 'none',
              background: active ? 'var(--espresso)' : 'white',
              color: active ? 'white' : 'var(--text-secondary)',
              outline: active ? 'none' : '1px solid var(--border)',
            }}>
              {f} <span style={{ opacity: 0.7, fontSize: 11 }}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Role + compliance row */}
      <div style={{ marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); resetPage() }}
          style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none' }}>
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={complianceFilter} onChange={e => { setComplianceFilter(e.target.checked); resetPage() }}
            style={{ accentColor: 'var(--amber)', width: 14, height: 14 }} />
          Fully cleared only
        </label>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {filtered.length} of {candidates.length} workers
        </span>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>👷</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 8 }}>
            {candidates.length === 0 ? 'No workers yet' : 'No workers match this filter'}
          </div>
          <div style={{ fontSize: 14 }}>
            {candidates.length === 0 ? 'Click "Add Worker" to get started' : 'Try adjusting the filters above'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {paginated.map((c: any, i: number) => {
            const sc = statusColors[c.status] || statusColors['Applied']
            const clearedCount = complianceKeys.filter(({ key }) => c[key]).length
            const fullyCleared = clearedCount === complianceKeys.length
            return (
              <div key={c.id} style={{
                background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 20,
                borderTop: `3px solid ${fullyCleared ? '#4A7A5E' : clearedCount >= 3 ? 'var(--amber)' : 'var(--clay)'}`,
                cursor: 'pointer', transition: 'box-shadow 0.15s'
              }}
                onClick={() => setSelectedCandidate(c)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0, background: `hsl(${(i * 57 + 20) % 360}, 40%, 68%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13 }}>
                      {c.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--espresso)' }}>{c.full_name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{c.role}</div>
                      {c.license_class && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 4, background: '#E8F0F8', color: '#1565C0', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20 }}>
                          <Car size={9} /> {c.license_class}
                        </span>
                      )}
                    </div>
                  </div>
                  <span style={{ ...sc, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, height: 'fit-content', whiteSpace: 'nowrap' }}>
                    {c.status}
                  </span>
                </div>

                {c.skills?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                    {c.skills.slice(0,3).map((s: string) => (
                      <span key={s} style={{ background: 'var(--sand)', color: 'var(--text-secondary)', fontSize: 11, padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{s}</span>
                    ))}
                  </div>
                )}

                <div style={{ background: 'var(--sand)', borderRadius: 8, padding: '8px 12px', marginBottom: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                    Compliance · {clearedCount}/{complianceKeys.length}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {complianceKeys.map(({ key, label }) => {
                      const passed = c[key]
                      return (
                        <span key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 500, color: passed ? '#388E3C' : '#B5623E', background: passed ? '#E8F5E9' : '#FDECEA', padding: '2px 7px', borderRadius: 20 }}>
                          {passed ? <ShieldCheck size={9} /> : <ShieldAlert size={9} />}{label}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {c.city}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--amber)', fontSize: 11, fontWeight: 500 }}>View profile <ChevronRight size={11} /></span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 28 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '7px 16px', fontSize: 13, background: 'white', border: '1px solid var(--border)', borderRadius: 7, cursor: page === 1 ? 'not-allowed' : 'pointer', color: page === 1 ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
            ← Prev
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = i + 1
            return (
              <button key={p} onClick={() => setPage(p)} style={{
                width: 32, height: 32, borderRadius: 6, fontSize: 13, cursor: 'pointer',
                background: page === p ? 'var(--amber)' : 'white',
                color: page === p ? 'white' : 'var(--text-secondary)',
                border: page === p ? 'none' : '1px solid var(--border)',
                fontWeight: page === p ? 600 : 400,
              }}>{p}</button>
            )
          })}
          {totalPages > 7 && <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>... {totalPages}</span>}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            style={{ padding: '7px 16px', fontSize: 13, background: 'white', border: '1px solid var(--border)', borderRadius: 7, cursor: page === totalPages ? 'not-allowed' : 'pointer', color: page === totalPages ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
            Next →
          </button>
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedCandidate(null) }}>
          <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {selectedCandidate.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--espresso)' }}>{selectedCandidate.full_name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedCandidate.role}</div>
                  {selectedCandidate.license_class && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 4, background: '#E8F0F8', color: '#1565C0', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20 }}>
                      <Car size={9} /> {selectedCandidate.license_class}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-muted)', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Status', value: selectedCandidate.status },
                { label: 'City', value: selectedCandidate.city },
                { label: 'Rating', value: `${selectedCandidate.rating}/5.0 ⭐` },
                { label: 'Phone', value: selectedCandidate.phone },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'var(--sand)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--espresso)' }}>{value}</div>
                </div>
              ))}
            </div>

            {selectedCandidate.skills?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedCandidate.skills.map((s: string) => (
                    <span key={s} style={{ background: 'var(--sand)', color: 'var(--text-secondary)', fontSize: 12, padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: 'var(--sand)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Compliance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {complianceKeys.map(({ key, label }) => {
                  const passed = selectedCandidate[key]
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{label === 'Criminal' ? 'Criminal Background' : label === 'Refs' ? 'References Verified' : label === 'Drug' ? 'Drug Test' : label}</span>
                      <span style={{ fontWeight: 600, color: passed ? '#388E3C' : '#B5623E' }}>{passed ? '✓ Cleared' : '✗ Pending'}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`tel:${selectedCandidate.phone}`} style={{ flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600, background: 'var(--sage)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Phone size={14} /> Call
              </a>
              <a href={`mailto:${selectedCandidate.email}`} style={{ flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600, background: 'var(--amber)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Mail size={14} /> Email
              </a>
              <a href={`/jobs?role=${encodeURIComponent(selectedCandidate.role)}`} style={{ flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600, background: 'var(--espresso)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                Match Jobs
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
