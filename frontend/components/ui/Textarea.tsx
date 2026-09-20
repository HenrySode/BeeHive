import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Textarea({ label, error, hint, id, className, rows = 5, ...props }: TextareaProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-[14px] font-medium text-ink">
        {label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        className={cn(
          "w-full rounded-md border bg-canvas px-4 py-3 text-[16px] text-body placeholder:text-muted focus:outline-none transition-colors",
          error ? "border-error focus:border-error" : "border-hairline focus:border-ink",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        {...props}
      />
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
