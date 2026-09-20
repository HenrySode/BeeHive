import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-hairline bg-canvas p-6 shadow-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
