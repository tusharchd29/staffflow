export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import TimesheetActions from "../components/TimesheetActions";
import InvoiceButton from "../components/InvoiceButton";
import { AlertTriangle } from "lucide-react";

async function getTimesheets() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('timesheets')
    .select('*, candidates(full_name, role), clients(company_name)')
    .eq('agency_id', AGENCY_ID)
    .order('submitted_at', { ascending: false })
  return data || []
}

const calcAmount = (reg: number, ot: number, rate: number) => (reg * rate) + (ot * rate * 1.5)
const HST = 0.13

const statusConfig: Record<string, { bg: string; color: string }> = {
  Approved: { bg: '#E8F5E9', color: '#388E3C' },
  Pending:  { bg: '#FFF3E0', color: '#C4841D' },
  Rejected: { bg: '#FDECEA', color: '#B5623E' },
}

export default async function TimesheetsPage() {
  const timesheets = await getTimesheets()
  const approved = timesheets.filter((t: any) => t.status === 'Approved')
  const pending = timesheets.filter((t: any) => t.status === 'Pending')
  const rejected = timesheets.filter((t: any) => t.status === 'Rejected')
  const totalBillable = approved.reduce((a: number, t: any) => a + calcAmount(t.regular_hours, t.overtime_hours, t.hourly_rate), 0)

  return (
    <AppShell>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Pending Approval', value: pending.length, color: 'var(--amber)', note: 'Action required' },
          { label: 'Approved', value: approved.length, color: 'var(--sage)', note: 'This period' },
          { label: 'Rejected', value: rejected.length, color: 'var(--clay)', note: 'Needs resubmission' },
          { label: 'Billable (excl. HST)', value: `$${(totalBillable/1000).toFixed(1)}k`, color: 'var(--espresso)', note: `+$${(totalBillable*HST/1000).toFixed(1)}k HST` },
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

      {timesheets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--espresso)', marginBottom: 8 }}>No timesheets yet</div>
          <div>Workers will submit timesheets once they have logins.</div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--sand-dark)', borderBottom: '1px solid var(--border)' }}>
                {['Worker', 'Client', 'Week', 'Reg.Hrs', 'OT (1.5×)', 'Rate', 'Amount', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 14px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timesheets.map((t: any) => {
                const sc = statusConfig[t.status] || statusConfig['Pending']
                const amount = calcAmount(t.regular_hours, t.overtime_hours, t.hourly_rate)
                return (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--sand-dark)', background: t.status === 'Rejected' ? '#FFFAFA' : 'white' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--espresso)' }}>{t.candidates?.full_name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.candidates?.role}</div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>{t.clients?.company_name}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-muted)' }}>{t.week_start} – {t.week_end}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 500 }}>{t.regular_hours}h</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 13, fontWeight: t.overtime_hours > 0 ? 700 : 400, color: t.overtime_hours > 0 ? 'var(--clay)' : 'var(--text-muted)' }}>
                        {t.overtime_hours > 0 ? `+${t.overtime_hours}h` : '—'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>${t.hourly_rate}/hr</td>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: 'var(--sage)' }}>${amount.toLocaleString()}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>
                        {t.status}
                      </span>
                      {t.rejection_note && <div style={{ fontSize: 10, color: 'var(--clay)', marginTop: 3 }}>⚠ {t.rejection_note}</div>}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {t.status === 'Pending' && <TimesheetActions id={t.id} />}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {approved.length > 0 && (
        <div style={{ marginTop: 20, padding: '18px 24px', borderRadius: 10, background: 'var(--amber-pale)', border: '1px solid #F0D5A0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: 'var(--espresso)' }}>Ready to Invoice</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              {approved.length} timesheets · {approved.reduce((a: number, t: any) => a + t.regular_hours + t.overtime_hours, 0)} total hours
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Subtotal: <strong>${totalBillable.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>HST (13%): <strong>${(totalBillable*HST).toLocaleString(undefined, {maximumFractionDigits:0})}</strong></div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--amber)' }}>
              ${(totalBillable*(1+HST)).toLocaleString(undefined, {maximumFractionDigits:0})}
            </div>
            <InvoiceButton timesheets={approved} totalBillable={totalBillable} hst={totalBillable * HST} />
          </div>
        </div>
      )}
    </AppShell>
  )
}
