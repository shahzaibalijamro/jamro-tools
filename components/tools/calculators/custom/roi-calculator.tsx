"use client";

import { useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { calculateRoi } from "../logic/roi-calculator";

const money = (value: number) => `$${Math.round(value).toLocaleString()}`;
const percent = (value: number) => `${value.toFixed(2)}%`;

export default function RoiCalculator() {
  const [investment, setInvestment] = useState(8000);
  const [netReturn, setNetReturn] = useState(8800);
  const [years, setYears] = useState(1);
  const [revenue, setRevenue] = useState(500000);
  const [cogs, setCogs] = useState(200000);
  const [operatingExpenses, setOperatingExpenses] = useState(150000);
  const [otherCosts, setOtherCosts] = useState(50000);

  const { roi, annualizedRoi, grossMargin, operatingMargin, netMargin } = calculateRoi({ investment, netReturn, years, revenue, cogs, operatingExpenses, otherCosts });
  const update = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => setter(Math.max(0, Number(value) || 0));
  const faqItems = [
    { q: "What is the difference between ROI and profit margin?", a: "ROI measures the return earned relative to capital invested. Profit margin measures the percentage of revenue retained after specified costs. ROI is capital-focused; margin is revenue-focused." },
    { q: "Can ROI be higher than 100%?", a: "Yes. A 200% ROI means the gain was twice the original investment, in addition to receiving the original capital back." },
    { q: "What is a good profit margin for a small business?", a: "Good margins vary by industry. Compare your gross, operating, and net margins with businesses in the same sector rather than using one universal target." },
    { q: "How is annualized ROI calculated?", a: "Annualized ROI is (1 + simple ROI) raised to the power of 1 divided by the number of years, minus 1. It makes investments with different holding periods easier to compare." },
  ];

  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
      <div className="lg:col-span-5 space-y-[16px]">
        <div className="glass-panel p-[24px] rounded-xl shadow-sm">
          <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px]">ROI Inputs</h3>
          <div className="space-y-[16px]">{[["Investment cost", investment, setInvestment], ["Net return", netReturn, setNetReturn], ["Holding period (years)", years, setYears]].map(([label, value, setter]) => <label key={label as string} className="block text-[14px] font-semibold text-on-surface-variant">{label as string}<input type="number" min="0" step="any" value={value as number} onChange={(e) => update(setter as React.Dispatch<React.SetStateAction<number>>, e.target.value)} className="mt-[4px] w-full px-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></label>)}</div>
        </div>
        <div className="glass-panel p-[24px] rounded-xl shadow-sm">
          <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px]">Profit Margin Inputs</h3>
          <div className="space-y-[16px]">{[["Revenue", revenue, setRevenue], ["COGS", cogs, setCogs], ["Operating expenses", operatingExpenses, setOperatingExpenses], ["Interest and taxes", otherCosts, setOtherCosts]].map(([label, value, setter]) => <label key={label as string} className="block text-[14px] font-semibold text-on-surface-variant">{label as string}<div className="relative mt-[4px]"><span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-outline">$</span><input type="number" min="0" step="any" value={value as number} onChange={(e) => update(setter as React.Dispatch<React.SetStateAction<number>>, e.target.value)} className="w-full pl-[28px] pr-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div></label>)}</div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-[24px]">
        <div className="bg-[#263143] text-white p-[32px] rounded-xl shadow-lg"><span className="font-semibold text-[14px] uppercase tracking-wider opacity-80">Return on Investment</span><div className={`text-[56px] font-black leading-tight mt-[8px] ${roi < 0 ? "text-red-300" : "text-primary-fixed-dim"}`}>{percent(roi)}</div><p className="text-[14px] text-primary-fixed-dim/90">Net gain: {money(netReturn - investment)} on {money(investment)} invested</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-[24px]"><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Annualized ROI</span><span className="text-[24px] font-bold">{percent(annualizedRoi)}</span></div><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Return multiple</span><span className="text-[24px] font-bold">{investment > 0 ? `${(netReturn / investment).toFixed(2)}x` : "0.00x"}</span></div></div></div>
        <div className="glass-panel p-[24px] rounded-xl"><h3 className="text-[18px] font-semibold mb-[20px]">Profit Margin Breakdown</h3><div className="grid grid-cols-2 sm:grid-cols-3 gap-[12px]"><div><span className="text-[12px] text-on-surface-variant block">Gross margin</span><strong className="text-[24px]">{percent(grossMargin)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Operating margin</span><strong className="text-[24px]">{percent(operatingMargin)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Net margin</span><strong className="text-[24px]">{percent(netMargin)}</strong></div></div></div>
      </div>
    </section>
    <ToolInfoCard title="About the ROI Calculator" content={["ROI measures capital efficiency: how much you earned relative to what you invested. Profit margin measures revenue efficiency: how much of each revenue dollar remains after costs.", "Use ROI for investment and go/no-go decisions. Use gross, operating, and net margin to locate pricing, overhead, and bottom-line efficiency problems. Together they provide a fuller business diagnosis."]} />
    <FaqSection items={faqItems} />
  </>;
}
