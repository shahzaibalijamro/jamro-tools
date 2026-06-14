import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { TermsHero } from "@/components/terms/terms-hero";
import { TermsSections } from "@/components/terms/terms-sections";
import { TermsSidebar } from "@/components/terms/terms-sidebar";
import { TermsContentCard } from "@/components/terms/terms-content-card";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Terms of Service - Jamro Tools",
  description:
    "Read the Terms of Service for Jamro Tools. Understand the rules, disclaimers, and legal conditions governing your use of our digital utility platform.",
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      {/* Material Symbols — required for the inline icons used throughout */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <div className="min-h-screen bg-[#f9f9ff] font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-[#111c2d]">
        <SiteHeader />

        <main className="relative overflow-hidden pt-4 pb-8">
          {/* Dot-grid pattern background (desktop only) */}
          <div className="pointer-events-none absolute inset-0 -z-10 hidden tos-grid-pattern md:block" />

          {/* Mobile layout (full-bleed) */}
          <div className="md:hidden">
            <TermsHero />
            <TermsSections />
          </div>

          {/* Desktop layout: sidebar + content */}
          <div className="mx-auto hidden max-w-[1280px] gap-12 px-4 md:flex sm:px-6">
            <TermsSidebar />

            <TermsContentCard>
              <TermsHero />
              <TermsSections />
            </TermsContentCard>
          </div>
        </main>

        {/* Desktop-only CTA card ("Still have questions?") */}
        <div className="mx-auto hidden max-w-[1280px] px-4 pb-8 md:block sm:px-6" id="contact">
          <div className="rounded-xl bg-[#004ac6] p-8 text-white">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="space-y-1">
                <h3 className="text-[20px] font-semibold leading-[1.4]">
                  Still have questions?
                </h3>
                <p className="text-[16px] leading-[1.6] opacity-90">
                  Our legal team and support specialists are here to help you understand our
                  policies.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] transition-all hover:bg-white/90 active:scale-95"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <SiteFooter hasMarginBottom={false} />
      </div>
    </>
  );
}