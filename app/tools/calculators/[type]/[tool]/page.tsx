import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { calculatorCategories } from "@/data/calculator-tools";
import { allTools, getToolBySlug } from "@/data/tools/index";
import {
  CustomToolRenderer,
  hasCustomToolComponent,
} from "@/components/tools/calculators/registry";
import { FaqSection } from "@/components/ui/faq-section";
import {
  ToolEditorialContent,
  ToolPageRail,
} from "@/components/tools/tool-page-content";
import { getRandomBlogTeasers } from "@/lib/blog-teasers";
import type { ToolConfig, ToolLink } from "@/data/tools/types";

interface ToolPageProps {
  params: Promise<{ type: string; tool: string }>;
}

const TOOL_META: Record<string, { title: string; description: string }> = {
  "net-worth-calculator": {
    title: "Net Worth Calculator - Assets, Liabilities & Age Benchmark",
    description: "Calculate your net worth instantly by totaling assets, subtracting liabilities, and comparing your result with 2026 age-based median benchmarks.",
  },
  "roi-calculator": {
    title: "ROI Calculator - Return on Investment & Profit Margin",
    description: "Calculate simple and annualized ROI, plus gross, operating, and net profit margins for any investment or business scenario.",
  },
  "401k-planner": {
    title: "401(k) Planner - Retirement Savings & Employer Match Calculator",
    description: "Project your 401(k) balance, employer match, compound growth, and estimated retirement income.",
  },
  "student-loan-calculator": {
    title: "Student Loan Calculator - Standard vs. Income-Driven Plans",
    description: "Compare Standard, Tiered Standard, IBR, and RAP student loan payments and projected costs using your balance, interest rate, and income.",
  },
  "credit-card-payoff-calculator": {
    title: "Credit Card Payoff Calculator - Avalanche vs. Snowball",
    description: "Compare credit card payoff timelines and interest using minimum payments, debt avalanche, or debt snowball strategies.",
  },
  "income-tax-calculator": {
    title: "Income Tax Calculator - 2026 Federal Brackets, Deductions & Withholding",
    description: "Estimate your 2026 federal income tax, taxable income, effective rate, marginal rate, and projected refund or balance due.",
  },
  "mortgage-calculator": {
    title: "Free Mortgage Calculator – Monthly Payment, PMI & Amortization",
    description:
      "Calculate your exact monthly mortgage payment with principal, interest, PMI & taxes. View full amortization schedule. Free, no sign-up, results in seconds.",
  },
  "cylinder-volume-calculator": {
    title: "Cylinder Volume Calculator – V=πr²h | Free Online Tool",
    description:
      "Calculate cylinder volume instantly using V=πr²h. Enter radius & height — get volume, surface area & base area in cubic inches, cm³, liters & more. Free.",
  },
  "percentage-decrease-calculator": {
    title: "Percentage Decrease Calculator – Instant % Drop & Formula",
    description:
      "Find the exact percentage decrease between any two values in seconds. See the absolute drop, retention rate & step-by-step formula. Free, no sign-up needed.",
  },
  "triple-integral-calculator": {
    title: "Triple Integral Calculator – Step-by-Step, Free Online",
    description:
      "Evaluate definite triple integrals over rectangular regions with Fubini's Theorem. Step-by-step visualization included. Free online calculator — no sign-up.",
  },
};

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { type, tool } = await params;
  const toolConfig = getToolBySlug(tool);
  const override = toolConfig?.metadata ?? TOOL_META[tool];

  if (!toolConfig) {
    return { title: "Tool Not Found | Jamro Tools" };
  }

  const title = override ? override.title : `${toolConfig.title} | Jamro Tools`;
  const description = override ? override.description : toolConfig.description;
  const url = `https://jamrotools.com/tools/calculators/${type}/${tool}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { type, tool } = await params;

  // Look up the tool config
  const toolConfig = getToolBySlug(tool);
  if (!toolConfig) {
    notFound();
  }

  // Validate category matches
  if (toolConfig.category !== type) {
    notFound();
  }

  // Look up the category for breadcrumbs and title
  const category = calculatorCategories.find((c) => c.slug === type);
  const categoryTitle = category ? category.title : type;

  const componentName = toolConfig.customComponent;
  const hasInteractiveTool = Boolean(
    componentName && hasCustomToolComponent(componentName),
  );
  const blogs = await getRandomBlogTeasers(3);
  const relatedTools = getRelatedTools(toolConfig);
  const jsonLd = toolConfig.pageContent
    ? buildToolJsonLd(toolConfig, categoryTitle)
    : null;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="max-w-[1280px] mx-auto px-[24px] pt-[48px] pb-[48px]">
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-[4px] mb-[24px] text-on-surface-variant">
          <Link
            href="/tools"
            className="text-label-md hover:text-primary transition-colors"
          >
            Tools
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <Link
            href="/tools/calculators"
            className="text-label-md hover:text-primary transition-colors"
          >
            Calculators
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <Link
            href={`/tools/calculators/${type}`}
            className="text-label-md hover:text-primary transition-colors"
          >
            {categoryTitle}
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-label-md text-primary font-bold">{toolConfig.title}</span>
        </nav>

        {/* ── Hero Section ── */}
        <section className="mb-[48px] flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <div className="max-w-2xl">
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
              {toolConfig.title}
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {toolConfig.description}
            </p>
          </div>
        </section>

        {jsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}

        <div className="tool-page-layout">
          {hasInteractiveTool && componentName ? (
            <CustomToolRenderer name={componentName} />
          ) : (
            <div data-tool-workspace aria-hidden="true" className="min-h-[360px]" />
          )}

          {toolConfig.pageContent ? (
            <ToolEditorialContent blocks={toolConfig.pageContent.blocks} />
          ) : null}

          <ToolPageRail
            relatedTools={relatedTools}
            blogs={blogs}
          />

          {toolConfig.pageContent?.faq ? (
            <FaqSection items={toolConfig.pageContent.faq} />
          ) : null}

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function getRelatedTools(currentTool: ToolConfig): ToolLink[] {
  const sameCategoryTools = allTools.filter(
    (tool) =>
      tool.slug !== currentTool.slug &&
      tool.category === currentTool.category,
  );
  const configuredHrefs = new Set(
    currentTool.pageContent?.relatedTools?.map((tool) => tool.href) ?? [],
  );

  return sameCategoryTools
    .sort((first, second) => {
      const firstHref = `/tools/calculators/${first.category}/${first.slug}`;
      const secondHref = `/tools/calculators/${second.category}/${second.slug}`;
      return Number(configuredHrefs.has(secondHref)) - Number(configuredHrefs.has(firstHref));
    })
    .slice(0, 4)
    .map((tool) => ({
      title: tool.title,
      href: `/tools/calculators/${tool.category}/${tool.slug}`,
    }));
}

function buildToolJsonLd(toolConfig: ToolConfig, categoryTitle: string) {
  const siteUrl = "https://jamrotools.com";
  const path = `/tools/calculators/${toolConfig.category}/${toolConfig.slug}`;
  const pageUrl = `${siteUrl}${path}`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const webappId = `${pageUrl}#webapp`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;
  const metadata = toolConfig.metadata ?? {
    title: `${toolConfig.title} | Jamro Tools`,
    description: toolConfig.description,
  };
  const faq = toolConfig.pageContent?.faq ?? [];

  const webpage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": webpageId,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    isPartOf: { "@id": websiteId },
    breadcrumb: { "@id": breadcrumbId },
    mainEntity: { "@id": webappId },
  };

  if (faq.length > 0) {
    webpage.hasPart = { "@id": faqId };
  }

  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: "Jamro Tools",
      description: metadata.description,
    },
    webpage,
    {
      "@type": "WebApplication",
      "@id": webappId,
      url: pageUrl,
      name: toolConfig.title,
      description: toolConfig.description,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools/` },
        { "@type": "ListItem", position: 3, name: "Calculators", item: `${siteUrl}/tools/calculators/` },
        { "@type": "ListItem", position: 4, name: categoryTitle, item: `${siteUrl}/tools/calculators/${toolConfig.category}/` },
        { "@type": "ListItem", position: 5, name: toolConfig.title, item: pageUrl },
      ],
    },
  ];

  if (faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
