import AppShell from "./components/AppShell";
import { Users, Briefcase, CalendarCheck, Clock, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Active Candidates", value: "148", delta: "+12 this week", icon: Users, color: "#C4841D" },
  { label: "Open Job Orders", value: "34", delta: "8 urgent", icon: Briefcase, color: "#B5623E" },
  { label: "Placed This Month", value: "27", delta: "+18% vs last month", icon: CheckCircle2, color: "#7A8C6E" },
  { label: "Pending Timesheets", value: "19", delta: "Due Friday", icon: Clock, color: "#9A7050" },
];

const recentPlacements = [
  { name: "Priya Sharma", role: "RN – ICU", client: "Sunridge Medical", province: "ON", date: "Jun 16", rate: "$52/hr" },
  { name: "James Okafor", role: "Warehouse Lead", client: "LogiPlex Inc.", province: "BC", date: "Jun 15", rate: "$28/hr" },
  { name: "Maria Fonseca", role: "IT Support Analyst", client: "TechNorth Corp.", province: "AB", date: "Jun 14", rate: "$38/hr" },
  { name: "David Chen", role: "Financial Analyst", client: "Maple Capital", province: "ON", date: "Jun 13", rate: "$65/hr" },
  { name: "Aisha Koroma", role: "LPN", client: "CareFirst Homes", province: "MB", date: "Jun 12", rate: "$44/hr" },
];

const urgentOrders = [
  { title: "ICU Registered Nurse", client: "Sunridge Medical", province: "ON", due: "Jun 20", candidates: 3 },
  { title: "CDL Class A Driver", client: "TransNorth Logistics", province: "SK", due: "Jun 22", candidates: 1 },
  { title: "Site Safety Officer", client: "BuildRight Co.", province: "AB", due: "Jun 23", candidates: 5 },
];

const pipelineStages = [
  { stage: "Applied", count: 48, color: "#DDD4C4" },
  { stage: "Screened", count: 31, color: "#C4A87A" },
  { stage: "Shortlisted", count: 22, color: "#C4841D" },
  { stage: "Interview", count: 14, color: "#B5623E" },
  { stage: "Offered", count: 7, color: "#7A8C6E" },
  { stage: "Placed", count: 27, color: "#4A7A5E" },
];

export default function Dashboard() {
  const maxCount = Math.max(...pipelineStages.map(s => s.count));

  return (
    <AppShell>
      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}
           className="grid-cols-2 sm:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} style={{
            background: "white", border: "1px solid var(--border)",
            borderRadius: 12, padding: "20px 22px", position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 4, height: "100%",
              background: color, borderRadius: "12px 0 0 12px"
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "var(--espresso)", lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>{delta}</div>
              </div>
              <div style={{ background: `${color}18`, borderRadius: 10, padding: 10 }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginBottom: 24 }}>

        {/* Pipeline Funnel */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>
              Candidate Pipeline
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--amber)", fontWeight: 500, cursor: "pointer" }}>
              View All <ArrowUpRight size={12} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pipelineStages.map(({ stage, count, color }) => (
              <div key={stage} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 88, fontSize: 13, color: "var(--text-secondary)", textAlign: "right", flexShrink: 0 }}>{stage}</div>
                <div style={{ flex: 1, background: "var(--sand-dark)", borderRadius: 6, height: 28, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", background: color,
                    width: `${(count / maxCount) * 100}%`,
                    borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 10,
                    transition: "width 0.6s ease"
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: count > 15 ? "white" : "var(--espresso)" }}>{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>
            Total active: <strong style={{ color: "var(--espresso)" }}>149 candidates</strong> across all stages
          </div>
        </div>

        {/* Urgent Orders */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>
              Urgent Orders
            </h2>
            <span style={{ background: "#FDECEA", color: "var(--clay)", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>
              {urgentOrders.length} critical
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {urgentOrders.map((o, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 10,
                background: "var(--sand)", border: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{o.title}</span>
                  <span style={{ fontSize: 11, background: "#FFF3E0", color: "var(--amber)", fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>
                    {o.province}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>{o.client}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertCircle size={11} style={{ color: "var(--clay)" }} /> Due {o.due}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Users size={11} /> {o.candidates} candidates matched
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Placements */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>
            Recent Placements
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--sage)", fontWeight: 500 }}>
            <TrendingUp size={14} /> 27 placements this month
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Candidate", "Role", "Client", "Province", "Date", "Rate"].map(h => (
                <th key={h} style={{
                  textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
                  textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: 10, paddingRight: 16
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentPlacements.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--sand-dark)" }}
                  className="placement-active">
                <td style={{ padding: "12px 16px 12px 0", position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: `hsl(${(i * 57) % 360}, 40%, 70%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontWeight: 700, fontSize: 11, flexShrink: 0
                    }}>
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--espresso)" }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: "var(--text-secondary)", paddingRight: 16, position: "relative", zIndex: 1 }}>{p.role}</td>
                <td style={{ fontSize: 13, color: "var(--text-secondary)", paddingRight: 16, position: "relative", zIndex: 1 }}>{p.client}</td>
                <td style={{ paddingRight: 16, position: "relative", zIndex: 1 }}>
                  <span style={{ background: "var(--amber-pale)", color: "var(--amber)", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
                    {p.province}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 16, position: "relative", zIndex: 1 }}>{p.date}</td>
                <td style={{ fontSize: 13, fontWeight: 600, color: "var(--sage)", position: "relative", zIndex: 1 }}>{p.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
