"use client";

import { useState } from "react";
import { LoginScreen } from "@/components/dashboard/LoginScreen";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { Role } from "@/lib/dashboard";

export function DashboardApp() {
  const [session, setSession] = useState<{ role: Role } | null>(null);

  if (!session) {
    return <LoginScreen onLogin={(role) => setSession({ role })} />;
  }

  return <DashboardShell initialRole={session.role} onLogout={() => setSession(null)} />;
}
