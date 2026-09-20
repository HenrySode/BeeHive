import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  CalendarCheck,
  Wrench,
  ArrowRight,
  Flame,
  Snowflake,
  HardHat,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TestimonialsGrid } from "@/components/site/TestimonialsGrid";
import { services } from "@/lib/services";
import { business } from "@/lib/site-content";

const heroHighlights = [
  { icon: Flame, label: "Heating" },
  { icon: Snowflake, label: "Cooling" },
  { icon: Wrench, label: "Repair & maintenance" },
  { icon: HardHat, label: "Installation" },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us what's going on",
    description: "Submit a service request with your address and what you need.",
  },
  {
    icon: CalendarCheck,
    title: "We confirm a time",
    description: "Bee Hive follows up to confirm a date and time that works for you.",
  },
  {
    icon: Wrench,
    title: "A technician takes care of it",
    description: "Your technician arrives, does the work, and keeps you informed.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="rounded-full bg-accent-soft px-4 py-1.5 text-[14px] font-medium text-accent-active">
              {business.slogan}
            </span>
            <h1 className="text-[32px] font-semibold leading-tight text-ink sm:text-[40px]">
              Heating and cooling done right, by people who show up.
            </h1>
            <p className="max-w-lg text-[16px] text-body">
              Bee Hive keeps your home comfortable year round: heating, cooling, ventilation,
              indoor air quality, maintenance, repair, and installation, all from one team.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Request Service</Button>
              <Button href={business.phoneHref} variant="secondary">
                Call {business.phone}
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {heroHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.label} className="flex items-center gap-2 text-[14px] font-medium text-ink">
                    <Icon size={20} aria-hidden="true" className="text-accent-active" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-hairline shadow-soft">
            <Image
              src="/images/concept-technician-outdoor-unit.jpg"
              alt="A Bee Hive technician servicing an outdoor air conditioning unit"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Services"
            title="A full range of heating and cooling services"
            description="Bee Hive offers a full range of heating, cooling, and air quality services for homeowners."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 self-start text-[16px] font-medium text-ink"
          >
            View all services
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <section className="border-y border-hairline bg-surface-soft py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-ink shadow-soft">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="text-[18px] font-semibold text-ink sm:text-[20px]">{step.title}</h3>
                <p className="text-[16px] text-muted">{step.description}</p>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-hairline shadow-soft lg:order-2">
            <Image
              src="/images/concept-living-room-mini-split.jpg"
              alt="A living room with a wall-mounted mini-split heating and cooling unit"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-4 lg:order-1">
            <SectionHeading eyebrow="About" title="Comfort you can count on, in every room" />
            <p className="max-w-lg text-[16px] text-body">{business.description}</p>
            <Button href="/about" variant="secondary">
              About Bee Hive
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline py-16 lg:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title="What our customers say"
            className="mx-auto"
          />
          <TestimonialsGrid limit={3} />
        </Container>
      </section>

      <section className="border-t border-hairline bg-ink py-16 lg:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-[24px] font-semibold text-on-ink sm:text-[28px]">
            Ready to get your heating or cooling sorted?
          </h2>
          <Button href="/contact">Request Service</Button>
        </Container>
      </section>
    </>
  );
}
