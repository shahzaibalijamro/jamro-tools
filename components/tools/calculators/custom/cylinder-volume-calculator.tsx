"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useMemo } from "react";
import { calculateCylinder, cylinderUnits } from "../logic/cylinder-volume-calculator";

export default function CylinderVolumeCalculator() {
  const [radius, setRadius] = useState(5);
  const [height, setHeight] = useState(10);
  const [units, setUnits] = useState("inches");

  const calculated = useMemo(() => calculateCylinder(radius, height), [radius, height]);
  const results = { ...calculated, basePct: calculated.basePercent, lateralPct: calculated.lateralPercent };

  const unitInfo = cylinderUnits[units as keyof typeof cylinderUnits] || cylinderUnits.inches;

  const fmt = (v: number) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const faqItems = [
    {
      q: `What is a cylinder volume calculator?`,
      a: `A cylinder volume calculator is an automated online geometry tool that calculates the total three-dimensional space enclosed within a cylinder. By entering basic physical dimensions—specifically the height of the cylinder and the radius or diameter of its circular base—the tool instantly computes the total cubic volume, saving you from doing complex manual mathematics.`,
    },
    {
      q: `What is the exact formula for the volume of a cylinder?`,
      a: `The universal mathematical formula for finding the volume of a cylinder is:
Volume = π * (Radius * Radius) * Height
(V = πr²h)
To calculate this manually: first, multiply the radius of the circular base by itself (radius squared). Next, multiply that result by the mathematical constant Pi (approximately 3.14159). Finally, multiply that number by the total height of the cylinder to get your final cubic volume.`,
    },
    {
      q: `What is the difference between radius and diameter when calculating volume?`,
      a: `The radius is the distance from the exact center of a circle to its outer edge. The diameter is the total distance across the widest part of the circle, passing straight through the center. The standard volume formula requires the radius. If you only know the diameter of your cylinder, you must divide the diameter by two to find the radius before doing any volume calculations.`,
    },
    {
      q: `Why is the value of Pi (π) used in this calculation?`,
      a: `Pi (often written as 3.14159) is a mathematical constant that represents the ratio of a circle's circumference to its diameter. Because a cylinder is essentially a tall stack of circles piled on top of each other, you must first calculate the two-dimensional area of the circular base using Pi. Once you have the area of that base circle, multiplying it by the total height gives you the 3D volume.`,
    },
    {
      q: `Can I calculate the volume in different units like liters or gallons?`,
      a: `Yes, but it requires a two-step process. First, the calculator determines the geometric volume in standard cubic units (such as cubic inches, cubic centimeters, or cubic meters). Once you have that cubic volume, you can convert it into liquid capacity. For example, 1 cubic meter is exactly equal to 1,000 liters, and 1 cubic foot equals roughly 7.48 U.S. liquid gallons.`,
    },
    {
      q: `How do I calculate the volume if I only know the circumference of the cylinder?`,
      a: `If you only have the measurement around the outside of the cylinder (the circumference), you must work backward to find the radius first. The formula to find the radius is:
Radius = Circumference / (2 * π)
Once you calculate the radius using this formula, you can plug it into the standard volume calculator alongside the height to find your total volume.`,
    },
    {
      q: `Does a cylinder's volume change if it is hollow versus solid?`,
      a: `Mathematically, the external volume calculation is exactly the same regardless of whether the cylinder is solid or hollow. However, in real-world applications, a hollow cylinder (like a water pipe) has an "internal volume" (capacity) and an "external volume." To find the internal capacity, you must measure the inside radius of the cylinder, excluding the physical thickness of the pipe's walls.`,
    },
    {
      q: `What are common real-world uses for calculating cylinder volume?`,
      a: `Cylinder volume calculations are used daily across multiple industries. Plumbers use it to determine the water flow capacity of pipes. Engineers use it to design safe storage tanks for chemicals and fuels. Architects use it to calculate the concrete required for structural columns. It is also utilized in manufacturing to optimize the sizing of canned goods, batteries, and cosmetics packaging.`,
    },
  ]

  return (
    <>
      {/* ── Main Tool Grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* ── Inputs Panel ── */}
        <div className="lg:col-span-5 space-y-[16px]">
          <div
            className="p-[24px] rounded-xl shadow-sm bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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
            className="p-[24px] rounded-xl shadow-sm bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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
            className="rounded-xl overflow-hidden shadow-sm relative bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30"
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

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Cylinder Volume Calculator."
        content={[
          "Finding the exact cubic capacity of a cylindrical object shouldn't require you to memorize complex geometric formulas. The JamroTools Cylinder Volume Calculator is a fast, web-based mathematical utility designed to instantly compute the three-dimensional space inside any cylinder. Operating entirely online, this tool delivers immediate, highly accurate results directly in your browser.",
          "Whether you are a student solving geometry homework, an engineer calculating fluid capacity for a storage tank, or a DIY enthusiast estimating materials for a project, this calculator provides instant clarity. By simply inputting the radius (or diameter) and the height of your cylinder, the tool executes the math perfectly, eliminating the risk of human error.",
          "/ Simplify Your Geometric Calculations",
          "Calculating 3D volume is essential for both academic exercises and real-world industrial applications. Using this calculator translates raw dimensions into usable spatial data.",
          "* Fluid Storage & Capacity: Instantly determine exactly how much water, oil, or gas a cylindrical tank, pipe, or pool can hold.",
          "* Manufacturing & Packaging: Calculate the exact volume of aluminum cans, shipping tubes, or cylindrical containers for accurate product sizing.",
          "* Construction & DIY: Estimate the amount of concrete needed for cylindrical pillars, fence posts, or garden features.",
          "Whether you are auditing manufacturing specs or working on a weekend home improvement task, this calculator gives you the precise geometric data required to move forward with confidence.",
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}
