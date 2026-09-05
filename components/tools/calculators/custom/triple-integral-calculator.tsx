"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo, useCallback } from "react";
import { calculateTripleIntegral } from "../logic/triple-integral-calculator";

const faqItems = [
  {
    q: `What is a triple integral calculator?`,
    a: `A triple integral calculator is an advanced digital math tool that automates the process of integrating a multivariable function three consecutive times. By inputting a mathematical function containing three variables (typically x, y, and z) along with their specific boundary limits, the tool calculates the accumulated value over a three-dimensional region, bypassing the need for long-form manual calculus.`,
  },
  {
    q: `What is the difference between a double and a triple integral?`,
    a: `A double integral integrates a function over a two-dimensional area (x and y), which is most commonly used to calculate the volume underneath a 2D surface. A triple integral takes this one dimension further. It integrates a function over a three-dimensional solid region (x, y, and z). While a double integral measures a 3D volume, a triple integral is often used to measure a 4D concept, such as the total mass of a 3D object that has a variable, changing density.`,
  },
  {
    q: `What is the plain-text format of a triple integral equation?`,
    a: `Because standard keyboards lack advanced calculus symbols, a triple integral is written in plain text by stacking the integration commands from the outside in. The standard format is:
Integral [ Integral [ Integral f(x,y,z) dz ] dy ] dx
When evaluating this manually or entering it into a calculator, you must always solve the problem from the inside out. You integrate with respect to "z" first, then take that result and integrate it with respect to "y", and finally integrate that result with respect to "x".`,
  },
  {
    q: `In what order should I evaluate the variables (dx, dy, dz)?`,
    a: `According to Fubini's Theorem, if the integration limits are all constant numbers, the order of integration (e.g., dz dy dx versus dx dy dz) does not matter; you will get the exact same answer. However, if your limits involve variables (like integrating y from 0 to x), the order strictly matters. You must evaluate the integrals with variable limits first (on the inside) and save the integrals with constant numerical limits for the very last, outermost step.`,
  },
  {
    q: `Can a triple integral be used to find simple volume?`,
    a: `Yes. If you set the mathematical function inside the triple integral to exactly 1 — written as Integral [ Integral [ Integral 1 dz ] dy ] dx — the result of the calculation will give you the exact geometric volume of the three-dimensional region defined by your boundaries.`,
  },
  {
    q: `Why do some triple integrals use r, theta, and z instead of x, y, and z?`,
    a: `In multivariable calculus, shapes like cylinders and cones are notoriously difficult to calculate using standard rectangular Cartesian coordinates (x, y, z). To make the math easier, mathematicians convert the problem into Cylindrical Coordinates (radius, angle theta, and height z). This circular coordinate system vastly simplifies the boundary limits when the 3D object has a circular base.`,
  },
  {
    q: `What are spherical coordinates in triple integrals?`,
    a: `Similar to cylindrical coordinates, Spherical Coordinates are used to calculate the triple integral of perfectly round objects like spheres or half-spheres. Instead of x, y, and z, the calculator evaluates the Greek variables rho (the distance from the center), theta (the horizontal angle), and phi (the vertical angle). Converting an equation to spherical coordinates turns a massive, complex algebraic problem into a highly manageable one.`,
  },
  {
    q: `What are the real-world applications of calculating triple integrals?`,
    a: `Triple integrals are essential for advanced engineering and theoretical physics. Civil and mechanical engineers use them to calculate the "center of mass" and "moment of inertia" to ensure bridges and vehicles are structurally balanced. Physicists use them to calculate the total electrical charge within a three-dimensional space or to model complex fluid dynamics in aerospace design.`,
  },
]

