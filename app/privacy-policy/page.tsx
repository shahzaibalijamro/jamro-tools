import type { Metadata } from "next";

import { MobileBottomNav } from "@/components/about/mobile-bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { PrivacyHeader } from "@/components/privacy/privacy-header";
import { PrivacyHero } from "@/components/privacy/privacy-hero";
import { PrivacyMobileNav } from "@/components/privacy/privacy-mobile-nav";
import { PrivacySections } from "@/components/privacy/privacy-sections";
import { PrivacySidebar } from "@/components/privacy/privacy-sidebar";

export const metadata: Metadata = {
  title: "Privacy Policy - Jamro Tools",
  description:
    "Learn how Jamro Tools collects, uses, and protects your personal data across our online tools and services.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Material Symbols — required for the inline icons used throughout */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <div className="min-h-screen bg-[#f9f9ff] font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-[#111c2d]">
        <PrivacyHeader />

        <main>
          {/* Mobile hero (full-bleed bg) + Mobile jump nav */}
          <div className="md:hidden">
            <PrivacyHero />
            <PrivacyMobileNav />
            <PrivacySections />
          </div>

          {/* Desktop layout: sidebar + content */}
          <div className="mx-auto hidden max-w-[1280px] gap-12 px-4 py-12 md:flex sm:px-6">
            <PrivacySidebar />

            <div className="min-w-0 flex-1 rounded-xl border border-[#c3c6d7] bg-white p-8 shadow-sm">
              <PrivacyHero />
              <PrivacySections />
            </div>
          </div>
        </main>

        <SiteFooter hasMarginBottom={false} />
      </div>
    </>
  );
}