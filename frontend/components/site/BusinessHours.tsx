import { Fragment } from "react";
import { business } from "@/lib/site-content";

/**
 * Renders the hours as a two-column grid so the day and time line up
 * across rows, unlike a per-row flex pair where each row aligns only with
 * itself. Shared by the footer and the contact page so both stay in sync.
 */
export function BusinessHours() {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
      {business.hours.map((row) => (
        <Fragment key={row.day}>
          <dt className="text-muted">{row.day}</dt>
          <dd>{row.time}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
