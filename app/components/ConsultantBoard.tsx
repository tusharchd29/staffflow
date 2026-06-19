'use client'
import { useState } from 'react'
import { MapPin, Phone, Star, CheckCircle, AlertCircle, Car, ShieldCheck, ShieldAlert, ChevronDown } from "lucide-react";
import { getSupabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const statusConfig: Record<string, { bg: string; color: string; dot: string }> = {
  "On Assignment":   { bg: "#E8F5E9", color: "#388E3C", dot: "#4CAF50" },
  "Available":       { bg: "#FFF3E0", color: "#C4841D", dot: "#FFC107" },
  "Interview Stage": { bg: "#E8F4FD", color: "#1565C0", dot: "#2196F3" },
  "Ending Soon":     { bg: "#FDECEA", color: "#B5623E", dot: "#F44336" },
};

const columns = ["On Assignment", "Available", "Interview Stage", "Ending Soon"];
const ROLES = ['All Roles', 'AZ Driver', 'DZ Driver', 'G Driver', 'General Labour', 'Forklift Operator', 'Warehouse Associate', 'Industrial Worker']

function getKanbanStatus(candidate: any, placements: any[]): string {
  const placement = placements.find((p: any) => p.candidate_id === candidate.id)
  if (placement) {
    if (placement.end_date) {
      const daysLeft = Math.ceil((new Date(placement.end_date).getTime() - Date.now()) / 86400000)
      if (daysLeft <= 14) return "Ending Soon"
    }
    return "On Assignment"
  }
  if (candidate.status === 'Interview') return "Interview Stage"
  return "Available"
}

export default function ConsultantBoard({ candidates, placements }: { candidates: any[], placements: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [expandedCols, setExpandedCols] = useState<Record<string, boolean>>({})
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const enriched = candidates.map((c: any) => ({
    ...c,
    kanbanStatus: getKanbanStatus(c, placements),
    placement: placements.find((p: any) => p.candidate_id === c.id) || null,
    fullyCleared: c.criminal_check && c.cvos_abstract && c.whmis_cert && c.reference_verified && c.drug_test,
  }))

  const filteredEnriched = enriched.filter((c: any) => {
    if (roleFilter !== 'All Roles' && c.role !== roleFilter) return false
    if (search && !c.full_name?.toLowerCase().includes(search.toLowerCase()) &&
        !c.city?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const PAGE_SIZE = 15
  const getColWorkers = (col: string) => filteredEnriched.filter((c: any) => c.kanbanStatus === col).sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))

  const updateStatus = async (candidateId: string, newStatus: string) => {
    setUpdatingStatus(candidateId)
    await getSupabase().from('candidates').update({ status: newStatus }).eq('id', candidateId)
    setUpdatingStatus(null)
    router.refresh()
  }

  return (
    <>
      {/* Summary */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {columns.map(col => {
          const count = filteredEnriched.filter((c: any) => c.kanbanStatus === col).length
          const sc = statusConfig[col]
          return (
            <div key={col} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 18px', flex: 1, minWidth: 120 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col}</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: sc.color }}>{count}</div>
            </div>
          )
        })}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 18px', flex: 1, minWidth: 120 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Total Workers</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--espresso)' }}>{filteredEnriched.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or city..."
          style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', fontSize: 13, outline: 'none', flex: 1, minWidth: 200, color: 'var(--espresso)' }} />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'var(--text-secondary)', outline: 'none' }}>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <span style={{ alignSelf: 'center', fontSize: 12, color: 'var(--text-muted)' }}>{filteredEnriched.length} of {candidates.length} workers</span>
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {columns.map(col => {
          const colWorkers = getColWorkers(col)
          const sc = statusConfig[col]
          const isExpanded = expandedCols[col]
          const shown = isExpanded ? colWorkers : colWorkers.slice(0, PAGE_SIZE)

          return (
            <div key={col}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: sc.bg }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: sc.dot }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: sc.color, flex: 1 }}>{col}</span>
                <span style={{ background: sc.color, color: 'white', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '1px 7px' }}>{colWorkers.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colWorkers.length === 0 ? (
                  <div style={{ padding: '20px 12px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', background: 'white', border: '1px solid var(--border)', borderRadius: 10 }}>
                    No workers
                  </div>
                ) : shown.map((c: any, i: number) => (
                  <div key={c.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: `hsl(${(i * 73 + 30) % 360}, 40%, 65%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>
                        {c.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.full_name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.role}</div>
                        {c.license_class && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 2, background: '#E8F0F8', color: '#1565C0', fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 20 }}>
                            <Car size={7} /> {c.license_class}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: 7 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 20, background: c.fullyCleared ? '#E8F5E9' : '#FFF3E0', color: c.fullyCleared ? '#2E7D32' : '#C4841D' }}>
                        {c.fullyCleared ? <ShieldCheck size={8} /> : <ShieldAlert size={8} />}
                        {c.fullyCleared ? 'Cleared' : 'Pending'}
                      </span>
                    </div>

                    <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={9} /> {c.city}</span>
                      {c.placement && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          {col === 'Ending Soon' ? <AlertCircle size={9} style={{ color: 'var(--clay)' }} /> : <CheckCircle size={9} style={{ color: 'var(--sage)' }} />}
                          {c.placement.clients?.company_name}
                        </span>
                      )}
                      {c.rating > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={9} style={{ color: 'var(--amber)' }} /> {c.rating}</span>}
                    </div>

                    {/* Status change + actions */}
                    <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
                      <a href={`tel:${c.phone}`} style={{ flex: 1, padding: '5px 0', fontSize: 10, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, textDecoration: 'none' }}>
                        <Phone size={9} /> Call
                      </a>
                      {col === 'Available' ? (
                        <a href={`/candidates?role=${encodeURIComponent(c.role)}`} style={{ flex: 2, padding: '5px 0', fontSize: 10, fontWeight: 600, background: 'var(--amber)', border: 'none', borderRadius: 5, color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Match Job
                        </a>
                      ) : (
                        <a href="/candidates" style={{ flex: 2, padding: '5px 0', fontSize: 10, fontWeight: 600, background: 'var(--espresso)', border: 'none', borderRadius: 5, color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          View Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {colWorkers.length > PAGE_SIZE && (
                  <button onClick={() => setExpandedCols(e => ({ ...e, [col]: !e[col] }))}
                    style={{ padding: '8px 0', fontSize: 12, background: 'white', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <ChevronDown size={13} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }} />
                    {isExpanded ? 'Show less' : `Show ${colWorkers.length - PAGE_SIZE} more`}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
