import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bee Hive offers a full range of heating, cooling, and air quality services for homeowners.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col items-start gap-4">
          <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">Services</h1>
          <p className="max-w-2xl text-[16px] text-body">
            Bee Hive offers a full range of heating, cooling, and air quality services for
            homeowners, from routine maintenance to full installations.
          </p>
          <Button href="/contact">Request Service</Button>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
