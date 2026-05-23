import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutFooter } from "@/components/about/about-footer";
import { AboutHeader } from "@/components/about/about-header";
import { AboutHero } from "@/components/about/about-hero";
import { AboutMission } from "@/components/about/about-mission";
import { MobileBottomNav } from "@/components/about/mobile-bottom-nav";
import { StoryValuesSection } from "@/components/about/story-values-section";
import { TeamPhilosophySection } from "@/components/about/team-philosophy-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "About Us - Jamro Tools",
  description:
    "Learn about the mission, story, and team behind Jamro Tools' library of free utilities.",
};

export default function AboutPage() {
  return (
    <>
      {/* Material Symbols for bottom nav icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <div className="min-h-screen bg-[#f9f9ff] font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-[#111c2d]">
        <AboutHeader />

        <main className="mx-auto max-w-[1280px] px-4 pb-12 pb-20 sm:px-6 md:pb-12">
          <AboutHero />
          <AboutMission />
          <StoryValuesSection />
          <TeamPhilosophySection />
          <AboutCta />
        </main>

        <SiteFooter hasMarginBottom={true} />
        <MobileBottomNav />
      </div>
    </>
  );
}
