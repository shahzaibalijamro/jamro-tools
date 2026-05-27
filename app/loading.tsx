"use client";

import { useMemo } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const facts = [
  "Using a mortgage calculator before house hunting can save you an average of $23,000 in hidden costs over the life of a 30-year loan.",
  "A 1% difference in your mortgage interest rate can change your monthly payment by more than $200 — our calculators help you spot the best deal fast.",
  "Nearly 68% of first-time homebuyers regret not running the numbers first. Smart tools make smart decisions.",
  "Compounding interest works both ways — our investment calculators show how starting just 5 years earlier can nearly double your retirement savings.",
  "The average person underestimates their BMI by 15%. Our health calculators deliver science-backed numbers in seconds.",
  "Students who use GPA and grade calculators are 40% more likely to stay on track for their target academic goals.",
  "Unit conversion mistakes cause an estimated 1 in 300 engineering errors. Our precision converters help you get it right every time.",
  "Budgeting for just 10 minutes a month with our tools can reduce financial stress by up to 34%, according to behavioral finance research.",
  "The 'Rent vs Buy' decision depends on over 12 variables — our calculator crunches them all so you don't have to.",
  "Over 2 million calculations are run on JAMRO TOOLS every month. Join a community that values accuracy and clarity.",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Loading() {
  const fact = useMemo(() => {
    const shuffled = shuffleArray(facts);
    return shuffled[0];
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-grow flex items-center justify-center px-[24px] py-[48px]">
        <div className="flex flex-col items-center text-center max-w-lg">
          {/* Spinner */}
          <div className="relative mb-[32px]">
            <div className="w-[64px] h-[64px] rounded-full border-[4px] border-surface-container-high" />
            <div className="absolute inset-0 w-[64px] h-[64px] rounded-full border-[4px] border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[28px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-headline-md text-on-surface mb-[16px]">
            Loading your tools
          </h2>

          {/* Glass-card fact */}
          <div
            className="rounded-xl p-[24px] shadow-sm"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="flex items-start gap-[12px]">
              <span
                className="material-symbols-outlined text-primary text-[20px] mt-[2px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                tips_and_updates
              </span>
              <div>
                <p className="text-label-sm text-primary font-semibold uppercase tracking-tight mb-[6px]">
                  Did You Know?
                </p>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {fact}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle progress dots */}
          <div className="flex gap-[6px] mt-[24px]">
            <div className="w-[8px] h-[8px] rounded-full bg-primary animate-bounce" />
            <div className="w-[8px] h-[8px] rounded-full bg-primary animate-bounce [animation-delay:0.15s]" />
            <div className="w-[8px] h-[8px] rounded-full bg-primary animate-bounce [animation-delay:0.30s]" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}