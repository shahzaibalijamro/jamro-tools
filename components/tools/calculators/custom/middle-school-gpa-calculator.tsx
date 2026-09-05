"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { calculateMiddleSchoolGpa } from "../logic/middle-school-gpa-calculator";

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
    q: `What is a middle school GPA calculator?`,
    a: `A middle school GPA (Grade Point Average) calculator is a digital educational tool that converts a student's individual class grades into a single, standardized numerical value. By assigning a specific point value to every letter grade earned and averaging them together, the tool provides a clear, overall metric of a student's academic performance on a standard 4.0 scale.`,
  },
  {
    q: `What is the plain-text formula for calculating a GPA?`,
    a: `The mathematical formula for finding a standard unweighted GPA is:
GPA = Total Grade Points / Total Number of Classes
To do this manually, you must first convert every letter grade into its corresponding point value (e.g., an A is 4 points, a B is 3 points). Add all of those points together to find your "Total Grade Points," and then divide that number by the total number of classes you took.`,
  },
  {
    q: `What is the standard middle school grading scale?`,
    a: `Most middle schools across the United States use a standard unweighted 4.0 grading scale. The standard point conversions are:
* A (90-100%): 4.0 points
* B (80-89%): 3.0 points
* C (70-79%): 2.0 points
* D (60-69%): 1.0 point
* F (0-59%): 0.0 points`,
  },
  {
    q: `Does a middle school GPA matter for college admissions?`,
    a: `No. Colleges and universities only look at your high school transcript, which includes your grades from 9th through 12th grade. Your middle school GPA is essentially a "practice run." However, a strong middle school GPA is still highly important because it dictates whether you are placed in the advanced high school classes that colleges do care about.`,
  },
  {
    q: `Do middle school grades go on my high school transcript?`,
    a: `Generally, standard middle school classes do not appear on a high school transcript. There is one major exception: if a middle school student takes a verified high school-level course (such as Algebra I, Geometry, or a high school-level Foreign Language), the grade for that specific class often carries over to the high school transcript and affects their permanent high school GPA.`,
  },
  {
    q: `Do middle schools use weighted or unweighted GPAs?`,
    a: `The vast majority of middle schools use an unweighted GPA, meaning the highest possible score is a 4.0, and all classes are treated equally. Weighted GPAs (which go up to a 5.0) are usually reserved for high schools to reward students for taking highly rigorous, college-level Advanced Placement (AP) or International Baccalaureate (IB) courses.`,
  },
  {
    q: `Are electives included in my middle school GPA?`,
    a: `Yes, unless your specific school district states otherwise, elective classes like Physical Education, Art, Band, and Computer Science count toward your overall GPA exactly the same as core classes like English, Math, and Science. Getting an 'A' in Art provides the exact same 4.0 grade points as getting an 'A' in History.`,
  },
  {
    q: `Why is my calculated GPA slightly different from my official report card?`,
    a: `If the online calculator gives you a slightly different number than your official report card, it is likely due to "credit weighting." Some middle schools assign different credit values to different classes. For example, a core math class that meets every day might be worth 1.0 credits, while a health class that only meets twice a week might be worth 0.5 credits. Check your school's specific student handbook to see if they use variable class credits.`,
  },
]

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

  const calculation = useMemo(() => calculateMiddleSchoolGpa(courses), [courses]);
  const gpaResult = { ...calculation, avgPct: calculation.averagePercent };

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
            className="rounded-xl shadow-sm p-[24px] space-y-[16px] bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
          >
            <h2 className="text-[20px] leading-[1.4] font-semibold text-[var(--color-brand)]">
              Course Grades
            </h2>

            <div className="space-y-[12px]">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-[16px] rounded-lg bg-white dark:bg-surface-container border border-[#c3c6d6]/30 dark:border-outline-variant transition-all hover:border-primary/30"
                >
                  <div className="grid grid-cols-2 gap-[8px] mb-[8px]">
                    <input
                      className="col-span-2 bg-[#f0f3ff] dark:bg-surface-container-highest text-on-surface border-none rounded-lg p-[8px] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[16px]"
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
                        className="bg-[#f0f3ff] dark:bg-surface-container-highest text-on-surface border-none rounded-lg p-[8px] pr-[32px] text-[14px] font-semibold appearance-none cursor-pointer w-full"
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
                        className="bg-[#f0f3ff] dark:bg-surface-container-highest text-on-surface border-none rounded-lg p-[8px] text-[14px] font-semibold w-full focus:ring-2 focus:ring-primary/20 transition-all outline-none"
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
            className="rounded-xl p-[48px] flex flex-col items-center text-center gap-[24px] relative overflow-hidden bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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
                  className="text-[#d8e3fb] dark:text-surface-container-highest"
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
              <div className="bg-[#d8e2ff] dark:bg-primary-container px-[24px] py-[8px] rounded-full relative z-10">
                <p className="text-[18px] leading-[1.6] text-[#001a42] dark:text-on-primary-container font-bold">
                  Keep going! A little more effort can boost your grades significantly.
                </p>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-[24px] w-full max-w-md relative z-10">
              <div className="bg-[#f0f3ff] dark:bg-surface-container rounded-xl p-[16px] border border-[#c3c6d6]/20 dark:border-outline-variant/30">
                <span className="block text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant mb-[4px]">
                  Total Credits
                </span>
                <span className="text-[20px] leading-[1.4] font-semibold text-on-surface">
                  {gpaResult.totalCredits.toFixed(1)}
                </span>
              </div>
              <div className="bg-[#f0f3ff] dark:bg-surface-container rounded-xl p-[16px] border border-[#c3c6d6]/20 dark:border-outline-variant/30">
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
              className="rounded-xl p-[24px] flex items-center gap-[24px] bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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
              className="rounded-xl p-[24px] flex items-center gap-[24px] bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Middle School GPA Calculator."
        content={[
          "Middle school is a critical transitional period where students learn the study habits they will carry into high school and beyond. However, trying to figure out an overall grade average by looking at a report card full of mixed letters and percentages can be confusing. The JamroTools Middle School GPA Calculator is a fast, streamlined web utility designed to instantly convert your letter or percentage grades into a standard 4.0 Grade Point Average.",
          "Operating entirely online, this tool removes the guesswork from academic tracking. By simply selecting your grades for each class, the calculator processes the math in real-time within your browser, providing an accurate, immediate snapshot of your current academic standing without requiring any manual math or complicated spreadsheets.",
          "/ Build a Foundation for High School Success",
          "Understanding how a GPA works before high school is one of the best ways to set a student up for long-term academic success. Using this calculator helps parents and students transform confusing report cards into actionable educational data.",
          "* Track Academic Progress: Instantly see how a single low grade in math or science brings down an overall average, allowing you to identify exactly where tutoring or extra study time is needed.",
          "* Qualify for Advanced Placements: Many high schools use 7th and 8th-grade GPAs to determine which students are eligible for freshman Honors, Advanced Placement (AP), or accelerated STEM tracks.",
          "* Master the GPA System: By learning how Grade Points are calculated now, students will not be caught off guard when their grades officially begin counting toward college admissions in the 9th grade.",
          "Whether you are a parent reviewing a mid-term progress report or a student aiming for the middle school honor roll, this calculator provides the precise academic data required to reach your educational goals.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}
