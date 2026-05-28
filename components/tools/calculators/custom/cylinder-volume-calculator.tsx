"use client";

import { useState, useMemo } from "react";

const UNITS: Record<string, { label: string; abbr: string }> = {
  inches: { label: "Cubic Inches", abbr: "in³" },
  cm: { label: "Cubic Centimeters", abbr: "cm³" },
  meters: { label: "Cubic Meters", abbr: "m³" },
  feet: { label: "Cubic Feet", abbr: "ft³" },
  mm: { label: "Cubic Millimeters", abbr: "mm³" },
};

export default function CylinderVolumeCalculator() {
  const [radius, setRadius] = useState(5);
  const [height, setHeight] = useState(10);
  const [units, setUnits] = useState("inches");

  const results = useMemo(() => {
    const r = radius || 0;
    const h = height || 0;

    if (r <= 0 || h <= 0) {
      return { volume: 0, baseArea: 0, lateralArea: 0, basePct: 50, lateralPct: 50, ratio: "--" };
    }

    const baseArea = Math.PI * Math.pow(r, 2);
    const lateralArea = 2 * Math.PI * r * h;
    const volume = baseArea * h;
    const totalSurface = baseArea * 2 + lateralArea;

    // For the donut chart, we show ratio of 2×baseArea vs lateralArea on the full ring
    const basePct = totalSurface > 0 ? ((baseArea * 2) / totalSurface) * 100 : 50;
    const lateralPct = totalSurface > 0 ? (lateralArea / totalSurface) * 100 : 50;

    const ratio =
      lateralArea > 0
        ? `${Math.round((baseArea / lateralArea) * 100)}%`
        : "--";

    return {
      volume,
      baseArea: baseArea * 2,
      lateralArea,
      basePct,
      lateralPct,
      ratio,
    };
  }, [radius, height]);

  const unitInfo = UNITS[units] || UNITS["inches"];

  const fmt = (v: number) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const faqItems = [
    {
      q: "How do I calculate the volume of a cylinder?",
      a: "To find the volume of a cylinder, you need its radius (distance from the center of the base to the edge) and its height. Square the radius, multiply by π (approx 3.14159), and then multiply by the height: V = πr²h.",
    },
    {
      q: "What are the units for cylinder volume?",
      a: "Volume is always expressed in cubic units. If your dimensions are in centimeters, the volume will be in cm³. If in feet, the volume will be in cubic feet (ft³).",
    },
    {
      q: "What is the difference between volume and capacity?",
      a: "Volume refers to the amount of 3D space an object occupies, while capacity refers to the amount of substance (like liquid or gas) that a container can hold. This calculator measures the geometric volume.",
    },
    {
      q: "How accurate is this calculator?",
      a: "This tool uses JavaScript's native Math.PI (approximately 15 decimal places) to ensure professional-grade accuracy suitable for architecture and engineering tasks.",
    },
  ];

  return (
    <>
      {/* ── Main Tool Grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* ── Inputs Panel ── */}
        <div className="lg:col-span-5 space-y-[16px]">
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
                straighten
              </span>
              Cylinder Dimensions
            </h3>
            <div className="space-y-[20px]">
              {/* Radius */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Radius (r)
                </label>
                <input
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  type="number"
                  min={0}
                  step="any"
                  placeholder="Enter radius"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value) || 0)}
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Height (h)
                </label>
                <input
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  type="number"
                  min={0}
                  step="any"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value) || 0)}
                />
              </div>

              {/* Units */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Units
                </label>
                <select
                  className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                >
                  <option value="inches">Inches (in)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="meters">Meters (m)</option>
                  <option value="feet">Feet (ft)</option>
                  <option value="mm">Millimeters (mm)</option>
                </select>
              </div>

              <button className="w-full flex items-center justify-center gap-[8px] bg-primary text-on-primary hover:shadow-lg active:scale-95 transition-all px-[24px] py-[16px] rounded-xl font-semibold text-[14px] mt-[24px] shadow-sm">
                <span className="material-symbols-outlined">calculate</span>
                Recalculate Volume
              </button>
            </div>
          </div>

          {/* Formula Card */}
          <div
            className="p-[24px] rounded-xl shadow-sm"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <h3 className="text-[14px] font-semibold text-primary uppercase tracking-wider mb-[16px]">
              The Formula
            </h3>
            <div className="bg-primary-container/10 p-[16px] rounded-lg mb-[16px] text-center">
              <code className="text-[48px] leading-[1.1] font-semibold tracking-tight text-primary">
                V = πr²h
              </code>
            </div>
            <p className="text-[12px] font-medium text-on-surface-variant">
              To calculate the volume of a cylinder, multiply the area of the
              base (πr²) by the height (h). This formula assumes a right
              circular cylinder.
            </p>
          </div>
        </div>

        {/* ── Results Panel ── */}
        <div className="lg:col-span-7 space-y-[16px]">
          <div
            className="rounded-xl overflow-hidden shadow-sm relative"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            {/* Background icon */}
            <div className="absolute top-0 right-0 p-[24px] opacity-10 pointer-events-none">
              <span
                className="material-symbols-outlined text-[120px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                database
              </span>
            </div>

            <div className="p-[24px] relative">
              <h3 className="text-[22px] leading-[28px] font-semibold mb-[16px]">
                Volume Result
              </h3>

              <div className="flex flex-col md:flex-row items-center gap-[24px]">
                {/* Volume Display */}
                <div className="flex-1 w-full">
                  <div className="text-[64px] font-extrabold text-primary leading-tight mb-[4px]">
                    {fmt(results.volume)}
                  </div>
                  <div className="text-[14px] font-medium text-on-surface-variant mb-[24px]">
                    {unitInfo.label}
                  </div>

                  <div className="grid grid-cols-2 gap-[12px]">
                    <div className="p-[16px] rounded-lg bg-surface-container">
                      <div className="text-[12px] font-medium text-on-surface-variant uppercase tracking-tight">
                        Base Areas
                      </div>
                      <div className="text-[20px] leading-[28px] font-semibold text-on-surface">
                        {fmt(results.baseArea)}
                      </div>
                    </div>
                    <div className="p-[16px] rounded-lg bg-surface-container">
                      <div className="text-[12px] font-medium text-on-surface-variant uppercase tracking-tight">
                        Lateral Area
                      </div>
                      <div className="text-[20px] leading-[28px] font-semibold text-on-surface">
                        {fmt(results.lateralArea)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    {/* Background ring */}
                    <path
                      className="text-surface-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    {/* Lateral area segment (renders first, underneath base) */}
                    <path
                      className="text-primary transition-all duration-700 ease-out"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${results.lateralPct}, 100`}
                      strokeDashoffset={`-${results.basePct}`}
                    />
                    {/* Base area segment (renders second, on top) */}
                    <path
                      className="text-secondary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${results.basePct}, 100`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[12px] font-medium text-on-surface-variant">
                      Ratio
                    </span>
                    <span className="text-[20px] leading-[28px] font-bold text-primary">
                      {results.ratio}
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-[24px] flex gap-[24px]">
                <div className="flex items-center gap-[8px]">
                  <span className="w-3 h-3 rounded-full bg-secondary-container" />
                  <span className="text-[12px] font-medium text-on-surface-variant">
                    Base Area Contribution
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[12px] font-medium text-on-surface-variant">
                    Lateral Area Contribution
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Cylinder Visual */}
          <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-sm relative group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXDnol2jL_FrGgsQug7K588PNpLY-3QAViklJuxPS-afT4nhzwY5X4AguHXsAvMS-jkgkT4nELaX37fRHdzQD-N4NSOV3hYbd5lGebQ6Ltj1bluf3Yu1rF01w3ureLLbUrEeaXHmXod5GoGN4qnYNOw1q0SNg8Zd7f_BZc7P-LBs3n4Ie7nmFW7pD1XFCW6v92SxV4_yyATuPBxggfZnl2q1PJ19f5y_PXpu_vFUxGcMXj0aFtZrS0ue_ZCpPl8u0F1UXuKe-y1-mk"
              alt="3D rendering of a translucent blue glass cylinder on a reflective surface"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-[24px]">
              <div className="text-on-primary">
                <p className="text-[20px] leading-[28px] font-semibold">
                  Precision Engineering
                </p>
                <p className="text-[14px] font-medium opacity-80">
                  Visualizing structural volume in real-time.
                </p>
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