import { business } from "@/lib/site-content";

/**
 * Renders each entry as day, then time on its own line below it, so a
 * longer day range or time span never has to break mid-line to fit a
 * narrow column. Shared by the footer and the contact page so both stay
 * in sync.
 */
export function BusinessHours() {
  return (
    <dl className="flex flex-col gap-3">
      {business.hours.map((row) => (
        <div key={row.day}>
          <dt className="text-[14px] text-muted">{row.day}</dt>
          <dd className="text-[16px]">{row.time}</dd>
        </div>
      ))}
    </dl>
  );
}
