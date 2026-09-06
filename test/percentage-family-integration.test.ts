import { afterEach, describe, expect, it, vi } from "vitest";

import sitemap from "@/app/sitemap";
import { buildToolJsonLd, generateMetadata } from "@/app/tools/calculators/[type]/[tool]/page";
import { getRegisteredCustomToolNames } from "@/components/tools/calculators/registry";
import { calculatorCategories } from "@/data/calculator-tools";
import { allTools, getToolBySlug } from "@/data/tools";
import { searchTools } from "@/lib/search-index";

const expected = [
  [
    "percentage-decrease-calculator",
    "Percentage Decrease Calculator",
    "Percentage Decrease Calculator - Calculate Percent Decrease | Jamro Tools",
    "Use our free Percentage Decrease Calculator to calculate the percent decrease from an original value to a new value, with the formula and steps.",
  ],
  [
    "percentage-difference-calculator",
    "Percentage Difference Calculator",
    "Percentage Difference Calculator - Compare Two Values | Jamro Tools",
    "Use our free Percentage Difference Calculator to compare two values relative to their average, with instant results, the formula, and steps.",
  ],
  [
    "percentage-change-calculator",
    "Percentage Change Calculator",
    "Percentage Change Calculator - Calculate Percent Change | Jamro Tools",
    "Use our free Percentage Change Calculator to calculate a signed percentage change from an original value to a new value, with the formula and steps.",
  ],
  [
    "percentage-error-calculator",
    "Percentage Error Calculator",
    "Percentage Error Calculator - Calculate Percent Error | Jamro Tools",
    "Use our free Percentage Error Calculator to compare a measured value with a reference value and see the percent error, formula, and steps.",
  ],
  [
    "percentage-increase-calculator",
    "Percentage Increase Calculator",
    "Percentage Increase Calculator - Calculate Percent Increase | Jamro Tools",
    "Use our free Percentage Increase Calculator to calculate the percent increase from an original value to a new value, with the formula and steps.",
  ],
] as const;

afterEach(() => vi.unstubAllEnvs());

describe("percentage family content and discovery", () => {
  it.each(expected)("owns the approved config and metadata for %s", async (slug, title, metadataTitle, metadataDescription) => {
    const config = getToolBySlug(slug)!;
    const path = `/tools/calculators/math/${slug}`;
    expect(config).toMatchObject({ slug, title, category: "math" });
    expect(config.metadata).toEqual({ title: metadataTitle, description: metadataDescription });
    expect(allTools.filter((tool) => tool.slug === slug)).toHaveLength(1);
    expect(searchTools(title)[0]).toMatchObject({ slug, href: path, implemented: true });

    const metadata = await generateMetadata({ params: Promise.resolve({ type: "math", tool: slug }) });
    expect(metadata).toMatchObject({
      title: metadataTitle,
      description: metadataDescription,
      alternates: { canonical: `https://jamrotools.com${path}` },
      openGraph: { title: metadataTitle, description: metadataDescription, url: `https://jamrotools.com${path}` },
      twitter: { title: metadataTitle, description: metadataDescription },
    });
  });

  it("keeps configs, registry, directory labels, and family links one-to-one", () => {
    const math = calculatorCategories.find(({ slug }) => slug === "math")!;
    const familyConfigs = expected.map(([slug]) => getToolBySlug(slug)!);
    const registered = new Set(getRegisteredCustomToolNames());
    for (const config of familyConfigs) {
      expect(registered.has(config.customComponent!)).toBe(true);
      expect(math.tools).toContain(config.title);
      expect(config.pageContent?.relatedTools).toHaveLength(4);
      for (const related of config.pageContent?.relatedTools ?? []) {
        const relatedSlug = related.href.split("/").at(-1)!;
        expect(getToolBySlug(relatedSlug)).toBeTruthy();
      }
    }
  });

  it("emits only the approved route-correct JSON-LD graph nodes and visible FAQs", () => {
    for (const [slug] of expected) {
      const config = getToolBySlug(slug)!;
      const jsonLd = buildToolJsonLd(config, "Math") as { "@graph": Array<Record<string, unknown>> };
      const types = jsonLd["@graph"].map((node) => node["@type"]);
      expect(types).toEqual(["WebPage", "WebApplication", "BreadcrumbList", "FAQPage"]);
      expect(types).not.toContain("WebSite");
      expect(types).not.toContain("Organization");
      const serialized = JSON.stringify(jsonLd);
      expect(serialized).toContain(`https://jamrotools.com/tools/calculators/math/${slug}`);
      expect(serialized).not.toContain("SearchAction");

      const faqNode = jsonLd["@graph"].find((node) => node["@type"] === "FAQPage")!;
      const structuredFaq = faqNode.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>;
      expect(structuredFaq.map(({ name, acceptedAnswer }) => ({ q: name, a: acceptedAnswer.text }))).toEqual(config.pageContent?.faq);
    }
  });

  it("contains no prohibited claims or runtime source-material imports", () => {
    const familyText = JSON.stringify(expected.map(([slug]) => getToolBySlug(slug)));
    for (const claim of ["JamroTools", "universally accepted", "lightning-fast", "zero latency"]) {
      expect(familyText.toLowerCase()).not.toContain(claim.toLowerCase());
    }
  });

  it("adds every canonical family URL to the sitemap exactly once", async () => {
    vi.stubEnv("NEXT_PUBLIC_JAMRO_TEST_MODE", "fixtures");
    const entries = await sitemap();
    for (const [slug] of expected) {
      const url = `https://jamrotools.com/tools/calculators/math/${slug}`;
      expect(entries.filter((entry) => entry.url === url)).toHaveLength(1);
    }
  });
});
