"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import { calculatorCategories } from "@/data/calculator-tools";

export default function CalculatorTypePage() {
  const { type } = useParams<{ type: string }>();
  const category = calculatorCategories.find((c) => c.slug === type);
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    if (!category) return [];
    if (!search.trim()) return category.tools;
    return category.tools.filter((tool) =>
      tool.toLowerCase().includes(search.toLowerCase()),
    );
  }, [category, search]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-[64px] text-outline mb-[16px] block">
            search_off
          </span>
          <h2 className="text-headline-md text-on-surface mb-[8px]">
            Category Not Found
          </h2>
          <p className="text-body-md text-on-surface-variant mb-[24px]">
            The calculator category you're looking for doesn't exist.
          </p>
          <Link
            href="/tools/calculators"
            className="inline-flex items-center gap-[4px] text-primary text-label-md hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Back to Calculators
          </Link>
        </div>
      </div>
    );
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
                className="block w-full pl-[48px] pr-[16px] py-[16px] bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none"
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
              <Link
                key={tool}
                href="#"
                className="glass-card p-[16px] rounded-lg flex items-center justify-between group hover:bg-primary/5 transition-all border border-outline-variant/30"
              >
                <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">
                  {tool}
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary opacity-0 group-hover:opacity-100 transition-all">
                  arrow_forward
                </span>
              </Link>
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