"use client";

import { useMemo, useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

type FilingStatus = "single" | "mfj" | "hoh" | "mfs";
type Bracket = { rate: number; limit: number };
type BracketRow = { rate: number; income: number; tax: number };

const brackets: Record<FilingStatus, Bracket[]> = {
  single: [{ rate: 10, limit: 12400 }, { rate: 12, limit: 50400 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256225 }, { rate: 35, limit: 640600 }, { rate: 37, limit: Infinity }],
  mfj: [{ rate: 10, limit: 24800 }, { rate: 12, limit: 100800 }, { rate: 22, limit: 211400 }, { rate: 24, limit: 403550 }, { rate: 32, limit: 512450 }, { rate: 35, limit: 768700 }, { rate: 37, limit: Infinity }],
  hoh: [{ rate: 10, limit: 17700 }, { rate: 12, limit: 67450 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256200 }, { rate: 35, limit: 640600 }, { rate: 37, limit: Infinity }],
  mfs: [{ rate: 10, limit: 12400 }, { rate: 12, limit: 50400 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256225 }, { rate: 35, limit: 384350 }, { rate: 37, limit: Infinity }],
};
const standardDeductions: Record<FilingStatus, number> = { single: 16100, mfj: 32200, hoh: 24150, mfs: 16100 };
const money = (value: number) => `$${Math.round(value).toLocaleString()}`;

function calculateTax(income: number, status: FilingStatus) {
  let lower = 0;
  let tax = 0;
  const rows: BracketRow[] = [];
  for (const bracket of brackets[status]) {
    const taxableInBracket = Math.max(0, Math.min(income, bracket.limit) - lower);
    if (taxableInBracket > 0) rows.push({ rate: bracket.rate, income: taxableInBracket, tax: taxableInBracket * bracket.rate / 100 });
    tax += taxableInBracket * bracket.rate / 100;
    lower = bracket.limit;
    if (income <= bracket.limit) break;
  }
  const marginal = income > 0 ? (rows[rows.length - 1]?.rate ?? 0) : 0;
  return { tax, marginal, rows };
}

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(75000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [retirementContribution, setRetirementContribution] = useState(6000);
  const [useItemized, setUseItemized] = useState(false);
  const [itemizedDeduction, setItemizedDeduction] = useState(0);
  const [withholding, setWithholding] = useState(9000);
  const [credits, setCredits] = useState(0);
  const result = useMemo(() => {
    const income = Math.max(0, grossIncome);
    const agi = Math.max(0, income - Math.min(income, Math.max(0, retirementContribution)));
    const deduction = Math.min(agi, Math.max(0, useItemized ? itemizedDeduction : standardDeductions[status]));
    const taxableIncome = Math.max(0, agi - deduction);
    const calculated = calculateTax(taxableIncome, status);
    const taxAfterCredits = Math.max(0, calculated.tax - Math.max(0, credits));
    const refund = Math.max(0, withholding - taxAfterCredits);
    return { ...calculated, agi, deduction, taxableIncome, taxAfterCredits, refund, balanceDue: Math.max(0, taxAfterCredits - withholding), effective: income > 0 ? taxAfterCredits / income * 100 : 0 };
  }, [grossIncome, status, retirementContribution, useItemized, itemizedDeduction, withholding, credits]);
  const updateNumber = (setter: (value: number) => void, value: string) => setter(Math.max(0, Number(value) || 0));
  const faqItems = [
    { q: "What is an income tax calculator?", a: "It estimates federal income tax by subtracting deductions from gross income, applying progressive 2026 tax brackets, and comparing the result with your withholding." },
    { q: "Is an income tax calculator accurate?", a: "The calculation is mathematically exact for the inputs and 2026 brackets provided, but actual returns may differ because of credits, AMT, additional income, and other tax rules." },
    { q: "What is the difference between a deduction and a credit?", a: "A deduction reduces taxable income. A credit reduces the tax bill directly, dollar for dollar, and is generally more valuable than an equal deduction." },
    { q: "How can I reduce taxable income in 2026?", a: "Common options include traditional 401(k) contributions, traditional IRA contributions, HSA contributions, and eligible above-the-line adjustments." },
  ];
  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
      <div className="lg:col-span-5"><div className="glass-panel p-[24px] rounded-xl shadow-sm"><h3 className="text-[22px] leading-[28px] font-semibold mb-[24px] flex items-center gap-[8px]"><span className="material-symbols-outlined text-primary">request_quote</span>Tax inputs</h3><div className="space-y-[20px]">
        <label className="block text-[14px] font-semibold text-on-surface-variant">Gross annual income<input aria-label="Gross annual income" type="number" min="0" className="mt-[4px] w-full px-[16px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={grossIncome} onChange={(e) => updateNumber(setGrossIncome, e.target.value)} /></label>
        <label className="block text-[14px] font-semibold text-on-surface-variant">Filing status<select aria-label="Filing status" className="mt-[4px] w-full px-[16px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}><option value="single">Single</option><option value="mfj">Married filing jointly</option><option value="hoh">Head of household</option><option value="mfs">Married filing separately</option></select></label>
        <label className="block text-[14px] font-semibold text-on-surface-variant">Traditional 401(k) contribution<input aria-label="Traditional 401k contribution" type="number" min="0" className="mt-[4px] w-full px-[16px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={retirementContribution} onChange={(e) => updateNumber(setRetirementContribution, e.target.value)} /></label>
        <label className="flex items-center gap-[8px] text-[14px] font-semibold text-on-surface-variant"><input type="checkbox" checked={useItemized} onChange={(e) => setUseItemized(e.target.checked)} /> Use itemized deduction</label>
        {useItemized && <label className="block text-[14px] font-semibold text-on-surface-variant">Itemized deductions<input aria-label="Itemized deductions" type="number" min="0" className="mt-[4px] w-full px-[16px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={itemizedDeduction} onChange={(e) => updateNumber(setItemizedDeduction, e.target.value)} /></label>}
        <div className="grid grid-cols-2 gap-[16px]"><label className="block text-[14px] font-semibold text-on-surface-variant">Federal withholding<input aria-label="Federal withholding" type="number" min="0" className="mt-[4px] w-full px-[12px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={withholding} onChange={(e) => updateNumber(setWithholding, e.target.value)} /></label><label className="block text-[14px] font-semibold text-on-surface-variant">Tax credits<input aria-label="Tax credits" type="number" min="0" className="mt-[4px] w-full px-[12px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={credits} onChange={(e) => updateNumber(setCredits, e.target.value)} /></label></div>
      </div></div></div>
      <div className="lg:col-span-7"><div className="bg-[#263143] dark:bg-surface-container text-white dark:text-on-surface p-[32px] rounded-xl shadow-lg h-full"><span className="font-semibold text-[14px] uppercase tracking-wider opacity-80">Estimated 2026 federal tax</span><div className="text-[48px] font-black leading-tight mt-[8px] text-primary-fixed-dim">{money(result.taxAfterCredits)}</div><span className="text-[14px] opacity-80">Estimated tax after credits</span><div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] mt-[28px]">{[["Taxable income", money(result.taxableIncome)], ["Effective rate", `${result.effective.toFixed(1)}%`], ["Marginal rate", `${result.marginal}%`], [result.balanceDue > 0 ? "Balance due" : "Estimated refund", money(result.balanceDue || result.refund)]].map(([label, value]) => <div key={label} className="border-t border-white/20 pt-[12px]"><span className="block text-[12px] opacity-70">{label}</span><strong className="text-[20px]">{value}</strong></div>)}</div></div></div>
    </section>
    <section className="glass-panel p-[24px] rounded-xl shadow-sm mb-[48px] overflow-x-auto"><h3 className="text-[22px] leading-[28px] font-semibold mb-[20px]">Tax bracket breakdown</h3><table className="w-full min-w-[520px] text-left"><thead><tr className="border-b border-outline-variant"><th className="py-[12px]">Rate</th><th>Income in bracket</th><th>Tax paid</th></tr></thead><tbody>{result.rows.map((row) => <tr key={row.rate} className="border-b border-outline-variant/50"><td className="py-[14px] font-semibold">{row.rate}%</td><td>{money(row.income)}</td><td className="font-bold text-primary">{money(row.tax)}</td></tr>)}</tbody></table><p className="text-[12px] text-on-surface-variant mt-[16px]">Brackets apply progressively to taxable income after deductions. This estimate excludes state tax, AMT, and many specialized credits.</p></section>
    <ToolInfoCard title="About the Income Tax Calculator" content={["Estimate your 2026 federal income tax by entering gross income, filing status, retirement contributions, deductions, withholding, and credits. The calculator applies each progressive bracket to the income layer it covers, then reports taxable income, marginal rate, effective rate, and your projected refund or balance due.", "Tax figures use the 2026 IRS bracket thresholds and standard deductions described in the guide. Actual liability can vary with other income, itemized deductions, credits, state taxes, and changing tax law.", "/ How the estimate works", "Gross income is reduced by eligible above-the-line contributions and your selected deduction to find taxable income. Each bracket rate is then applied only to the dollars in that bracket, so your marginal rate is not the rate applied to every dollar.", "* Compare standard and itemized deductions", "* See how retirement contributions change taxable income", "* Check whether withholding is on track"]} />
    <FaqSection items={faqItems} />
  </>;
}
