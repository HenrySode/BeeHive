import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { faqsDraft } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Bee Hive's services.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col items-start gap-4">
          <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl text-[16px] text-body">
            Draft questions and answers shown below. Final content is to be confirmed with
            Bee Hive.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="flex max-w-3xl flex-col gap-8">
          <FaqAccordion items={faqsDraft} />
          <div className="flex flex-col items-start gap-3 rounded-md border border-hairline bg-surface-soft p-6">
            <p className="text-[16px] text-body">Still have a question?</p>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
