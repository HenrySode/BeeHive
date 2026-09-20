/**
 * Joins class names, skipping falsy values. No dependency, just a plain
 * string join so component variants stay readable.
 */
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
