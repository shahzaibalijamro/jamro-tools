"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo } from "react";

const CIRCUMFERENCE = 691; // 2 * π * 110 ≈ 691.15

const faqItems = [
  {
    q: `What is a percentage decrease calculator?`,
    a: `A percentage decrease calculator is an online mathematical tool that determines the rate of decline between an original starting number and a new, smaller number. By automating the calculation, it instantly tells you exactly how much a value has shrunk in terms of a percentage, making it an essential utility for calculating discounts, financial losses, and statistical drops.`,
  },
  {
    q: `What is the exact formula for percentage decrease?`,
    a: `The universally accepted mathematical formula for finding a percentage decrease is:
Percentage Decrease = ((Original Value - New Value) / Original Value) * 100
To calculate this manually: first, subtract the new value from the original value to find the difference. Next, divide that difference by the original value. Finally, multiply that decimal result by 100 to convert it into a percentage.`,
  },
  {
    q: `What is the difference between percentage decrease and percentage increase?`,
    a: `Both calculations measure the relative change between two numbers, but they track opposite directions of movement. Percentage decrease measures how much a value has shrunk compared to its starting point (where the new number is smaller). Percentage increase measures how much a value has grown compared to its starting point (where the new number is larger).`,
  },
  {
    q: `Why is my percentage decrease calculation showing a negative number?`,
    a: `If you are calculating a percentage decrease and the result is a negative number, it means the value actually went up, not down. This happens when the "New Value" you entered is larger than your "Original Value." In mathematical terms, a negative decrease is simply a percentage increase.`,
  },
  {
    q: `Can I use this calculator to figure out store discounts?`,
    a: `Yes, this calculator is perfect for figuring out exact store discounts. If a jacket originally cost $150 and is now on sale for $90, you can plug those numbers into the calculator. It will instantly reveal that the price dropped by $60, which equals a 40% percentage decrease (or a 40% off discount).`,
  },
  {
    q: `How do I find the original value if I only know the new value and the percent decrease?`,
    a: `To work backward and find the original starting value, you must divide the new value by 1 minus the percentage decrease (expressed as a decimal). The formula is:
Original Value = New Value / (1 - Percentage Decrease)
For example, if you bought an item for $80 after a 20% decrease, you divide 80 by 0.80 (which is 1 - 0.20) to find the original price of $100.`,
  },
  {
    q: `Does a 100% decrease mean the value is zero?`,
    a: `Yes, a 100% decrease means the entire original value has been subtracted, leaving you with exactly zero. For example, if you have 50 items in inventory and experience a 100% decrease, you have lost all 50 items, and your new inventory count is 0.`,
  },
  {
    q: `How is calculating a percentage drop useful in SEO and digital marketing?`,
    a: `In digital marketing, tracking percentage decreases is vital for auditing performance drops. Marketers use this specific calculation to measure a sudden decline in organic search traffic, a drop in keyword rankings, or a reduction in bounce rates. Understanding the exact percentage of the drop helps professionals gauge the severity of an algorithm update or a technical site error.`,
  },
]

