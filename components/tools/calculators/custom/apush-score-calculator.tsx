"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo } from "react";
import { calculateApushScore } from "../logic/apush-score-calculator";

export default function ApushScoreCalculator() {
  const [mcq, setMcq] = useState(40);
  const [saq1, setSaq1] = useState(2);
  const [saq2, setSaq2] = useState(2);
  const [saq3, setSaq3] = useState(2);
  const [dbq, setDbq] = useState(5);
  const [leq, setLeq] = useState(4);

  const results = useMemo(() => calculateApushScore(mcq, saq1, saq2, saq3, dbq, leq), [mcq, saq1, saq2, saq3, dbq, leq]);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const faqItems = [
    {
      q: `What is an APUSH score calculator?`,
      a: `An APUSH score calculator is a digital educational tool that predicts a student's final Advanced Placement US History exam score on the standard 1 to 5 scale. By taking a student's raw scores from the four different sections of the test and applying the College Board's specific percentage weights, the calculator generates an accurate estimated final composite score.`,
    },
    {
      q: `What are the four sections of the AP US History exam?`,
      a: `To accurately calculate your score, you must understand the four distinct sections of the exam. They are:
* MCQ (Multiple-Choice Questions): 55 questions assessing historical knowledge and source analysis.
* SAQ (Short-Answer Questions): 3 questions requiring brief, specific historical explanations.
* DBQ (Document-Based Question): 1 essay requiring you to analyze provided historical documents to build an argument.
* LEQ (Long Essay Question): 1 essay requiring you to build a historical argument purely from your own knowledge.`,
    },
    {
      q: `How are the different sections weighted in the final APUSH score?`,
      a: `The College Board does not treat every section equally. The final composite score is calculated using the following strict percentage weights:
* Multiple-Choice (MCQ): 40% of the total score
* Document-Based Question (DBQ): 25% of the total score
* Short-Answer (SAQ): 20% of the total score
* Long Essay (LEQ): 15% of the total score`,
    },
    {
      q: `What is the plain-text formula for calculating an APUSH composite score?`,
      a: `While the exact multiplier curve changes slightly every year to account for test difficulty, the standard plain-text formula for finding your total composite points out of 150 is:
Composite Score = (MCQ Raw Score * 1.09) + (SAQ Raw Score * 3.33) + (DBQ Raw Score * 5.35) + (LEQ Raw Score * 3.75)
Once this final number is calculated, it is compared against the year's specific grading curve to assign a final score of 1, 2, 3, 4, or 5.`,
    },
    {
      q: `What is considered a passing score on the APUSH exam?`,
      a: `According to the College Board, a score of 3 is considered "qualified" and is generally viewed as the baseline passing grade. A score of 4 is considered "well qualified," and a score of 5 is "extremely well qualified." Scoring a 1 or a 2 means the student has not demonstrated the proficiency required to pass the college-level material.`,
    },
    {
      q: `Can I score a 5 on APUSH if I do poorly on the DBQ?`,
      a: `Yes, but it is very difficult. Because the exam uses compensatory grading, a remarkably high score on the Multiple-Choice (40%) and Short-Answer (20%) sections can mathematically offset a low score on the Document-Based Question (25%). However, because the DBQ carries a massive quarter of the test's total weight, earning at least a mid-range score on it is usually necessary to secure a 5.`,
    },
    {
      q: `Does this calculator guarantee my actual College Board AP score?`,
      a: `No, an online APUSH calculator provides a highly accurate estimate, but it cannot offer a 100% guarantee. The College Board uses a statistical process called "equating" to adjust the final grading curve every single year based on the overall difficulty of that specific test. Therefore, a raw score of 110 might be a 5 one year, but only a 4 the next year if the test was considered slightly easier.`,
    },
    {
      q: `Do all colleges give college credit for an APUSH score of 3?`,
      a: `No. While a 3 is officially considered a passing score by the College Board, individual universities set their own credit acceptance policies. Many highly competitive universities require a minimum score of 4 or 5 to grant actual course credit or allow you to skip introductory history classes. You should always check the specific AP credit policy of the colleges you are applying to.`,
    },
  ]

  return (
    <>
      {/* ── Main Tool Grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* ── Inputs Panel ── */}
        <div className="lg:col-span-4 space-y-[16px]">
          <div
            className="p-[24px] rounded-xl shadow-sm bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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
            className="rounded-xl overflow-hidden h-full flex flex-col shadow-sm bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the APUSH Score Calculator."
        content={[
          "Preparing for the Advanced Placement United States History (APUSH) exam requires more than just memorizing historical dates and treaties; it requires a deep understanding of how the test is actually graded. The JamroTools APUSH Score Calculator is a fast, web-based educational utility designed to help high school students instantly predict their final 1-to-5 AP score. Operating entirely online, this tool applies the official College Board weighting structure to your raw practice test scores right in your browser.",
          "Rather than guessing how your multiple-choice performance balances out a weak essay, you can simply input your raw scores from your practice sessions. The calculator instantly processes the complex math, giving you a highly accurate estimate of your final composite score so you know exactly where you stand before exam day.",
          "/ Strategize Your AP Exam Prep",
          "Understanding the math behind your AP score is the fastest way to improve it. When you use this calculator, you transform raw practice data into a targeted study plan.",
          "* Identify Weak Areas: Instantly see whether you need to spend more time drilling multiple-choice facts or improving your historical argumentation in the essays.",
          "* Test Scoring Scenarios: Play with the numbers to see exactly how earning just one more rubric point on the DBQ can push your final score from a 3 to a 4.",
          "* Set Realistic Goals: Calculate exactly how much breathing room you have. If you excel at multiple-choice, find out how many essay points you can safely afford to lose while still scoring a 5.",
          "Whether you are a student taking a weekend practice test or an AP teacher grading midterms, this calculator provides the immediate, accurate scoring data required to study smarter.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}
