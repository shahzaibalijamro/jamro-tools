import type { Metadata } from "next";


import { NotFoundMain } from "@/components/not-found/not-found-main";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Jamro Tools",
  description:
    "The utility you're looking for seems to have vanished into the digital void. Browse our workshop of free calculators, converters, and developer tools instead.",
};

export default function NotFoundPage() {
  return (
    <>
      {/* Material Symbols — required for inline icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />

      <div className="min-h-screen flex flex-col bg-surface font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-on-surface">
        <SiteHeader />
        <NotFoundMain />
        <SiteFooter />
      </div>
    </>
  );
}