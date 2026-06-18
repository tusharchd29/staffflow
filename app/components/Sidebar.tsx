"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Briefcase, CalendarCheck, Clock,
  ChevronRight, Settings, LogOut, Menu, X, ClipboardList
} from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Candidate Pipeline", icon: Users, href: "/candidates" },
  { label: "Job Orders", icon: Briefcase, href: "/jobs" },
  { label: "Consultant Board", icon: CalendarCheck, href: "/consultants" },
  { label: "Timesheets", icon: Clock, href: "/timesheets" },
  { label: "Client Intake", icon: ClipboardList, href: "/intake" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "var(--espresso)", color: "var(--sand)" }}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        style={{ background: "var(--espresso)", borderRight: "1px solid var(--espresso-mid)" }}
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col z-40 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div style={{ background: "var(--amber)", borderRadius: 8 }} className="w-8 h-8 flex items-center justify-center">
              <span style={{ color: "var(--espresso)", fontFamily: "serif", fontWeight: 700, fontSize: 16 }}>S</span>
            </div>
            <div>
              <div style={{ color: "var(--sand)", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600 }}>
                StaffFlow
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>Staffing Operations</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}
               className="px-3 mb-3">Main Menu</div>
          {nav.map(({ label, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8, marginBottom: 2,
                  background: active ? "rgba(196,132,29,0.18)" : "transparent",
                  color: active ? "var(--amber-light)" : "rgba(255,255,255,0.6)",
                  textDecoration: "none", fontSize: 14, fontWeight: active ? 500 : 400,
                  transition: "all 0.15s",
                  borderLeft: active ? "3px solid var(--amber)" : "3px solid transparent",
                }}
              >
                <Icon size={16} />
                {label}
                {active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 12px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
            borderRadius: 8, marginBottom: 4,
            color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer"
          }}>
            <Settings size={15} /> Settings
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
            borderRadius: 8, color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer"
          }}>
            <LogOut size={15} /> Sign Out
          </div>
          <div style={{
            marginTop: 12, padding: "8px 10px",
            background: "rgba(255,255,255,0.04)", borderRadius: 8,
            display: "flex", alignItems: "center", gap: 10
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--amber), var(--clay))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0
            }}>AM</div>
            <div>
              <div style={{ color: "var(--sand)", fontSize: 13, fontWeight: 500 }}>Alex Morgan</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Operations Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
