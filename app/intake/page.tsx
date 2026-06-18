import AppShell from "../components/AppShell";
import { Building2, Phone, Mail, MapPin, Users, Clock, CheckCircle, FileText } from "lucide-react";

const activeClients = [
  { name: "TruckPro Logistics", contact: "Raj Sharma", city: "Brampton, ON", industry: "Transport", activeOrders: 2, workers: 3, since: "Jan 2024" },
  { name: "BuildCore Inc.", contact: "Tom Whitfield", city: "Scarborough, ON", industry: "Construction", activeOrders: 1, workers: 5, since: "Mar 2024" },
  { name: "Maple Warehousing", contact: "Linda Chow", city: "Mississauga, ON", industry: "Logistics", activeOrders: 2, workers: 4, since: "Nov 2023" },
  { name: "FastFreight GTA", contact: "Priya Nair", city: "Etobicoke, ON", industry: "Transport", activeOrders: 1, workers: 2, since: "Feb 2024" },
  { name: "SteelTech Mfg.", contact: "James O'Brien", city: "Oshawa, ON", industry: "Manufacturing", activeOrders: 0, workers: 4, since: "Oct 2023" },
];

const intakeSteps = [
  { step: "01", label: "Client Consultation", desc: "Meet hiring manager, clarify role details & company culture", icon: Users, done: true },
  { step: "02", label: "Role Requirements", desc: "Document license class, compliance needs, shift type, duration", icon: FileText, done: true },
  { step: "03", label: "Candidate Sourcing", desc: "Search internal DB (10,000+ resumes) + targeted advertising", icon: Users, done: false },
  { step: "04", label: "Screening", desc: "Phone screen, background check, CVOS abstract, WHMIS verify", icon: CheckCircle, done: false },
  { step: "05", label: "Interview & Debrief", desc: "Coordinate interviews, pre-brief both sides, post-debrief", icon: Clock, done: false },
  { step: "06", label: "Offer & Onboarding", desc: "Offer negotiation, resignation support, follow-up check-in", icon: CheckCircle, done: false },
];

export default function IntakePage() {
  return (
    <AppShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>

        {/* Left: Active clients + intake workflow */}
        <div>
          {/* Process overview */}
          <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>
              Placement Process
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
              Our step-by-step workflow for every new mandate — from client brief to onboarding.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {intakeSteps.map(({ step, label, desc, icon: Icon, done }) => (
                <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: done ? "var(--sage)" : "var(--sand-dark)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: done ? "white" : "var(--text-muted)",
                    fontSize: 12, fontWeight: 700
                  }}>{done ? <CheckCircle size={16} /> : step}</div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Clients */}
          <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Active Clients</h2>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{activeClients.length} accounts</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeClients.map((cl, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", borderRadius: 10, background: "var(--sand)",
                  border: "1px solid var(--border)"
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: `hsl(${(i * 63 + 15) % 360}, 35%, 65%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontWeight: 700, fontSize: 13
                    }}>{cl.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{cl.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={9} />{cl.city}</span>
                        <span>{cl.industry}</span>
                        <span>Client since {cl.since}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--amber)" }}>{cl.workers}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Workers</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: cl.activeOrders > 0 ? "var(--clay)" : "var(--text-muted)" }}>{cl.activeOrders}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Open Orders</div>
                    </div>
                    <button style={{
                      padding: "7px 14px", fontSize: 12, fontWeight: 600,
                      background: "var(--amber)", color: "white", border: "none",
                      borderRadius: 7, cursor: "pointer"
                    }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: New client intake form */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24, height: "fit-content" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>
            New Client Intake
          </h2>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Tell us your staffing needs and we'll find the right workers.</p>

          {[
            { label: "Company Name", placeholder: "e.g. TruckPro Logistics", icon: Building2 },
            { label: "Contact Name", placeholder: "Hiring manager name", icon: Users },
            { label: "Phone", placeholder: "+1 (905) 000-0000", icon: Phone },
            { label: "Email", placeholder: "hr@company.ca", icon: Mail },
            { label: "Location (City, ON)", placeholder: "e.g. Brampton, ON", icon: MapPin },
          ].map(({ label, placeholder, icon: Icon }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>{label}</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px" }}>
                <Icon size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{placeholder}</span>
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Type of Workers Needed</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["AZ Driver", "DZ Driver", "G Driver", "General Labour", "Forklift Operator", "Warehouse Associate", "Industrial Worker", "Other"].map(t => (
                <span key={t} style={{
                  padding: "5px 11px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                  background: t === "AZ Driver" ? "var(--amber)" : "var(--sand)",
                  color: t === "AZ Driver" ? "white" : "var(--text-secondary)",
                  border: t === "AZ Driver" ? "none" : "1px solid var(--border)", fontWeight: t === "AZ Driver" ? 600 : 400
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Compliance Requirements</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {["CVOS Abstract", "Criminal Background Check", "WHMIS Certification", "Drug Test", "Reference Check", "TDG (Dangerous Goods)"].map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--border)", background: "var(--sand)", flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Additional Notes</label>
            <div style={{ background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", minHeight: 72, fontSize: 13, color: "var(--text-muted)" }}>
              Shift details, contract length, start date...
            </div>
          </div>

          <button style={{
            width: "100%", padding: "11px 0", fontSize: 14, fontWeight: 600,
            background: "var(--espresso)", color: "white", border: "none",
            borderRadius: 9, cursor: "pointer"
          }}>Submit Request</button>
          <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 10 }}>
            We'll follow up within 24 hours · info@labourmax.ca
          </p>
        </div>
      </div>
    </AppShell>
  );
}
