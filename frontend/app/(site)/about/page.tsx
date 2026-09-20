import type { Metadata } from "next";
import Image from "next/image";
import { Flame, Snowflake, Wrench, HardHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: business.description,
};

const focusAreas = [
  { icon: Flame, label: "Heating" },
  { icon: Snowflake, label: "Cooling" },
  { icon: Wrench, label: "Repair and maintenance" },
  { icon: HardHat, label: "Installation" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">About Bee Hive</h1>
            <p className="max-w-lg text-[16px] text-body">{business.description}</p>
            <Button href="/contact">Request Service</Button>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-hairline shadow-soft">
            <Image
              src="/images/concept-living-room-mini-split.jpg"
              alt="A living room with a wall-mounted mini-split heating and cooling unit"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading title="What we work on" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Card key={area.label} className="flex flex-col items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-ink">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="text-[16px] font-medium text-ink">{area.label}</span>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-surface-soft py-16 lg:py-24">
        <Container>
          <Card className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <h2 className="text-[22px] font-semibold text-ink">Our story, coming soon</h2>
            <p className="text-[16px] text-muted">
              Bee Hive&apos;s full story, including how long the team has served the area and
              what they believe about the work, will go here once it is shared with us.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
}
