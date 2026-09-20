"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/site-content";

/**
 * Sticky mobile call to action, per design-system.md. Hidden on the
 * Contact page itself, since the request form is already on screen there.
 */
export function StickyRequestBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-canvas/85 lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href={business.phoneHref}
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-ink text-[16px] font-medium text-ink"
        >
          Call Now
        </a>
        <Button href="/contact" className="h-12 flex-1">
          Request Service
        </Button>
      </div>
    </div>
  );
}
