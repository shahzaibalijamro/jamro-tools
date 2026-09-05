"use client";

import { useMemo, useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { calculateStudentLoanPlans } from "../logic/student-loan-calculator";

const money = (value: number) => `$${Math.round(value).toLocaleString()}`;
export default function StudentLoanCalculator() {
  const [balance, setBalance] = useState(45000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [income, setIncome] = useState(55000);
  const [familySize, setFamilySize] = useState(1);
  const [dependents, setDependents] = useState(0);

  const plans = useMemo(() => calculateStudentLoanPlans(balance, interestRate, income, familySize, dependents), [balance, interestRate, income, familySize, dependents]);

  const update = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => setter(Math.max(0, Number(value) || 0));
  const faqItems = [
    { q: "How does a student loan repayment calculator work?", a: "Fixed plans use the standard amortization formula. Income-driven plans estimate payments from income and household inputs, but actual payments are recalculated using current program rules and tax information." },
    { q: "Which repayment plan costs the least?", a: "Standard repayment generally minimizes total interest because it pays the balance off over ten years. Income-driven plans prioritize monthly affordability and potential forgiveness." },
    { q: "Are income-driven forgiveness amounts taxable?", a: "Under the rules described in the source article, IDR forgiveness beginning in 2026 may be federally taxable, while qualifying PSLF forgiveness remains federally tax-free. Verify current rules before enrolling." },
    { q: "What happened to the SAVE plan?", a: "The article states that SAVE was eliminated under the 2025 legislation and that RAP becomes available as the replacement income-driven option for new borrowers beginning in July 2026." },
  ];

  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
      <div className="lg:col-span-4"><div className="glass-panel p-[24px] rounded-xl shadow-sm"><h3 className="text-[22px] font-semibold mb-[24px]">Loan Details</h3><div className="space-y-[16px]">{[["Loan balance", balance, setBalance], ["Interest rate (%)", interestRate, setInterestRate], ["Adjusted gross income", income, setIncome], ["Family size", familySize, setFamilySize], ["Qualifying dependents", dependents, setDependents]].map(([label, value, setter]) => <label key={label as string} className="block text-[14px] font-semibold text-on-surface-variant">{label as string}<input type="number" min="0" step="any" value={value as number} onChange={(e) => update(setter as React.Dispatch<React.SetStateAction<number>>, e.target.value)} className="mt-[4px] w-full px-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></label>)}</div></div></div>
      <div className="lg:col-span-8"><div className="glass-panel p-[24px] rounded-xl overflow-x-auto"><h3 className="text-[22px] font-semibold mb-[20px]">Repayment Plan Comparison</h3><table className="w-full min-w-[640px] text-left"><thead><tr className="border-b border-outline-variant"><th className="py-[12px]">Plan</th><th>Monthly payment</th><th>Term</th><th>Projected paid</th><th>Projected interest</th></tr></thead><tbody>{plans.map((plan) => <tr key={plan.name} className="border-b border-outline-variant/50"><td className="py-[16px]"><strong className="block">{plan.name}</strong><span className="text-[12px] text-on-surface-variant">{plan.note}</span></td><td className="font-bold text-primary">{money(plan.monthly)}</td><td>{plan.years} years</td><td>{money(plan.total)}</td><td>{money(Math.max(0, plan.total - balance))}</td></tr>)}</tbody></table><p className="text-[12px] text-on-surface-variant mt-[16px]">IBR and RAP are planning estimates based on current income. They do not model annual income changes, interest subsidies, forgiveness taxes, or PSLF eligibility.</p></div></div>
    </section>
    <ToolInfoCard title="About the Student Loan Calculator" content={["Compare the monthly payment and long-term cost of Standard, Tiered Standard, IBR, and RAP repayment approaches. Fixed-plan calculations use standard loan amortization, while income-driven figures are estimates based on the income information entered.", "Lower income-driven payments can improve monthly cash flow but may extend repayment and increase accumulated interest. Confirm eligibility and current program terms with Federal Student Aid or your loan servicer."]} />
    <FaqSection items={faqItems} />
  </>;
}
