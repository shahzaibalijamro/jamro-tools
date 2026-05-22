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

          <h3 className="text-[24px] font-semibold leading-[1.2] text-[#111c2d]">
            From a single script to a global suite.
          </h3>
          <p className="text-[16px] leading-[1.6] text-[#434655]">
            Jamro Tools started as a personal collection of utility scripts meant to solve
            recurring tasks in development and design. We realized that thousands of
            creators were facing the same friction points—switching between twenty tabs
            just to format a string or convert a unit.
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

          <p className="text-[16px] leading-[1.6] text-[#434655]">
            Today, we serve a global community, offering hundreds of optimized tools while
            maintaining the same lightweight, no-nonsense approach that defined our very
            first tool.
          </p>
        </div>

        {/* Built on Values heading */}
        <h2 className="mb-6 mt-12 text-center text-[24px] font-semibold leading-[1.2] text-[#111c2d]">
          Built on Values
        </h2>

        {/* Value cards — vertical stack */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-[#c3c6d7] bg-[#d8e3fb] p-6 transition-transform active:scale-[0.98]">
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
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
              Privacy First
            </h4>
            <p className="text-[16px] leading-[1.6] text-[#434655]">
              Your data never leaves your browser. We prioritize client-side processing
              for ultimate security.
            </p>
          </div>

          {/* Card 2 — primary highlight */}
          <div className="rounded-xl bg-[#004ac6] p-6 shadow-lg transition-transform active:scale-[0.98]">
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
              Universal Access
            </h4>
            <p className="text-[16px] leading-[1.6] text-white/80">
              Every tool is designed to be accessible, regardless of your technical
              background or device.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-[#c3c6d7] bg-[#dee8ff] p-6 transition-transform active:scale-[0.98]">
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
            <h4 className="mb-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
              Lightweight Footprint
            </h4>
            <p className="text-[16px] leading-[1.6] text-[#434655]">
              We strip away the bloat. Jamro Tools loads instantly, saving you time and
              battery life.
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
            <h2 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#111c2d] md:text-[32px]">
              Our Story
            </h2>
            <p className="mb-4 text-[16px] leading-[1.6] text-[#434655]">
              Jamro Tools started as a small internal collection of scripts used by a
              group of developers to automate repetitive daily tasks. We realized that
              many of the tools available online were either behind paywalls, cluttered
              with intrusive ads, or lacked proper privacy standards.
            </p>
            <p className="text-[16px] leading-[1.6] text-[#434655]">
              In 2024, we decided to polish these tools and open them to the world. What
              began as 50 simple scripts has grown into a comprehensive ecosystem of over
              1,000 utilities, maintained by a community of contributors who believe in
              the democratization of digital tools.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-[12px] bg-[#f0f3ff] p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#004ac6] text-white">
              <HighlightIcon className="size-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6]">
                {storyHighlight.title}
              </p>
              <p className="text-[12px] leading-[1.4] text-[#111c2d]">
                {storyHighlight.description}
              </p>
            </div>
          </div>
        </Panel>

        <div className="flex flex-col items-center justify-center rounded-[12px] bg-[#2563eb] p-6 text-center text-[#eeefff] shadow-lg md:col-span-5">
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
              className="group cursor-default rounded-[12px] border border-[#c3c6d7] bg-[#dee8ff] p-6 transition-colors hover:border-[#004ac6] md:col-span-4"
            >
              <Icon
                className="mb-4 size-6 text-[#004ac6]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
                {card.title}
              </h3>
              <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]">
                {card.description}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
