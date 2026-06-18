"use client";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const titles: Record<string, { title: string; sub: string }> = {
  "/": { title: "Operations Dashboard", sub: "Overview of all active staffing operations" },
  "/candidates": { title: "Candidate Pipeline", sub: "Track candidates from application to placement" },
  "/jobs": { title: "Job Orders", sub: "Active mandates and client requirements" },
  "/consultants": { title: "Consultant Board", sub: "Availability and deployment status" },
  "/timesheets": { title: "Timesheets", sub: "Hours logged and approval status" },
};

export default function Header() {
  const pathname = usePathname();
  const info = titles[pathname] || titles["/"];

  return (
    <header style={{
      background: "var(--sand)", borderBottom: "1px solid var(--border)",
      padding: "18px 32px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 16
    }}>
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "var(--espresso)" }}>
          {info.title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{info.sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--sand-dark)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "var(--text-muted)"
        }}>
          <Search size={14} />
          <span>Search...</span>
        </div>
        <button style={{
          position: "relative", background: "var(--sand-dark)",
          border: "1px solid var(--border)", borderRadius: 8,
          padding: "8px 10px", cursor: "pointer", color: "var(--text-secondary)"
        }}>
          <Bell size={16} />
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--clay)", border: "1.5px solid var(--sand)"
          }} />
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--amber), var(--clay))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer"
        }}>AM</div>
      </div>
    </header>
  );
}
