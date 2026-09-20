"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { roleLabel, sampleUserForRole, sampleNotifications, type Role } from "@/lib/dashboard";
import {
  getSubmittedRequests,
  subscribeToLiveRequests,
  formatRelativeTime,
  type SubmittedRequest,
} from "@/lib/liveActivity";

type OpenMenu = "account" | "notifications" | null;

/**
 * Dashboard top bar. Left side only ever holds the sidebar controls
 * (mobile menu, desktop collapse toggle); the right side is, in order:
 * the search bar, the notification bell, then the account avatar.
 * Clicking the avatar opens a menu with the signed-in user's name, their
 * role, Profile, Settings, and Log out, so Log out is no longer a
 * standalone button.
 *
 * The bell also carries live notifications: a submission on the public
 * Request Service form (see RequestServiceForm.tsx and
 * lib/liveActivity.ts) shows up here immediately. Clicking one jumps to
 * the Service Requests panel, so a manager can open it and start working
 * on it.
 */
export function TopBar({
  role,
  collapsed,
  onOpenMobileMenu,
  onToggleCollapse,
  onOpenProfile,
  onOpenRequests,
  onLogout,
}: {
  role: Role;
  collapsed: boolean;
  onOpenMobileMenu: () => void;
  onToggleCollapse: () => void;
  onOpenProfile: () => void;
  onOpenRequests: () => void;
  onLogout: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [liveRequests, setLiveRequests] = useState<SubmittedRequest[]>([]);
  const user = sampleUserForRole(role);
  const initial = user.name.charAt(0) || "?";

  useEffect(() => {
    function sync() {
      setLiveRequests(getSubmittedRequests());
    }
    sync();
    const unsubscribe = subscribeToLiveRequests(sync);
    const interval = window.setInterval(sync, 30000);
    return () => {
      unsubscribe();
      window.clearInterval(interval);
    };
  }, []);

  const liveNotifications = liveRequests.map((request) => ({
    title: `New service request from ${request.name}`,
    time: formatRelativeTime(request.receivedAt),
  }));
  const notifications = [...liveNotifications, ...sampleNotifications];

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  return (
    <header className="relative flex h-16 shrink-0 items-center gap-3 border-b border-hairline bg-canvas px-4 lg:px-6">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-soft lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onToggleCollapse}
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

      {openMenu ? (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpenMenu(null)}
          className="fixed inset-0 z-40 cursor-default"
        />
      ) : null}

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            placeholder="Search customers, requests..."
            className="w-56 rounded-full border border-hairline bg-surface-soft py-2 pl-9 pr-4 text-[14px] text-body placeholder:text-muted focus:border-ink focus:bg-canvas focus:outline-none lg:w-72"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("notifications")}
            aria-haspopup="menu"
            aria-expanded={openMenu === "notifications"}
            aria-label="Notifications"
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-soft"
          >
            <Bell size={20} aria-hidden="true" />
            {notifications.length > 0 ? (
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent"
              />
            ) : null}
          </button>
          {openMenu === "notifications" ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-80 rounded-md border border-hairline bg-canvas p-2 shadow-soft"
            >
              <p className="px-3 py-2 text-[14px] font-medium text-ink">Notifications</p>
              <div className="flex flex-col divide-y divide-hairline">
                {notifications.map((notification) => (
                  <button
                    key={notification.title}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpenMenu(null);
                      onOpenRequests();
                    }}
                    className="flex w-full flex-col items-start px-3 py-2.5 text-left hover:bg-surface-soft"
                  >
                    <p className="text-[14px] text-body">{notification.title}</p>
                    <p className="text-[14px] text-muted">{notification.time}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("account")}
            aria-haspopup="menu"
            aria-expanded={openMenu === "account"}
            aria-label="Account menu"
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-[14px] font-medium text-ink"
          >
            {initial}
          </button>
          {openMenu === "account" ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border border-hairline bg-canvas p-2 shadow-soft"
            >
              <div className="px-3 py-2">
                <p className="truncate text-[14px] font-medium text-ink">{user.name}</p>
                <p className="truncate text-[14px] text-muted">{roleLabel(role)}</p>
              </div>
              <div className="my-1 border-t border-hairline" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpenMenu(null);
                  onOpenProfile();
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] text-body hover:bg-surface-soft hover:text-ink"
              >
                <User size={18} aria-hidden="true" />
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => setOpenMenu(null)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] text-body hover:bg-surface-soft hover:text-ink"
              >
                <Settings size={18} aria-hidden="true" />
                Settings
              </button>
              <div className="my-1 border-t border-hairline" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpenMenu(null);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] text-error hover:bg-error-soft"
              >
                <LogOut size={18} aria-hidden="true" />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
