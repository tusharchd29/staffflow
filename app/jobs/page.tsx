import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import AddJobButton from "../components/AddJobButton";
import { MapPin, Users, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Car, ShieldCheck, Plus } from "lucide-react";

async function getJobs() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('jobs')
    .select('*, clients(company_name)')
    .eq('agency_id', AGENCY_ID)
    .order('posted_at', { ascending: false })
  return data || []
}

const typeColors: Record<string, { bg: string; color: string }> = {
  "Transport":      { bg: "#E8F0F8", color: "#1565C0" },
  "General Labour": { bg: "#F5F0E8", color: "#7A5C3C" },
  "Industrial":     { bg: "#E8F5E9", color: "#2E7D32" },
  "Professional":   { bg: "#F3E5F5", color: "#6A1B9A" },
};

const statusConfig: Record<string, { bg: string; color: string; icon: any }> = {
  Urgent: { bg: "#FDECEA", color: "#B5623E", icon: AlertTriangle },
  Active: { bg: "#E8F4FD", color: "#1976D2", icon: Clock },
  Filled: { bg: "#E8F5E9", color: "#388E3C", icon: CheckCircle },
};

export default async function JobsPage() {
  const jobs = await getJobs()

  const active = jobs.filter((j: any) => j.status !== "Filled").length;
  const totalOpenings = jobs.reduce((a: number, j: any) => a + (j.openings || 0), 0);
  const totalFilled = jobs.reduce((a: number, j: any) => a + (j.filled || 0), 0);
  const fillRate = totalOpenings > 0 ? Math.round((totalFilled / totalOpenings) * 100) : 0;
  const urgentCount = jobs.filter((j: any) => j.status === 'Urgent').length;

  return (
    <AppShell>
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
        {[
          { label: "Active Orders", value: active, color: "var(--amber)" },
          { label: "Total Openings", value: totalOpenings, color: "var(--clay)" },
          { label: "Positions Filled", value: totalFilled, color: "var(--sage)" },
          { label: "Fill Rate", value: `${fillRate}%`, color: "var(--espresso-mid)" },
          { label: "Urgent", value: urgentCount, color: "#B5623E" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px", flex: 1, minWidth: 100 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
        <AddJobButton />
      </div>

      {jobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--espresso)", marginBottom: 8 }}>No job orders yet</div>
          <div>Click "New Order" to add your first job order.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {jobs.map((job: any) => {
            const sc = statusConfig[job.status] || statusConfig["Active"];
            const StatusIcon = sc.icon;
            const tc = typeColors[job.job_type] || typeColors["General Labour"];
            const fillPct = job.openings > 0 ? (job.filled / job.openings) * 100 : 0;
            const reqs: string[] = job.requirements || [];
            const needsCVOS = reqs.some((r: string) => r.toLowerCase().includes("cvos"));
            const needsWHMIS = reqs.some((r: string) => r.toLowerCase().includes("whmis"));
            const rateStr = job.rate_min && job.rate_max ? `$${job.rate_min}–${job.rate_max}/hr` : job.rate_min ? `$${job.rate_min}/hr` : "Rate TBD";

            return (
              <div key={job.id} style={{
                background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px",
                borderLeft: job.status === "Urgent" ? "4px solid var(--clay)" : "4px solid transparent"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }}>
                        {String(job.id).slice(0, 8).toUpperCase()}
                      </span>
                      <span style={{ ...tc, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20 }}>{job.job_type}</span>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20
                      }}><StatusIcon size={10} /> {job.status}</span>
                      {job.status === "Urgent" && <span style={{ fontSize: 11, color: "var(--clay)" }}>⚡ Fill by {job.deadline}</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--espresso)", marginBottom: 4 }}>{job.title}</h3>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{job.clients?.company_name}</div>
                    {job.description && (
                      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 560 }}>{job.description}</p>
                    )}

                    {reqs.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {reqs.map((r: string) => {
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
                    )}

                    {(needsCVOS || needsWHMIS) && (
                      <div style={{ marginTop: 10, fontSize: 11, color: "#5A7A9A", display: "flex", gap: 10 }}>
                        {needsCVOS && <span>🔵 CVOS abstract required</span>}
                        {needsWHMIS && <span>🟡 WHMIS certification required</span>}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 175 }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} /> {job.city}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <DollarSign size={11} /> {rateStr}
                    </span>
                    {job.posted_at && (
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={11} /> Posted {new Date(job.posted_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
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
                        <a href={`/candidates?role=${encodeURIComponent(job.job_type)}`} style={{ flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600, background: "var(--amber)", border: "none", borderRadius: 7, cursor: "pointer", color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>Match Workers</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
