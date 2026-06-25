import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutMission } from "@/components/about/about-mission";
import { StoryValuesSection } from "@/components/about/story-values-section";
import { TeamPhilosophySection } from "@/components/about/team-philosophy-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "About Jamro Tools – Free, Private & Browser-Based Utilities",
  description:
    "Jamro Tools is a free, privacy-first toolbox for students, developers & professionals. Every tool runs locally in your browser — zero data collected, zero sign-up.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      {/* Material Symbols for bottom nav icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <div className="min-h-screen bg-[#f9f9ff] dark:bg-background font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-[#111c2d] dark:text-on-surface-variant">
        <SiteHeader />

        <main className="mx-auto max-w-[1280px] px-4 pb-8 sm:px-6 md:pb-12">
          <AboutHero />
          <AboutMission />
          <StoryValuesSection />
          <TeamPhilosophySection />
          <AboutCta />
        </main>

        <SiteFooter hasMarginBottom={false} />
      </div>
    </>
  );
}
