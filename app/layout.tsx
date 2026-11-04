import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTAAttribution from "@/components/shared/CTAAttribution";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { GUIDES_BANNER } from "@/lib/constants";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Beacon House: Ivy League Admissions Consultancy for Indian Students",
    description:
      "Premium admissions consultancy for selective universities. 730+ Ivy League admits, 159+ Top 10 admits in 2025-26. Founder-supervised strategy, profile building, and candidacy development.",
  }),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Runs before first paint: hides the Parent Guides bar for a visitor
            who already closed it, so the home hero does not jump. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem(${JSON.stringify(GUIDES_BANNER.storageKey)}))document.documentElement.classList.add("guides-banner-off")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <CTAAttribution />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
