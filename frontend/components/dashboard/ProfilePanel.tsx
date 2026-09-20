"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { PanelHeader } from "@/components/dashboard/Panels";
import { sampleUserForRole, roleLabel, type Role, type StaffAccount } from "@/lib/dashboard";

type Draft = StaffAccount & { newPassword: string; confirmPassword: string };

function toDraft(account: StaffAccount): Draft {
  return { ...account, newPassword: "", confirmPassword: "" };
}

/**
 * Opened from the account menu's "Profile" item (see TopBar.tsx). `saved`
 * is what view mode shows; `draft` is the in-progress edit and is only
 * read while editing. Saving copies draft's account fields back into
 * saved, in local state only, there is no backend yet to persist this to
 * (see api-spec.md). The new password is deliberately never kept once
 * Save runs: there is nowhere real to send it yet, so holding onto it
 * would be worse than doing nothing with it.
 */
export function ProfilePanel({ role }: { role: Role }) {
  const account = sampleUserForRole(role);
  const [saved, setSaved] = useState<StaffAccount>(account);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Draft>(toDraft(account));
  const [error, setError] = useState<string | undefined>();

  const display = editing ? draft : saved;
  const initial = (display.name || "?").charAt(0);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleEdit() {
    setDraft(toDraft(saved));
    setError(undefined);
    setEditing(true);
  }

  function handleCancel() {
    setError(undefined);
    setEditing(false);
  }

  function handleSave() {
    if (draft.newPassword && draft.newPassword !== draft.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    setSaved({
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      address: draft.address,
      nextOfKinName: draft.nextOfKinName,
      nextOfKinPhone: draft.nextOfKinPhone,
    });
    setError(undefined);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Profile"
        description="Your account details."
        action={
          editing ? null : (
            <Button size="sm" variant="secondary" onClick={handleEdit}>
              <Pencil size={16} aria-hidden="true" />
              Edit
            </Button>
          )
        }
      />

      <Card className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[24px] font-medium text-ink">
          {initial}
        </span>
        <div>
          <p className="text-[18px] font-semibold text-ink">{display.name}</p>
          <p className="text-[16px] text-muted">{display.email || "No email on file"}</p>
        </div>
      </Card>

      {editing ? (
        <>
          <Card className="flex flex-col gap-5">
            <Input label="Name" name="name" value={draft.name} onChange={(e) => update("name", e.target.value)} />
            <Input
              label="Email"
              name="email"
              type="email"
              value={draft.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={draft.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <Input
              label="Home address"
              name="address"
              value={draft.address}
              onChange={(e) => update("address", e.target.value)}
            />
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-muted">Role</span>
              <StatusPill>{roleLabel(role)}</StatusPill>
            </div>
          </Card>

          <Card className="flex flex-col gap-5">
            <h2 className="text-[16px] font-semibold text-ink">Next of kin</h2>
            <Input
              label="Full name"
              name="nextOfKinName"
              value={draft.nextOfKinName}
              onChange={(e) => update("nextOfKinName", e.target.value)}
            />
            <Input
              label="Phone"
              name="nextOfKinPhone"
              type="tel"
              value={draft.nextOfKinPhone}
              onChange={(e) => update("nextOfKinPhone", e.target.value)}
            />
          </Card>

          <Card className="flex flex-col gap-5">
            <h2 className="text-[16px] font-semibold text-ink">Change password</h2>
            <PasswordInput
              label="New password"
              name="newPassword"
              autoComplete="new-password"
              hint="Leave blank to keep your current password."
              value={draft.newPassword}
              onChange={(e) => update("newPassword", e.target.value)}
            />
            <PasswordInput
              label="Confirm new password"
              name="confirmPassword"
              autoComplete="new-password"
              value={draft.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              error={error}
            />
          </Card>

          <p className="text-[14px] text-muted">
            Saving here updates this preview only. Real saving, including a password change, will
            be wired up once the backend exists.
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </>
      ) : (
        <>
          <Card className="flex flex-col divide-y divide-hairline p-0">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Name</span>
              <span className="text-[16px] text-body">{saved.name}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Email</span>
              <span className="text-[16px] text-body">{saved.email || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Phone</span>
              <span className="text-[16px] text-body">{saved.phone || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Home address</span>
              <span className="text-[16px] text-body">{saved.address || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Role</span>
              <StatusPill>{roleLabel(role)}</StatusPill>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Status</span>
              <StatusPill>Active</StatusPill>
            </div>
          </Card>

          <Card className="flex flex-col divide-y divide-hairline p-0">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Next of kin</span>
              <span className="text-[16px] text-body">{saved.nextOfKinName || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[14px] text-muted">Next of kin phone</span>
              <span className="text-[16px] text-body">{saved.nextOfKinPhone || "Not set"}</span>
            </div>
          </Card>
          <p className="text-[14px] text-muted">
            Editing these details will be available once the backend exists.
          </p>
        </>
      )}
    </div>
  );
}
