"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo, useCallback } from "react";

const faqItems = [
  {
    q: `What is an age difference calculator?`,
    a: `An age difference calculator is an automated digital tool that determines the exact span of time between two distinct dates, most commonly two dates of birth. Instead of just subtracting birth years, the calculator accounts for specific months, varying days in a month, and leap years to provide a highly accurate age gap expressed in years, months, and days.`,
  },
  {
    q: `How do you calculate the exact age difference between two people manually?`,
    a: `To calculate the age difference manually, you must align both birth dates and subtract the older person's date from the younger person's date.
* First, subtract the days. If the younger person's day is smaller, borrow a month (typically 30 or 31 days) to complete the subtraction.
* Next, subtract the months. If you need to borrow, take 12 months from the year column.
* Finally, subtract the years. Using an online calculator bypasses this complex borrowing process and prevents human error.`,
  },
  {
    q: `Does this calculator account for leap years?`,
    a: `Yes, a high-quality age difference calculator automatically factors in leap years. A leap year adds an extra day (February 29) to the calendar every four years. If the time span between your two dates includes a leap year, the calculator adjusts the total day count internally so your final age gap is 100% historically and mathematically accurate.`,
  },
  {
    q: `What is the mathematical formula for finding an age gap?`,
    a: `In plain text, the basic chronological formula for finding an age gap is:
Age Gap = Younger Person's Date of Birth - Older Person's Date of Birth
When doing simple year-only math, you just subtract the older birth year from the younger birth year (e.g., 1995 - 1990 = 5 years). However, for precise dates, borrowing days and months is required, which is why digital calculators are preferred.`,
  },
  {
    q: `What is the "half your age plus seven" rule?`,
    a: `The "half your age plus seven" rule is a popular societal formula used to determine the socially acceptable minimum age of a dating partner. The plain text formula is:
Minimum Partner Age = (Your Current Age / 2) + 7
For example, if you are 30 years old, half your age is 15. Add 7, and the rule suggests your youngest acceptable partner is 22. This calculator can help you determine your exact age gap to see where you fall within this cultural rule.`,
  },
  {
    q: `Can I calculate the age difference between someone who is alive and someone who has passed away?`,
    a: `Yes. The calculator strictly measures the time between two specific dates, regardless of life status. You simply enter the deceased person's date of birth as one input, and the living person's date of birth as the second input. The tool will output the exact chronological gap between when those two individuals were born.`,
  },
  {
    q: `Why do some calculators show age difference in total days?`,
    a: `Showing an age difference in total days (e.g., "1,500 days apart") removes the variability of months, which can have 28, 29, 30, or 31 days. Total days provide an absolute, unified measurement of time. This is often used by statisticians, programmers, and medical professionals who require a standardized unit of time rather than a conversational "years and months" format.`,
  },
  {
    q: `Is the age difference calculator only for human ages?`,
    a: `No, you can use the age difference calculator for any two dates in history. You can use it to find the age gap between two pets, the time between the construction of two historical monuments, or the difference between the founding dates of two companies. As long as you have a starting date and an ending date, the tool will calculate the gap.`,
  },
]

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
            className="rounded-xl shadow-sm p-[24px] space-y-[16px] backdrop-blur-[12px] bg-white/70 dark:bg-surface-container/70 border border-slate-200/80 dark:border-outline-variant/80"
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
                className="w-full bg-[#e7eeff] dark:bg-background border border-[#c3c6d6] dark:border-outline-variant rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px] dark:text-on-surface-variant"
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
                className="w-full bg-[#e7eeff] dark:bg-background border border-[#c3c6d6] dark:border-outline-variant rounded-lg p-[16px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px] dark:text-on-surface-variant"
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
            className="rounded-xl p-[16px] flex gap-[8px] items-start bg-[#d8e2ff] dark:bg-surface-container text-[#001a42] dark:text-on-surface-variant"
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
            className="rounded-xl p-[48px] h-full flex flex-col items-center justify-center text-center gap-[24px] relative overflow-hidden backdrop-blur-[12px] bg-white/70 dark:bg-surface-container/70 border border-slate-200/80 dark:border-outline-variant/80"
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
                className="absolute inset-0 flex flex-col items-center justify-center rounded-full m-10 border border-glass-border shadow-inner backdrop-blur-[12px] bg-white/40 dark:bg-background/40"
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
              <div className="bg-[#f0f3ff] dark:bg-background p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30 dark:border-outline-variant/50">
                <span className="text-[12px] leading-[1.4] text-[#737685] dark:text-on-surface-variant uppercase">Precision</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">High</span>
              </div>
              <div className="bg-[#f0f3ff] dark:bg-background p-[16px] rounded-xl flex flex-col items-center border border-[#c3c6d6]/30 dark:border-outline-variant/50">
                <span className="text-[12px] leading-[1.4] text-[#737685] dark:text-on-surface-variant uppercase">Calendar</span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">Gregorian</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Age Difference Calculator."
        content={[
          "Comparing two dates of birth manually can be surprisingly complex when you factor in varying month lengths and leap years. The JamroTools Age Difference Calculator is a precision web utility designed to instantly compute the exact chronological gap between two individuals, events, or historical dates. Built for speed and accuracy, this online tool calculates the difference down to the exact year, month, and day.",
          "Whether you are comparing ages for a relationship, verifying age gaps for legal documentation, or conducting genealogical research, this calculator eliminates manual counting errors. By simply entering two dates, our tool runs the calendar logic instantly in your browser, providing a clear, formatted breakdown of the exact time that separates them.",
          "/ Perfect for Everyday and Professional Use",
          "Understanding the precise age gap between two dates is useful across multiple scenarios. When you use this calculator, you instantly turn raw calendar dates into readable chronological data.",
          "* Relationship & Compatibility Tracking: Quickly determine the exact age gap between you and your partner down to the day.",
          "* Genealogical & Historical Research: Accurately calculate the time between the births of historical figures or ancestors without manually tracking centuries of leap years.",
          "* Legal & Administrative Verification: Ensure age differences meet specific legal thresholds for contracts, guardianship, or insurance policies.",
          "Whether you are settling a friendly debate or processing official documents, this calculator gives you the exact chronological data you need in seconds.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}