"use client";
import { Bell, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const titles: Record<string, { title: string; sub: string }> = {
  "/": { title: "Operations Dashboard", sub: "Overview of all active staffing operations" },
  "/candidates": { title: "Candidate Pipeline", sub: "Track workers from application to placement" },
  "/jobs": { title: "Job Orders", sub: "Active mandates — drivers, general labour, industrial" },
  "/consultants": { title: "Worker Board", sub: "Availability and deployment status" },
  "/timesheets": { title: "Timesheets", sub: "Hours logged, OT tracking, and billing" },
  "/intake": { title: "Client Intake", sub: "New client consultation and active account management" },
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Candidates", href: "/candidates" },
  { label: "Jobs", href: "/jobs" },
  { label: "Workers", href: "/consultants" },
  { label: "Timesheets", href: "/timesheets" },
  { label: "Clients", href: "/intake" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const info = titles[pathname] || titles["/"];
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchVal.trim()) {
      // Route to candidates with search param
      router.push(`/candidates?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
    if (e.key === "Escape") { setSearchOpen(false); setSearchVal(""); }
  };

  const notifications = [
    { msg: "3 timesheets pending approval", href: "/timesheets", time: "2 min ago", urgent: true },
    { msg: "AZ Highway Driver — fill by tomorrow", href: "/jobs", time: "1 hr ago", urgent: true },
    { msg: "Marcus Johnson compliance cleared", href: "/candidates", time: "3 hrs ago", urgent: false },
    { msg: "New client: Nexus Auto Parts added", href: "/intake", time: "Yesterday", urgent: false },
  ];

  return (
    <header style={{
      background: "var(--sand)", borderBottom: "1px solid var(--border)",
      padding: "18px 32px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 16, position: "relative"
    }}>
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "var(--espresso)" }}>
          {info.title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{info.sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Search */}
        {searchOpen ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: "1px solid var(--amber)", borderRadius: 8, padding: "7px 14px" }}>
            <Search size={14} style={{ color: "var(--amber)" }} />
            <input
              autoFocus
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search workers... (Enter)"
              style={{ border: "none", outline: "none", fontSize: 13, color: "var(--espresso)", width: 200, background: "transparent" }}
            />
            <button onClick={() => { setSearchOpen(false); setSearchVal(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <button onClick={() => setSearchOpen(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--sand-dark)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "var(--text-muted)", cursor: "pointer"
          }}>
            <Search size={14} />
            <span>Search workers...</span>
          </button>
        )}

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowNotifs(v => !v)} style={{
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
          {showNotifs && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)", width: 300,
              background: "white", border: "1px solid var(--border)", borderRadius: 10,
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden"
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 600, color: "var(--espresso)" }}>
                Notifications
              </div>
              {notifications.map((n, i) => (
                <a key={i} href={n.href} onClick={() => setShowNotifs(false)} style={{
                  display: "block", padding: "10px 16px", borderBottom: i < notifications.length - 1 ? "1px solid var(--sand-dark)" : "none",
                  textDecoration: "none",
                  background: n.urgent ? "#FFFBF5" : "white",
                }}>
                  <div style={{ fontSize: 13, color: "var(--espresso)", marginBottom: 2 }}>
                    {n.urgent && <span style={{ color: "var(--clay)", marginRight: 5 }}>●</span>}
                    {n.msg}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{n.time}</div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--amber), var(--clay))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer",
          flexShrink: 0
        }}>AM</div>
      </div>

      {/* Click-outside for notifs */}
      {showNotifs && (
        <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setShowNotifs(false)} />
      )}
    </header>
  );
}
