import AppShell from "../components/AppShell";
import { MapPin, Phone, Star, CheckCircle, Clock, AlertCircle, Car, ShieldCheck } from "lucide-react";

const consultants = [
  { name: "Gurpreet Singh", role: "AZ Driver", license: "Class AZ", status: "On Assignment", client: "TruckPro Logistics", endDate: "Jul 31", city: "Brampton, ON", rating: 4.8, phone: "+1-905-555-0121", compliant: true, avatar: "GS" },
  { name: "Parminder Kaur", role: "DZ Driver", license: "Class DZ", status: "On Assignment", client: "FastFreight GTA", endDate: "Aug 15", city: "Etobicoke, ON", rating: 4.7, phone: "+1-416-555-0182", compliant: true, avatar: "PK" },
  { name: "Marcus Johnson", role: "General Labour", license: null, status: "Available", client: null, endDate: null, city: "Scarborough, ON", rating: 4.4, phone: "+1-416-555-0134", compliant: false, avatar: "MJ" },
  { name: "Taiwo Adeyemi", role: "Warehouse Associate", license: null, status: "Available", client: null, endDate: null, city: "Mississauga, ON", rating: 4.2, phone: "+1-905-555-0145", compliant: true, avatar: "TA" },
  { name: "Ahmed Hassan", role: "Forklift Operator", license: "Forklift Cert.", status: "Interview Stage", client: "Maple Warehousing", endDate: null, city: "Mississauga, ON", rating: 4.6, phone: "+1-905-555-0167", compliant: true, avatar: "AH" },
  { name: "Harjit Brar", role: "DZ Driver", license: "Class DZ", status: "Interview Stage", client: "FastFreight GTA", endDate: null, city: "Toronto, ON", rating: 4.5, phone: "+1-647-555-0198", compliant: false, avatar: "HB" },
  { name: "Raj Dhaliwal", role: "AZ Driver", license: "Class AZ", status: "Available", client: null, endDate: null, city: "Brampton, ON", rating: 4.5, phone: "+1-905-555-0112", compliant: false, avatar: "RD" },
  { name: "Carlos Mendez", role: "Industrial Worker", license: null, status: "Ending Soon", client: "SteelTech Mfg.", endDate: "Jun 28", city: "Oshawa, ON", rating: 4.3, phone: "+1-905-555-0176", compliant: true, avatar: "CM" },
];

const statusConfig: Record<string, { bg: string; color: string; dot: string }> = {
  "On Assignment":   { bg: "#E8F5E9", color: "#388E3C", dot: "#4CAF50" },
  "Available":       { bg: "#FFF3E0", color: "#C4841D", dot: "#FFC107" },
  "Interview Stage": { bg: "#E8F4FD", color: "#1565C0", dot: "#2196F3" },
  "Ending Soon":     { bg: "#FDECEA", color: "#B5623E", dot: "#F44336" },
};

const columns = ["On Assignment", "Available", "Interview Stage", "Ending Soon"];

export default function ConsultantsPage() {
  return (
    <AppShell>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {columns.map(col => {
          const count = consultants.filter(c => c.status === col).length;
          const sc = statusConfig[col];
          return (
            <div key={col} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 18px", flex: 1, minWidth: 130 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col}</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: sc.color }}>{count}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {columns.map(col => {
          const colWorkers = consultants.filter(c => c.status === col);
          const sc = statusConfig[col];
          return (
            <div key={col}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", borderRadius: 8, background: sc.bg }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: sc.color, flex: 1 }}>{col}</span>
                <span style={{ background: sc.color, color: "white", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "1px 7px" }}>{colWorkers.length}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {colWorkers.map((c, i) => (
                  <div key={i} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: 14, cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 9, marginBottom: 8 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        background: `hsl(${(i * 73 + 30) % 360}, 40%, 65%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontWeight: 700, fontSize: 11
                      }}>{c.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.role}</div>
                        {c.license && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, background: "#E8F0F8", color: "#1565C0", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 20 }}>
                            <Car size={8} /> {c.license}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compliance badge */}
                    <div style={{ marginBottom: 8 }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
                        background: c.compliant ? "#E8F5E9" : "#FFF3E0",
                        color: c.compliant ? "#2E7D32" : "#C4841D"
                      }}>
                        <ShieldCheck size={9} /> {c.compliant ? "Fully Cleared" : "Pending Checks"}
                      </span>
                    </div>

                    <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} /> {c.city}</span>
                      {c.client && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {c.status === "Ending Soon" ? <AlertCircle size={10} style={{ color: "var(--clay)" }} /> : <CheckCircle size={10} style={{ color: "var(--sage)" }} />}
                          {c.client}{c.endDate ? ` · Ends ${c.endDate}` : ""}
                        </span>
                      )}
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={10} style={{ color: "var(--amber)" }} /> {c.rating}</span>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      <button style={{ flex: 1, padding: "6px 0", fontSize: 11, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                        <Phone size={10} /> Call
                      </button>
                      <button style={{ flex: 1, padding: "6px 0", fontSize: 11, fontWeight: 600, background: "var(--amber)", border: "none", borderRadius: 6, cursor: "pointer", color: "white" }}>
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
