import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function Select({ label, error, hint, id, className, children, ...props }: SelectProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-[14px] font-medium text-ink">
        {label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          className={cn(
            "w-full appearance-none rounded-md border bg-canvas px-4 py-3 pr-10 text-[16px] text-body focus:outline-none transition-colors",
            error ? "border-error focus:border-error" : "border-hairline focus:border-ink",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={20}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="text-[14px] text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-[14px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
