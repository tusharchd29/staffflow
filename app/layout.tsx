import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StaffFlow — Staffing Operations Platform",
  description: "End-to-end staffing agency management: candidates, placements, job orders, timesheets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
