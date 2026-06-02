import type { Metadata } from "next";

import { CategorySection } from "@/components/landing/category-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Free Online Tools – No Sign-Up Required | Jamro Tools",
  description:
    "Access 1,000+ free calculators, converters, generators & developer tools. 100% private — all tools run in your browser. No account, no downloads, no cost. Ever.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategorySection />
        <TrustSection />
      </main>
      <SiteFooter hasMarginBottom={false} />
    </>
  );
}
