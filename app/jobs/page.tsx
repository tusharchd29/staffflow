import AppShell from "../components/AppShell";
import { Plus, MapPin, Users, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Car, ShieldCheck } from "lucide-react";

const jobs = [
  {
    id: "JO-2041", title: "AZ Highway Driver", client: "TruckPro Logistics",
    city: "Brampton, ON", openings: 3, filled: 0,
    rate: "$27–30/hr", deadline: "Jun 20", status: "Urgent", type: "Transport",
    description: "City and highway runs across GTA. Clean CVOS abstract required. TDG certification an asset. Immediate start.",
    requirements: ["Class AZ", "CVOS Clean", "2+ yrs exp", "TDG Asset"],
    posted: "Jun 10"
  },
  {
    id: "JO-2042", title: "General Labour x5", client: "BuildCore Inc.",
    city: "Scarborough, ON", openings: 5, filled: 1,
    rate: "$18–21/hr", deadline: "Jun 21", status: "Urgent", type: "General Labour",
    description: "Assist with site prep, material handling, cleanup. Steel-toed boots required. No experience needed, will train.",
    requirements: ["Steel-toed boots", "Physical fitness", "Background check"],
    posted: "Jun 11"
  },
  {
    id: "JO-2039", title: "Forklift Operator", client: "Maple Warehousing",
    city: "Mississauga, ON", openings: 2, filled: 0,
    rate: "$22–25/hr", deadline: "Jun 22", status: "Active", type: "Industrial",
    description: "Counterbalance and reach truck operations. CVOS required for yard movement. Afternoon shift available.",
    requirements: ["Forklift Cert.", "CVOS", "Warehouse exp."],
    posted: "Jun 8"
  },
  {
    id: "JO-2037", title: "DZ City Delivery Driver", client: "FastFreight GTA",
    city: "Etobicoke, ON", openings: 2, filled: 1,
    rate: "$24–27/hr", deadline: "Jun 25", status: "Active", type: "Transport",
    description: "Last-mile delivery across GTA. Clean CVOS, good customer service. Route familiarity preferred.",
    requirements: ["Class DZ", "CVOS Clean", "Customer service"],
    posted: "Jun 7"
  },
  {
    id: "JO-2033", title: "Assembly Line Operator", client: "SteelTech Mfg.",
    city: "Oshawa, ON", openings: 4, filled: 4,
    rate: "$20–22/hr", deadline: "Jun 18", status: "Filled", type: "Industrial",
    description: "Automotive parts assembly. Rotating shifts. WHMIS required. Previous manufacturing experience preferred.",
    requirements: ["WHMIS", "Mfg. exp.", "Steel-toed boots"],
    posted: "May 30"
  },
  {
    id: "JO-2030", title: "Sanitation / Janitorial", client: "CleanServ Facilities",
    city: "Toronto, ON", openings: 3, filled: 3,
    rate: "$17–19/hr", deadline: "Jun 14", status: "Filled", type: "General Labour",
    description: "Commercial cleaning for office towers. Evening shift. WHMIS Workplace Hazardous Materials training required.",
    requirements: ["WHMIS", "Background check", "Evening availability"],
    posted: "May 27"
  },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Transport":     { bg: "#E8F0F8", color: "#1565C0" },
  "General Labour":{ bg: "#F5F0E8", color: "#7A5C3C" },
  "Industrial":    { bg: "#E8F5E9", color: "#2E7D32" },
  "Professional":  { bg: "#F3E5F5", color: "#6A1B9A" },
};

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
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Active Orders", value: active, color: "var(--amber)" },
          { label: "Total Openings", value: totalOpenings, color: "var(--clay)" },
          { label: "Positions Filled", value: totalFilled, color: "var(--sage)" },
          { label: "Fill Rate", value: `${Math.round((totalFilled / totalOpenings) * 100)}%`, color: "var(--espresso-mid)" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px", flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
        <button style={{
          display: "flex", alignItems: "center", gap: 7, alignSelf: "center",
          background: "var(--amber)", color: "white", border: "none",
          borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap"
        }}><Plus size={15} /> New Order</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {jobs.map((job) => {
          const sc = statusConfig[job.status];
          const StatusIcon = sc.icon;
          const tc = typeColors[job.type] || typeColors["General Labour"];
          const fillPct = job.openings > 0 ? (job.filled / job.openings) * 100 : 0;
          const needsCVOS = job.requirements.some(r => r.toLowerCase().includes("cvos"));
          const needsWHMIS = job.requirements.some(r => r.toLowerCase().includes("whmis"));

          return (
            <div key={job.id} style={{
              background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px",
              borderLeft: job.status === "Urgent" ? "4px solid var(--clay)" : "4px solid transparent"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }}>{job.id}</span>
                    <span style={{ ...tc, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20 }}>{job.type}</span>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20
                    }}><StatusIcon size={10} /> {job.status}</span>
                    {job.status === "Urgent" && <span style={{ fontSize: 11, color: "var(--clay)" }}>⚡ Fill by {job.deadline}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>{job.title}</h3>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{job.client}</div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 560 }}>{job.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {job.requirements.map(r => {
                      const isCompliance = r.includes("CVOS") || r.includes("WHMIS") || r.includes("Background") || r.includes("Class A");
                      return (
                        <span key={r} style={{
                          background: isCompliance ? "#FFF3E0" : "var(--sand)",
                          color: isCompliance ? "var(--amber)" : "var(--text-secondary)",
                          fontSize: 11, padding: "3px 9px", borderRadius: 20,
                          border: isCompliance ? "1px solid #F0C060" : "1px solid var(--border)",
                          display: "inline-flex", alignItems: "center", gap: 3
                        }}>
                          {isCompliance && <ShieldCheck size={9} />}{r}
                        </span>
                      );
                    })}
                  </div>

                  {(needsCVOS || needsWHMIS) && (
                    <div style={{ marginTop: 10, fontSize: 11, color: "#5A7A9A", display: "flex", gap: 10 }}>
                      {needsCVOS && <span>🔵 CVOS abstract required — check candidate compliance before matching</span>}
                      {needsWHMIS && <span>🟡 WHMIS certification required</span>}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 175 }}>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={11} /> {job.city}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <DollarSign size={11} /> {job.rate}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={11} /> Posted {job.posted}
                  </span>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> Filled</span>
                      <span style={{ fontWeight: 600, color: "var(--espresso)" }}>{job.filled}/{job.openings}</span>
                    </div>
                    <div style={{ background: "var(--sand-dark)", borderRadius: 6, height: 6 }}>
                      <div style={{ height: "100%", borderRadius: 6, background: fillPct === 100 ? "var(--sage)" : fillPct > 0 ? "var(--amber)" : "var(--clay)", width: `${fillPct}%` }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
                    <button style={{ flex: 1, padding: "7px 0", fontSize: 12, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 7, cursor: "pointer", color: "var(--text-secondary)" }}>View</button>
                    {job.status !== "Filled" && (
                      <button style={{ flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600, background: "var(--amber)", border: "none", borderRadius: 7, cursor: "pointer", color: "white" }}>Match Workers</button>
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
