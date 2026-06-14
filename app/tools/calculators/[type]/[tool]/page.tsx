import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import { calculatorCategories } from "@/data/calculator-tools";
import { getToolBySlug } from "@/data/tools/index";
import { getCustomToolComponent } from "@/components/tools/calculators/registry";

interface ToolPageProps {
  params: Promise<{ type: string; tool: string }>;
}

const TOOL_META: Record<string, { title: string; description: string }> = {
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
  const override = TOOL_META[tool];

  if (!toolConfig) {
    return { title: "Tool Not Found | Jamro Tools" };
  }

  if (override) {
    return {
      title: override.title,
      description: override.description,
      alternates: { canonical: `/tools/calculators/${type}/${tool}` },
    };
  }

  return {
    title: `${toolConfig.title} | Jamro Tools`,
    description: toolConfig.description,
    alternates: { canonical: `/tools/calculators/${type}/${tool}` },
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

  // Determine what to render
  let ToolContent: React.ComponentType | null = null;
  if (toolConfig.customComponent) {
    ToolContent = getCustomToolComponent(toolConfig.customComponent);
  }

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

        {/* Tool Content */}
        {ToolContent ? (
          <ToolContent />
        ) : toolConfig.sections ? (
          <div className="text-center py-[48px] text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-[16px] block">
              construction
            </span>
            <p>This tool uses section-based rendering (not yet implemented).</p>
          </div>
        ) : (
          <div className="text-center py-[48px] text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-[16px] block">
              construction
            </span>
            <p>This tool is coming soon.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-[48px]">
          <ToolsCtaSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}