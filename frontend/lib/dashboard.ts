import {
  LayoutDashboard,
  Inbox,
  Users,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * UI-only mock of the staff dashboard described in prd.md sections 3, 6.3,
 * and 6.4-6.8. There is no backend yet (see api-spec.md) and this file
 * implements no real authentication or authorization: it only drives which
 * navigation items and panels are shown for a given role, so the design
 * can be reviewed role by role before the real login and RBAC are built.
 */

export type Role = "OWNER_ADMIN" | "MANAGER_DISPATCHER" | "OFFICE_CS" | "FIELD_TECHNICIAN";

export const roles: { value: Role; label: string }[] = [
  { value: "OWNER_ADMIN", label: "Owner / Admin" },
  { value: "MANAGER_DISPATCHER", label: "Manager / Dispatcher" },
  { value: "OFFICE_CS", label: "Office / Customer Service" },
  { value: "FIELD_TECHNICIAN", label: "Field Technician" },
];

export function roleLabel(role: Role): string {
  return roles.find((item) => item.value === role)?.label ?? role;
}

const ALL: Role[] = ["OWNER_ADMIN", "MANAGER_DISPATCHER", "OFFICE_CS", "FIELD_TECHNICIAN"];

export type NavKey =
  | "overview"
  | "requests"
  | "customers"
  | "schedule"
  | "myJobs"
  | "communications"
  | "reports"
  | "services"
  | "users"
  // Opened from the account menu, not the sidebar, so it is deliberately
  // not part of navItems below.
  | "profile";

export type NavGroup = "workspace" | "manage";

export type NavItem = {
  key: NavKey;
  label: string;
  icon: LucideIcon;
  roles: Role[];
  group: NavGroup;
};

/**
 * Mirrors the permission matrix in prd.md section 6.3. A Field Technician
 * sees "My Jobs" instead of the full Schedule, and does not see
 * Communications, Reports, or Services & Content. `group` only drives the
 * sidebar's visual grouping (day to day work vs. management), it has no
 * effect on access.
 */
export const navItems: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, roles: ALL, group: "workspace" },
  { key: "requests", label: "Service Requests", icon: Inbox, roles: ALL, group: "workspace" },
  { key: "customers", label: "Customers", icon: Users, roles: ALL, group: "workspace" },
  {
    key: "schedule",
    label: "Schedule",
    icon: CalendarDays,
    roles: ["OWNER_ADMIN", "MANAGER_DISPATCHER", "OFFICE_CS"],
    group: "workspace",
  },
  {
    key: "myJobs",
    label: "My Jobs",
    icon: ClipboardList,
    roles: ["FIELD_TECHNICIAN"],
    group: "workspace",
  },
  {
    key: "communications",
    label: "Communications",
    icon: MessageSquare,
    roles: ["OWNER_ADMIN", "MANAGER_DISPATCHER", "OFFICE_CS"],
    group: "workspace",
  },
  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
    roles: ["OWNER_ADMIN", "MANAGER_DISPATCHER", "OFFICE_CS"],
    group: "manage",
  },
  {
    key: "services",
    label: "Services & Content",
    icon: Settings2,
    roles: ["OWNER_ADMIN", "MANAGER_DISPATCHER"],
    group: "manage",
  },
  {
    key: "users",
    label: "Users & Settings",
    icon: ShieldCheck,
    roles: ["OWNER_ADMIN"],
    group: "manage",
  },
];

export function navItemsForRole(role: Role): NavItem[] {
  return navItems.filter((item) => item.roles.includes(role));
}

// Sample data for the mock panels. Not real customer or business data.

export const sampleSummary = [
  { label: "Today's appointments", value: 6 },
  { label: "New requests", value: 3 },
  { label: "Jobs in progress", value: 2 },
  { label: "Completed this week", value: 11 },
];

export const sampleRequests = [
  { id: "SR-1042", name: "Dana Whitfield", service: "Furnace repair", status: "New", received: "Today, 9:12 AM" },
  { id: "SR-1041", name: "Marcus Yee", service: "Cooling maintenance", status: "New", received: "Today, 8:47 AM" },
  { id: "SR-1039", name: "Priya Nandan", service: "Mini-split installation", status: "Actioned", received: "Yesterday" },
  { id: "SR-1035", name: "Owen Cabrera", service: "Dryer-vent cleaning", status: "Archived", received: "3 days ago" },
];

