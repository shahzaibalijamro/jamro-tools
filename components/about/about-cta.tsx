import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutCta() {
  return (
    <>
      {/* MOBILE CTA — dark inverse-surface background, rounded top */}
      <section className="rounded-3xl bg-[#263143] px-4 py-12 text-center md:hidden">
        <h3 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#ecf1ff]">
          Ready to work smarter?
        </h3>
        <p className="mb-6 text-[16px] leading-[1.6] text-[#c3c6d7]">
          Join millions of users who rely on Jamro Tools daily.
        </p>
        <Link
          href="/tools"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#004ac6] py-4 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-transform active:scale-95"
        >
          Explore All Tools
          <ArrowRight className="size-5" strokeWidth={2} aria-hidden="true" />
        </Link>
      </section>

      {/* DESKTOP CTA */}
      <section className="hidden rounded-[12px] border border-[#c3c6d7] bg-[#e7eeff] p-8 text-center md:block md:p-12">
        <h2 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#111c2d] md:text-[32px]">
          Ready to start working faster?
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-[16px] leading-[1.6] text-[#434655]">
          Explore our collection of over 1,000 calculators, converters, and developer
          utilities today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tools"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#004ac6] px-12 py-3 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all active:scale-95 hover:shadow-[0_10px_24px_rgba(0,74,198,0.18)]"
          >
            Explore All Tools
          </Link>
          <Link
            href="/support"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#004ac6] px-12 py-3 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] transition-all active:scale-95 hover:bg-[#004ac6]/5"
          >
            Support the Project
          </Link>
        </div>
      </section>
    </>
  );
}
