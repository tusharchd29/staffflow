import AppShell from "../components/AppShell";
import { Search, Filter, Plus, MapPin, Phone, Mail, ShieldCheck, ShieldAlert, Car } from "lucide-react";

const candidates = [
  {
    name: "Gurpreet Singh", role: "AZ Driver", license: "Class AZ",
    skills: ["Highway Transport", "Shunting", "Dangerous Goods"],
    location: "Brampton, ON", status: "Placed", rating: 4.8,
    compliance: { criminal: true, cvos: true, whmis: true, reference: true, drugTest: true },
    avatar: "GS"
  },
  {
    name: "Marcus Johnson", role: "General Labour", license: null,
    skills: ["Assembly Line", "Landscaping", "Sanitation"],
    location: "Scarborough, ON", status: "Shortlisted", rating: 4.4,
    compliance: { criminal: true, cvos: false, whmis: true, reference: true, drugTest: false },
    avatar: "MJ"
  },
  {
    name: "Ahmed Hassan", role: "Forklift Operator", license: "Forklift Cert.",
    skills: ["Counterbalance", "Reach Truck", "Inventory"],
    location: "Mississauga, ON", status: "Interview", rating: 4.6,
    compliance: { criminal: true, cvos: true, whmis: true, reference: false, drugTest: true },
    avatar: "AH"
  },
  {
    name: "Parminder Kaur", role: "DZ Driver", license: "Class DZ",
    skills: ["City Delivery", "Route Driving", "Customer Service"],
    location: "Etobicoke, ON", status: "Placed", rating: 4.7,
    compliance: { criminal: true, cvos: true, whmis: false, reference: true, drugTest: true },
    avatar: "PK"
  },
  {
    name: "Carlos Mendez", role: "Industrial Worker", license: null,
    skills: ["Manufacturing", "Quality Control", "Safety"],
    location: "Oshawa, ON", status: "Screened", rating: 4.3,
    compliance: { criminal: true, cvos: false, whmis: true, reference: false, drugTest: false },
    avatar: "CM"
  },
  {
    name: "Raj Dhaliwal", role: "AZ Driver", license: "Class AZ",
    skills: ["Long Haul", "CVOS Clean", "TDG Certified"],
    location: "Brampton, ON", status: "Applied", rating: 4.5,
    compliance: { criminal: false, cvos: false, whmis: false, reference: false, drugTest: false },
    avatar: "RD"
  },
  {
    name: "Taiwo Adeyemi", role: "Warehouse Associate", license: null,
    skills: ["Receiving", "Shipping", "RF Scanner"],
    location: "Mississauga, ON", status: "Screened", rating: 4.2,
    compliance: { criminal: true, cvos: false, whmis: true, reference: true, drugTest: true },
    avatar: "TA"
  },
  {
    name: "Harjit Brar", role: "DZ Driver", license: "Class DZ",
    skills: ["City Pickup", "Last Mile", "Courier"],
    location: "Toronto, ON", status: "Interview", rating: 4.5,
    compliance: { criminal: true, cvos: true, whmis: false, reference: false, drugTest: true },
    avatar: "HB"
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Applied:     { bg: "#F0EDE8", color: "#9C8472" },
  Screened:    { bg: "#FFF3E0", color: "#C4841D" },
  Shortlisted: { bg: "#FFF8E1", color: "#F9A825" },
  Interview:   { bg: "#E8F4FD", color: "#1976D2" },
  Offered:     { bg: "#F3E5F5", color: "#7B1FA2" },
  Placed:      { bg: "#E8F5E9", color: "#388E3C" },
};

const complianceKeys = [
  { key: "criminal", label: "Criminal" },
  { key: "cvos", label: "CVOS" },
  { key: "whmis", label: "WHMIS" },
  { key: "reference", label: "Refs" },
  { key: "drugTest", label: "Drug" },
];

export default function CandidatesPage() {
  return (
    <AppShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12 }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "white", border: "1px solid var(--border)",
            borderRadius: 8, padding: "9px 14px", fontSize: 13, color: "var(--text-muted)", flex: 1, maxWidth: 320
          }}>
            <Search size={14} /> Search workers...
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "white", border: "1px solid var(--border)",
            borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer", color: "var(--text-secondary)"
          }}><Filter size={14} /> Filter by License</button>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "var(--amber)", color: "white", border: "none",
          borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer"
        }}><Plus size={15} /> Add Worker</button>
      </div>

      {/* Stage filter pills */}
      <div style={{ marginBottom: 20 }}>
        {["All", "Applied", "Screened", "Shortlisted", "Interview", "Offered", "Placed"].map((f, i) => (
          <span key={f} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            marginRight: 6, marginBottom: 8, cursor: "pointer",
            background: i === 0 ? "var(--espresso)" : "white",
            color: i === 0 ? "white" : "var(--text-secondary)",
            border: i === 0 ? "none" : "1px solid var(--border)"
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {candidates.map((c, i) => {
          const sc = statusColors[c.status];
          const clearedCount = Object.values(c.compliance).filter(Boolean).length;
          const totalChecks = Object.keys(c.compliance).length;
          const fullyCleared = clearedCount === totalChecks;

          return (
            <div key={i} style={{
              background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 20,
              borderTop: `3px solid ${fullyCleared ? "#4A7A5E" : clearedCount >= 3 ? "var(--amber)" : "var(--clay)"}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${(i * 57 + 20) % 360}, 40%, 68%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 13
                  }}>{c.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--espresso)" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{c.role}</div>
                    {c.license && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4,
                        background: "#E8F0F8", color: "#1565C0",
                        fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20
                      }}>
                        <Car size={9} /> {c.license}
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ ...sc, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, height: "fit-content", whiteSpace: "nowrap" }}>
                  {c.status}
                </span>
              </div>

              {/* Skills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                {c.skills.map(s => (
                  <span key={s} style={{ background: "var(--sand)", color: "var(--text-secondary)", fontSize: 11, padding: "2px 8px", borderRadius: 20, border: "1px solid var(--border)" }}>{s}</span>
                ))}
              </div>

              {/* Compliance checklist */}
              <div style={{
                background: "var(--sand)", borderRadius: 8, padding: "10px 12px", marginBottom: 12,
                border: "1px solid var(--border)"
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  Compliance · {clearedCount}/{totalChecks} cleared
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {complianceKeys.map(({ key, label }) => {
                    const passed = c.compliance[key as keyof typeof c.compliance];
                    return (
                      <span key={key} style={{
                        display: "inline-flex", alignItems: "center", gap: 3,
                        fontSize: 11, fontWeight: 500,
                        color: passed ? "#388E3C" : "#B5623E",
                        background: passed ? "#E8F5E9" : "#FDECEA",
                        padding: "2px 7px", borderRadius: 20
                      }}>
                        {passed
                          ? <ShieldCheck size={9} />
                          : <ShieldAlert size={9} />}
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Location + actions */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} /> {c.location}</span>
              </div>

              <div style={{ display: "flex", gap: 7 }}>
                <button style={{ flex: 1, padding: "7px 0", fontSize: 12, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Phone size={11} /> Call
                </button>
                <button style={{ flex: 1, padding: "7px 0", fontSize: 12, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Mail size={11} /> Email
                </button>
                <button style={{ flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600, background: "var(--amber)", border: "none", borderRadius: 7, cursor: "pointer", color: "white" }}>
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
