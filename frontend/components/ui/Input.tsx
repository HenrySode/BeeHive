import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

const fieldClasses =
  "w-full rounded-md border bg-canvas px-4 py-3 text-[16px] text-body placeholder:text-muted focus:outline-none focus:ring-0 transition-colors";

export function Input({ label, error, hint, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[14px] font-medium text-ink">
        {label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={inputId}
        className={cn(
          fieldClasses,
          error ? "border-error focus:border-error" : "border-hairline focus:border-ink",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-[14px] text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-[14px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
