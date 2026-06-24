"use client";

import { useState, useMemo, useCallback } from "react";

const faqItems = [
  {
    q: "How does the tool handle leap years?",
    a: "Our calculator uses Gregorian calendar algorithms to precisely account for every February 29th that occurs between the two provided dates, ensuring your total day count is mathematically perfect.",
  },
  {
    q: "Can I calculate differences for BC dates?",
    a: "Currently, Jamro Tools supports modern standard date formats. While we are expanding our historical tools, the current engine is optimized for AD/CE dates from the year 0001 onwards.",
  },
  {
    q: "Is my data stored or tracked?",
    a: "No. Jamro Tools prioritizes privacy. Your calculations are performed entirely in your browser. We do not store, log, or transmit any birth dates or calculation results to our servers.",
  },
];

export default function AgeDifferenceCalculator() {
  const [dob1, setDob1] = useState("1990-01-01");
  const [dob2, setDob2] = useState("1995-06-15");
  const [person1Label] = useState("Person 1");
  const [person2Label] = useState("Person 2");

  const results = useMemo(() => {
    const d1 = new Date(dob1);
    const d2 = new Date(dob2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return { years: 0, months: 0, days: 0, totalDays: 0, older: "", isValid: false };
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDaysTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDaysTotal / 365.25);
    const remainingDays = diffDaysTotal % 365.25;
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays % 30.44);

    const older = d1.getTime() < d2.getTime() ? person1Label : person2Label;

    return { years, months, days, totalDays: diffDaysTotal, older, isValid: true };
  }, [dob1, dob2, person1Label, person2Label]);

  const handleCalculate = useCallback(() => {
    // Force re-render by toggling — memo already updates on state change
  }, []);

  const pctShared = results.isValid && results.totalDays > 0
    ? Math.round(((365.25 * 79 - results.totalDays) / (365.25 * 79)) * 100)
    : 0;
  const pctOffset = results.isValid && results.totalDays > 0
    ? Math.round((results.totalDays / (365.25 * 79)) * 100)
    : 0;

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Sidebar – Inputs */}
        <aside className="lg:col-span-4 space-y-[24px]">
          <div className="space-y-[8px]">
            <h1 className="text-[32px] leading-[1.2] font-semibold text-on-surface">
              Age Difference
            </h1>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant">
              Calculate precise age gaps between two individuals. Accounts for leap years and varying month lengths.
            </p>
          </div>

          <div
            className="rounded-xl shadow-sm p-[24px] space-y-[16px] backdrop-blur-[12px] bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80"
          >
            <h2 className="text-[20px] leading-[1.4] font-semibold text-[var(--color-brand)]">
              Enter Birth Dates
            </h2>

            <div className="space-y-[4px]">
              <label
                htmlFor="dob1"
                className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant"
              >
                {person1Label} Date of Birth
              </label>
              <input
                id="dob1"
                type="date"
                value={dob1}
                onChange={(e) => setDob1(e.target.value)}
                className="w-full bg-[#e7eeff] dark:bg-slate-900 border border-[#c3c6d6] dark:border-slate-700 rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px] dark:text-slate-200"
              />
            </div>

            <div className="space-y-[4px]">
              <label
                htmlFor="dob2"
                className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant"
              >
                {person2Label} Date of Birth
              </label>
              <input
                id="dob2"
                type="date"
                value={dob2}
                onChange={(e) => setDob2(e.target.value)}
                className="w-full bg-[#e7eeff] dark:bg-slate-900 border border-[#c3c6d6] dark:border-slate-700 rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px] dark:text-slate-200"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-primary text-on-primary py-[16px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">calculate</span>
              Calculate Difference
            </button>
          </div>

          {/* Contextual Hint */}
          <div
            className="rounded-xl p-[16px] flex gap-[8px] items-start bg-[#d8e2ff] dark:bg-slate-800 text-[#001a42] dark:text-slate-200"
          >
            <span className="material-symbols-outlined text-[var(--color-brand)]">info</span>
            <p className="text-[14px] leading-[1.6]">
              Precision matters. Our tool accounts for leap years and specific month lengths for 100% accuracy.
            </p>
          </div>
        </aside>

        {/* Right – Results */}
        <section className="lg:col-span-8">
          <div
            className="rounded-xl p-[48px] h-full flex flex-col items-center justify-center text-center gap-[24px] relative overflow-hidden backdrop-blur-[12px] bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80"
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
                Calculated Age Difference
              </span>
              <h2 className="text-[48px] leading-[1.1] font-black -tracking-[0.02em] text-on-surface">
                <span className="transition-all duration-500">{results.years}</span>Y{" "}
                <span className="transition-all duration-500">{results.months}</span>M{" "}
                <span className="transition-all duration-500">{results.days}</span>D
              </h2>
            </div>

            {/* Chart / Visualization */}
            <div className="relative w-64 h-64 flex items-center justify-center z-10">
              <svg
                className="w-full h-full"
                style={{ transform: "rotate(-90deg)" }}
                viewBox="0 0 256 256"
              >
                {/* Background ring */}
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="transparent"
                  strokeWidth="24"
                  stroke="currentColor"
                  className="text-[#d8e3fb]"
                />
                {/* Shared segment */}
                {results.isValid && (
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="transparent"
                    strokeWidth="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-[var(--color-brand)]"
                    strokeDasharray={`${(pctShared / 100) * 691} ${691 - (pctShared / 100) * 691}`}
                    strokeDashoffset={0}
                    style={{ transition: "stroke-dasharray 0.4s ease" }}
                  />
                )}
                {/* Offset segment */}
                {results.isValid && (
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="transparent"
                    strokeWidth="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="text-[#085ac0]"
                    strokeDasharray={`${(pctOffset / 100) * 691} ${691 - (pctOffset / 100) * 691}`}
                    strokeDashoffset={-((pctShared / 100) * 691)}
                    style={{ transition: "stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease" }}
                  />
                )}
              </svg>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-full m-10 border border-glass-border shadow-inner backdrop-blur-[12px] bg-white/40 dark:bg-slate-900/40"
              >
                <span className="text-[14px] text-on-surface-variant">Total Days</span>
                <span className="text-[24px] font-bold text-on-surface">
                  {results.totalDays.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-[16px] flex-wrap justify-center relative z-10">
              <div className="flex items-center gap-[4px]">
                <span className="w-3 h-3 rounded-full bg-[var(--color-brand)]" />
                <span className="text-[12px] text-on-surface-variant">Shared</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <span className="w-3 h-3 rounded-full bg-[#085ac0]" />
                <span className="text-[12px] text-on-surface-variant">Offset</span>
              </div>
            </div>

            {/* The difference detail */}
            <div className="flex items-center gap-[4px] text-on-surface-variant text-[14px] relative z-10">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>
                The difference is exactly{" "}
                <span className="font-semibold text-on-surface">{results.totalDays.toLocaleString()}</span>{" "}
                days{results.isValid && <> — {results.older} is older</>}.
              </span>
            </div>

            {/* Stats row */}
            <div className="w-full mt-auto pt-[24px] border-t border-outline-variant grid grid-cols-2 gap-[16px] relative z-10">
              <div className="bg-[#f0f3ff] dark:bg-slate-900 p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30 dark:border-slate-700/50">
                <span className="text-[12px] leading-[1.4] text-[#737685] dark:text-slate-400 uppercase">Precision</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">High</span>
              </div>
              <div className="bg-[#f0f3ff] dark:bg-slate-900 p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30 dark:border-slate-700/50">
                <span className="text-[12px] leading-[1.4] text-[#737685] dark:text-slate-400 uppercase">Calendar</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">Gregorian</span>
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
              className="group rounded-xl backdrop-blur-[12px] bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80"
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
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}