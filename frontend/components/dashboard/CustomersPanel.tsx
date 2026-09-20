"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { PanelHeader } from "@/components/dashboard/Panels";
import { sampleCustomers, type Role } from "@/lib/dashboard";
import {
  getSubmittedRequests,
  subscribeToLiveRequests,
  getLiveCustomersFromRequests,
} from "@/lib/liveActivity";

/**
 * Live counterpart to the public Request Service form (see
 * RequestServiceForm.tsx and lib/liveActivity.ts). A submission there adds
 * the person here too, at the top of the list, standing in for staff
 * matching or creating a customer from a request (prd.md FR-D3) until
 * that step is built.
 */
export function CustomersPanel({ role }: { role: Role }) {
  const canAdd = role !== "FIELD_TECHNICIAN";
  const [liveCustomers, setLiveCustomers] = useState<
    ReturnType<typeof getLiveCustomersFromRequests>
  >([]);

  useEffect(() => {
    function sync() {
      setLiveCustomers(getLiveCustomersFromRequests(getSubmittedRequests()));
    }
    sync();
    return subscribeToLiveRequests(sync);
  }, []);

  const customers = [...liveCustomers, ...sampleCustomers];

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
        {customers.map((customer) => (
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
