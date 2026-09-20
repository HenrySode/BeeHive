import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard/DashboardApp";

/**
 * Staff dashboard entry point. Not linked from the public site by design:
 * staff reach it by typing the URL directly, matching how a real
 * authenticated area would work once login is real. See prd.md sections
 * 3.2, 6.3-6.8, and CLAUDE.md for the rules this UI mock follows.
 */
export const metadata: Metadata = {
  title: "Staff Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardApp />;
}
