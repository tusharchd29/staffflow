export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../lib/supabase'
import AppShell from "./components/AppShell";
import { Users, Briefcase, CalendarCheck, ShieldCheck, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";

async function getData() {
  const supabase = getSupabase()
  const AGENCY = AGENCY_ID

  const [{ data: candidates }, { data: jobs }, { data: timesheets }, { data: placements }] = await Promise.all([
    supabase.from('candidates').select('*').eq('agency_id', AGENCY),
    supabase.from('jobs').select('*, clients(company_name)').eq('agency_id', AGENCY),
    supabase.from('timesheets').select('*, candidates(full_name, role)').eq('agency_id', AGENCY).order('submitted_at', { ascending: false }).limit(10),
    supabase.from('placements').select('*, candidates(full_name, role), clients(company_name, city)').eq('agency_id', AGENCY).eq('status', 'Active').limit(5),
  ])

  return { candidates: candidates || [], jobs: jobs || [], timesheets: timesheets || [], placements: placements || [] }
}

export default async function Dashboard() {
  const { candidates, jobs, timesheets, placements } = await getData()

  const totalCandidates = candidates.length
  const openJobs = jobs.filter((j: any) => j.status !== 'Filled').length
  const placedThisMonth = candidates.filter((c: any) => c.status === 'Placed').length
  const fullyCleared = candidates.filter((c: any) =>
    c.criminal_check && c.cvos_abstract && c.whmis_cert && c.reference_verified && c.drug_test
  ).length
  const compliancePct = totalCandidates > 0 ? Math.round((fullyCleared / totalCandidates) * 100) : 0

  const urgentJobs = jobs.filter((j: any) => j.status === 'Urgent')

  const pipelineStages = [
    { stage: 'Applied', count: candidates.filter((c: any) => c.status === 'Applied').length, color: '#DDD4C4' },
    { stage: 'Screened', count: candidates.filter((c: any) => c.status === 'Screened').length, color: '#C4A87A' },
    { stage: 'Background Check', count: candidates.filter((c: any) => c.status === 'Background Check').length, color: '#E8A83A' },
    { stage: 'Shortlisted', count: candidates.filter((c: any) => c.status === 'Shortlisted').length, color: '#C4841D' },
    { stage: 'Interview', count: candidates.filter((c: any) => c.status === 'Interview').length, color: '#B5623E' },
    { stage: 'Placed', count: candidates.filter((c: any) => c.status === 'Placed').length, color: '#4A7A5E' },
  ]
  const maxCount = Math.max(...pipelineStages.map(s => s.count), 1)

  const complianceBreakdown = [
    { label: 'Criminal Check', done: candidates.filter((c: any) => c.criminal_check).length },
    { label: 'CVOS Abstract', done: candidates.filter((c: any) => c.cvos_abstract).length },
    { label: 'WHMIS Certified', done: candidates.filter((c: any) => c.whmis_cert).length },
    { label: 'References Verified', done: candidates.filter((c: any) => c.reference_verified).length },
  ]

  const stats = [
    { label: 'Active Candidates', value: String(totalCandidates), delta: `${candidates.filter((c:any) => c.status === 'Applied').length} new applications`, icon: Users, color: '#C4841D' },
    { label: 'Open Job Orders', value: String(openJobs), delta: `${urgentJobs.length} urgent`, icon: Briefcase, color: '#B5623E' },
    { label: 'Currently Placed', value: String(placedThisMonth), delta: 'Active placements', icon: CheckCircle2, color: '#7A8C6E' },
    { label: 'Compliance Ready', value: `${compliancePct}%`, delta: `${fullyCleared} of ${totalCandidates} fully cleared`, icon: ShieldCheck, color: '#5A7A9A' },
  ]

  return (
    <AppShell>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: color, borderRadius: '12px 0 0 12px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--espresso)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>{delta}</div>
              </div>
              <div style={{ background: `${color}18`, borderRadius: 10, padding: 10 }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Pipeline */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: 'var(--espresso)' }}>Candidate Pipeline</h2>
            <a href="/candidates" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--amber)', fontWeight: 500, textDecoration: 'none' }}>
              View All <ArrowUpRight size={12} />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pipelineStages.map(({ stage, count, color }) => (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 110, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}>{stage}</div>
                <div style={{ flex: 1, background: 'var(--sand-dark)', borderRadius: 6, height: 26, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: color, width: `${(count / maxCount) * 100}%`, borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: count > 2 ? 'white' : 'var(--espresso)' }}>{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: 'var(--espresso)' }}>Compliance Readiness</h2>
            <span style={{ background: '#E8F0F8', color: '#5A7A9A', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>
              {compliancePct}% cleared
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {complianceBreakdown.map(({ label, done }) => {
              const pct = totalCandidates > 0 ? Math.round((done / totalCandidates) * 100) : 0
              return (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>{done}/{totalCandidates} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: 11 }}>({pct}%)</span></span>
                  </div>
                  <div style={{ background: 'var(--sand-dark)', borderRadius: 6, height: 8 }}>
                    <div style={{ height: '100%', borderRadius: 6, background: pct >= 80 ? '#4A7A5E' : pct >= 60 ? 'var(--amber)' : 'var(--clay)', width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          {candidates.filter((c: any) => !c.cvos_abstract).length > 0 && (
            <div style={{ marginTop: 16, padding: '10px 14px', background: '#FFF8E8', borderRadius: 8, fontSize: 12, color: '#9A6010' }}>
              ⚠ {candidates.filter((c: any) => !c.cvos_abstract).length} candidates pending CVOS abstract
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Active placements */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: 'var(--espresso)' }}>Active Placements</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sage)', fontWeight: 500 }}>
              <TrendingUp size={14} /> {placements.length} active
            </div>
          </div>
          {placements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 14 }}>
              No active placements yet. Add candidates and match them to jobs.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Worker', 'Role', 'Client', 'Rate', 'End Date'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', paddingBottom: 10, paddingRight: 14 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {placements.map((p: any, i: number) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--sand-dark)' }}>
                    <td style={{ padding: '11px 14px 11px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `hsl(${(i * 57) % 360}, 40%, 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10, flexShrink: 0 }}>
                          {p.candidates?.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--espresso)' }}>{p.candidates?.full_name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)', paddingRight: 14 }}>{p.candidates?.role}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)', paddingRight: 14 }}>{p.clients?.company_name}</td>
                    <td style={{ fontSize: 13, fontWeight: 600, color: 'var(--sage)', paddingRight: 14 }}>${p.hourly_rate}/hr</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.end_date || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Urgent orders */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: 'var(--espresso)' }}>Urgent Orders</h2>
            <span style={{ background: '#FDECEA', color: 'var(--clay)', fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>{urgentJobs.length} critical</span>
          </div>
          {urgentJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 14 }}>No urgent orders right now.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {urgentJobs.map((o: any) => (
                <div key={o.id} style={{ padding: 14, borderRadius: 10, background: 'var(--sand)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--espresso)', marginBottom: 4 }}>{o.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{o.clients?.company_name} · {o.city}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <AlertCircle size={11} style={{ color: 'var(--clay)' }} /> Due {o.deadline}
                    </span>
                    <span>{o.openings - o.filled} openings left</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
