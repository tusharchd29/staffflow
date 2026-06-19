export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import AddJobButton from "../components/AddJobButton";
import JobList from "../components/JobList";

async function getData() {
  const supabase = getSupabase()
  const [{ data: jobs }, { data: clients }] = await Promise.all([
    supabase.from('jobs').select('*, clients(company_name)').eq('agency_id', AGENCY_ID).order('posted_at', { ascending: false }),
    supabase.from('clients').select('id, company_name').eq('agency_id', AGENCY_ID).order('company_name'),
  ])
  return { jobs: jobs || [], clients: clients || [] }
}

export default async function JobsPage() {
  const { jobs, clients } = await getData()

  const active = jobs.filter((j: any) => j.status !== 'Filled').length
  const totalOpenings = jobs.reduce((a: number, j: any) => a + (j.openings || 0), 0)
  const totalFilled = jobs.reduce((a: number, j: any) => a + (j.filled || 0), 0)
  const fillRate = totalOpenings > 0 ? Math.round((totalFilled / totalOpenings) * 100) : 0
  const urgentCount = jobs.filter((j: any) => j.status === 'Urgent').length

  return (
    <AppShell>
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {[
          { label: 'Active Orders', value: active, color: 'var(--amber)' },
          { label: 'Total Openings', value: totalOpenings, color: 'var(--clay)' },
          { label: 'Positions Filled', value: totalFilled, color: 'var(--sage)' },
          { label: 'Fill Rate', value: `${fillRate}%`, color: 'var(--espresso-mid)' },
          { label: 'Urgent', value: urgentCount, color: '#B5623E' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 20px', flex: 1, minWidth: 100 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
        <AddJobButton />
      </div>
      <JobList jobs={jobs} clients={clients} />
    </AppShell>
  )
}
