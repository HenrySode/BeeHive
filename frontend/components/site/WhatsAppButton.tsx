"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

// wa.me needs the number as digits only, country code first.
const WHATSAPP_NUMBER = "16175041679";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Floating WhatsApp shortcut, available on every public page. Uses the
 * site's own accent colour rather than WhatsApp's brand green, per
 * design-system.md: colours come only from the brand tokens.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const stickyBarVisible = !pathname?.startsWith("/contact");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bee Hive on WhatsApp"
      className={cn(
        "fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-soft transition-colors hover:bg-accent-active lg:right-6 lg:bottom-6",
        stickyBarVisible ? "bottom-24" : "bottom-6",
      )}
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
