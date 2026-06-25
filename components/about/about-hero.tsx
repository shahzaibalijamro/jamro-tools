import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { missionFacts } from "@/components/about/about-data";

export function AboutHero() {
  return (
    <section className="mb-12 md:grid md:grid-cols-2 md:items-center md:gap-12">
      {/* Mobile Hero Image — full-width, pinned to top with gradient overlay */}
      <div className="relative -mx-4 mb-8 h-[340px] sm:-mx-6 md:mx-0 md:mb-0 md:hidden">
        <Image
          src="/about/hero-workspace.png"
          alt="A clean, minimalist high-tech office workspace with large windows letting in soft, natural daylight"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9ff] dark:from-[#0b1120] via-[#f9f9ff]/40 dark:via-[#0b1120]/40 to-transparent" />
      </div>

      <div>
        <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-[#dbe1ff]/80 dark:bg-surface-container/80 px-4 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#00174b] dark:text-on-surface-variant">
          Our Journey
        </span>
        <h1 className="mb-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#111c2d] dark:text-on-surface md:text-[48px] md:leading-[1.1] md:tracking-[-0.02em]">
          Tools for the Modern Creator.
        </h1>
        <p className="max-w-sm text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant md:max-w-xl md:text-[18px]">
          We build the digital Swiss Army knife for your everyday productivity needs.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          {missionFacts.map((fact) => (
            <div key={fact} className="flex items-center gap-2">
              <CheckCircle2
                className="size-5 text-[#004ac6]"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#111c2d] dark:text-on-surface-variant">
                {fact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Hero Image */}
      <div className="relative hidden md:mt-8  h-[280px] overflow-hidden rounded-[12px] shadow-xl sm:h-[340px]  md:block md:h-[400px]">
        <Image
          src="/about/hero-workspace.png"
          alt="Modern workspace with screens and design tools"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
