import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import AddCandidateButton from "../components/AddCandidateButton";
import { MapPin, ShieldCheck, ShieldAlert, Car } from "lucide-react";

async function getCandidates() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('candidates')
    .select('*')
    .eq('agency_id', AGENCY_ID)
    .order('created_at', { ascending: false })
  return data || []
}

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

export default async function CandidatesPage() {
  const candidates = await getCandidates()

  return (
    <AppShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{candidates.length} workers in system</div>
        <AddCandidateButton />
      </div>

      {/* Stage pills */}
      <div style={{ marginBottom: 20 }}>
        {['All', 'Applied', 'Screened', 'Background Check', 'Shortlisted', 'Interview', 'Offered', 'Placed'].map((f, i) => {
          const count = f === 'All' ? candidates.length : candidates.filter((c: any) => c.status === f).length
          return (
            <span key={f} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              marginRight: 6, marginBottom: 8, cursor: 'pointer',
              background: i === 0 ? 'var(--espresso)' : 'white',
              color: i === 0 ? 'white' : 'var(--text-secondary)',
              border: i === 0 ? 'none' : '1px solid var(--border)'
            }}>
              {f} <span style={{ opacity: 0.7, fontSize: 11 }}>{count}</span>
            </span>
          )
        })}
      </div>

      {candidates.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>👷</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 8 }}>No workers yet</div>
          <div style={{ fontSize: 14 }}>Click "Add Worker" to get started</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {candidates.map((c: any, i: number) => {
            const sc = statusColors[c.status] || statusColors['Applied']
            const clearedCount = complianceKeys.filter(({ key }) => c[key]).length
            const fullyCleared = clearedCount === complianceKeys.length

            return (
              <div key={c.id} style={{
                background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 20,
                borderTop: `3px solid ${fullyCleared ? '#4A7A5E' : clearedCount >= 3 ? 'var(--amber)' : 'var(--clay)'}`
              }}>
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
                    {c.skills.map((s: string) => (
                      <span key={s} style={{ background: 'var(--sand)', color: 'var(--text-secondary)', fontSize: 11, padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{s}</span>
                    ))}
                  </div>
                )}

                {/* Compliance */}
                <div style={{ background: 'var(--sand)', borderRadius: 8, padding: '10px 12px', marginBottom: 12, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Compliance · {clearedCount}/{complianceKeys.length} cleared
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {c.city}</span>
                  {c.phone && <span>{c.phone}</span>}
                </div>

                <div style={{ display: 'flex', gap: 7 }}>
                  <a href={`tel:${c.phone}`} style={{ flex: 1, padding: '7px 0', fontSize: 12, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, textDecoration: 'none' }}>
                    📞 Call
                  </a>
                  <a href={`mailto:${c.email}`} style={{ flex: 1, padding: '7px 0', fontSize: 12, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, textDecoration: 'none' }}>
                    ✉ Email
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AppShell>
  )
}