export const sampleCustomers = [
  { name: "Dana Whitfield", phone: "(555) 018-2201", tags: ["Repair", "Furnace"] },
  { name: "Marcus Yee", phone: "(555) 018-4032", tags: ["Maintenance", "Cooling"] },
  { name: "Priya Nandan", phone: "(555) 018-7719", tags: ["Installation", "Mini-Split"] },
  { name: "Owen Cabrera", phone: "(555) 018-9903", tags: ["Maintenance", "Dryer Vent"] },
];

export const sampleSchedule = [
  { time: "9:00 AM", customer: "Dana Whitfield", service: "Furnace repair", technician: "J. Alvarez" },
  { time: "11:30 AM", customer: "Marcus Yee", service: "Cooling maintenance", technician: "S. Park" },
  { time: "1:00 PM", customer: "Priya Nandan", service: "Mini-split installation", technician: "J. Alvarez" },
  { time: "3:30 PM", customer: "Owen Cabrera", service: "Dryer-vent cleaning", technician: "S. Park" },
];

export const sampleMyJobs = [
  { time: "9:00 AM", customer: "Dana Whitfield", service: "Furnace repair", status: "En route" },
  { time: "1:00 PM", customer: "Priya Nandan", service: "Mini-split installation", status: "Scheduled" },
];

export const sampleNotifications = [
  { title: "New service request from Dana Whitfield", time: "9 minutes ago" },
  { title: "Appointment with Marcus Yee starts in 30 minutes", time: "1 hour ago" },
  { title: "Seasonal maintenance reminder sent to 12 customers", time: "Yesterday" },
];

export const sampleCommunications = [
  { customer: "Marcus Yee", channel: "Email", template: "Appointment confirmation", sentAt: "Today, 8:50 AM" },
  { customer: "Furnace owners segment", channel: "SMS", template: "Seasonal maintenance reminder", sentAt: "Yesterday" },
];

export type StaffAccount = {
  name: string;
  email: string;
  phone: string;
  address: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
};

export type StaffUser = StaffAccount & { role: Role; active: boolean };

export const sampleUsers: StaffUser[] = [
  {
    name: "Alicia Moreno",
    email: "alicia@beehive-hvac.com",
    role: "OWNER_ADMIN" as Role,
    active: true,
    phone: "(555) 042-1188",
    address: "214 Maple Street, Riverdale",
    nextOfKinName: "Daniel Moreno",
    nextOfKinPhone: "(555) 042-9021",
  },
  {
    name: "Morgan Ellis",
    email: "morgan@beehive-hvac.com",
    role: "MANAGER_DISPATCHER" as Role,
    active: true,
    phone: "(555) 042-3345",
    address: "88 Birchwood Lane, Riverdale",
    nextOfKinName: "Casey Ellis",
    nextOfKinPhone: "(555) 042-3346",
  },
  {
    name: "Riley Chen",
    email: "riley@beehive-hvac.com",
    role: "OFFICE_CS" as Role,
    active: false,
    phone: "(555) 042-7790",
    address: "37 Cedar Court, Riverdale",
    nextOfKinName: "Jamie Chen",
    nextOfKinPhone: "(555) 042-7791",
  },
  {
    name: "Jordan Alvarez",
    email: "jordan@beehive-hvac.com",
    role: "FIELD_TECHNICIAN" as Role,
    active: true,
    phone: "(555) 042-5512",
    address: "129 Oakview Drive, Riverdale",
    nextOfKinName: "Elena Alvarez",
    nextOfKinPhone: "(555) 042-5513",
  },
  {
    name: "Sam Park",
    email: "sam@beehive-hvac.com",
    role: "FIELD_TECHNICIAN" as Role,
    active: true,
    phone: "(555) 042-6634",
    address: "5 Willow Way, Riverdale",
    nextOfKinName: "Jin Park",
    nextOfKinPhone: "(555) 042-6635",
  },
];

/**
 * Stands in for "the logged in user" in the account menu and the profile
 * page. There is no account system yet, so this just returns the first
 * sample user with a matching role (see RoleSwitcher.tsx for how the role
 * itself is chosen).
 */
export function sampleUserForRole(role: Role): StaffAccount {
  const match = sampleUsers.find((user) => user.role === role);
  return (
    match ?? {
      name: roleLabel(role),
      email: "",
      phone: "",
      address: "",
      nextOfKinName: "",
      nextOfKinPhone: "",
    }
  );
}
