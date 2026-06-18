import AppShell from "../components/AppShell";
import { CheckCircle, Clock, XCircle, AlertTriangle, Download, Filter } from "lucide-react";

const timesheets = [
  { consultant: "Priya Sharma", role: "RN – ICU", client: "Sunridge Medical", week: "Jun 9–13", hours: 48, rate: 52, status: "Approved", submitted: "Jun 14", approver: "M. Singh" },
  { consultant: "Aisha Koroma", role: "LPN", client: "CareFirst Homes", week: "Jun 9–13", hours: 40, rate: 42, status: "Approved", submitted: "Jun 14", approver: "T. Williams" },
  { consultant: "Raj Patel", role: "CDL Driver", client: "TransNorth Logistics", week: "Jun 9–13", hours: 55, rate: 28, status: "Pending", submitted: "Jun 15", approver: "—" },
  { consultant: "David Chen", role: "Financial Analyst", client: "Maple Capital", week: "Jun 9–13", hours: 38, rate: 65, status: "Pending", submitted: "Jun 15", approver: "—" },
  { consultant: "Priya Sharma", role: "RN – ICU", client: "Sunridge Medical", week: "Jun 2–6", hours: 48, rate: 52, status: "Approved", submitted: "Jun 7", approver: "M. Singh" },
  { consultant: "James Okafor", role: "Warehouse Lead", client: "LogiPlex Inc.", week: "Jun 9–13", hours: 42, rate: 28, status: "Pending", submitted: "Jun 16", approver: "—" },
  { consultant: "Raj Patel", role: "CDL Driver", client: "TransNorth Logistics", week: "Jun 2–6", hours: 60, rate: 28, status: "Approved", submitted: "Jun 7", approver: "T. Williams" },
  { consultant: "Maria Fonseca", role: "IT Analyst", client: "TechNorth Corp.", week: "Jun 9–13", hours: 40, rate: 38, status: "Rejected", submitted: "Jun 15", approver: "K. Patel", note: "Overtime not pre-approved" },
  { consultant: "Michael Adebayo", role: "Safety Officer", client: "BuildRight Co.", week: "Jun 9–13", hours: 44, rate: 42, status: "Pending", submitted: "Jun 16", approver: "—" },
  { consultant: "Sophie Tremblay", role: "CS Rep", client: "Northland Insurance", week: "Jun 9–13", hours: 40, rate: 24, status: "Approved", submitted: "Jun 14", approver: "J. Bouchard" },
];

const statusConfig: Record<string, { bg: string; color: string; icon: React.ComponentType<{size?: number}> }> = {
  Approved: { bg: "#E8F5E9", color: "#388E3C", icon: CheckCircle },
  Pending:  { bg: "#FFF3E0", color: "#C4841D", icon: Clock },
  Rejected: { bg: "#FDECEA", color: "#B5623E", icon: XCircle },
};

export default function TimesheetsPage() {
  const totalBillable = timesheets
    .filter(t => t.status === "Approved")
    .reduce((a, t) => a + t.hours * t.rate, 0);
  const pending = timesheets.filter(t => t.status === "Pending").length;
  const approved = timesheets.filter(t => t.status === "Approved").length;
  const rejected = timesheets.filter(t => t.status === "Rejected").length;
  const totalHours = timesheets.reduce((a, t) => a + t.hours, 0);

  return (
    <AppShell>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Pending Approval", value: pending, color: "var(--amber)", note: "Action required" },
          { label: "Approved", value: approved, color: "var(--sage)", note: "This week" },
          { label: "Rejected", value: rejected, color: "var(--clay)", note: "Needs resubmission" },
          { label: "Billable Amount", value: `$${(totalBillable / 1000).toFixed(1)}k`, color: "var(--espresso)", note: `${totalHours} total hours` },
        ].map(s => (
          <div key={s.label} style={{
            background: "white", border: "1px solid var(--border)",
            borderRadius: 12, padding: "18px 22px"
          }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Pending", "Approved", "Rejected"].map(f => (
            <button key={f} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: f === "All" ? "var(--espresso)" : "white",
              color: f === "All" ? "white" : "var(--text-secondary)",
              border: f === "All" ? "none" : "1px solid var(--border)"
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "white", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", color: "var(--text-secondary)"
          }}><Filter size={13} /> Filter</button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--sage)", color: "white", border: "none",
            borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}><Download size={13} /> Export CSV</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sand-dark)", borderBottom: "1px solid var(--border)" }}>
              {["Consultant", "Client", "Week", "Hours", "Rate", "Amount", "Submitted", "Status", ""].map(h => (
                <th key={h} style={{
                  textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  padding: "12px 16px"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timesheets.map((t, i) => {
              const sc = statusConfig[t.status];
              const StatusIcon = sc.icon;
              return (
                <tr key={i} style={{
                  borderBottom: "1px solid var(--sand-dark)",
                  background: t.status === "Rejected" ? "#FFFAFA" : "white"
                }}>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{t.consultant}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.role}</div>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--text-secondary)" }}>{t.client}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)" }}>{t.week}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{t.hours}h</span>
                    {t.hours > 48 && <span style={{ marginLeft: 4, fontSize: 10, color: "var(--clay)" }}>OT</span>}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--text-secondary)" }}>${t.rate}/hr</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 600, color: "var(--sage)" }}>
                    ${(t.hours * t.rate).toLocaleString()}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)" }}>{t.submitted}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: sc.bg, color: sc.color,
                      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20
                    }}>
                      <StatusIcon size={11} /> {t.status}
                    </span>
                    {t.note && <div style={{ fontSize: 10, color: "var(--clay)", marginTop: 3 }}>⚠ {t.note}</div>}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    {t.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{
                          padding: "5px 10px", fontSize: 11, fontWeight: 600,
                          background: "var(--sage)", color: "white", border: "none",
                          borderRadius: 6, cursor: "pointer"
                        }}>Approve</button>
                        <button style={{
                          padding: "5px 10px", fontSize: 11, fontWeight: 600,
                          background: "var(--sand)", color: "var(--clay)",
                          border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer"
                        }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Billing summary box */}
      <div style={{
        marginTop: 20, padding: "16px 24px", borderRadius: 10,
        background: "var(--amber-pale)", border: "1px solid #F0D5A0",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "var(--espresso)" }}>
            Approved Billing — Current Period
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            Ready to invoice. {approved} timesheets · {timesheets.filter(t => t.status === "Approved").reduce((a, t) => a + t.hours, 0)} total hours
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "var(--amber)" }}>
            ${totalBillable.toLocaleString()}
          </div>
          <button style={{
            marginTop: 6, padding: "7px 16px", fontSize: 12, fontWeight: 600,
            background: "var(--amber)", color: "white", border: "none",
            borderRadius: 7, cursor: "pointer"
          }}>Generate Invoice</button>
        </div>
      </div>
    </AppShell>
  );
}
