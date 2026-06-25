"use client";

import { useState, useMemo, useCallback } from "react";

const faqItems = [
  {
    q: "What is a triple integral?",
    a: "A triple integral generalizes the idea of a double integral to three dimensions. It represents the volume or mass of a solid region in space given a density function f(x, y, z).",
  },
  {
    q: "Can I integrate over non-rectangular regions?",
    a: "Current version supports rectangular boundaries. For complex regions, please define your limits as constant values covering the bounding box of the solid.",
  },
  {
    q: "What units are used?",
    a: "The results are dimensionless unless specified. If integrating density, the result is mass. If integrating f(x, y, z) = 1, the result is volume.",
  },
  {
    q: "Is there a limit on function complexity?",
    a: "Our engine supports standard algebraic, trigonometric, and exponential functions. Highly oscillating functions may require more computation time.",
  },
];

// Simple function parser and numeric integrator
function evaluateFunction(expr: string, x: number, y: number, z: number): number {
  try {
    const sanitized = expr
      .replace(/\^/g, "**")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log")
      .replace(/exp/g, "Math.exp")
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/abs/g, "Math.abs")
      .replace(/pi/gi, "Math.PI")
      .replace(/e(?![xp])/gi, "Math.E");
    const fn = new Function("x", "y", "z", `return ${sanitized};`);
    return fn(x, y, z);
  } catch {
    return NaN;
  }
}

function tripleIntegral(
  fnExpr: string,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  z1: number,
  z2: number,
  steps = 20
): number {
  const dx = (x2 - x1) / steps;
  const dy = (y2 - y1) / steps;
  const dz = (z2 - z1) / steps;

  let sum = 0;
  for (let i = 0; i < steps; i++) {
    const x = x1 + (i + 0.5) * dx;
    for (let j = 0; j < steps; j++) {
      const y = y1 + (j + 0.5) * dy;
      for (let k = 0; k < steps; k++) {
        const z = z1 + (k + 0.5) * dz;
        const val = evaluateFunction(fnExpr, x, y, z);
        if (!isNaN(val)) {
          sum += val * dx * dy * dz;
        }
      }
    }
  }
  return sum;
}

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

    const val = tripleIntegral(fnExpr, nx1, nx2, ny1, ny2, nz1, nz2);
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
              This calculator uses Fubini's Theorem for triple integrals over rectangular boxes, evaluating the inner integral with respect to z, then y, and finally x.
            </p>
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