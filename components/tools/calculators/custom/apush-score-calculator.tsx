"use client";

import { useState, useMemo } from "react";

const SCORE_DEFINITIONS: Record<
  number,
  { label: string; colorClass: string }
> = {
  5: { label: "Extremely Well Qualified", colorClass: "text-primary" },
  4: { label: "Well Qualified", colorClass: "text-secondary" },
  3: { label: "Qualified", colorClass: "text-on-secondary-fixed-variant" },
  2: { label: "Possibly Qualified", colorClass: "text-outline" },
  1: { label: "Not Qualified", colorClass: "text-error" },
};

export default function ApushScoreCalculator() {
  const [mcq, setMcq] = useState(40);
  const [saq1, setSaq1] = useState(2);
  const [saq2, setSaq2] = useState(2);
  const [saq3, setSaq3] = useState(2);
  const [dbq, setDbq] = useState(5);
  const [leq, setLeq] = useState(4);

  const results = useMemo(() => {
    const totalRaw = mcq + saq1 + saq2 + saq3 + dbq + leq;
    const composite =
      mcq * 1.0 +
      (saq1 + saq2 + saq3) * 3.11 +
      dbq * 4.5 +
      leq * 4.25;
    const roundedComposite = Math.round(composite);

    let finalScore = 1;
    if (roundedComposite >= 105) finalScore = 5;
    else if (roundedComposite >= 88) finalScore = 4;
    else if (roundedComposite >= 70) finalScore = 3;
    else if (roundedComposite >= 50) finalScore = 2;

    const percent = Math.min(100, Math.round((roundedComposite / 140) * 100));

    // SVG donut: r = 40, circumference = 2 * PI * 40 ≈ 251.327
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percent / 100) * circumference;

    return {
      totalRaw,
      roundedComposite,
      finalScore,
      percent,
      circumference,
      offset,
      definition: SCORE_DEFINITIONS[finalScore],
    };
  }, [mcq, saq1, saq2, saq3, dbq, leq]);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const faqItems = [
    {
      q: "How is the raw score calculated?",
      a: "The raw score is simply the sum of all points earned. Multiple choice is 55 points, SAQs are 9 points total (3 per question), DBQ is 7 points, and LEQ is 6 points, making a total raw score of 77.",
    },
    {
      q: "What are the score boundaries?",
      a: "Score boundaries vary each year based on difficulty, but generally a composite score of 105+ equates to a 5. A 4 is typically achieved between 88–104, a 3 between 70–87, and a 2 between 50–69.",
    },
    {
      q: "Is this official College Board data?",
      a: "No, this tool uses estimates based on publicly available score curves from previous exam cycles. Actual scores are determined by the College Board during the grading process.",
    },
  ];

  return (
    <>
      {/* ── Main Tool Grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* ── Inputs Panel ── */}
        <div className="lg:col-span-4 space-y-[16px]">
          <div
            className="p-[24px] rounded-xl shadow-sm"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px] flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">
                edit_note
              </span>
              Exam Inputs
            </h3>
            <div className="space-y-[20px]">
              {/* MCQ */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Multiple Choice (0–55)
                </label>
                <input
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  type="number"
                  min={0}
                  max={55}
                  value={mcq}
                  onChange={(e) =>
                    setMcq(clamp(Number(e.target.value) || 0, 0, 55))
                  }
                />
              </div>

              {/* SAQs */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Short Answer Questions (0–3 each)
                </label>
                <div className="grid grid-cols-3 gap-[8px]">
                  {[
                    { label: "Q1", val: saq1, set: setSaq1 },
                    { label: "Q2", val: saq2, set: setSaq2 },
                    { label: "Q3", val: saq3, set: setSaq3 },
                  ].map((s, i) => (
                    <input
                      key={i}
                      className="px-[12px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center"
                      type="number"
                      min={0}
                      max={3}
                      placeholder={s.label}
                      value={s.val}
                      onChange={(e) =>
                        s.set(clamp(Number(e.target.value) || 0, 0, 3))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* DBQ */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Document-Based Question (0–7)
                </label>
                <input
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  type="number"
                  min={0}
                  max={7}
                  value={dbq}
                  onChange={(e) =>
                    setDbq(clamp(Number(e.target.value) || 0, 0, 7))
                  }
                />
              </div>

              {/* LEQ */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Long Essay Question (0–6)
                </label>
                <input
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  type="number"
                  min={0}
                  max={6}
                  value={leq}
                  onChange={(e) =>
                    setLeq(clamp(Number(e.target.value) || 0, 0, 6))
                  }
                />
              </div>

              <button className="w-full flex items-center justify-center gap-[8px] bg-primary text-on-primary hover:shadow-lg active:scale-95 transition-all px-[24px] py-[16px] rounded-xl font-semibold text-[14px] mt-[24px] shadow-sm">
                <span className="material-symbols-outlined">calculate</span>
                Recalculate Score
              </button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-[24px]">
            <div className="flex items-start gap-[16px]">
              <span className="material-symbols-outlined text-primary mt-[2px]">
                info
              </span>
              <div>
                <h4 className="font-semibold text-[14px] text-primary">
                  Pro Tip
                </h4>
                <p className="text-on-surface-variant text-[12px] font-medium mt-[4px]">
                  Weighting is roughly: MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Results Panel ── */}
        <div className="lg:col-span-8">
          <div
            className="rounded-xl overflow-hidden h-full flex flex-col shadow-sm"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="p-[24px] flex-grow flex flex-col">
              {/* Score Hero */}
              <div className="text-center mb-[24px]">
                <p className="text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest">
                  Projected Exam Result
                </p>
                <h2
                  className={`font-display text-[96px] leading-none my-[16px] font-black ${results.definition.colorClass}`}
                >
                  {results.finalScore}
                </h2>
                <p
                  className={`text-[20px] leading-[28px] font-semibold ${results.definition.colorClass}`}
                >
                  {results.definition.label}
                </p>
              </div>

              {/* Chart + Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] flex-1 items-center">
                {/* SVG Donut Chart */}
                <div className="relative flex items-center justify-center">
                  <svg
                    className="w-full max-w-[280px] h-auto -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-surface-container-high"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={results.circumference.toFixed(2)}
                      strokeDashoffset={results.offset.toFixed(2)}
                      className="text-primary transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[28px] leading-[36px] font-bold text-on-surface">
                      {results.percent}%
                    </span>
                    <span className="text-[12px] font-medium text-on-surface-variant">
                      Weighted
                    </span>
                  </div>
                </div>

                {/* Metrics Cards */}
                <div className="space-y-[16px]">
                  <div className="bg-surface-container p-[20px] rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-[12px] font-medium text-on-surface-variant uppercase tracking-tight">
                        Total Raw Score
                      </p>
                      <p className="text-[22px] leading-[28px] font-bold text-on-surface">
                        {results.totalRaw} / 77
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[40px]">
                      bar_chart
                    </span>
                  </div>
                  <div className="bg-surface-container p-[20px] rounded-xl flex justify-between items-center border-l-4 border-primary">
                    <div>
                      <p className="text-[12px] font-medium text-on-surface-variant uppercase tracking-tight">
                        Composite Score
                      </p>
                      <p className="text-[22px] leading-[28px] font-bold text-on-surface">
                        {results.roundedComposite} / 140
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[40px]">
                      insights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="max-w-4xl mx-auto py-[48px] border-t border-outline-variant">
        <h2 className="text-[28px] leading-[36px] font-semibold mb-[24px] text-center">
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
                <span className="text-[14px] font-semibold text-on-surface">
                  {item.q}
                </span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-[24px] pb-[24px] text-on-surface-variant">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}