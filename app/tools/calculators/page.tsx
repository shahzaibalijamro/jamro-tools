"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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

        {/* ── CTA Section (reused from tools/page.tsx) ── */}
        <section className="mt-[48px] p-[48px] rounded-2xl bg-inverse-surface text-on-primary-fixed-variant flex flex-col md:flex-row items-center justify-between gap-[24px] overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-headline-md text-surface-bright mb-[8px]">
              Can't find a specific tool?
            </h2>
            <p className="text-body-md text-surface-variant opacity-80 max-w-lg">
              We're constantly adding new utilities to our ecosystem. Let
              us know what you're looking for and we'll build it for
              the community.
            </p>
            <button className="mt-[24px] px-[48px] py-[16px] bg-primary-container text-on-primary rounded-full text-label-md font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-lg cursor-pointer">
              Submit Tool Request
            </button>
          </div>
          <div className="w-[256px] h-[256px] md:w-[320px] md:h-[320px] bg-primary/20 rounded-full blur-[100px] absolute -right-[80px] -top-[80px]" />
          <div className="w-full md:w-[400px] aspect-[3/2] relative z-10 rounded-xl overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy3BakiwxG6qRWqcUxPr02ch-EMk444gMPbA9ODLZeyOtLhRBMoCkFYUjrTCzWetco9HRCViApNi2NuWrCnIJpf4YsYGBGUrDHIgwwS3VP8kJuH0w2tsNz8GAAtsH076s5FpnIVthYs8mFA5MLcrKm0zJtvbN4qLcd7KFEl04R4LHWZmyvxc_4HdIUMiB96U03T6ijbpy5PU2J-X9bGwa83k7WcIDcqoASQZdvHZIm9yuBCpgVNQWnvH44JA7oDhEeGHmQM4-X8C_L"
              alt="Digital building blocks and floating interface elements illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}