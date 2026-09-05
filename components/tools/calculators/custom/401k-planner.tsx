"use client";

import { useMemo, useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { calculate401k } from "../logic/401k-planner";

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export default function FourOhOneKPlanner() {
  const [balance, setBalance] = useState(50000);
  const [salary, setSalary] = useState(75000);
  const [contribution, setContribution] = useState(10);
  const [match, setMatch] = useState(4);
  const [returnRate, setReturnRate] = useState(7);
  const [years, setYears] = useState(30);

  const projection = useMemo(() => calculate401k({ balance, salary, contributionPercent: contribution, matchPercent: match, returnPercent: returnRate, years }), [balance, salary, contribution, match, returnRate, years]);

  const update = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => setter(Math.max(0, Number(value) || 0));
  const faqItems = [
    { q: "What is a 401(k) calculator?", a: "It projects your retirement balance by applying compound growth to your current balance, contributions, employer match, return assumption, and years until retirement." },
    { q: "What is the 4% rule?", a: "The 4% rule estimates sustainable first-year retirement withdrawals. A $1,000,000 balance would support about $40,000 per year, or $3,333 per month, before taxes." },
    { q: "What if I am behind on retirement savings?", a: "Increase contributions gradually, capture the full employer match, consider catch-up contributions, and model a later retirement date or different return assumptions." },
  ];
  const fields = [["Current 401(k) balance", balance, setBalance], ["Annual salary", salary, setSalary], ["Your contribution (%)", contribution, setContribution], ["Employer match (%)", match, setMatch], ["Expected annual return (%)", returnRate, setReturnRate], ["Years until retirement", years, setYears]] as const;

  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
      <div className="lg:col-span-5"><div className="glass-panel p-[24px] rounded-xl shadow-sm"><h3 className="text-[22px] leading-[28px] font-semibold mb-[24px]">Retirement Inputs</h3><div className="space-y-[16px]">{fields.map(([label, value, setter]) => <label key={label} className="block text-[14px] font-semibold text-on-surface-variant">{label}<input type="number" min="0" step="any" value={value} onChange={(e) => update(setter, e.target.value)} className="mt-[4px] w-full px-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></label>)}</div></div></div>
      <div className="lg:col-span-7 flex flex-col gap-[24px]"><div className="bg-[#263143] text-white p-[32px] rounded-xl shadow-lg"><span className="font-semibold text-[14px] uppercase tracking-wider opacity-80">Projected Balance at Retirement</span><div className="text-[56px] font-black leading-tight mt-[8px] text-primary-fixed-dim">{money(projection.future)}</div><div className="grid grid-cols-2 gap-[16px] mt-[24px]"><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Monthly income at 4%</span><span className="text-[24px] font-bold">{money(projection.future * .04 / 12)}</span></div><div className="bg-white/10 p-[16px] rounded-xl"><span className="text-[12px] opacity-70 block">Employer match / year</span><span className="text-[24px] font-bold">{money(projection.employer)}</span></div></div></div>
        <div className="glass-panel p-[24px] rounded-xl"><h3 className="text-[18px] font-semibold mb-[20px]">Projection Breakdown</h3><div className="grid grid-cols-2 lg:grid-cols-3 gap-[12px]"><div><span className="text-[12px] text-on-surface-variant block">Starting balance</span><strong className="text-[22px]">{money(balance)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Your total contributions</span><strong className="text-[22px]">{money(projection.annual * years)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Employer total match</span><strong className="text-[22px]">{money(projection.employer * years)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Investment growth</span><strong className="text-[22px]">{money(projection.growth)}</strong></div><div><span className="text-[12px] text-on-surface-variant block">Your annual contribution</span><strong className="text-[22px]">{money(projection.annual)}</strong></div></div></div></div>
    </section>
    <ToolInfoCard title="About the 401(k) Planner" content={["The planner compounds your current balance, annual contributions, and employer match over your working years. A 15% combined savings rate is a common benchmark, and contributing enough to capture the full match is the first priority.", "Results are estimates based on your return assumption. Actual market returns vary, so test conservative and optimistic scenarios before making retirement decisions."]} />
    <FaqSection items={faqItems} />
  </>;
}
