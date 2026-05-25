"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import Image from "next/image";
import Link from "next/link";

/* ── Calculator category data ── */
const calculatorCategories = [
  {
    icon: "payments",
    title: "Financial",
    iconBg: "bg-primary/10",
    iconBgHover: "group-hover:bg-primary",
    tools: ["Mortgage", "ROI", "Tip"],
  },
  {
    icon: "calculate",
    title: "Math",
    iconBg: "bg-secondary/10",
    iconBgHover: "group-hover:bg-secondary",
    tools: ["Percentage", "Fraction", "Algebra"],
  },
  {
    icon: "monitoring",
    title: "Health",
    iconBg: "bg-tertiary/10",
    iconBgHover: "group-hover:bg-tertiary",
    tools: ["BMI", "Calorie", "BMR"],
  },
  {
    icon: "straighten",
    title: "Unit",
    iconBg: "bg-primary/10",
    iconBgHover: "group-hover:bg-primary",
    tools: ["Area", "Volume", "Speed"],
  },
  {
    icon: "schedule",
    title: "Date & Time",
    iconBg: "bg-secondary/10",
    iconBgHover: "group-hover:bg-secondary",
    tools: ["Age", "Duration", "Time Zone"],
  },
  {
    icon: "settings_suggest",
    title: "Engineering",
    iconBg: "bg-tertiary/10",
    iconBgHover: "group-hover:bg-tertiary",
    tools: ["Ohm's Law", "Torque", "Pressure"],
  },
  {
    icon: "biotech",
    title: "Science",
    iconBg: "bg-primary/10",
    iconBgHover: "group-hover:bg-primary",
    tools: ["Molarity", "Half-Life", "Force"],
  },
  {
    icon: "more_horiz",
    title: "Others",
    iconBg: "bg-on-surface-variant/10",
    iconBgHover: "group-hover:bg-on-surface-variant",
    tools: ["GPA", "Grade", "Random Number"],
  },
];

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

        {/* ── Bento Grid Categories ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {calculatorCategories.map((category) => (
            <div
              key={category.title}
              className="bg-surface-container-lowest p-[24px] rounded-xl shadow-sm border border-outline-variant hover:border-primary transition-all group"
            >
              {/* Icon */}
              <div
                className={`w-[48px] h-[48px] ${category.iconBg} rounded-lg flex items-center justify-center mb-[16px] ${category.iconBgHover} group-hover:text-white transition-colors`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {category.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-title-lg text-on-surface mb-[8px]">
                {category.title}
              </h3>

              {/* Tool List */}
              <ul className="space-y-[16px]">
                {category.tools.map((tool) => (
                  <li
                    key={tool}
                    className="flex items-center gap-[8px] text-body-md text-on-surface-variant hover:text-primary cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
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