import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BusinessHours } from "@/components/site/BusinessHours";
import { business, primaryNav } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-soft">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
            <span className="text-[20px] font-semibold text-ink">{business.shortName}</span>
          </div>
          <p className="text-[16px] text-body">{business.slogan}</p>
          <p className="text-[14px] text-muted">{business.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium uppercase tracking-wide text-muted">
            Contact
          </span>
          <a href={business.phoneHref} className="flex items-center gap-2 text-[16px] text-body">
            <Phone size={20} aria-hidden="true" className="text-ink" />
            {business.phone}
          </a>
          <a
            href={`mailto:${business.email}`}
            className="flex items-center gap-2 text-[16px] text-body"
          >
            <Mail size={20} aria-hidden="true" className="text-ink" />
            {business.email}
          </a>
          <span className="flex items-start gap-2 text-[16px] text-body">
            <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />
            {business.serviceArea}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium uppercase tracking-wide text-muted">
            Business hours
          </span>
          <div className="flex items-start gap-2 text-[16px] text-body">
            <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />
            <BusinessHours />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium uppercase tracking-wide text-muted">
            Site
          </span>
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[16px] text-body hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col gap-2 py-6 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</span>
          <span>
            Contact details and service area shown are placeholders pending confirmation.
          </span>
        </Container>
      </div>
    </footer>
  );
}
