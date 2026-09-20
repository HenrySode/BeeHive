/**
 * Bridges the public "Request Service" form to the staff dashboard while
 * there is no backend yet (see api-spec.md, POST /service-requests, and
 * prd.md FR-P4). A submission is written to localStorage; the dashboard
 * reads and subscribes to the same key, so a request submitted on the
 * public site appears in the Service Requests panel, the notification
 * bell, and the Customers panel of any dashboard tab open in the same
 * browser, without a page reload.
 *
 * This is a stand-in, not the real integration. Once the backend exists,
 * this whole module is replaced by real API calls (POST /service-requests
 * on submit, the dashboard fetching from GET /service-requests and
 * GET /customers) and this file goes away.
 */

export type SubmittedRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceLabel: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  status: "New";
  receivedAt: string;
};

const REQUESTS_KEY = "beehive:live-requests";
const UPDATE_EVENT = "beehive:live-requests-updated";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readRequests(): SubmittedRequest[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(REQUESTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRequests(requests: SubmittedRequest[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    // Storage disabled or full; the form still shows its own confirmation,
    // it just will not reach a dashboard in this case.
  }
  // The native "storage" event only fires in OTHER tabs, never the tab
  // that made the write, so a same-tab dashboard needs its own signal.
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

/**
 * Called by RequestServiceForm on a successful submission.
 */
export function addSubmittedRequest(
  input: Omit<SubmittedRequest, "id" | "status" | "receivedAt">,
): SubmittedRequest {
  const request: SubmittedRequest = {
    ...input,
    id: `SR-${Date.now().toString(36).toUpperCase()}`,
    status: "New",
    receivedAt: new Date().toISOString(),
  };
  writeRequests([request, ...readRequests()]);
  return request;
}

export function getSubmittedRequests(): SubmittedRequest[] {
  return readRequests();
}

/**
 * Called by dashboard components that need to re-render when a new
 * request comes in, whether from this tab (the manager has the dashboard
 * and the public site open side by side) or another tab.
 */
export function subscribeToLiveRequests(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  const handleStorage = (event: StorageEvent) => {
    if (event.key === REQUESTS_KEY || event.key === null) callback();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const minutes = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

/**
 * Derives a customer-list row from each live request (prd.md FR-D3
 * describes staff manually matching a request to a customer; this
 * simplified version, for the UI demo, adds the customer as soon as the
 * request comes in). Deduplicates by email so one person submitting more
 * than once does not create repeat rows.
 */
export function getLiveCustomersFromRequests(
  requests: SubmittedRequest[],
): { name: string; phone: string; tags: string[] }[] {
  const seen = new Set<string>();
  const customers: { name: string; phone: string; tags: string[] }[] = [];
  for (const request of requests) {
    const key = request.email.trim().toLowerCase() || request.name.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    customers.push({
      name: request.name,
      phone: request.phone,
      tags: ["New Lead", request.serviceLabel],
    });
  }
  return customers;
}
