import Link from "next/link";
import { SafeLink } from "@/components/ui/safe-link";
import {
  BadgeCheck,
  Calculator,
  Code2,
  RefreshCw,
} from "lucide-react";

import { ToolIcon } from "@/components/landing/tool-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { featuredTools, type FeaturedTool } from "@/lib/landing-data";

function FeaturedToolCard({ tool }: { tool: FeaturedTool }) {
  return (
    <li>
      <SafeLink
        href={tool.href}
        className="flex h-[150px] flex-col items-center justify-center rounded-[18px] border border-[#e1e8f5] dark:border-border bg-[rgba(255,255,255,0.82)] dark:bg-glass-bg/60 text-center shadow-[0_4px_14px_rgba(36,61,107,0.06)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:border-[#cbd7ed] dark:hover:border-outline hover:bg-white dark:hover:bg-surface-container-high min-[700px]:h-[150px] min-[700px]:rounded-[12px]"
      >
        <ToolIcon
          icon={tool.icon}
          tone={tool.tone}
          className="size-14 min-[700px]:size-[55px]"
          iconClassName="size-8 min-[700px]:size-8"
        />
        <span className="mt-6 text-[18px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:mt-7 min-[700px]:text-[16px]">
          {tool.title}
        </span>
      </SafeLink>
    </li>
  );
}

export function HeroSection() {
  return (
    <section className="relative lg:py-48 overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#edf3ff_75%,#f2f5ff_100%)] dark:bg-none dark:bg-surface-container-low pt-10 pb-20 min-[700px]:pt-[55px] min-[700px]:pb-[105px]">
      <Calculator
        className="absolute left-7 top-24 size-12 text-[#a9c4ff] dark:text-primary-container/60 opacity-60 min-[700px]:left-[54px] min-[700px]:top-[98px] min-[700px]:size-[52px]"
        strokeWidth={3}
        aria-hidden="true"
      />
      <Code2
        className="absolute left-[68%] top-[184px] size-9 text-[#e7c7ba] dark:text-tertiary-container/50 opacity-80 min-[700px]:left-auto min-[700px]:right-[725px] min-[700px]:top-[190px] min-[700px]:size-[48px]"
        strokeWidth={3}
        aria-hidden="true"
      />
      <span
        className="hero-recycle-bounce pointer-events-none absolute right-12 bottom-12 inline-flex text-[#acc8ff] dark:text-primary-container/50 opacity-55 min-[700px]:right-[100px] min-[700px]:bottom-[78px]"
        aria-hidden="true"
      >
        <RefreshCw
          className="size-14 min-[700px]:size-[70px]"
          strokeWidth={3}
        />
      </span>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center min-[700px]:max-w-[910px]">
          <div className="inline-flex h-10 items-center gap-2 rounded-full bg-[#d8e5ff] dark:bg-primary-container/50 px-4 text-[16px] font-extrabold leading-none text-[var(--color-brand)] dark:text-brand-light min-[700px]:h-[38px] min-[700px]:px-5 min-[700px]:text-[14px]">
            <BadgeCheck className="size-6 min-[700px]:size-4" strokeWidth={2.4} aria-hidden="true" />
            <span>Trusted by 2M+ users monthly</span>
          </div>

          <h1 className="mt-7 max-w-[820px] text-[44px] font-extrabold leading-[1.08] text-[var(--color-ink)] min-[700px]:mt-[33px] min-[700px]:max-w-[870px] min-[700px]:text-[56px] min-[700px]:leading-[1.06]">
            <span className="min-[700px]:hidden">
              Every tool you need.
              <br />
              100% free. No sign-up.
            </span>
            <span className="hidden min-[700px]:inline">
              Every tool you need. 100% free.<br /> No

              sign-up.
            </span>
          </h1>

          <p className="mt-6 max-w-[760px] text-[20px] font-medium leading-[1.45] text-[var(--color-muted)] min-[700px]:mt-6 min-[700px]:max-w-[760px] min-[700px]:text-[21px] min-[700px]:leading-[1.45]">
            Experience lightning-fast, privacy-first utility tools that run entirely in your browser. No data leaves your machine—everything stays local and secure.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 min-[700px]:mt-[56px] min-[700px]:flex-row min-[700px]:gap-5">
            <ButtonLink
              href="/tools"
              icon="arrow"
              className="h-14 w-full max-w-[337px] text-[16px] min-[700px]:h-[64px] min-[700px]:w-[250px] min-[700px]:text-[15px] dark:hover:bg-primary-fixed-dim"
            >
              Explore Tools
            </ButtonLink>
            <ButtonLink
              href="/tools/random"
              icon="random"
              variant="secondary"
              className="h-14 w-full max-w-[374px] text-[16px] min-[700px]:h-[64px] min-[700px]:w-[275px] min-[700px]:text-[15px] dark:bg-surface dark:hover:border-primary"
            >
              Try Random Tool
            </ButtonLink>
          </div>
        </div>


        {/* <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-4 min-[700px]:mt-[109px] min-[700px]:grid-cols-4 min-[700px]:gap-7">
          {featuredTools.map((tool) => (
            <FeaturedToolCard key={tool.title} tool={tool} />
          ))}
        </ul> */}
      </Container>
    </section>
  );
}
