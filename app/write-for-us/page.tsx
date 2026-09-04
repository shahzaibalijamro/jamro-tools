import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileSectionNav } from "@/components/ui/mobile-section-nav";
import { writeForUsMobileLinks } from "@/components/write-for-us/write-for-us-data";
import { WriteForUsHero } from "@/components/write-for-us/write-for-us-hero";
import { WriteForUsSections } from "@/components/write-for-us/write-for-us-sections";
import { WriteForUsSidebar } from "@/components/write-for-us/write-for-us-sidebar";

const title = "Guest Post Guidelines & Submit an Article | Jamro Tools";
const description =
  "Submit a free guest post to Jamro Tools. Review our guest post guidelines, accepted topics, content requirements, link policy, and submission process.";
const url = "https://jamrotools.com/write-for-us";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/write-for-us" },
  openGraph: {
    title,
    description,
    url,
    siteName: "Jamro Tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name: title,
  description,
  isPartOf: { "@id": "https://jamrotools.com/#website" },
  publisher: { "@id": "https://jamrotools.com/#organization" },
  inLanguage: "en",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jamrotools.com/#website",
  url: "https://jamrotools.com/",
  name: "Jamro Tools",
  publisher: { "@id": "https://jamrotools.com/#organization" },
  inLanguage: "en",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://jamrotools.com/#organization",
  name: "Jamro Tools",
  url: "https://jamrotools.com/",
};

export default function WriteForUsPage() {
  return (
    <>
      {[webPageSchema, websiteSchema, organizationSchema].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-[#f9f9ff] font-[Inter,var(--font-inter),var(--font-geist-sans),Arial,sans-serif] text-[#111c2d] dark:bg-background dark:text-on-surface-variant">
        <SiteHeader />

        <main>
          <div className="mx-auto md:flex md:max-w-[1280px] md:gap-12 md:px-6 md:py-12">
            <WriteForUsSidebar />

            <div className="min-w-0 flex-1 md:rounded-xl md:border md:border-[#c3c6d7] md:bg-white md:p-8 md:shadow-sm md:dark:border-outline-variant md:dark:bg-surface-container">
              <WriteForUsHero />
              <MobileSectionNav
                ariaLabel="Write for Us sections"
                links={writeForUsMobileLinks}
              />
              <WriteForUsSections />
            </div>
          </div>
        </main>

        <SiteFooter hasMarginBottom={false} />
      </div>
    </>
  );
}
