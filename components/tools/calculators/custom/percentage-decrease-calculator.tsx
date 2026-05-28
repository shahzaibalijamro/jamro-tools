"use client";

import { useState, useMemo } from "react";

const CIRCUMFERENCE = 691; // 2 * π * 110 ≈ 691.15

const faqItems = [
  {
    q: "How is percentage decrease calculated?",
    a: "The percentage decrease is calculated by subtracting the final value from the initial value, dividing the difference by the absolute value of the initial value, and then multiplying by 100.",
    formula: "Formula: ((Initial - Final) / Initial) × 100",
  },
  {
    q: "When should I use a percent decrease calculator?",
    a: "Use this calculator whenever you need to quantify a reduction. Common use cases include calculating retail discounts, stock market dips, population decline, or weight loss progress.",
  },
  {
    q: "What's the difference between decrease and negative increase?",
    a: 'Mathematically, they represent the same change. However, conceptually, "decrease" implies the direction of change is downward from a starting point, while "negative increase" is often used in broader statistical reporting where all changes are framed as positive or negative growth.',
  },
];

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
                className="w-full bg-[#e7eeff] border border-[#c3c6d6] rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
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
                className="w-full bg-[#e7eeff] border border-[#c3c6d6] rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
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

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-[48px] border-t border-outline-variant">
        <h2 className="text-[32px] leading-[1.2] font-semibold mb-[24px] text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-[16px]">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl"
              style={{
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
              }}
            >
              <summary className="flex justify-between items-center p-[24px] cursor-pointer list-none">
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {item.q}
                </span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-[24px] pb-[24px] text-[16px] leading-[1.6] text-on-surface-variant">
                {item.a}
                {"formula" in item && (
                  <div className="mt-[16px] p-[16px] bg-[#e7eeff] rounded-lg font-mono text-[14px]">
                    {item.formula}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}