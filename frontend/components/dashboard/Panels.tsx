import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/dashboard/StatusPill";
import {
  sampleSummary,
  sampleRequests,
  sampleCustomers,
  sampleSchedule,
  sampleMyJobs,
  sampleCommunications,
  sampleUsers,
  roleLabel,
  type Role,
} from "@/lib/dashboard";
import { services } from "@/lib/services";

function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-[22px] font-semibold text-ink sm:text-[24px]">{title}</h1>
        {description ? <p className="mt-1 text-[16px] text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function OverviewPanel({ role }: { role: Role }) {
  return (
    <div className="flex flex-col gap-8">
      <PanelHeader
        title="Overview"
        description={`Signed in as ${roleLabel(role)}. Sample data shown for design review.`}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sampleSummary.map((item) => (
          <Card key={item.label} className="flex flex-col gap-2">
            <span className="text-[28px] font-semibold text-ink">{item.value}</span>
            <span className="text-[14px] text-muted">{item.label}</span>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold text-ink">Today&apos;s schedule</h2>
        <div className="flex flex-col divide-y divide-hairline">
          {sampleSchedule.map((row) => (
            <div key={row.time} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-[16px] font-medium text-ink">{row.customer}</p>
                <p className="text-[14px] text-muted">{row.service}</p>
              </div>
              <div className="text-right">
                <p className="text-[16px] text-body">{row.time}</p>
                <p className="text-[14px] text-muted">{row.technician}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function RequestsPanel({ role }: { role: Role }) {
  const canAct = role !== "FIELD_TECHNICIAN";
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Service Requests"
        description={canAct ? "Match a request to a customer or schedule it." : "View only."}
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-[16px]">
          <thead>
            <tr className="border-b border-hairline text-[14px] text-muted">
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Received</th>
              <th className="px-6 py-4 font-medium">Status</th>
              {canAct ? <th className="px-6 py-4 font-medium">Action</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {sampleRequests.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 font-medium text-ink">{row.name}</td>
                <td className="px-6 py-4 text-body">{row.service}</td>
                <td className="px-6 py-4 text-muted">{row.received}</td>
                <td className="px-6 py-4">
                  <StatusPill>{row.status}</StatusPill>
                </td>
                {canAct ? (
                  <td className="px-6 py-4">
                    <button type="button" className="text-[14px] font-medium text-ink underline-offset-4 hover:underline">
                      Schedule
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function CustomersPanel({ role }: { role: Role }) {
  const canAdd = role !== "FIELD_TECHNICIAN";
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Customers"
        description="Search, filter, and segment customers by tag."
        action={
          canAdd ? (
            <Button size="sm">
              <Plus size={18} aria-hidden="true" />
              Add customer
            </Button>
          ) : undefined
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleCustomers.map((customer) => (
          <Card key={customer.name} className="flex flex-col gap-3">
            <div>
              <p className="text-[16px] font-medium text-ink">{customer.name}</p>
              <p className="text-[14px] text-muted">{customer.phone}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <StatusPill key={tag}>{tag}</StatusPill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SchedulePanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader title="Schedule" description="Today's appointments across all technicians." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-[16px]">
          <thead>
            <tr className="border-b border-hairline text-[14px] text-muted">
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Technician</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {sampleSchedule.map((row) => (
              <tr key={row.time}>
                <td className="px-6 py-4 text-body">{row.time}</td>
                <td className="px-6 py-4 font-medium text-ink">{row.customer}</td>
                <td className="px-6 py-4 text-body">{row.service}</td>
                <td className="px-6 py-4 text-muted">{row.technician}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function MyJobsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader title="My Jobs" description="Jobs assigned to you today." />
      <div className="flex flex-col gap-4">
        {sampleMyJobs.map((job) => (
          <Card key={job.time} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[16px] font-medium text-ink">{job.customer}</p>
              <p className="text-[14px] text-muted">{job.service} &middot; {job.time}</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill>{job.status}</StatusPill>
              <Button size="sm" variant="secondary">
                Update status
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CommunicationsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Communications"
        description="Automated and manual messages sent to customers."
        action={<Button size="sm">New message</Button>}
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-[16px]">
          <thead>
            <tr className="border-b border-hairline text-[14px] text-muted">
              <th className="px-6 py-4 font-medium">Recipient</th>
              <th className="px-6 py-4 font-medium">Channel</th>
              <th className="px-6 py-4 font-medium">Template</th>
              <th className="px-6 py-4 font-medium">Sent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {sampleCommunications.map((row) => (
              <tr key={row.customer}>
                <td className="px-6 py-4 font-medium text-ink">{row.customer}</td>
                <td className="px-6 py-4 text-body">{row.channel}</td>
                <td className="px-6 py-4 text-body">{row.template}</td>
                <td className="px-6 py-4 text-muted">{row.sentAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function ReportsPanel({ role }: { role: Role }) {
  const viewOnly = role === "OFFICE_CS";
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Reports"
        description={viewOnly ? "View only." : "Enquiries, appointments, completed jobs, and outreach."}
        action={!viewOnly ? <Button size="sm" variant="secondary">Export CSV</Button> : undefined}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sampleSummary.map((item) => (
          <Card key={item.label} className="flex flex-col gap-2">
            <span className="text-[28px] font-semibold text-ink">{item.value}</span>
            <span className="text-[14px] text-muted">{item.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ServicesPanel({ role }: { role: Role }) {
  const limited = role === "MANAGER_DISPATCHER";
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Services & Content"
        description={
          limited
            ? "Limited access: pricing and publishing changes require an Owner/Admin."
            : "Manage the service catalogue shown on the public site."
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="flex items-center justify-between gap-3">
            <span className="text-[16px] font-medium text-ink">{service.name}</span>
            <button type="button" className="text-[14px] font-medium text-ink underline-offset-4 hover:underline">
              Edit
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function UsersPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Users & Settings"
        description="Invite, deactivate, and set the role of staff users."
        action={
          <Button size="sm">
            <Plus size={18} aria-hidden="true" />
            Invite user
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
            {sampleUsers.map((user) => (
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
    </div>
  );
}
