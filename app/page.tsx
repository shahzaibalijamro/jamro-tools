import type { Metadata } from "next";

import { CategorySection } from "@/components/landing/category-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PopularToolsSection } from "@/components/landing/popular-tools-section";
import { PrivacyFeaturesSection } from "@/components/landing/privacy-features-section";
import { SimplicitySection } from "@/components/landing/simplicity-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustSection } from "@/components/landing/trust-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Free Online Tools — No Sign-Up Required | Jamro Tools",
  description:
    "Access 1,000+ free calculators, converters, generators & developer tools. 100% private — all tools run in your browser. No account, no downloads, no cost. Ever.",
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-page">
        <HeroSection />
        <CategorySection />
        <PrivacyFeaturesSection />
        <SimplicitySection />
        <PopularToolsSection />
        <TrustSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <SiteFooter hasMarginBottom={false} />
    </>
  );
}
