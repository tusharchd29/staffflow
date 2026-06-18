import AppShell from "./components/AppShell";
import { Users, Briefcase, CalendarCheck, Clock, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Active Candidates", value: "94", delta: "+9 this week", icon: Users, color: "#C4841D" },
  { label: "Open Job Orders", value: "21", delta: "6 urgent", icon: Briefcase, color: "#B5623E" },
  { label: "Placed This Month", value: "38", delta: "+22% vs last month", icon: CheckCircle2, color: "#7A8C6E" },
  { label: "Compliance Ready", value: "71%", delta: "67 of 94 cleared", icon: ShieldCheck, color: "#5A7A9A" },
];

const recentPlacements = [
  { name: "Gurpreet Singh", role: "AZ Driver – Highway", client: "TruckPro Logistics", city: "Brampton, ON", date: "Jun 16", rate: "$28/hr" },
  { name: "Marcus Johnson", role: "General Labour", client: "BuildCore Inc.", city: "Scarborough, ON", date: "Jun 15", rate: "$20/hr" },
  { name: "Ahmed Hassan", role: "Forklift Operator", client: "Maple Warehousing", city: "Mississauga, ON", date: "Jun 14", rate: "$24/hr" },
  { name: "Parminder Kaur", role: "DZ Driver – City Delivery", client: "FastFreight GTA", city: "Etobicoke, ON", date: "Jun 13", rate: "$26/hr" },
  { name: "Carlos Mendez", role: "Assembly Line Operator", client: "SteelTech Mfg.", city: "Oshawa, ON", date: "Jun 12", rate: "$22/hr" },
];

const urgentOrders = [
  { title: "AZ Highway Driver", client: "TruckPro Logistics", city: "Brampton", due: "Jun 20", candidates: 4 },
  { title: "General Labour x5", client: "BuildCore Inc.", city: "Scarborough", due: "Jun 21", candidates: 11 },
  { title: "Forklift Operator (CVOS required)", client: "Maple Warehousing", city: "Mississauga", due: "Jun 22", candidates: 2 },
];

const pipelineStages = [
  { stage: "Applied", count: 28, color: "#DDD4C4" },
  { stage: "Screened", count: 21, color: "#C4A87A" },
  { stage: "Background Check", count: 17, color: "#E8A83A" },
  { stage: "Shortlisted", count: 14, color: "#C4841D" },
  { stage: "Interview", count: 9, color: "#B5623E" },
  { stage: "Placed", count: 5, color: "#4A7A5E" },
];

const complianceBreakdown = [
  { label: "Criminal Check", done: 81, total: 94 },
  { label: "CVOS Abstract", done: 58, total: 94 },
  { label: "WHMIS Certified", done: 74, total: 94 },
  { label: "References Verified", done: 67, total: 94 },
];

export default function Dashboard() {
  const maxCount = Math.max(...pipelineStages.map(s => s.count));

  return (
    <AppShell>
      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} style={{
            background: "white", border: "1px solid var(--border)",
            borderRadius: 12, padding: "20px 22px", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: color, borderRadius: "12px 0 0 12px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "var(--espresso)", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>{delta}</div>
              </div>
              <div style={{ background: `${color}18`, borderRadius: 10, padding: 10 }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* Pipeline */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Candidate Pipeline</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--amber)", fontWeight: 500, cursor: "pointer" }}>
              View All <ArrowUpRight size={12} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pipelineStages.map(({ stage, count, color }) => (
              <div key={stage} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 110, fontSize: 12, color: "var(--text-secondary)", textAlign: "right", flexShrink: 0 }}>{stage}</div>
                <div style={{ flex: 1, background: "var(--sand-dark)", borderRadius: 6, height: 26, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", background: color,
                    width: `${(count / maxCount) * 100}%`,
                    borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 10,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: count > 15 ? "white" : "var(--espresso)" }}>{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Readiness */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Compliance Readiness</h2>
            <span style={{ background: "#E8F0F8", color: "#5A7A9A", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>
              <ShieldCheck size={10} style={{ display: "inline", marginRight: 4 }} />71% cleared
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {complianceBreakdown.map(({ label, done, total }) => {
              const pct = Math.round((done / total) * 100);
              return (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: "var(--espresso)" }}>{done}/{total} <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: 11 }}>({pct}%)</span></span>
                  </div>
                  <div style={{ background: "var(--sand-dark)", borderRadius: 6, height: 8 }}>
                    <div style={{
                      height: "100%", borderRadius: 6,
                      background: pct >= 80 ? "#4A7A5E" : pct >= 60 ? "var(--amber)" : "var(--clay)",
                      width: `${pct}%`
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", background: "#FFF8E8", borderRadius: 8, fontSize: 12, color: "var(--amber-dark, #9A6010)" }}>
            ⚠ 27 candidates pending CVOS abstract — required for all driver placements
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

        {/* Recent Placements */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Recent Placements</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--sage)", fontWeight: 500 }}>
              <TrendingUp size={14} /> 38 this month
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Worker", "Role", "Client", "Location", "Date", "Rate"].map(h => (
                  <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: 10, paddingRight: 14 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPlacements.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--sand-dark)" }}>
                  <td style={{ padding: "11px 14px 11px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: `hsl(${(i * 57) % 360}, 40%, 70%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 10, flexShrink: 0 }}>
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--espresso)" }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text-secondary)", paddingRight: 14 }}>{p.role}</td>
                  <td style={{ fontSize: 12, color: "var(--text-secondary)", paddingRight: 14 }}>{p.client}</td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 14 }}>{p.city}</td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)", paddingRight: 14 }}>{p.date}</td>
                  <td style={{ fontSize: 13, fontWeight: 600, color: "var(--sage)" }}>{p.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Urgent Orders */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)" }}>Urgent Orders</h2>
            <span style={{ background: "#FDECEA", color: "var(--clay)", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{urgentOrders.length} critical</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {urgentOrders.map((o, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 10, background: "var(--sand)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>{o.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>{o.client} · {o.city}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertCircle size={11} style={{ color: "var(--clay)" }} /> Due {o.due}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Users size={11} /> {o.candidates} matched
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
