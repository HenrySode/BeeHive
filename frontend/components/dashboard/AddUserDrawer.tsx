"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { roles, type Role } from "@/lib/dashboard";

export type NewUser = {
  name: string;
  email: string;
  role: Role;
  temporaryPassword: string;
};

const initialValues: NewUser = { name: "", email: "", role: "OFFICE_CS", temporaryPassword: "" };

/**
 * Slide-over panel for an Owner/Admin to register a new staff account
 * directly (prd.md FR-A3: the admin sets the role and, here, the email and
 * a temporary password at creation, this is not an email invite flow).
 * The person can change their password themselves afterwards from their
 * own Profile page. UI only: there is no backend yet, so submitting just
 * hands the new user back to UsersPanel to add to the visible list.
 */
export function AddUserDrawer({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (user: NewUser) => void;
}) {
  const [values, setValues] = useState<NewUser>(initialValues);
  const [error, setError] = useState<string | undefined>();

  function update<K extends keyof NewUser>(key: K, value: NewUser[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.temporaryPassword.trim()) {
      setError("Enter a name, an email address, and a temporary password.");
      return;
    }
    onAdd(values);
    setValues(initialValues);
    setError(undefined);
  }

  function handleClose() {
    setValues(initialValues);
    setError(undefined);
    onClose();
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-ink/30"
        />
      ) : null}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add user"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-hairline bg-canvas shadow-soft transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <h2 className="text-[18px] font-semibold text-ink">Add user</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-soft"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          <Input
            label="Full name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            error={error && !values.name.trim() ? error : undefined}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            error={error && !values.email.trim() ? error : undefined}
          />
          <Select
            label="Role"
            name="role"
            required
            value={values.role}
            onChange={(event) => update("role", event.target.value as Role)}
            hint="Sets what this person can see and do in the dashboard."
          >
            {roles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <PasswordInput
            label="Temporary password"
            name="temporaryPassword"
            autoComplete="new-password"
            required
            value={values.temporaryPassword}
            onChange={(event) => update("temporaryPassword", event.target.value)}
            error={error && !values.temporaryPassword.trim() ? error : undefined}
            hint={!error ? "They can change this from their own Profile page after signing in." : undefined}
          />

          <div className="mt-auto flex gap-3 pt-6">
            <Button type="button" variant="secondary" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add user
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
