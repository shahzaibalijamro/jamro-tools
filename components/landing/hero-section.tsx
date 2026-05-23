import Link from "next/link";
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
      <Link
        href={tool.href}
        className="flex h-[150px] flex-col items-center justify-center rounded-[18px] border border-[#e1e8f5] bg-[rgba(255,255,255,0.82)] text-center shadow-[0_4px_14px_rgba(36,61,107,0.06)] transition hover:-translate-y-0.5 hover:border-[#cbd7ed] hover:bg-white min-[700px]:h-[201px] lg:h-[150px] lg:rounded-[12px]"
      >
        <ToolIcon
          icon={tool.icon}
          tone={tool.tone}
          className="size-14 min-[700px]:size-[73px] lg:size-[55px]"
          iconClassName="size-8 min-[700px]:size-10 lg:size-8"
        />
        <span className="mt-6 text-[18px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:mt-8 min-[700px]:text-[22px] lg:mt-7 lg:text-[16px]">
          {tool.title}
        </span>
      </Link>
    </li>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#edf3ff_75%,#f2f5ff_100%)] pt-10 pb-20 min-[700px]:pt-[75px] min-[700px]:pb-[137px] lg:pt-[55px] lg:pb-[105px]">
      <Calculator
        className="absolute left-7 top-24 size-12 text-[#a9c4ff] opacity-60 min-[700px]:left-[72px] min-[700px]:top-[132px] min-[700px]:size-[68px] lg:left-[54px] lg:top-[98px] lg:size-[52px]"
        strokeWidth={3}
        aria-hidden="true"
      />
      <Code2
        className="absolute left-[68%] top-[184px] size-9 text-[#e7c7ba] opacity-80 min-[700px]:top-[250px] min-[700px]:size-[48px] lg:left-auto lg:right-[725px] lg:top-[190px] lg:size-[48px]"
        strokeWidth={3}
        aria-hidden="true"
      />
      <span
        className="hero-recycle-bounce pointer-events-none absolute right-12 bottom-12 inline-flex text-[#acc8ff] opacity-55 min-[700px]:right-[142px] min-[700px]:bottom-[115px] lg:right-[100px] lg:bottom-[78px]"
        aria-hidden="true"
      >
        <RefreshCw
          className="size-14 min-[700px]:size-[82px] lg:size-[70px]"
          strokeWidth={3}
        />
      </span>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center lg:max-w-[910px]">
          <div className="inline-flex h-10 items-center gap-2 rounded-full bg-[#d8e5ff] px-4 text-[16px] font-extrabold leading-none text-[var(--color-brand)] min-[700px]:h-[51px] min-[700px]:gap-3 min-[700px]:px-7 min-[700px]:text-[22px] lg:h-[38px] lg:px-5 lg:text-[14px]">
            <BadgeCheck className="size-6 lg:size-4" strokeWidth={2.4} aria-hidden="true" />
            <span>Trusted by 2M+ users monthly</span>
          </div>

          <h1 className="mt-7 max-w-[820px] text-[44px] font-extrabold leading-[1.08] text-[var(--color-ink)] min-[700px]:mt-[45px] min-[700px]:text-[72px] min-[700px]:leading-[1.06] lg:mt-[33px] lg:max-w-[870px] lg:text-[56px] lg:leading-[1.06]">
            <span className="lg:hidden">
              Every tool you need.
              <br />
              100% free. No sign-up.
            </span>
            <span className="hidden lg:inline">
              Every tool you need. 100% free.<br /> No
              
              sign-up.
            </span>
          </h1>

          <p className="mt-6 max-w-[760px] text-[20px] font-medium leading-[1.45] text-[var(--color-muted)] min-[700px]:mt-9 min-[700px]:text-[30px] lg:mt-6 lg:max-w-[760px] lg:text-[21px] lg:leading-[1.45]">
            Explore 1,000+ calculators, converters, generators, and utilities &ndash; all running
            securely in your browser.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 min-[700px]:mt-[76px] min-[700px]:gap-6 lg:mt-[56px] lg:flex-row lg:gap-5">
            <ButtonLink
              href="/tools"
              icon="arrow"
              className="h-14 w-full max-w-[337px] text-[16px] min-[700px]:h-[84px] min-[700px]:text-[22px] lg:h-[64px] lg:w-[250px] lg:text-[15px]"
            >
              Explore Tools
            </ButtonLink>
            <ButtonLink
              href="/tools/random"
              icon="random"
              variant="secondary"
              className="h-14 w-full max-w-[374px] text-[16px] min-[700px]:h-[87px] min-[700px]:text-[22px] lg:h-[64px] lg:w-[275px] lg:text-[15px]"
            >
              Try Random Tool
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-4 min-[700px]:mt-[137px] min-[700px]:gap-x-9 min-[700px]:gap-y-9 lg:mt-[109px] lg:grid-cols-4 lg:gap-7">
          {featuredTools.map((tool) => (
            <FeaturedToolCard key={tool.title} tool={tool} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
