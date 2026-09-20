import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RequestServiceForm } from "@/components/site/RequestServiceForm";
import { BusinessHours } from "@/components/site/BusinessHours";
import { business } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch or request a service from Bee Hive.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col items-start gap-4">
          <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">Contact</h1>
          <p className="max-w-2xl text-[16px] text-body">Get in touch or request a service.</p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <RequestServiceForm />
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-4">
              <a href={business.phoneHref} className="flex items-center gap-3 text-[16px] text-body">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-ink">
                  <Phone size={20} aria-hidden="true" />
                </span>
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-3 text-[16px] text-body"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-ink">
                  <Mail size={20} aria-hidden="true" />
                </span>
                {business.email}
              </a>
              <div className="flex items-start gap-3 text-[16px] text-body">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-ink">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                {business.serviceArea}
              </div>
              <div className="flex items-start gap-3 text-[16px] text-body">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-ink">
                  <Clock size={20} aria-hidden="true" />
                </span>
                <BusinessHours />
              </div>
            </Card>

            <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-hairline bg-surface-soft text-center">
              <span className="max-w-[220px] text-[14px] text-muted">
                Map and directions will go here once the business address is confirmed.
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
