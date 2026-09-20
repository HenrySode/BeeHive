import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-[14px] font-medium uppercase tracking-wide text-accent-active">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-[22px] font-semibold text-ink sm:text-[24px]">{title}</h2>
      {description ? (
        <p className={cn("max-w-2xl text-[16px] text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
