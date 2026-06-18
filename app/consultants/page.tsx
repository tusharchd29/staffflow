import AppShell from "../components/AppShell";
import { MapPin, Phone, Star, CheckCircle, Clock, AlertCircle } from "lucide-react";

const consultants = [
  { name: "Priya Sharma", role: "Registered Nurse", status: "On Assignment", client: "Sunridge Medical", endDate: "Aug 31", province: "ON", rating: 4.8, phone: "+1-416-555-0121", skills: ["ICU", "Emergency"], avatar: "PS" },
  { name: "Aisha Koroma", role: "Licensed Practical Nurse", status: "On Assignment", client: "CareFirst Homes", endDate: "Jul 15", province: "MB", rating: 4.7, phone: "+1-204-555-0182", skills: ["LTC", "Wound Care"], avatar: "AK" },
  { name: "James Okafor", role: "Warehouse Lead", status: "Available", client: null, endDate: null, province: "BC", rating: 4.5, phone: "+1-604-555-0134", skills: ["Logistics", "Forklift"], avatar: "JO" },
  { name: "Maria Fonseca", role: "IT Support Analyst", status: "Available", client: null, endDate: null, province: "AB", rating: 4.6, phone: "+1-403-555-0145", skills: ["Azure", "Help Desk"], avatar: "MF" },
  { name: "Michael Adebayo", role: "Safety Officer", status: "Interview Stage", client: "BuildRight Co.", endDate: null, province: "AB", rating: 4.6, phone: "+1-780-555-0167", skills: ["NCSO", "WHMIS"], avatar: "MA" },
  { name: "Sophie Tremblay", role: "Bilingual CS Rep", status: "Available", client: null, endDate: null, province: "QC", rating: 4.4, phone: "+1-514-555-0198", skills: ["French", "CRM"], avatar: "ST" },
  { name: "Raj Patel", role: "CDL Class A Driver", status: "On Assignment", client: "TransNorth", endDate: "Sep 30", province: "SK", rating: 4.3, phone: "+1-306-555-0112", skills: ["CDL-A", "Long Haul"], avatar: "RP" },
  { name: "David Chen", role: "Financial Analyst", status: "Ending Soon", client: "Maple Capital", endDate: "Jun 30", province: "ON", rating: 4.9, phone: "+1-613-555-0176", skills: ["Finance", "Power BI"], avatar: "DC" },
];

const statusConfig: Record<string, { bg: string; color: string; dot: string }> = {
  "On Assignment":  { bg: "#E8F5E9", color: "#388E3C", dot: "#4CAF50" },
  "Available":      { bg: "#FFF3E0", color: "#C4841D", dot: "#FFC107" },
  "Interview Stage":{ bg: "#E8F4FD", color: "#1565C0", dot: "#2196F3" },
  "Ending Soon":    { bg: "#FDECEA", color: "#B5623E", dot: "#F44336" },
};

const columns = ["On Assignment", "Available", "Interview Stage", "Ending Soon"];

export default function ConsultantsPage() {
  return (
    <AppShell>
      {/* Summary strip */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {columns.map(col => {
          const count = consultants.filter(c => c.status === col).length;
          const sc = statusConfig[col];
          return (
            <div key={col} style={{
              background: "white", border: "1px solid var(--border)",
              borderRadius: 10, padding: "14px 18px", flex: 1, minWidth: 140
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col}</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: sc.color }}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Kanban board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {columns.map(col => {
          const colConsultants = consultants.filter(c => c.status === col);
          const sc = statusConfig[col];
          return (
            <div key={col}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
                padding: "8px 12px", borderRadius: 8, background: sc.bg
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: sc.color, flex: 1 }}>{col}</span>
                <span style={{
                  background: sc.color, color: "white",
                  fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "1px 7px"
                }}>{colConsultants.length}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {colConsultants.map((c, i) => (
                  <div key={i} style={{
                    background: "white", border: "1px solid var(--border)",
                    borderRadius: 10, padding: 14, cursor: "pointer"
                  }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                        background: `hsl(${(i * 73 + 30) % 360}, 40%, 65%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontWeight: 700, fontSize: 12
                      }}>{c.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.role}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                      {c.skills.map(s => (
                        <span key={s} style={{
                          background: "var(--sand)", color: "var(--text-secondary)",
                          fontSize: 10, padding: "2px 7px", borderRadius: 20, border: "1px solid var(--border)"
                        }}>{s}</span>
                      ))}
                    </div>

                    <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={10} /> {c.province}
                      </span>
                      {c.client && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {c.status === "Ending Soon"
                            ? <AlertCircle size={10} style={{ color: "var(--clay)" }} />
                            : <CheckCircle size={10} style={{ color: "var(--sage)" }} />}
                          {c.client} {c.endDate ? `· Ends ${c.endDate}` : ""}
                        </span>
                      )}
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={10} style={{ color: "var(--amber)" }} /> {c.rating}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      <button style={{
                        flex: 1, padding: "6px 0", fontSize: 11,
                        background: "var(--sand)", border: "1px solid var(--border)",
                        borderRadius: 6, cursor: "pointer", color: "var(--text-secondary)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                      }}><Phone size={10} /> Call</button>
                      <button style={{
                        flex: 1, padding: "6px 0", fontSize: 11, fontWeight: 600,
                        background: "var(--amber)", border: "none",
                        borderRadius: 6, cursor: "pointer", color: "white"
                      }}>
                        {col === "Available" ? "Match Job" : "View"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
