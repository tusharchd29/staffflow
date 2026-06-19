export const dynamic = 'force-dynamic'
import AppShell from "../components/AppShell";
import { getSupabase, AGENCY_ID } from '../../lib/supabase'

async function getAgency() {
  const supabase = getSupabase()
  const { data } = await supabase.from('agencies').select('*').eq('id', AGENCY_ID).single()
  return data
}

export default async function SettingsPage() {
  const agency = await getAgency()
  return (
    <AppShell>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--espresso)', marginBottom: 20 }}>Agency Settings</h2>
          {[
            { label: 'Agency Name', value: agency?.name || 'Labour Max Staffing' },
            { label: 'Contact Email', value: agency?.email || 'info@labourmax.ca' },
            { label: 'Phone', value: agency?.phone || '(905) 555-0100' },
            { label: 'Address', value: agency?.address || '123 Queen St W, Brampton, ON L6X 1A1' },
            { label: 'HST Number', value: '123456789 RT0001' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--sand-dark)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, color: 'var(--espresso)' }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--espresso)', marginBottom: 16 }}>Billing Settings</h2>
          {[
            { label: 'HST Rate', value: '13% (Ontario)' },
            { label: 'OT Threshold', value: '44 hrs/week (Ontario ESA)' },
            { label: 'OT Multiplier', value: '1.5×' },
            { label: 'Payment Terms', value: 'Net 30' },
            { label: 'Invoice Currency', value: 'CAD' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--sand-dark)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, color: 'var(--espresso)', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--espresso)', marginBottom: 16 }}>Compliance Checks</h2>
          {['Criminal Background Check', 'CVOS Abstract (Drivers)', 'WHMIS Certification', 'Reference Verification', 'Drug Test', 'TDG (Dangerous Goods)'].map(c => (
            <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--sand-dark)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#E8F5E9', color: '#388E3C' }}>Required</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
