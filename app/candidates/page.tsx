import AppShell from "../components/AppShell";
import { Search, Filter, Plus, MapPin, Phone, Mail, Star } from "lucide-react";

const candidates = [
  { name: "Priya Sharma", role: "Registered Nurse (RN)", skills: ["ICU", "Emergency", "Paediatrics"], location: "Toronto, ON", status: "Shortlisted", rating: 4.8, availability: "Immediate", exp: "7 yrs" },
  { name: "James Okafor", role: "Warehouse Operations Lead", skills: ["Inventory", "Forklift", "Safety"], location: "Vancouver, BC", status: "Interview", rating: 4.5, availability: "2 weeks", exp: "5 yrs" },
  { name: "Maria Fonseca", role: "IT Support Analyst", skills: ["Help Desk", "Azure", "Networking"], location: "Calgary, AB", status: "Screened", rating: 4.6, availability: "Immediate", exp: "4 yrs" },
  { name: "David Chen", role: "Financial Analyst", skills: ["Excel", "Power BI", "Forecasting"], location: "Toronto, ON", status: "Offered", rating: 4.9, availability: "1 month", exp: "9 yrs" },
  { name: "Aisha Koroma", role: "Licensed Practical Nurse", skills: ["LTC", "Wound Care", "Medications"], location: "Winnipeg, MB", status: "Placed", rating: 4.7, availability: "Placed", exp: "6 yrs" },
  { name: "Raj Patel", role: "CDL Class A Driver", skills: ["Long Haul", "Tanker", "HazMat"], location: "Saskatoon, SK", status: "Applied", rating: 4.3, availability: "Immediate", exp: "11 yrs" },
  { name: "Sophie Tremblay", role: "Bilingual Customer Service", skills: ["French", "CRM", "Retail"], location: "Montreal, QC", status: "Screened", rating: 4.4, availability: "2 weeks", exp: "3 yrs" },
  { name: "Michael Adebayo", role: "Site Safety Officer", skills: ["WHMIS", "Fall Protection", "First Aid"], location: "Edmonton, AB", status: "Shortlisted", rating: 4.6, availability: "Immediate", exp: "8 yrs" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Applied: { bg: "#F0EDE8", color: "#9C8472" },
  Screened: { bg: "#FFF3E0", color: "#C4841D" },
  Shortlisted: { bg: "#FFF8E1", color: "#F9A825" },
  Interview: { bg: "#E8F4FD", color: "#1976D2" },
  Offered: { bg: "#F3E5F5", color: "#7B1FA2" },
  Placed: { bg: "#E8F5E9", color: "#388E3C" },
};

export default function CandidatesPage() {
  return (
    <AppShell>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12 }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "white", border: "1px solid var(--border)",
            borderRadius: 8, padding: "9px 14px", fontSize: 13, color: "var(--text-muted)",
            flex: 1, maxWidth: 340
          }}>
            <Search size={14} />
            <span>Search candidates...</span>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "white", border: "1px solid var(--border)",
            borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer", color: "var(--text-secondary)"
          }}>
            <Filter size={14} /> Filter
          </button>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "var(--amber)", color: "white", border: "none",
          borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer"
        }}>
          <Plus size={15} /> Add Candidate
        </button>
      </div>

      {/* Stage summary strip */}
      {["Applied", "Screened", "Shortlisted", "Interview", "Offered", "Placed"].map(s => {
        const count = candidates.filter(c => c.status === s).length;
        const sc = statusColors[s];
        return (
          <span key={s} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: sc.bg, color: sc.color,
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
            marginRight: 8, marginBottom: 20, cursor: "pointer"
          }}>
            {s} <span style={{ background: sc.color, color: "white", borderRadius: 20, padding: "1px 7px", fontSize: 11 }}>{count}</span>
          </span>
        );
      })}

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {candidates.map((c, i) => {
          const sc = statusColors[c.status];
          return (
            <div key={i} style={{
              background: "white", border: "1px solid var(--border)", borderRadius: 12,
              padding: 20, cursor: "pointer", transition: "box-shadow 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${(i * 57 + 20) % 360}, 40%, 70%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 14
                  }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--espresso)" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{c.role}</div>
                  </div>
                </div>
                <span style={{ ...sc, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, height: "fit-content", whiteSpace: "nowrap" }}>
                  {c.status}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {c.skills.map(s => (
                  <span key={s} style={{
                    background: "var(--sand)", color: "var(--text-secondary)",
                    fontSize: 11, padding: "3px 9px", borderRadius: 20, border: "1px solid var(--border)"
                  }}>{s}</span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", borderTop: "1px solid var(--sand-dark)", paddingTop: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={11} /> {c.location}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={11} style={{ color: "var(--amber)" }} /> {c.rating} · {c.exp}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button style={{
                  flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 500,
                  background: "var(--sand)", border: "1px solid var(--border)",
                  borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                }}><Phone size={12} /> Call</button>
                <button style={{
                  flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 500,
                  background: "var(--sand)", border: "1px solid var(--border)",
                  borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                }}><Mail size={12} /> Email</button>
                <button style={{
                  flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600,
                  background: "var(--amber)", border: "none",
                  borderRadius: 7, cursor: "pointer", color: "white"
                }}>View Profile</button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
