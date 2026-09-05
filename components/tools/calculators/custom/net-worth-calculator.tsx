"use client";

import { useMemo, useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { calculateNetWorth, netWorthBenchmark } from "../logic/net-worth-calculator";

const assetFields = [
  ["Financial accounts", 15000], ["Investments", 25000], ["Retirement accounts", 60000],
  ["Real estate equity", 120000], ["Vehicles", 18000], ["Other assets", 5000],
] as const;
const liabilityFields = [
  ["Mortgage", 95000], ["Student loans", 18000], ["Auto loans", 9000],
  ["Credit cards", 3500], ["Personal/medical debt", 2000], ["Other liabilities", 0],
] as const;
export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<number[]>(assetFields.map(([, value]) => value));
  const [liabilities, setLiabilities] = useState<number[]>(liabilityFields.map(([, value]) => value));
  const [age, setAge] = useState(35);
  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => calculateNetWorth(assets, liabilities), [assets, liabilities]);
  const { label: ageLabel, median } = netWorthBenchmark(age);
  const format = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const formatNetWorth = (value: number) => {
    if (Math.abs(value) >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)} million`;
    }
    return format(value);
  };
  const update = (setter: React.Dispatch<React.SetStateAction<number[]>>, index: number, value: string) => setter((current) => current.map((item, i) => i === index ? Math.max(0, Number(value) || 0) : item));
  const faqItems = [
    { q: "What is a net worth calculator?", a: "A net worth calculator totals your current assets and subtracts outstanding liabilities. The result may be positive, zero, or negative, and can be compared with the median for your age group." },
    { q: "Is negative net worth bad?", a: "No. Negative net worth is common for younger adults, especially when student loans outweigh early assets. The direction of your year-over-year trend matters most." },
    { q: "How often should I calculate my net worth?", a: "Quarterly is a useful cadence for most people, while an annual calculation is the minimum needed for a meaningful year-over-year comparison." },
    { q: "How accurate is the calculation?", a: "The arithmetic is exact; accuracy depends on entering current market values for assets and current payoff balances for debts." },
  ];

  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
      <div className="lg:col-span-5 space-y-[16px]">
        <div className="glass-panel p-[24px] rounded-xl shadow-sm">
          <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px]">Assets</h3>
          <div className="space-y-[16px]">{assetFields.map(([label], index) => <label key={label} className="block text-[14px] font-semibold text-on-surface-variant">{label}<div className="relative mt-[4px]"><span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-outline">$</span><input type="number" min="0" value={assets[index]} onChange={(e) => update(setAssets, index, e.target.value)} className="w-full pl-[28px] pr-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div></label>)}</div>
        </div>
        <div className="glass-panel p-[24px] rounded-xl shadow-sm">
          <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px]">Liabilities</h3>
          <div className="space-y-[16px]">{liabilityFields.map(([label], index) => <label key={label} className="block text-[14px] font-semibold text-on-surface-variant">{label}<div className="relative mt-[4px]"><span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-outline">$</span><input type="number" min="0" value={liabilities[index]} onChange={(e) => update(setLiabilities, index, e.target.value)} className="w-full pl-[28px] pr-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div></label>)}</div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-[24px]">
        <div className="bg-[#263143] text-white p-[32px] rounded-xl shadow-lg"><span className="font-semibold text-[14px] uppercase tracking-wider opacity-80">Your Net Worth</span><div className={`text-[56px] font-black leading-tight mt-[8px] ${netWorth < 0 ? "text-red-300" : "text-primary-fixed-dim"}`}>{formatNetWorth(netWorth)}</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-[24px]"><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Total assets</span><span className="text-[24px] font-bold">{format(totalAssets)}</span></div><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Total liabilities</span><span className="text-[24px] font-bold">{format(totalLiabilities)}</span></div></div></div>
        <div className="glass-panel p-[24px] rounded-xl"><h3 className="text-[18px] font-semibold mb-[16px]">Age benchmark</h3><label className="block text-[14px] font-semibold text-on-surface-variant">Your age<input type="number" min="18" max="100" value={age} onChange={(e) => setAge(Math.min(100, Math.max(18, Number(e.target.value) || 18)))} className="mt-[4px] w-full px-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg" /></label><div className="mt-[20px] flex items-end justify-between"><div><span className="text-[12px] text-on-surface-variant block">{ageLabel} median (2026)</span><strong className="text-[28px]">{format(median)}</strong></div><span className={`text-[14px] font-semibold ${netWorth >= median ? "text-green-600 dark:text-green-400" : "text-on-surface-variant"}`}>{netWorth >= median ? "Above median" : "Focus on your trajectory"}</span></div></div>
      </div>
    </section>
    <ToolInfoCard title="About the Net Worth Calculator" content={["Net worth is total assets minus total liabilities. Enter current market values for what you own and current payoff balances for what you owe to create a dated snapshot of your financial position.", "For meaningful progress, repeat the same calculation quarterly or annually using the same categories and methodology. Compare your result with your age-group median, but pay closest attention to whether the number is growing over time."]} />
    <FaqSection items={faqItems} />
  </>;
}
