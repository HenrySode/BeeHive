import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyRequestBar } from "@/components/site/StickyRequestBar";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

/**
 * Shell for the public marketing site only. /dashboard sits outside this
 * route group and builds its own shell, so it never inherits this header,
 * footer, sticky mobile bar, or WhatsApp button.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <Footer />
      <StickyRequestBar />
      <WhatsAppButton />
    </>
  );
}