export default function PercentageDecreaseCalculator() {
  const [initialValue, setInitialValue] = useState(100);
  const [finalValue, setFinalValue] = useState(85);

  const results = useMemo(() => {
    const initial = initialValue || 0;
    const final = finalValue || 0;

    if (initial === 0) {
      return {
        percentage: 0,
        absoluteDrop: 0,
        retention: 0,
        dashOffset: CIRCUMFERENCE,
        isValid: false,
        displayText: "Invalid Input",
      };
    }

    const decrease = initial - final;
    const percentage = (decrease / Math.abs(initial)) * 100;
    const clampedPct = Math.max(0, Math.min(100, percentage));
    const retention = (final / initial) * 100;
    const dashOffset = CIRCUMFERENCE - (clampedPct / 100) * CIRCUMFERENCE;

    return {
      percentage,
      absoluteDrop: decrease,
      retention,
      dashOffset,
      isValid: true,
      displayText: `${percentage.toFixed(2)}% Decrease`,
    };
  }, [initialValue, finalValue]);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Sidebar – Inputs */}
        <aside className="lg:col-span-4 space-y-[24px]">
          <div className="space-y-[8px]">
            <h1 className="text-[32px] leading-[1.2] font-semibold text-on-surface">
              Percentage Decrease
            </h1>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant">
              Calculate the drop in value between two numbers quickly and accurately.
            </p>
          </div>

          <div
            className="rounded-xl shadow-sm p-[24px] space-y-[16px]"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="space-y-[4px]">
              <label
                htmlFor="initial-val"
                className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant"
              >
                Initial Value
              </label>
              <input
                id="initial-val"
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#e7eeff] dark:bg-background border border-[#c3c6d6] dark:border-outline-variant rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
              />
            </div>

            <div className="space-y-[4px]">
              <label
                htmlFor="final-val"
                className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant"
              >
                Final Value
              </label>
              <input
                id="final-val"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#e7eeff] dark:bg-background border border-[#c3c6d6] dark:border-outline-variant rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
              />
            </div>

            <button className="w-full bg-primary text-on-primary py-[16px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95">
              <span className="material-symbols-outlined">calculate</span>
              Recalculate Decrease
            </button>
          </div>

          {/* Visual Insight Image */}
          <div className="rounded-xl overflow-hidden shadow-sm" style={{ border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <img
              alt="Percentage decrease visualization"
              src="https://lh3.googleusercontent.com/aida/ADBb0uhTMza53jNGV2B4B-qEpPg6mV1TF52Cuq7etCu-ZrjOaP82h89hURKs6GGNbmaPXa37_Tm7wHS67fyAsoUaZOzaseadUlB9UaNJ666PnBa-k1TdY09rGt9JZVGNLVYOATxewfbvWY9x-w6oP8_kZDJ90tSJkv-CDYyxHvvS4BuY5A0WnJO-WlsR9AiVHD_X4KTc4PiKGIflg58z7YVolO8A6eeRO3xa-I0rBUi4wn0MmivgkIFLzAns61sK"
              className="w-full h-auto object-cover"
            />
          </div>
        </aside>

        {/* Right – Results */}
        <section className="lg:col-span-8">
          <div
            className="rounded-xl p-[48px] h-full flex flex-col items-center justify-center text-center gap-[24px] relative overflow-hidden"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            {/* Subtle background dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.03,
                backgroundImage: "radial-gradient(#003594 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="space-y-[4px] relative z-10">
              <span className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-primary tracking-widest uppercase">
                Calculation Result
              </span>
              <h2 className="text-[48px] leading-[1.1] font-semibold -tracking-[0.02em] text-on-surface">
                {results.displayText}
              </h2>
            </div>

            {/* Doughnut Chart */}
            <div className="relative w-64 h-64 flex items-center justify-center z-10">
              <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }} viewBox="0 0 256 256">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="transparent"
                  strokeWidth="24"
                  stroke="currentColor"
                  className="text-[#d8e3fb]"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="transparent"
                  strokeWidth="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  className="text-[#085ac0]"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={results.dashOffset}
                  style={{ transition: "stroke-dashoffset 0.4s ease" }}
                />
              </svg>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-full m-10 border border-glass-border shadow-inner"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="material-symbols-outlined text-[#085ac0] text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_down
                </span>
                <span className="text-[14px] text-on-surface-variant">Net Change</span>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 gap-[48px] w-full max-w-md pt-[24px] relative z-10">
              <div className="bg-[#f0f3ff] p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30">
                <span className="text-[12px] leading-[1.4] text-[#737685] uppercase">Absolute Drop</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {results.absoluteDrop.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#f0f3ff] p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30">
                <span className="text-[12px] leading-[1.4] text-[#737685] uppercase">Retention</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {results.retention.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Tool Info Section */}
      <ToolInfoCard
        title="Your all-in-one digital workshop."
        content={[
          "About the Percentage Decrease Calculator",
          "Calculating a drop in value should not require manual math or complicated spreadsheet formulas. The JamroTools Percentage Decrease Calculator is a fast, streamlined web utility designed to help you instantly determine the exact percentage drop between any two numbers. Built as a fully online platform, this tool leverages your active internet connection to deliver lightning-fast, real-time results directly in your browser without requiring any offline downloads or installations.",
          "Whether you are tracking a drop in website traffic, calculating retail discounts, or analyzing financial losses, this calculator provides immediate clarity. By simply entering your starting number and your ending number, you eliminate human error and get the precise percentage reduction in a fraction of a second.",
          "Optimize Your Data Analysis",
          "Understanding the rate at which a metric decreases is crucial for both personal finance and business analytics. When you use this calculator, you instantly translate raw numbers into actionable percentage data.",
          "* Track Business Metrics: Quickly assess month-over-month drops in sales revenue, user churn rates, or overhead costs to make informed operational decisions.",
          "* Calculate Shopping Discounts: Verify exactly how much money you are saving during a sale by finding the true percentage difference between the original retail price and the clearance price.",
          "* Monitor Goal Progress: Measure personal milestones, such as a percentage reduction in daily screen time, caloric intake, or debt balances.",
          "Whether you are a student double-checking math homework or a business owner analyzing quarterly losses, this calculator gives you the accurate data required to understand your downward trends.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}