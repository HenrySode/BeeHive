/**
 * Status pill per design-system.md: the fill never changes by status, only
 * the text does, so no colour outside the brand tokens creeps in.
 */
export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-soft px-3 py-1 text-[14px] font-medium text-body">
      {children}
    </span>
  );
}
