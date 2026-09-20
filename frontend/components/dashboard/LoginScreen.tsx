"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/site-content";
import { roles, type Role } from "@/lib/dashboard";

/**
 * Staff login screen (prd.md FR-A1). No real authentication yet: any
 * email and password is accepted, and the role picker exists only so the
 * dashboard can be previewed for each role until real accounts and RBAC
 * are built on the backend (see api-spec.md, POST /auth/login).
 */
export function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("OWNER_ADMIN");
  const [error, setError] = useState<string | undefined>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter an email and password to continue.");
      return;
    }
    onLogin(role);
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
          />
          <Select
            label="Sign in as (preview)"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
            hint="No account system yet. Choose a role to preview its view of the dashboard."
          >
            {roles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>

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
