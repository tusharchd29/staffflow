import AppShell from "../components/AppShell";
import { Plus, MapPin, Users, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const jobs = [
  {
    id: "JO-1042", title: "ICU Registered Nurse", client: "Sunridge Medical Centre",
    province: "ON", city: "Toronto", openings: 3, filled: 0,
    rate: "$50–55/hr", deadline: "Jun 20", status: "Urgent",
    description: "Immediate need for experienced ICU RNs. 12-hr rotating shifts. 3-month contract, renewable.",
    skills: ["ICU", "ACLS", "Critical Care"], posted: "Jun 10"
  },
  {
    id: "JO-1043", title: "CDL Class A Driver (Long Haul)", client: "TransNorth Logistics",
    province: "SK", city: "Saskatoon", openings: 2, filled: 0,
    rate: "$26–30/hr", deadline: "Jun 22", status: "Urgent",
    description: "Long-haul routes across prairies. Clean abstract required. Must have 2+ years experience.",
    skills: ["CDL-A", "HazMat", "Long Haul"], posted: "Jun 11"
  },
  {
    id: "JO-1038", title: "Site Safety Officer", client: "BuildRight Construction Co.",
    province: "AB", city: "Edmonton", openings: 1, filled: 0,
    rate: "$38–45/hr", deadline: "Jun 23", status: "Active",
    description: "Oversee safety compliance on active residential construction site. NCSO certification required.",
    skills: ["NCSO", "WHMIS", "Fall Protection"], posted: "Jun 8"
  },
  {
    id: "JO-1035", title: "Bilingual Customer Service Rep", client: "Northland Insurance",
    province: "QC", city: "Montreal", openings: 4, filled: 2,
    rate: "$22–26/hr", deadline: "Jun 28", status: "Active",
    description: "Handle inbound French/English calls. Insurance knowledge an asset. Full-time permanent role.",
    skills: ["French", "English", "CRM", "Insurance"], posted: "Jun 5"
  },
  {
    id: "JO-1030", title: "Financial Analyst (Contract)", client: "Maple Capital Partners",
    province: "ON", city: "Ottawa", openings: 1, filled: 1,
    rate: "$60–70/hr", deadline: "Jun 15", status: "Filled",
    description: "6-month contract for quarterly reporting support. CPA or CFA preferred.",
    skills: ["Excel", "Power BI", "GAAP"], posted: "May 28"
  },
  {
    id: "JO-1028", title: "LPN – Long Term Care", client: "CareFirst Homes",
    province: "MB", city: "Winnipeg", openings: 2, filled: 2,
    rate: "$38–42/hr", deadline: "Jun 12", status: "Filled",
    description: "Permanent LPN positions in LTC setting. Afternoons and nights available.",
    skills: ["LPN", "LTC", "Medications", "Wound Care"], posted: "May 25"
  },
];

const statusConfig: Record<string, { bg: string; color: string; icon: React.ComponentType<{size?: number}> }> = {
  Urgent: { bg: "#FDECEA", color: "#B5623E", icon: AlertTriangle },
  Active: { bg: "#E8F4FD", color: "#1976D2", icon: Clock },
  Filled: { bg: "#E8F5E9", color: "#388E3C", icon: CheckCircle },
};

export default function JobsPage() {
  const active = jobs.filter(j => j.status !== "Filled").length;
  const totalOpenings = jobs.reduce((a, j) => a + j.openings, 0);
  const totalFilled = jobs.reduce((a, j) => a + j.filled, 0);

  return (
    <AppShell>
      {/* Summary bar */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Active Orders", value: active, color: "var(--amber)" },
          { label: "Total Openings", value: totalOpenings, color: "var(--clay)" },
          { label: "Filled", value: totalFilled, color: "var(--sage)" },
          { label: "Fill Rate", value: `${Math.round((totalFilled / totalOpenings) * 100)}%`, color: "var(--espresso-mid)" },
        ].map(s => (
          <div key={s.label} style={{
            background: "white", border: "1px solid var(--border)",
            borderRadius: 10, padding: "14px 20px", flex: 1
          }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
        <button style={{
          display: "flex", alignItems: "center", gap: 7, alignSelf: "center",
          background: "var(--amber)", color: "white", border: "none",
          borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
          whiteSpace: "nowrap"
        }}>
          <Plus size={15} /> New Order
        </button>
      </div>

      {/* Job cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {jobs.map((job) => {
          const sc = statusConfig[job.status];
          const StatusIcon = sc.icon;
          const fillPct = job.openings > 0 ? (job.filled / job.openings) * 100 : 0;
          return (
            <div key={job.id} style={{
              background: "white", border: "1px solid var(--border)",
              borderRadius: 12, padding: "20px 24px",
              borderLeft: job.status === "Urgent" ? "4px solid var(--clay)" : "4px solid transparent"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }}>{job.id}</span>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      background: sc.bg, color: sc.color,
                      fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20
                    }}>
                      <StatusIcon size={10} /> {job.status}
                    </span>
                    {job.status === "Urgent" && (
                      <span style={{ fontSize: 11, color: "var(--clay)" }}>⚡ Fill by {job.deadline}</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>
                    {job.title}
                  </h3>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{job.client}</div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 600 }}>{job.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {job.skills.map(s => (
                      <span key={s} style={{
                        background: "var(--sand)", color: "var(--text-secondary)",
                        fontSize: 11, padding: "3px 9px", borderRadius: 20, border: "1px solid var(--border)"
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 180 }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} /> {job.city}, {job.province}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <DollarSign size={11} /> {job.rate}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={11} /> Posted {job.posted}
                  </span>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Users size={11} /> Filled
                      </span>
                      <span style={{ fontWeight: 600, color: "var(--espresso)" }}>{job.filled}/{job.openings}</span>
                    </div>
                    <div style={{ background: "var(--sand-dark)", borderRadius: 6, height: 6 }}>
                      <div style={{
                        height: "100%", borderRadius: 6,
                        background: fillPct === 100 ? "var(--sage)" : fillPct > 0 ? "var(--amber)" : "var(--clay)",
                        width: `${fillPct}%`
                      }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button style={{
                      flex: 1, padding: "7px 0", fontSize: 12,
                      background: "var(--sand)", border: "1px solid var(--border)",
                      borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)"
                    }}>View</button>
                    {job.status !== "Filled" && (
                      <button style={{
                        flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600,
                        background: "var(--amber)", border: "none",
                        borderRadius: 7, cursor: "pointer", color: "white"
                      }}>Match Candidates</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
