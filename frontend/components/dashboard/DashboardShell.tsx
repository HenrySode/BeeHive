"use client";

import { useState } from "react";
import Image from "next/image";
import { PanelLeftClose, PanelLeftOpen, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/cn";
import { business } from "@/lib/site-content";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { navItemsForRole, type NavItem, type NavKey, type Role } from "@/lib/dashboard";
import {
  OverviewPanel,
  RequestsPanel,
  CustomersPanel,
  SchedulePanel,
  MyJobsPanel,
  CommunicationsPanel,
  ReportsPanel,
  ServicesPanel,
  UsersPanel,
} from "@/components/dashboard/Panels";

function renderPanel(key: NavKey, role: Role) {
  switch (key) {
    case "overview":
      return <OverviewPanel role={role} />;
    case "requests":
      return <RequestsPanel role={role} />;
    case "customers":
      return <CustomersPanel role={role} />;
    case "schedule":
      return <SchedulePanel />;
    case "myJobs":
      return <MyJobsPanel />;
    case "communications":
      return <CommunicationsPanel />;
    case "reports":
      return <ReportsPanel role={role} />;
    case "services":
      return <ServicesPanel role={role} />;
    case "users":
      return <UsersPanel />;
    default:
      return null;
  }
}

function NavButton({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-surface-soft font-medium text-ink"
          : "text-body hover:bg-surface-soft hover:text-ink",
      )}
    >
      <Icon size={20} aria-hidden="true" className="shrink-0" />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </button>
  );
}

/**
 * Staff dashboard shell. UI and UX only, per prd.md sections 6.3-6.8: no
 * authentication or authorization is implemented. The role switcher at the
 * bottom of the sidebar swaps which navigation items and sample panels are
 * shown, so each role's intended view can be reviewed before the real
 * backend, auth, and RBAC are built (see architecture.md and api-spec.md).
 *
 * The sidebar follows the structural pattern of claude.ai's own app shell:
 * a collapsible left sidebar (full width with labels, or a narrow icon
 * rail), nav items grouped into a primary "Workspace" section and a
 * secondary "Manage" section, and a minimal top bar whose only job is the
 * sidebar toggle and the account/session control. Only the structure is
 * borrowed; every colour still comes from design-system.md.
 */
export function DashboardShell({
  initialRole,
  onLogout,
}: {
  initialRole: Role;
  onLogout: () => void;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [active, setActive] = useState<NavKey>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = navItemsForRole(role);
  const workspaceItems = items.filter((item) => item.group === "workspace");
  const manageItems = items.filter((item) => item.group === "manage");

  function handleRoleChange(nextRole: Role) {
    setRole(nextRole);
    if (!navItemsForRole(nextRole).some((item) => item.key === active)) {
      setActive("overview");
    }
  }

  function selectItem(key: NavKey) {
    setActive(key);
    setMobileOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col border-r border-hairline bg-surface-soft transition-transform duration-200 lg:static lg:translate-x-0 lg:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[76px]" : "lg:w-[272px]",
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-4">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
          {!collapsed || mobileOpen ? (
            <span className="truncate text-[15px] font-semibold text-ink">
              {business.shortName}
            </span>
          ) : null}
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
          {workspaceItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === active}
              collapsed={collapsed && !mobileOpen}
              onClick={() => selectItem(item.key)}
            />
          ))}

          {manageItems.length > 0 ? (
            <>
              <div className="my-2 border-t border-hairline" />
              {!collapsed || mobileOpen ? (
                <span className="px-3 pb-1 text-[14px] font-medium uppercase tracking-wide text-muted">
                  Manage
                </span>
              ) : null}
              {manageItems.map((item) => (
                <NavButton
                  key={item.key}
                  item={item}
                  active={item.key === active}
                  collapsed={collapsed && !mobileOpen}
                  onClick={() => selectItem(item.key)}
                />
              ))}
            </>
          ) : null}
        </nav>

        <div className="shrink-0 border-t border-hairline p-3">
          <RoleSwitcher role={role} onChange={handleRoleChange} collapsed={collapsed && !mobileOpen} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-hairline px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-soft lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-soft lg:flex"
          >
            {collapsed ? (
              <PanelLeftOpen size={20} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={20} aria-hidden="true" />
            )}
          </button>

          <div className="flex-1" />

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-[14px] font-medium text-ink"
          >
            <LogOut size={18} aria-hidden="true" />
            Log out
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-canvas p-6 lg:p-10">
          {renderPanel(active, role)}
        </main>
      </div>
    </div>
  );
}
