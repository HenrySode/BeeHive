import { ChevronsUpDown } from "lucide-react";
import { roles, roleLabel, type Role } from "@/lib/dashboard";

/**
 * Sidebar-bottom account switcher, in the spirit of a workspace/account
 * menu: an avatar, the current name, and a chevron, all sitting on top of
 * a real <select> so it stays a single accessible, keyboard-operable
 * control rather than a custom listbox. There is no account system yet
 * (see lib/dashboard.ts), so this doubles as the role preview control.
 */
export function RoleSwitcher({
  role,
  onChange,
  collapsed,
}: {
  role: Role;
  onChange: (role: Role) => void;
  collapsed: boolean;
}) {
  const initial = roleLabel(role).charAt(0);

  return (
    <div className="relative">
      <select
        aria-label="Viewing as"
        value={role}
        onChange={(event) => onChange(event.target.value as Role)}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
      >
        {roles.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-canvas">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[14px] font-medium text-ink">
          {initial}
        </span>
        {!collapsed ? (
          <>
            <span className="flex-1 truncate text-[14px] font-medium text-ink">
              {roleLabel(role)}
            </span>
            <ChevronsUpDown size={16} aria-hidden="true" className="shrink-0 text-muted" />
          </>
        ) : null}
      </div>
    </div>
  );
}
