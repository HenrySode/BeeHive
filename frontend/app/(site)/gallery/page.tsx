import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { galleryPlaceholderCount } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at the Bee Hive team, vehicles, and completed work.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col items-start gap-4">
          <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">Gallery</h1>
          <p className="max-w-2xl text-[16px] text-body">
            A look at our team, our vehicles, and completed work.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col gap-6">
          <p className="text-[14px] text-muted">
            Photos below are placeholders. Real photography will replace these once Bee Hive
            provides client-approved images.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: galleryPlaceholderCount }).map((_, index) => (
              <div
                key={index}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border border-dashed border-hairline bg-surface-soft text-muted"
              >
                <ImageIcon size={24} aria-hidden="true" />
                <span className="text-[14px]">Photo coming soon</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
