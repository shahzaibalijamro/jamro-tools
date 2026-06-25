"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import { type CalculatorCategory } from "@/data/calculator-tools";
import { SafeLink } from "@/components/ui/safe-link";

function toToolSlug(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface CalculatorTypeViewProps {
  category: CalculatorCategory;
}

export function CalculatorTypeView({ category }: CalculatorTypeViewProps) {
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    if (!search.trim()) return category.tools;
    return category.tools.filter((tool) =>
      tool.toLowerCase().includes(search.toLowerCase()),
    );
  }, [category.tools, search]);

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
          <span className="text-label-md text-primary font-bold">
            {category.title}
          </span>
        </nav>

        {/* ── Hero Section ── */}
        <section className="mb-[48px] flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <div className="max-w-2xl">
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
              {category.title} Calculators
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 self-end">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-primary">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-[48px] pr-[16px] py-[16px] bg-white dark:bg-surface-container border border-outline-variant dark:border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none"
                placeholder={`Search ${category.title.toLowerCase()} tools...`}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── Tool Cards Grid ── */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[16px]">
            {filteredTools.map((tool) => (
              <SafeLink
                key={tool}
                href={`/tools/calculators/${category.slug}/${toToolSlug(tool)}`}
                className="glass-card p-[16px] rounded-lg flex items-center justify-between group hover:bg-primary/5 transition-all border border-outline-variant/30"
              >
                <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">
                  {tool}
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary opacity-0 group-hover:opacity-100 transition-all">
                  arrow_forward
                </span>
              </SafeLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-[64px]">
            <span className="material-symbols-outlined text-[48px] text-outline mb-[16px] block">
              search_off
            </span>
            <p className="text-body-lg text-on-surface-variant">
              No calculators match "{search}"
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-[16px] text-primary text-label-md hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* ── CTA Section ── */}
        <ToolsCtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
