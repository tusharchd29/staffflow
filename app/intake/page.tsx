export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import AddClientButton from "../components/AddClientButton";
import { MapPin, Users, CheckCircle, FileText, Clock, Building2, ArrowRight } from "lucide-react";

async function getClients() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('clients')
    .select('*, jobs(id, status)')
    .eq('agency_id', AGENCY_ID)
    .order('company_name', { ascending: true })
  return data || []
}

const intakeSteps = [
  { step: "01", label: "Client Consultation", desc: "Meet hiring manager, clarify role details & company culture", icon: Users },
  { step: "02", label: "Role Requirements", desc: "Document license class, compliance needs, shift type, duration", icon: FileText },
  { step: "03", label: "Candidate Sourcing", desc: "Search internal DB (200+ workers) + targeted advertising", icon: Users },
  { step: "04", label: "Screening", desc: "Phone screen, background check, CVOS abstract, WHMIS verify", icon: CheckCircle },
  { step: "05", label: "Interview & Debrief", desc: "Coordinate interviews, pre-brief both sides, post-debrief", icon: Clock },
  { step: "06", label: "Offer & Onboarding", desc: "Offer negotiation, resignation support, follow-up check-in", icon: CheckCircle },
];

const industryColors: Record<string, { bg: string; color: string }> = {
  "Transport":      { bg: "#E8F0F8", color: "#1565C0" },
  "Construction":   { bg: "#FFF3E0", color: "#C4841D" },
  "Logistics":      { bg: "#E8F5E9", color: "#2E7D32" },
  "Manufacturing":  { bg: "#F3E5F5", color: "#6A1B9A" },
  "Warehousing":    { bg: "#E0F2F1", color: "#00695C" },
  "Other":          { bg: "#F5F0E8", color: "#7A5C3C" },
};

export default async function IntakePage() {
  const clients = await getClients()

  const totalWorkers = clients.reduce((a: number, c: any) => {
    // Count active placements per client — approximate from jobs
    return a + (c.jobs?.filter((j: any) => j.status !== 'Filled').length || 0)
  }, 0)

  return (
    <AppShell>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Active Clients", value: clients.length, color: "var(--amber)" },
          { label: "Open Mandates", value: clients.reduce((a: number, c: any) => a + (c.jobs?.filter((j: any) => j.status === 'Active' || j.status === 'Urgent').length || 0), 0), color: "var(--clay)" },
          { label: "Placement Steps", value: "6", color: "var(--sage)" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
        <div>
          {/* Placement Process */}
          <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>
              Placement Process
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
              Our 6-step workflow for every new mandate — from client brief to onboarding.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {intakeSteps.map(({ step, label, desc, icon: Icon }, idx) => (
                <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "var(--amber)", display: "flex", alignItems: "center",
                      justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700
                    }}>{step}</div>
                    {idx < intakeSteps.length - 1 && (
                      <div style={{ position: "absolute", left: "50%", top: 36, width: 1, height: 20, background: "var(--border)", transform: "translateX(-50%)" }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Clients from DB */}
          <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Active Clients</h2>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{clients.length} accounts</span>
            </div>

            {clients.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)", fontSize: 14 }}>
                No clients yet. Use the form to add your first client.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {clients.map((cl: any, i: number) => {
                  const openOrders = cl.jobs?.filter((j: any) => j.status !== 'Filled').length || 0
                  const ic = industryColors[cl.industry] || industryColors["Other"]
                  return (
                    <div key={cl.id} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 16px", borderRadius: 10, background: "var(--sand)",
                      border: "1px solid var(--border)"
                    }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: `hsl(${(i * 63 + 15) % 360}, 35%, 65%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontWeight: 700, fontSize: 13
                        }}>{cl.company_name?.[0] || '?'}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cl.company_name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 8, marginTop: 2, flexWrap: "wrap" }}>
                            {cl.city && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={9} />{cl.city}</span>}
                            {cl.industry && (
                              <span style={{ ...ic, padding: "1px 6px", borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{cl.industry}</span>
                            )}
                            {cl.contact_name && <span>{cl.contact_name}</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 14, alignItems: "center", flexShrink: 0 }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: openOrders > 0 ? "var(--clay)" : "var(--text-muted)" }}>{openOrders}</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Open</div>
                        </div>
                        <a href={`/jobs`} style={{
                          padding: "7px 14px", fontSize: 12, fontWeight: 600,
                          background: "var(--amber)", color: "white", border: "none",
                          borderRadius: 7, cursor: "pointer", textDecoration: "none",
                          display: "flex", alignItems: "center", gap: 4
                        }}>
                          Orders <ArrowRight size={11} />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Add Client Form */}
        <AddClientButton />
      </div>
    </AppShell>
  );
}
