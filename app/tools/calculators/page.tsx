"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import { calculatorCategories } from "@/data/calculator-tools";
import Image from "next/image";
import Link from "next/link";

export default function CalculatorsPage() {
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
          <span className="text-label-md text-primary font-bold">
            Calculators
          </span>
        </nav>

        {/* ── Hero Section ── */}
        <section className="mb-[48px] max-w-3xl">
          <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
            Calculators
          </h1>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Precision tools for finance, health, math, and daily life. Over 500
            specialized calculators at your fingertips designed for accuracy and
            ease of use.
          </p>
        </section>

        {/* ── Category Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {calculatorCategories.map((category) => (
            <Link
              key={category.title}
              href={`/tools/calculators/${category.slug}`}
              className="glass-card rounded-xl p-[24px] flex flex-col gap-[16px] transition-all duration-300 hover:shadow-lg hover:border-primary/30 group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-[48px] h-[48px] rounded-lg bg-primary-container/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-[32px]">
                  {category.icon}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-title-lg text-on-surface mb-[4px]">
                  {category.title}
                </h3>
                <p className="text-label-sm text-on-surface-variant mb-[16px]">
                  {category.description}
                </p>
                <ul className="space-y-[8px]">
                  {category.sampleTools.map((tool) => (
                    <li
                      key={tool}
                      className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-[16px] border-t border-outline-variant flex justify-between items-center">
                <span className="text-label-sm text-outline">
                  {category.count} Tools
                </span>
                <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Tool Highlights Section ── */}
        <section className="mt-[48px] grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
          {/* Featured Tool */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 h-48 md:h-auto relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF4CTAs_y0eDSSSDwMDMFFUjvZiI20DLyFtCJEs0BXfm_zzJ3uXwt2Yb7wie3SnPCVwf0AfCtYHfWcclAGFrujYBX1Zn--WyP2PaTacmNj5KPEv3jMN17d_wyoVAtmny8zeL4RXNU4mKoSui5zW8H0z_NLySdAICQSUziBR3xhvKdnFu-Ixg2yMyrBjf_OcgJHkjQcBcLBR_RZmp2D2eWkJ0KZiEJ6TL_WimpveCNJJiKVQtjq_1qeuTU2bgymKxZI4WJOcpMqLb1L"
                alt="A professional financial workstation featuring a sleek laptop displaying complex stock market charts and a high-end metal calculator"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-[24px] md:w-1/2 flex flex-col justify-center">
              <span className="text-label-sm text-primary uppercase tracking-wider mb-[4px]">
                Featured Tool
              </span>
              <h4 className="text-title-lg text-on-surface mb-[8px]">
                Smart Mortgage Planner
              </h4>
              <p className="text-body-md text-on-surface-variant mb-[16px]">
                Calculate exact monthly payments including taxes, insurance, and
                HOA fees.
              </p>
              <Link
                href="#"
                className="text-primary text-label-md flex items-center gap-[4px] hover:underline decoration-2 underline-offset-4"
              >
                Try Now{" "}
                <span className="material-symbols-outlined text-[18px]">
                  open_in_new
                </span>
              </Link>
            </div>
          </div>

          {/* New Release */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 h-48 md:h-auto relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLvzu4aIghqC6O6n-FSj8ABOMucAWe06FY4uDoktZ08KIPG9HCpdUpLDVoQ88OpAEvkZNcy0lZbrIfKTXK0wfNbzUVhS6A7DuOlvPK91_O1BZyLg0EVUVh8CWVOTmDLSLQUyM056R9AI2pRuD3tIq2E-xLrR71pG4XIchwYpsWesGBz6---Mn9kyWON-BjKhal2VVlBtjfFNlixk0n_p4ufXT1D5w16SeBTodhrWAbzRZsvvQL8njzyZHcs_HxjzDm8kYulB14DOY0"
                alt="A minimalist overhead shot of a modern fitness tracker and a glass of water on a clean white desk with a digital screen showing a health dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-[24px] md:w-1/2 flex flex-col justify-center">
              <span className="text-label-sm text-primary uppercase tracking-wider mb-[4px]">
                New Release
              </span>
              <h4 className="text-title-lg text-on-surface mb-[8px]">
                Advanced BMR Analyzer
              </h4>
              <p className="text-body-md text-on-surface-variant mb-[16px]">
                Get scientifically accurate basal metabolic rate data based on
                your daily activity.
              </p>
              <Link
                href="#"
                className="text-primary text-label-md flex items-center gap-[4px] hover:underline decoration-2 underline-offset-4"
              >
                Check Stats{" "}
                <span className="material-symbols-outlined text-[18px]">
                  open_in_new
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <ToolsCtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}