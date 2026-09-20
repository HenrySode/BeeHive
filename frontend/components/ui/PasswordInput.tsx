"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
  hint?: string;
};

/**
 * Same field pattern as Input, but always type="password" or "text",
 * toggled by an eye icon inside the field. Kept as its own component
 * rather than an Input variant since the show/hide state and the trailing
 * button are specific to password fields.
 */
export function PasswordInput({ label, error, hint, id, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[14px] font-medium text-ink">
        {label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className={cn(
            "w-full rounded-md border bg-canvas px-4 py-3 pr-12 text-[16px] text-body placeholder:text-muted focus:outline-none transition-colors",
            error ? "border-error focus:border-error" : "border-hairline focus:border-ink",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          // See Input.tsx: Chromium's login-form autofill styling triggers
          // a benign post-hydration style diff on password fields.
          suppressHydrationWarning
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted hover:text-ink"
        >
          {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
        </button>
      </div>
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
