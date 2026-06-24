"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";

interface Course {
  id: number;
  name: string;
  grade: number;
  credits: number;
}

const gradeOptions: { label: string; value: number }[] = [
  { label: "Grade: A", value: 4.0 },
  { label: "Grade: B", value: 3.0 },
  { label: "Grade: C", value: 2.0 },
  { label: "Grade: D", value: 1.0 },
  { label: "Grade: F", value: 0.0 },
];

const faqItems = [
  {
    q: "How is middle school GPA calculated?",
    a: "We assign a point value to each letter grade (A=4, B=3, C=2, D=1, F=0), multiply by credit hours, and divide by total credits to produce the cumulative grade point average.",
  },
  {
    q: "Do elective classes count?",
    a: "Typically, yes. Most middle schools count all core and elective subjects toward the final semester GPA. Check with your school's specific policy for confirmation.",
  },
  {
    q: "How does weighting work?",
    a: "While honors/AP weighting is more common in high school, some middle schools give extra weight to advanced math or foreign language courses. This tool uses standard unweighted 4.0 scale grading.",
  },
];

let nextId = 0;

function createCourse(name = "", grade = 4.0, credits = 1.0): Course {
  return { id: ++nextId, name, grade, credits };
}

export default function MiddleSchoolGpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    createCourse("Math", 4.0, 1.0),
    createCourse("Science", 3.0, 1.0),
    createCourse("English", 3.0, 1.0),
  ]);
  const [displayGpa, setDisplayGpa] = useState(0);
  const [calcTriggered, setCalcTriggered] = useState(false);

  const gpaResult = useMemo(() => {
    if (courses.length === 0) {
      return { gpa: 0, totalCredits: 0, avgPct: 0, isValid: false };
    }
    let weightedSum = 0;
    let totalCredits = 0;
    for (const c of courses) {
      if (c.credits > 0) {
        weightedSum += c.grade * c.credits;
        totalCredits += c.credits;
      }
    }
    if (totalCredits === 0) {
      return { gpa: 0, totalCredits: 0, avgPct: 0, isValid: false };
    }
    const gpa = weightedSum / totalCredits;
    const avgPct = Math.round((gpa / 4.0) * 100);
    return { gpa, totalCredits, avgPct, isValid: true };
  }, [courses]);

  // Animate GPA display
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    if (!calcTriggered) return;
    const target = gpaResult.gpa;
    const start = displayGpa;
    const duration = 1000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = start + (target - start) * progress;
      setDisplayGpa(current);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcTriggered, gpaResult.gpa]);

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [...prev, createCourse()]);
  }, []);

  const handleRemoveCourse = useCallback((id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleCourseChange = useCallback(
    (id: number, field: "name" | "grade" | "credits", value: string | number) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    []
  );

  const handleCalculate = useCallback(() => {
    setCalcTriggered(true);
  }, []);

  const circumference = 2 * Math.PI * 110; // ~691
  const strokeDashoffset = gpaResult.isValid
    ? circumference - (gpaResult.gpa / 4.0) * circumference
    : circumference;

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Sidebar – Inputs */}
        <aside className="lg:col-span-4 space-y-[24px]">
          <div className="space-y-[8px]">
            <h1 className="text-[32px] leading-[1.2] font-semibold text-on-surface">
              Middle School GPA
            </h1>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant">
              Calculate your semester GPA by entering course grades and credits. Ideal for tracking academic progress toward high school honors.
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
            <h2 className="text-[20px] leading-[1.4] font-semibold text-[var(--color-brand)]">
              Course Grades
            </h2>

            <div className="space-y-[12px]">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-[16px] rounded-lg bg-white dark:bg-slate-800 border border-[#c3c6d6]/30 dark:border-slate-700 transition-all hover:border-primary/30"
                >
                  <div className="grid grid-cols-2 gap-[8px] mb-[8px]">
                    <input
                      className="col-span-2 bg-[#f0f3ff] border-none rounded-lg p-[8px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
                      placeholder="Course (e.g. Math)"
                      type="text"
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(course.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-[8px]">
                    <div className="relative">
                      <select
                        className="bg-[#f0f3ff] border-none rounded-lg p-[8px] pr-[32px] text-[14px] font-semibold appearance-none cursor-pointer w-full"
                        value={course.grade}
                        onChange={(e) =>
                          handleCourseChange(
                            course.id,
                            "grade",
                            parseFloat(e.target.value)
                          )
                        }
                      >
                        {gradeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-[16px] text-on-surface-variant">
                        expand_more
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        className="bg-[#f0f3ff] border-none rounded-lg p-[8px] text-[14px] font-semibold w-full focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        placeholder="Credits"
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={course.credits}
                        onChange={(e) =>
                          handleCourseChange(
                            course.id,
                            "credits",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>
                  {courses.length > 1 && (
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="mt-[8px] text-[12px] text-[#ba1a1a] hover:underline"
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              className="w-full flex items-center justify-center gap-[4px] py-[8px] border-2 border-dashed border-[#c3c6d6] rounded-lg text-on-surface-variant hover:border-primary hover:text-primary transition-all text-[14px] font-semibold"
              type="button"
              onClick={handleAddCourse}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add Course</span>
            </button>

            <button
              onClick={handleCalculate}
              className="w-full mt-[16px] bg-primary text-on-primary py-[16px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">calculate</span>
              Calculate GPA
            </button>
          </div>
        </aside>

        {/* Right – Results */}
        <section className="lg:col-span-8 flex flex-col gap-[24px]">
          <div
            className="rounded-xl p-[48px] flex flex-col items-center text-center gap-[24px] relative overflow-hidden"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            {/* Background Decoration */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

            <h1 className="text-[32px] leading-[1.2] font-semibold text-primary relative z-10">
              Your Middle School GPA
            </h1>

            {/* Progress Ring */}
            <div className="relative w-64 h-64 z-10">
              <svg
                className="w-full h-full"
                style={{ transform: "rotate(-90deg)" }}
                viewBox="0 0 256 256"
              >
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="transparent"
                  strokeWidth="20"
                  stroke="currentColor"
                  className="text-[#d8e3fb]"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="transparent"
                  strokeWidth="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                  strokeDasharray={circumference}
                  strokeDashoffset={calcTriggered ? strokeDashoffset : circumference}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[48px] leading-[1.1] font-semibold text-primary">
                  {displayGpa.toFixed(2)}
                </span>
                <span className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant tracking-widest uppercase">
                  Cumulative
                </span>
              </div>
            </div>

            {/* Success Message */}
            {calcTriggered && gpaResult.gpa >= 3.5 && (
              <div className="bg-primary/10 px-[24px] py-[8px] rounded-full relative z-10">
                <p className="text-[18px] leading-[1.6] text-primary font-bold">
                  Great job! You're on track for high school honors.
                </p>
              </div>
            )}
            {calcTriggered && gpaResult.gpa < 3.5 && gpaResult.isValid && (
              <div className="bg-[#d8e2ff] px-[24px] py-[8px] rounded-full relative z-10">
                <p className="text-[18px] leading-[1.6] text-[#001a42] font-bold">
                  Keep going! A little more effort can boost your grades significantly.
                </p>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-[24px] w-full max-w-md relative z-10">
              <div className="bg-[#f0f3ff] rounded-xl p-[16px] border border-[#c3c6d6]/20">
                <span className="block text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant mb-[4px]">
                  Total Credits
                </span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {gpaResult.totalCredits.toFixed(1)}
                </span>
              </div>
              <div className="bg-[#f0f3ff] rounded-xl p-[16px] border border-[#c3c6d6]/20">
                <span className="block text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant mb-[4px]">
                  Avg Percentage
                </span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {gpaResult.avgPct}%
                </span>
              </div>
            </div>
          </div>

          {/* Bento Style Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div
              className="rounded-xl p-[24px] flex items-center gap-[24px]"
              style={{
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#5b94fd] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-[20px] leading-[1.4] font-semibold mb-[4px]">
                  Smart Tracking
                </h3>
                <p className="text-[12px] leading-[1.4] text-on-surface-variant">
                  We automatically weight your courses based on common middle school standards.
                </p>
              </div>
            </div>
            <div
              className="rounded-xl p-[24px] flex items-center gap-[24px]"
              style={{
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#360f00] shrink-0">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <h3 className="text-[20px] leading-[1.4] font-semibold mb-[4px]">
                  Privacy First
                </h3>
                <p className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Your grades are never stored on our servers. All calculations are local.
                </p>
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
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}