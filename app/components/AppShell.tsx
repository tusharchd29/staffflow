import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "256px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}
           className="md:ml-64 ml-0">
        <Header />
        <main style={{ flex: 1, padding: "28px 32px", background: "var(--sand)" }}>
          {children}
        </main>
        <footer style={{
          padding: "16px 32px", borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            © 2026 StaffFlow · Built by <span style={{ color: "var(--amber)", fontWeight: 500 }}>Tushar</span>
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Demo Environment · Data is illustrative</span>
        </footer>
      </div>
    </div>
  );
}
