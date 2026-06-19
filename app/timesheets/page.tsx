export const dynamic = 'force-dynamic'
import { AlertTriangle } from "lucide-react";
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import TimesheetFilters from "../components/TimesheetFilters";

async function getData() {
  const supabase = getSupabase()
  const [{ data: timesheets }, { data: clients }, { data: candidates }] = await Promise.all([
    supabase.from('timesheets').select('*, candidates(full_name, role), clients(company_name)')
      .eq('agency_id', AGENCY_ID).order('submitted_at', { ascending: false }),
    supabase.from('clients').select('id, company_name').eq('agency_id', AGENCY_ID).order('company_name'),
    supabase.from('candidates').select('id, full_name, role').eq('agency_id', AGENCY_ID).eq('status', 'Placed').order('full_name'),
  ])
  return { timesheets: timesheets || [], clients: clients || [], candidates: candidates || [] }
}

export default async function TimesheetsPage() {
  const { timesheets, clients, candidates } = await getData()
  const approved = timesheets.filter((t: any) => t.status === 'Approved')
  const pending = timesheets.filter((t: any) => t.status === 'Pending')
  const rejected = timesheets.filter((t: any) => t.status === 'Rejected')

  return (
    <AppShell>
      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Pending Approval', value: pending.length, color: 'var(--amber)', note: 'Action required' },
          { label: 'Approved', value: approved.length, color: 'var(--sage)', note: 'This period' },
          { label: 'Rejected', value: rejected.length, color: 'var(--clay)', note: 'Needs resubmission' },
          { label: 'Total Timesheets', value: timesheets.length, color: 'var(--espresso)', note: `${clients.length} clients` },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 22px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16, padding: '10px 16px', borderRadius: 8, background: '#E8F0F8', border: '1px solid #B0C4DE', fontSize: 12, color: '#1565C0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertTriangle size={13} />
        <span><strong>Ontario ESA:</strong> Overtime (1.5×) applies after 44 hrs/week. All OT hours calculated accordingly.</span>
      </div>

      {/* Client filter + Add timesheet + full table passed to client component */}
      <TimesheetFilters
        timesheets={timesheets}
        clients={clients}
        candidates={candidates}
      />
    </AppShell>
  )
}
