import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { business } from "@/lib/site-content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${business.name} | ${business.slogan}`,
    template: `%s | ${business.shortName}`,
  },
  description: business.description,
  icons: {
    icon: "/logo.png",
  },
};

/**
 * Root layout. Deliberately bare: it only sets up the font and html/body
 * shell. The public site's header, footer, sticky CTA, and WhatsApp button
 * live in app/(site)/layout.tsx so that other route groups, such as
 * /dashboard, do not inherit the marketing site's chrome.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
