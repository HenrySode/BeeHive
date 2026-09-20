"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { business, primaryNav } from "@/lib/site-content";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" priority />
            <span className="text-[20px] font-semibold text-ink">
              {business.shortName}
              <span className="sr-only"> {business.name}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[16px] transition-colors hover:text-ink",
                    active ? "font-medium text-ink" : "text-body",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 text-[16px] font-medium text-ink"
            >
              <Phone size={20} aria-hidden="true" />
              {business.phone}
            </a>
            <Button href="/contact" size="sm">
              Request Service
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-hairline bg-canvas lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-[16px] text-body hover:bg-surface-soft hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 px-2 py-3 text-[16px] font-medium text-ink"
            >
              <Phone size={20} aria-hidden="true" />
              {business.phone}
            </a>
            <Button href="/contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Request Service
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
