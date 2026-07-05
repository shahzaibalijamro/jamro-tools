import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { precisionMetric, storyHighlight, valueCards } from "@/components/about/about-data";
import { Panel } from "@/components/about/about-ui";

export function StoryValuesSection() {
  const HighlightIcon = storyHighlight.icon;
  const MetricIcon = precisionMetric.icon;

  return (
    <>
      {/* ================================================================ */}
      {/* MOBILE Story + Values Layout                                     */}
      {/* ================================================================ */}
      <section className="mb-12 md:hidden">
        {/* Our Story with divider */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#c3c6d7]" />
            <span className="shrink-0 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#737686] uppercase tracking-widest">
              Our Story
            </span>
            <div className="h-px flex-1 bg-[#c3c6d7]" />
          </div>

          <h3 className="text-[24px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            How It All Began
          </h3>
          <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
            Jamro Tools was born from a simple frustration: getting everyday digital tasks done meant bouncing between dozens of different websites, each with its own sign‑up, paywall, or privacy risk. In 2026, we decided to fix that. What started as a small private collection of scripts has grown into a comprehensive ecosystem of over 1,000 tools, all accessible from a single, distraction‑free workspace.
          </p>

          {/* Story image */}
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-md">
            <Image
              src="/about/hero-workspace.png"
              alt="A diverse group of creative professionals collaborating in a bright modern studio"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
            Every tool is built on a straightforward belief: you should be able to get things done instantly, without handing over your data, and without having to remember which site does what.
          </p>
        </div>

        {/* Built on Values heading */}
        <h2 className="mb-6 mt-12 text-center text-[24px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
          Why Creators and Developers Choose Jamro Tools
        </h2>

        {/* Value cards — vertical stack */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#d8e3fb] dark:bg-surface-container p-6 transition-transform active:scale-[0.98]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#004ac6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
              One Medium for All Tools
            </h4>
            <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
              No more bookmarks to ten different sites. From JSON formatters to PDF editors, image compressors to password generators – every utility lives on Jamro Tools. One platform, one experience, zero fragmentation.
            </p>
          </div>

          {/* Card 2 — primary highlight */}
          <div className="rounded-xl bg-[#004ac6] dark:bg-primary-container p-6 shadow-lg transition-transform active:scale-[0.98]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-white">
              Private by Default
            </h4>
            <p className="text-[16px] leading-[1.6] text-white/80">
              There’s no sign‑up, no login, and no server‑side processing. Everything you type, paste, or upload stays locked inside your browser. We never see, store, or touch your data – because we physically can’t.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#dee8ff] dark:bg-surface-container p-6 transition-transform active:scale-[0.98]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#0058be]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.6" />
                <path d="M5.5 13.4C3.8 11.8 2 9.4 3.6 6.8" />
                <path d="M17.7 5.6c1.7 3 .8 5.4-1.2 7.4" />
              </svg>
            </div>
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
              99.9% Accuracy Standard
            </h4>
            <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
              Every calculator, converter, and formatter is tested against industry benchmarks. We obsess over precision so you can trust the output every time.
            </p>
          </div>

          {/* Card 2 — primary highlight */}
          <div className="rounded-xl bg-[#004ac6] dark:bg-primary-container p-6 shadow-lg transition-transform active:scale-[0.98]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-white">
              Unrivaled Speed
            </h4>
            <p className="text-[16px] leading-[1.6] text-white/80">
              All tools run locally using JavaScript and WebAssembly. No server round trips. Instant results, every time.
            </p>
          </div>

          <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#dee8ff] dark:bg-surface-container p-6 transition-transform active:scale-[0.98]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#0058be]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.6" />
                <path d="M5.5 13.4C3.8 11.8 2 9.4 3.6 6.8" />
                <path d="M17.7 5.6c1.7 3 .8 5.4-1.2 7.4" />
              </svg>
            </div>
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
              Zero Friction
            </h4>
            <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
              Pick a tool, drop in your input, get your output. No accounts, no tutorials, no onboarding – just pure, undiluted utility.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DESKTOP Story + Values (unchanged original)                       */}
      {/* ================================================================ */}
      <section className="mb-12 hidden gap-4 md:grid md:grid-cols-12">
        <Panel className="flex flex-col justify-between p-6 md:col-span-7">
          <div>
            <h2 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface md:text-[32px]">
              How It All Began
            </h2>
            <p className="mb-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
              Jamro Tools was born from a simple frustration: getting everyday digital tasks done meant bouncing between dozens of different websites, each with its own sign‑up, paywall, or privacy risk. In 2026, we decided to fix that. What started as a small private collection of scripts has grown into a comprehensive ecosystem of over 1,000 tools, all accessible from a single, distraction‑free workspace.
            </p>
            <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
              Every tool is built on a straightforward belief: you should be able to get things done instantly, without handing over your data, and without having to remember which site does what.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-[12px] bg-[#f0f3ff] dark:bg-surface-container p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#004ac6] text-white">
              <HighlightIcon className="size-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] dark:text-primary">
                {storyHighlight.title}
              </p>
              <p className="text-[12px] leading-[1.4] text-[#111c2d] dark:text-on-surface-variant">
                {storyHighlight.description}
              </p>
            </div>
          </div>
        </Panel>

        <div className="flex flex-col items-center justify-center rounded-[12px] bg-[#2563eb] dark:bg-primary-container p-6 text-center text-[#eeefff] shadow-lg md:col-span-5">
          <MetricIcon className="mb-4 size-16" strokeWidth={1.6} aria-hidden="true" />
          <h3 className="text-[48px] font-bold leading-none">{precisionMetric.value}</h3>
          <p className="mt-2 text-[20px] font-semibold leading-[1.4]">
            {precisionMetric.title}
          </p>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#eeefff]/80">
            {precisionMetric.description}
          </p>
        </div>

        {valueCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group cursor-default rounded-[12px] border border-[#c3c6d7] dark:border-outline-variant bg-[#dee8ff] dark:bg-surface-container p-6 transition-colors hover:border-[#004ac6] md:col-span-4"
            >
              <Icon
                className="mb-4 size-6 text-[#004ac6]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
                {card.title}
              </h3>
              <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] dark:text-on-surface-variant">
                {card.description}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
