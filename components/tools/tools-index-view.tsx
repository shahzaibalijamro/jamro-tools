"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToolsCtaSection } from "@/components/tools/cta-section";
import { SafeLink } from "../ui/safe-link";

/* ── Tool category data ── */
const toolCategories = [
  {
    icon: "calculate",
    title: "Calculators",
    description: "Precision math for every scenario.",
    tools: [
      { icon: "emoji_symbols", label: "Math & Geometry" },
      { icon: "payments", label: "Finance & Tax" },
      { icon: "monitor_heart", label: "Health & BMI" },
    ],
    count: "140+",
    href: "/tools/calculators",
  },
  {
    icon: "sync_alt",
    title: "Converters",
    description: "Seamless unit and data shifting.",
    tools: [
      { icon: "square_foot", label: "Unit & Measurements" },
      { icon: "currency_exchange", label: "Live Currency" },
      { icon: "database", label: "Data Formats" },
    ],
    count: "85+",
    href: "/tools/converters",
  },
  {
    icon: "troubleshoot",
    title: "SEO Tools",
    description: "Optimize your digital presence.",
    tools: [
      { icon: "link", label: "Backlink Checker" },
      { icon: "key", label: "Keyword Research" },
      { icon: "label", label: "Meta Tag Generator" },
    ],
    count: "42",
    href: "/tools/seo",
  },
  {
    icon: "terminal",
    title: "Developer",
    description: "For the modern engineer.",
    tools: [
      { icon: "code_blocks", label: "JSON Formatter" },
      { icon: "text_fields", label: "Base64 & Regex" },
      { icon: "auto_fix_high", label: "Code Beautifier" },
    ],
    count: "210+",
    href: "/tools/dev-tools",
  },
  {
    icon: "image",
    title: "Image Tools",
    description: "Edit and optimize visuals.",
    tools: [
      { icon: "photo_size_select_small", label: "Compressor" },
      { icon: "aspect_ratio", label: "Resizer" },
      { icon: "transform", label: "Format Converter" },
    ],
    count: "55",
    href: "/tools/image-tools",
  },
  {
    icon: "picture_as_pdf",
    title: "PDF Tools",
    description: "Master your documents.",
    tools: [
      { icon: "call_merge", label: "Merge & Split" },
      { icon: "compress", label: "Compress PDF" },
      { icon: "edit_document", label: "Convert to Word" },
    ],
    count: "28",
    href: "/tools/pdf-tools",
  },
  {
    icon: "subject",
    title: "Text Tools",
    description: "Clean up and analyze text.",
    tools: [
      { icon: "format_list_numbered", label: "Word Counter" },
      { icon: "title", label: "Case Converter" },
      { icon: "content_copy", label: "Remove Duplicates" },
    ],
    count: "64",
    href: "/tools/text-tools",
  },
  {
    icon: "encrypted",
    title: "Security",
    description: "Encryption and privacy first.",
    tools: [
      { icon: "password", label: "Password Generator" },
      { icon: "fingerprint", label: "MD5/SHA Hashes" },
      { icon: "lock_open", label: "Decryption" },
    ],
    count: "19",
    href: "/tools/security",
  },
];

export function ToolsIndexView() {
  const searchRef = useRef<HTMLInputElement>(null);

  /* ── CMD+K / Ctrl+K : focus search input ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="max-w-[1280px] mx-auto px-[24px] pt-[48px] pb-[48px]">
        {/* ── Hero Section ── */}
        <section className="mb-[48px] text-center">
          <div className="inline-flex items-center gap-[4px] px-[16px] py-[4px] rounded-full bg-primary/10 text-primary text-label-sm mb-[16px] border border-primary/20">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Privacy-First Utility Suite
          </div>
          <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
            Explore All Tools
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Browse our collection of 1,000+ free online utilities designed for
            speed and privacy. No registration required, just pure productivity.
          </p>

          {/* Search Bar */}
          <div className="mt-[48px] max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-[16px] flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">
                search
              </span>
            </div>
            <input
              ref={searchRef}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full pl-[48px] pr-[16px] py-[16px] focus:ring-2 focus:ring-primary/50 transition-all text-body-md shadow-sm outline-none dark:text-slate-100"
              placeholder="Search for a tool (e.g. JSON formatter, PDF merge)..."
              type="text"
            />
            <div className="absolute right-[8px] top-[8px]">
              <kbd className="hidden md:inline-block px-[8px] py-[4px] bg-surface-variant text-outline rounded text-xs font-sans">
                CMD + K
              </kbd>
            </div>
          </div>
        </section>

        {/* ── Tool Directory Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {toolCategories.map((category) => (
            <SafeLink
              key={category.title}
              href={category.href}
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
                  {category.tools.map((tool) => (
                    <li
                      key={tool.label}
                      className="flex items-center gap-[4px] text-body-md text-on-surface-variant group-hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {tool.icon}
                      </span>{" "}
                      {tool.label}
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
            </SafeLink>
          ))}
        </section>

        {/* ── Newsletter / Request CTA ── */}
        <ToolsCtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
