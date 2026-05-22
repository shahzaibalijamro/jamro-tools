import { Bolt, ShieldCheck } from "lucide-react";

export function AboutMission() {
  return (
    <section className="mb-12 md:hidden">
      <div className="glass-card rounded-xl border border-[#c3c6d7] bg-white/80 p-6 shadow-sm backdrop-blur-[12px]">
        <h2 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#004ac6]">
          Our Mission
        </h2>
        <p className="text-[18px] leading-[1.6] text-[#434655]">
          At Jamro Tools, we believe that complexity shouldn't hinder creativity. Our
          mission is to provide a unified, dependable, and lightning-fast platform where
          every digital worker finds the exact tool they need, precisely when they need it.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-full bg-[#dee8ff] px-4 py-2">
            <Bolt className="size-5 text-[#004ac6]" strokeWidth={2} aria-hidden="true" />
            <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6]">
              Speed
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#dee8ff] px-4 py-2">
            <ShieldCheck
              className="size-5 text-[#004ac6]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6]">
              Precision
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}