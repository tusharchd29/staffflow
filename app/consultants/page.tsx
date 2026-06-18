export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import { MapPin, Phone, Star, CheckCircle, Clock, AlertCircle, Car, ShieldCheck, ShieldAlert } from "lucide-react";

async function getData() {
  const supabase = getSupabase()

  const [{ data: candidates }, { data: placements }] = await Promise.all([
    supabase.from('candidates').select('*').eq('agency_id', AGENCY_ID),
    supabase.from('placements').select('*, clients(company_name, city)').eq('agency_id', AGENCY_ID).eq('status', 'Active'),
  ])

  return { candidates: candidates || [], placements: placements || [] }
}

const statusConfig: Record<string, { bg: string; color: string; dot: string }> = {
  "On Assignment":   { bg: "#E8F5E9", color: "#388E3C", dot: "#4CAF50" },
  "Available":       { bg: "#FFF3E0", color: "#C4841D", dot: "#FFC107" },
  "Interview Stage": { bg: "#E8F4FD", color: "#1565C0", dot: "#2196F3" },
  "Ending Soon":     { bg: "#FDECEA", color: "#B5623E", dot: "#F44336" },
};

const columns = ["On Assignment", "Available", "Interview Stage", "Ending Soon"];

function getKanbanStatus(candidate: any, placements: any[]): string {
  const placement = placements.find((p: any) => p.candidate_id === candidate.id)
  
  if (placement) {
    if (placement.end_date) {
      const daysLeft = Math.ceil((new Date(placement.end_date).getTime() - Date.now()) / 86400000)
      if (daysLeft <= 14) return "Ending Soon"
    }
    return "On Assignment"
  }
  
  if (candidate.status === 'Interview') return "Interview Stage"
  return "Available"
}

export default async function ConsultantsPage() {
  const { candidates, placements } = await getData()

  const enriched = candidates.map((c: any) => ({
    ...c,
    kanbanStatus: getKanbanStatus(c, placements),
    placement: placements.find((p: any) => p.candidate_id === c.id) || null,
    fullyCleared: c.criminal_check && c.cvos_abstract && c.whmis_cert && c.reference_verified && c.drug_test,
  }))

  // Sort: non-available workers first within each column
  const getColumnWorkers = (col: string) =>
    enriched
      .filter((c: any) => c.kanbanStatus === col)
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))

  return (
    <AppShell>
      {/* Summary pills */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {columns.map(col => {
          const count = enriched.filter((c: any) => c.kanbanStatus === col).length;
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
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 18px", flex: 1, minWidth: 130 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Total Workers</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "var(--espresso)" }}>{candidates.length}</div>
        </div>
      </div>

      {candidates.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>👷</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--espresso)", marginBottom: 8 }}>No workers yet</div>
          <div>Add workers on the Candidate Pipeline page.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {columns.map(col => {
            const colWorkers = getColumnWorkers(col);
            const sc = statusConfig[col];
            return (
              <div key={col}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", borderRadius: 8, background: sc.bg }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: sc.color, flex: 1 }}>{col}</span>
                  <span style={{ background: sc.color, color: "white", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "1px 7px" }}>{colWorkers.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: "70vh", overflowY: "auto", paddingRight: 4 }}>
                  {colWorkers.length === 0 ? (
                    <div style={{ padding: "20px 12px", textAlign: "center", fontSize: 12, color: "var(--text-muted)", background: "white", border: "1px solid var(--border)", borderRadius: 10 }}>
                      No workers in this column
                    </div>
                  ) : colWorkers.map((c: any, i: number) => (
                    <div key={c.id} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: 14 }}>
                      <div style={{ display: "flex", gap: 9, marginBottom: 8 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                          background: `hsl(${(i * 73 + 30) % 360}, 40%, 65%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontWeight: 700, fontSize: 11
                        }}>
                          {c.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.full_name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.role}</div>
                          {c.license_class && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, background: "#E8F0F8", color: "#1565C0", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 20 }}>
                              <Car size={8} /> {c.license_class}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
                          background: c.fullyCleared ? "#E8F5E9" : "#FFF3E0",
                          color: c.fullyCleared ? "#2E7D32" : "#C4841D"
                        }}>
                          {c.fullyCleared ? <ShieldCheck size={9} /> : <ShieldAlert size={9} />}
                          {c.fullyCleared ? "Fully Cleared" : "Pending Checks"}
                        </span>
                      </div>

                      <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 3 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} /> {c.city}</span>
                        {c.placement && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {col === "Ending Soon"
                              ? <AlertCircle size={10} style={{ color: "var(--clay)" }} />
                              : <CheckCircle size={10} style={{ color: "var(--sage)" }} />}
                            {c.placement.clients?.company_name}
                            {c.placement.end_date ? ` · Ends ${new Date(c.placement.end_date).toLocaleDateString('en-CA', {month:'short', day:'numeric'})}` : ""}
                          </span>
                        )}
                        {c.rating > 0 && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={10} style={{ color: "var(--amber)" }} /> {c.rating}</span>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                        <a href={`tel:${c.phone}`} style={{ flex: 1, padding: "6px 0", fontSize: 11, background: "var(--sand)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", gap: 3, textDecoration: "none" }}>
                          <Phone size={10} /> Call
                        </a>
                        <a href={`/candidates`} style={{ flex: 1, padding: "6px 0", fontSize: 11, fontWeight: 600, background: "var(--amber)", border: "none", borderRadius: 6, cursor: "pointer", color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {col === "Available" ? "Match Job" : "View"}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
