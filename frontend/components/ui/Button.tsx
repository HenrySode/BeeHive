import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";
type Size = "default" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[16px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-active active:bg-accent-active",
  secondary:
    "bg-canvas text-ink border border-ink hover:bg-surface-soft",
  text: "text-ink underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  default: "px-6 py-3",
  sm: "px-4 py-2 text-[14px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

// Plain key deletion rather than rest-destructuring a union/intersection
// type, which TypeScript won't let us do directly here. This is what
// guarantees a caller-supplied className never resurfaces in the spread
// below and silently overwrites the computed classes.
function omit<T extends Record<string, unknown>>(obj: T, keys: string[]): Record<string, unknown> {
  const copy: Record<string, unknown> = { ...obj };
  for (const key of keys) delete copy[key];
  return copy;
}

/**
 * Renders a <button> or, when given href, a Next.js <Link> styled the
 * same way.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "default", className, children } = props;
  const classes = cn(
    base,
    variants[variant],
    variant !== "text" ? sizes[size] : undefined,
    className,
  );
  const rest = omit(props as unknown as Record<string, unknown>, [
    "variant",
    "size",
    "className",
    "children",
    "href",
  ]);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
