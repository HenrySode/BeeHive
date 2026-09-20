import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TestimonialsGrid } from "@/components/site/TestimonialsGrid";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What Bee Hive customers say.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col items-start gap-4">
          <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">Testimonials</h1>
          <p className="max-w-2xl text-[16px] text-body">What our customers say.</p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <TestimonialsGrid />
        </Container>
      </section>
    </>
  );
}
