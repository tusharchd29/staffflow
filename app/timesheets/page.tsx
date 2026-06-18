import AppShell from "../components/AppShell";
import { CheckCircle, Clock, XCircle, Download, Filter, AlertTriangle } from "lucide-react";

const timesheets = [
  { worker: "Gurpreet Singh", role: "AZ Driver", client: "TruckPro Logistics", week: "Jun 9–13", regularHrs: 44, otHrs: 4, rate: 28, status: "Approved", submitted: "Jun 14", approver: "R. Sharma" },
  { worker: "Parminder Kaur", role: "DZ Driver", client: "FastFreight GTA", week: "Jun 9–13", regularHrs: 44, otHrs: 0, rate: 26, status: "Approved", submitted: "Jun 14", approver: "L. Chow" },
  { worker: "Marcus Johnson", role: "General Labour", client: "BuildCore Inc.", week: "Jun 9–13", regularHrs: 44, otHrs: 6, rate: 20, status: "Pending", submitted: "Jun 15", approver: "—" },
  { worker: "Ahmed Hassan", role: "Forklift Operator", client: "Maple Warehousing", week: "Jun 9–13", regularHrs: 40, otHrs: 0, rate: 24, status: "Pending", submitted: "Jun 15", approver: "—" },
  { worker: "Carlos Mendez", role: "Industrial Worker", client: "SteelTech Mfg.", week: "Jun 9–13", regularHrs: 44, otHrs: 8, rate: 22, status: "Pending", submitted: "Jun 16", approver: "—" },
  { worker: "Taiwo Adeyemi", role: "Warehouse Associate", client: "Maple Warehousing", week: "Jun 9–13", regularHrs: 44, otHrs: 0, rate: 21, status: "Approved", submitted: "Jun 14", approver: "L. Chow" },
  { worker: "Gurpreet Singh", role: "AZ Driver", client: "TruckPro Logistics", week: "Jun 2–6", regularHrs: 44, otHrs: 6, rate: 28, status: "Approved", submitted: "Jun 7", approver: "R. Sharma" },
  { worker: "Harjit Brar", role: "DZ Driver", client: "FastFreight GTA", week: "Jun 9–13", regularHrs: 44, otHrs: 10, rate: 26, status: "Rejected", submitted: "Jun 15", approver: "L. Chow", note: "OT over 60hrs not pre-approved" },
];

// Ontario ESA: OT threshold = 44 hrs/week at 1.5x
const calcAmount = (reg: number, ot: number, rate: number) => (reg * rate) + (ot * rate * 1.5);
const HST_RATE = 0.13;

const statusConfig: Record<string, { bg: string; color: string; icon: React.ComponentType<{size?: number}> }> = {
  Approved: { bg: "#E8F5E9", color: "#388E3C", icon: CheckCircle },
  Pending:  { bg: "#FFF3E0", color: "#C4841D", icon: Clock },
  Rejected: { bg: "#FDECEA", color: "#B5623E", icon: XCircle },
};

export default function TimesheetsPage() {
  const approved = timesheets.filter(t => t.status === "Approved");
  const pending = timesheets.filter(t => t.status === "Pending").length;
  const approvedCount = approved.length;
  const totalBillable = approved.reduce((a, t) => a + calcAmount(t.regularHrs, t.otHrs, t.rate), 0);
  const totalHST = totalBillable * HST_RATE;

  return (
    <AppShell>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Pending Approval", value: pending, color: "var(--amber)", note: "Action required" },
          { label: "Approved", value: approvedCount, color: "var(--sage)", note: "This week" },
          { label: "Rejected", value: timesheets.filter(t => t.status === "Rejected").length, color: "var(--clay)", note: "Needs resubmission" },
          { label: "Billable (excl. HST)", value: `$${(totalBillable / 1000).toFixed(1)}k`, color: "var(--espresso)", note: `+$${(totalHST / 1000).toFixed(1)}k HST` },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* ESA notice */}
      <div style={{
        marginBottom: 16, padding: "10px 16px", borderRadius: 8,
        background: "#E8F0F8", border: "1px solid #B0C4DE",
        fontSize: 12, color: "#1565C0", display: "flex", alignItems: "center", gap: 8
      }}>
        <AlertTriangle size={13} />
        <span><strong>Ontario ESA:</strong> Overtime rate applies after 44 hrs/week (1.5× regular rate). All OT hours in this table are calculated accordingly.</span>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Pending", "Approved", "Rejected"].map((f, i) => (
            <button key={f} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: i === 0 ? "var(--espresso)" : "white",
              color: i === 0 ? "white" : "var(--text-secondary)",
              border: i === 0 ? "none" : "1px solid var(--border)"
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer", color: "var(--text-secondary)" }}>
            <Filter size={13} /> Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--sage)", color: "white", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sand-dark)", borderBottom: "1px solid var(--border)" }}>
              {["Worker", "Client", "Week", "Reg. Hrs", "OT Hrs (1.5×)", "Rate", "Amount", "Submitted", "Status", ""].map(h => (
                <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 14px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timesheets.map((t, i) => {
              const sc = statusConfig[t.status];
              const StatusIcon = sc.icon;
              const amount = calcAmount(t.regularHrs, t.otHrs, t.rate);
              return (
                <tr key={i} style={{ borderBottom: "1px solid var(--sand-dark)", background: t.status === "Rejected" ? "#FFFAFA" : "white" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>{t.worker}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.role}</div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "var(--text-secondary)" }}>{t.client}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "var(--text-muted)" }}>{t.week}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500, color: "var(--espresso)" }}>{t.regularHrs}h</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 13, fontWeight: t.otHrs > 0 ? 700 : 400, color: t.otHrs > 0 ? "var(--clay)" : "var(--text-muted)" }}>
                      {t.otHrs > 0 ? `+${t.otHrs}h` : "—"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "var(--text-secondary)" }}>${t.rate}/hr</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: "var(--sage)" }}>${amount.toLocaleString()}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "var(--text-muted)" }}>{t.submitted}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
                      <StatusIcon size={11} /> {t.status}
                    </span>
                    {t.note && <div style={{ fontSize: 10, color: "var(--clay)", marginTop: 3 }}>⚠ {t.note}</div>}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {t.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ padding: "5px 10px", fontSize: 11, fontWeight: 600, background: "var(--sage)", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Approve</button>
                        <button style={{ padding: "5px 10px", fontSize: 11, background: "var(--sand)", color: "var(--clay)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer" }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Billing box */}
      <div style={{ marginTop: 20, padding: "18px 24px", borderRadius: 10, background: "var(--amber-pale)", border: "1px solid #F0D5A0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "var(--espresso)" }}>Ready to Invoice — Current Period</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {approvedCount} timesheets approved · {approved.reduce((a, t) => a + t.regularHrs + t.otHrs, 0)} total hours worked
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Subtotal: <strong>${totalBillable.toLocaleString()}</strong></div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>HST (13%): <strong>${totalHST.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--amber)" }}>
            ${(totalBillable + totalHST).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <button style={{ marginTop: 6, padding: "7px 16px", fontSize: 12, fontWeight: 600, background: "var(--amber)", color: "white", border: "none", borderRadius: 7, cursor: "pointer" }}>
            Generate Invoice
          </button>
        </div>
      </div>
    </AppShell>
  );
}
