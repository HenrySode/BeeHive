"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { PanelHeader } from "@/components/dashboard/Panels";
import { sampleRequests, type Role } from "@/lib/dashboard";
import {
  getSubmittedRequests,
  subscribeToLiveRequests,
  formatRelativeTime,
  type SubmittedRequest,
} from "@/lib/liveActivity";

type Row = { id: string; name: string; service: string; status: string; received: string };

function toRow(request: SubmittedRequest): Row {
  return {
    id: request.id,
    name: request.name,
    service: request.serviceLabel,
    status: request.status,
    received: formatRelativeTime(request.receivedAt),
  };
}

/**
 * Live counterpart to the public Request Service form (see
 * RequestServiceForm.tsx and lib/liveActivity.ts). A submission there
 * appears here, at the top of the list, without a page reload, so a
 * manager can open it and act on it.
 */
export function RequestsPanel({ role }: { role: Role }) {
  const canAct = role !== "FIELD_TECHNICIAN";
  const [liveRequests, setLiveRequests] = useState<SubmittedRequest[]>([]);

  useEffect(() => {
    function sync() {
      setLiveRequests(getSubmittedRequests());
    }
    sync();
    const unsubscribe = subscribeToLiveRequests(sync);
    // Keeps "X minutes ago" labels current while the panel stays open.
    const interval = window.setInterval(sync, 30000);
    return () => {
      unsubscribe();
      window.clearInterval(interval);
    };
  }, []);

  const rows: Row[] = [...liveRequests.map(toRow), ...sampleRequests];

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
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 font-medium text-ink">{row.name}</td>
                <td className="px-6 py-4 text-body">{row.service}</td>
                <td className="px-6 py-4 text-muted">{row.received}</td>
                <td className="px-6 py-4">
                  <StatusPill>{row.status}</StatusPill>
                </td>
                {canAct ? (
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-[14px] font-medium text-ink underline-offset-4 hover:underline"
                    >
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
