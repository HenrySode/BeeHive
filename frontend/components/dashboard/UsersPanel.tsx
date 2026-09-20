"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { PanelHeader } from "@/components/dashboard/Panels";
import { AddUserDrawer, type NewUser } from "@/components/dashboard/AddUserDrawer";
import { sampleUsers, roleLabel } from "@/lib/dashboard";

/**
 * Owner/Admin only (prd.md FR-A3). The admin registers a staff account and
 * sets its role directly, so the action is "Add user", not "Invite user".
 * UI only: added users live in local state and are not persisted anywhere.
 */
export function UsersPanel() {
  const [users, setUsers] = useState(sampleUsers);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleAdd(user: NewUser) {
    // user.temporaryPassword is only ever handed to the (future)
    // create-account request; it is never stored or displayed in this
    // list, so it is deliberately left out of the object built below.
    setUsers((prev) => [
      ...prev,
      {
        name: user.name,
        email: user.email,
        role: user.role,
        active: true,
        phone: "",
        address: "",
        nextOfKinName: "",
        nextOfKinPhone: "",
      },
    ]);
    setDrawerOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Users & Settings"
        description="Add, deactivate, and set the role of staff users."
        action={
          <Button size="sm" onClick={() => setDrawerOpen(true)}>
            <Plus size={18} aria-hidden="true" />
            Add user
          </Button>
        }
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-[16px]">
          <thead>
            <tr className="border-b border-hairline text-[14px] text-muted">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {users.map((user) => (
              <tr key={user.email}>
                <td className="px-6 py-4 font-medium text-ink">{user.name}</td>
                <td className="px-6 py-4 text-muted">{user.email}</td>
                <td className="px-6 py-4 text-body">{roleLabel(user.role)}</td>
                <td className="px-6 py-4">
                  <StatusPill>{user.active ? "Active" : "Deactivated"}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <AddUserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onAdd={handleAdd} />
    </div>
  );
}
