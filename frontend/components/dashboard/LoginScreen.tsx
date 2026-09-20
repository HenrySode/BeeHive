"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/site-content";
import type { Role } from "@/lib/dashboard";

// No account system yet, so a real login always signs in as the same
// starting role. The role switcher at the bottom of the dashboard sidebar
// (see RoleSwitcher.tsx) is where each role's view is previewed.
const DEFAULT_ROLE: Role = "OWNER_ADMIN";

/**
 * Staff login screen (prd.md FR-A1). No real authentication yet: any
 * email and password is accepted (see api-spec.md, POST /auth/login, for
 * what the real endpoint will do).
 */
export function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter an email and password to continue.");
      return;
    }
    onLogin(DEFAULT_ROLE);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-soft px-4 py-16">
      <div className="w-full max-w-md rounded-md border border-hairline bg-canvas p-8 shadow-soft">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12" />
          <div>
            <p className="text-[14px] font-medium uppercase tracking-wide text-muted">
              {business.shortName} Staff
            </p>
            <h1 className="text-[22px] font-semibold text-ink">Sign in to the dashboard</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="you@beehive-hvac.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
          />

          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-[14px] text-muted">
          Preview only. Real sign-in and access control will be added once the backend exists.
        </p>
      </div>
    </div>
  );
}
