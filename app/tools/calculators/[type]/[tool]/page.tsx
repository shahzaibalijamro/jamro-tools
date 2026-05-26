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