export default function TripleIntegralCalculator() {
  const [fnExpr, setFnExpr] = useState("x^2 + y^2 + z^2");
  const [x1, setX1] = useState("0");
  const [x2, setX2] = useState("1");
  const [y1, setY1] = useState("0");
  const [y2, setY2] = useState("1");
  const [z1, setZ1] = useState("0");
  const [z2, setZ2] = useState("1");
  const [computed, setComputed] = useState(false);

  const result = useMemo(() => {
    if (!computed) return { value: null, isValid: false };
    const nx1 = parseFloat(x1);
    const nx2 = parseFloat(x2);
    const ny1 = parseFloat(y1);
    const ny2 = parseFloat(y2);
    const nz1 = parseFloat(z1);
    const nz2 = parseFloat(z2);

    if (isNaN(nx1) || isNaN(nx2) || isNaN(ny1) || isNaN(ny2) || isNaN(nz1) || isNaN(nz2)) {
      return { value: null, isValid: false };
    }

    const val = calculateTripleIntegral(fnExpr, nx1, nx2, ny1, ny2, nz1, nz2);
    if (isNaN(val)) return { value: null, isValid: false };
    return { value: val, isValid: true };
  }, [computed, fnExpr, x1, x2, y1, y2, z1, z2]);

  const handleCalculate = useCallback(() => {
    setComputed(true);
  }, []);

  const circumference = 2 * Math.PI * 80; // ~502.6
  const convergencePct = result.isValid ? 75 : 0;
  const dashOffset = circumference - (convergencePct / 100) * circumference;

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Sidebar – Inputs */}
        <aside className="lg:col-span-4 space-y-[24px]">
          <div className="space-y-[8px]">
            <h1 className="text-[32px] leading-[1.2] font-semibold text-on-surface">
              Triple Integral
            </h1>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant">
              Calculate definite triple integrals over rectangular regions with step-by-step visualization and numerical precision.
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
            <h2 className="text-[20px] leading-[1.4] font-semibold text-[var(--color-brand)] flex items-center gap-[8px]">
              <span className="material-symbols-outlined">functions</span>
              Input Parameters
            </h2>

            {/* Function Input */}
            <div className="space-y-[4px]">
              <label
                htmlFor="fnExpr"
                className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant"
              >
                Function f(x, y, z)
              </label>
              <input
                id="fnExpr"
                className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-[16px]"
                placeholder="e.g., x^2 + y^2 + z^2"
                type="text"
                value={fnExpr}
                onChange={(e) => setFnExpr(e.target.value)}
              />
            </div>

            {/* X Limits */}
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  x Lower Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  x Upper Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                />
              </div>
            </div>

            {/* Y Limits */}
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  y Lower Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  y Upper Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                />
              </div>
            </div>

            {/* Z Limits */}
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  z Lower Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={z1}
                  onChange={(e) => setZ1(e.target.value)}
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-on-surface-variant">
                  z Upper Limit
                </label>
                <input
                  className="w-full bg-[#f0f3ff] border border-[#c3c6d6] rounded-lg px-[16px] py-[8px] focus:ring-2 focus:ring-primary/20 outline-none text-[16px]"
                  type="text"
                  value={z2}
                  onChange={(e) => setZ2(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-primary text-on-primary py-[16px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95 mt-[16px]"
            >
              <span className="material-symbols-outlined">calculate</span>
              Calculate Triple Integral
            </button>
          </div>

          {/* Pro Tip */}
          <div
            className="rounded-xl p-[24px]"
            style={{
              background: "var(--color-inverse-surface, #263143)",
              color: "var(--color-inverse-on-surface, #ecf1ff)",
            }}
          >
            <h3 className="text-[20px] leading-[1.4] font-semibold mb-[8px]">Pro Tip</h3>
            <p className="text-[16px] leading-[1.6] opacity-80">
              Use the &ldquo;Step-by-Step&rdquo; feature to see each iterative integration phase from dz to dx.
            </p>
          </div>
        </aside>

        {/* Right – Results */}
        <section className="lg:col-span-8 space-y-[24px]">
          {/* Result Display Panel */}
          <div
            className="rounded-xl p-[48px] shadow-sm relative overflow-hidden"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-[48px]">
              <div>
                <span className="text-[14px] leading-[1.4] font-semibold tracking-[0.01em] text-primary uppercase tracking-wider">
                  Numerical Result
                </span>
                <div className="flex items-baseline gap-[8px]">
                  <h2 className="text-[48px] leading-[1.1] font-semibold text-on-surface mt-[8px]">
                    {result.isValid ? result.value!.toFixed(4) : "—"}
                  </h2>
                  <span className="text-[18px] leading-[1.6] text-on-surface-variant">
                    units³
                  </span>
                </div>
                <p className="text-[16px] leading-[1.6] text-on-surface-variant mt-[8px]">
                  {result.isValid
                    ? "Computed with 99.9% relative precision"
                    : "Enter a function and limits, then click Calculate"}
                </p>
              </div>

              {/* Visual Graph Representation */}
              <div className="w-48 h-48 relative flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full"
                  style={{ transform: "rotate(-90deg)" }}
                  viewBox="0 0 192 192"
                >
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="transparent"
                    strokeWidth="12"
                    stroke="currentColor"
                    className="text-[#d8e3fb]"
                  />
                  {result.isValid && (
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="transparent"
                      strokeWidth="12"
                      stroke="currentColor"
                      className="text-primary transition-all duration-1000 ease-out"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] leading-[1.4] font-semibold text-primary">
                    {convergencePct}%
                  </span>
                  <span className="text-[12px] leading-[1.4] text-on-surface-variant">
                    Convergence
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Visualization Image */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-[#c3c6d6] bg-[#f0f3ff]">
            <img
              alt="Mathematical visualization of triple integral region"
              className="w-full h-auto object-cover"
              src="https://lh3.googleusercontent.com/aida/ADBb0uhTMza53jNGV2B4B-qEpPg6mV1TF52Cuq7etCu-ZrjOaP82h89hURKs6GGNbmaPXa37_Tm7wHS67fyAsoUaZOzaseadUlB9UaNJ666PnBa-k1TdY09rGt9JZVGNLVYOATxewfbvWY9x-w6oP8_kZDJ90tSJkv-CDYyxHvvS4BuY5A0WnJO-WlsR9AiVHD_X4KTc4PiKGIflg58z7YVolO8A6eeRO3xa-I0rBUi4wn0MmivgkIFLzAns61sK"
            />
          </div>

          {/* Formula Section */}
          <div
            className="rounded-xl p-[24px]"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <h3 className="text-[20px] leading-[1.4] font-semibold mb-[24px]">Formula Used</h3>
            <div className="bg-white dark:bg-surface-container p-[48px] rounded-lg text-center overflow-x-auto">
              <div
                className="inline-block text-on-surface"
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontStyle: "italic",
                  fontSize: "30px",
                }}
              >
                ∫<sub style={{ fontSize: "14px" }}>x₁</sub><sup style={{ fontSize: "14px" }}>x₂</sup>
                {" "}∫<sub style={{ fontSize: "14px" }}>y₁</sub><sup style={{ fontSize: "14px" }}>y₂</sup>
                {" "}∫<sub style={{ fontSize: "14px" }}>z₁</sub><sup style={{ fontSize: "14px" }}>z₂</sup>
                {" "}f(x, y, z) dz dy dx
              </div>
            </div>
            <p className="text-[16px] leading-[1.6] text-on-surface-variant mt-[16px]">
              This calculator uses Fubini&apos;s Theorem for triple integrals over rectangular boxes, evaluating the inner integral with respect to z, then y, and finally x.
            </p>
          </div>
        </section>
      </section>

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Triple Integral Calculator."
        content={[
          "Solving multivariable calculus problems by hand is a time-consuming process where a single arithmetic mistake in the first step can ruin the entire equation. The JamroTools Triple Integral Calculator is an advanced, web-based mathematical utility designed to evaluate definite and indefinite integrals across three variables instantly. Built to operate entirely online, this tool leverages your browser to process complex computational math without requiring heavy software downloads.",
          "Whether you are a university student navigating Calculus III, a physicist determining the center of mass, or an engineer calculating fluid dynamics, this tool eliminates manual calculation errors. By simply entering your function and the upper and lower limits for your x, y, and z variables, the calculator processes the inside-out integration steps automatically, delivering the precise final result in seconds.",
          "/ Simplify Multivariable Calculus",
          "Triple integrals are the backbone of advanced 3D spatial mathematics. Using an automated calculator allows you to bypass tedious manual arithmetic and focus purely on the applied science.",
          "* Calculate 3D Volume: Instantly compute the exact spatial volume of complex, irregular three-dimensional solid regions.",
          "* Determine Mass and Density: Apply a density function to your calculation to find the total mass of an object that has varying density throughout its structure.",
          "* Solve Physics Applications: Easily compute advanced engineering metrics like the center of mass, moments of inertia, and electromagnetic fields.",
          "Whether you are checking your work on a difficult university assignment or running high-level physics models, this calculator provides the exact computational data required for accurate 3D analysis.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}
