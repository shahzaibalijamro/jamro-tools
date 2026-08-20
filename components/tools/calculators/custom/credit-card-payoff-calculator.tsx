"use client";

import { useMemo, useState } from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

type Card = { name: string; balance: number; apr: number };
type Result = { months: number; interest: number; payment: number };
const money = (value: number) => `$${Math.round(value).toLocaleString()}`;

function simulate(cards: Card[], monthlyPayment: number, strategy: "minimum" | "avalanche" | "snowball"): Result {
  let debts = cards.map((card) => ({ ...card, balance: Number.isFinite(card.balance) ? Math.max(0, card.balance) : 0, apr: Number.isFinite(card.apr) ? Math.max(0, card.apr) : 0 }));
  let interest = 0;
  let months = 0;
  const payment = Number.isFinite(monthlyPayment) ? Math.max(0, monthlyPayment) : 0;
  if (!debts.some((card) => card.balance > 0.01) || (strategy !== "minimum" && payment <= 0)) {
    return { months: 0, interest: 0, payment };
  }
  while (debts.some((card) => card.balance > 0.01) && months < 1200) {
    months += 1;
    debts = debts.map((card) => {
      const dailyRate = card.apr / 100 / 365;
      const accrued = card.balance * dailyRate * 30;
      interest += accrued;
      return { ...card, balance: card.balance + accrued };
    });
    if (strategy === "minimum") {
      let remaining = payment;
      debts = debts.map((card) => {
        const minimum = Math.min(Math.max(25, card.balance * 0.02), card.balance);
        const paid = Math.min(minimum, remaining, card.balance);
        remaining -= paid;
        return { ...card, balance: card.balance - paid };
      });
      continue;
    }
    let remaining = payment;
    debts = debts.map((card) => {
      const minimum = Math.min(Math.max(25, card.balance * 0.02), card.balance);
      const paid = Math.min(minimum, remaining, card.balance);
      remaining -= paid;
      return { ...card, balance: card.balance - paid };
    });
    const ordered = debts.map((card, index) => ({ card, index })).sort((a, b) => strategy === "avalanche" ? b.card.apr - a.card.apr : a.card.balance - b.card.balance);
    for (const item of ordered) {
      if (remaining <= 0) break;
      const extra = Math.min(remaining, item.card.balance);
      debts[item.index] = { ...item.card, balance: item.card.balance - extra };
      remaining -= extra;
    }
  }
  return { months, interest, payment };
}

export default function CreditCardPayoffCalculator() {
  const [cards, setCards] = useState<Card[]>([
    { name: "Card A", balance: 6000, apr: 24 },
    { name: "Card B", balance: 5000, apr: 19 },
    { name: "Card C", balance: 4000, apr: 15 },
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const results = useMemo(() => ({ minimum: simulate(cards, Math.max(25, totalBalance * 0.02), "minimum"), avalanche: simulate(cards, monthlyPayment, "avalanche"), snowball: simulate(cards, monthlyPayment, "snowball") }), [cards, monthlyPayment, totalBalance]);
  const updateCard = (index: number, field: keyof Card, value: string) => setCards((current) => current.map((card, cardIndex) => cardIndex === index ? { ...card, [field]: field === "name" ? value : Math.max(0, Number(value) || 0) } : card));
  const faqItems = [
    { q: "What is a credit card payoff calculator?", a: "It projects the payoff time and interest cost for one or more balances under a chosen monthly payment and payoff strategy." },
    { q: "Should I use avalanche or snowball?", a: "Avalanche targets the highest APR and usually minimizes interest. Snowball targets the smallest balance first and can provide faster motivational wins." },
    { q: "How does credit card interest get calculated?", a: "This calculator uses the daily periodic rate, APR divided by 365, applied over a 30-day billing cycle before payments are allocated." },
    { q: "Does the calculator include new charges or fees?", a: "No. Projections assume no new charges, constant APRs, and consistent monthly payments. Actual issuer terms may produce different results." },
  ];
  const rows = [["Minimum payment", results.minimum], ["Debt avalanche", results.avalanche], ["Debt snowball", results.snowball]] as const;
  const payoffTime = (result: Result) => result.payment <= 0 && totalBalance > 0 ? "Set a payment amount" : result.months >= 1200 ? "Over 100 years to debt-free" : `${result.months} months to debt-free`;

  return <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]"><div className="lg:col-span-5"><div className="glass-panel p-[24px] rounded-xl shadow-sm"><h3 className="text-[22px] font-semibold mb-[24px]">Your Credit Cards</h3><div className="space-y-[16px]">{cards.map((card, index) => <div key={index} className="border-b border-outline-variant/50 pb-[16px] last:border-0"><label className="block text-[14px] font-semibold text-on-surface-variant">Card name<input aria-label={`Card ${index + 1} name`} type="text" value={card.name} onChange={(e) => updateCard(index, "name", e.target.value)} className="mt-[4px] w-full px-[12px] py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></label><div className="grid grid-cols-2 gap-[12px] mt-[12px]"><label className="text-[14px] font-semibold text-on-surface-variant">Balance<input aria-label={`${card.name || `Card ${index + 1}`} balance`} type="number" min="0" value={card.balance} onChange={(e) => updateCard(index, "balance", e.target.value)} className="mt-[4px] w-full px-[12px] py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></label><label className="text-[14px] font-semibold text-on-surface-variant">APR (%)<input aria-label={`${card.name || `Card ${index + 1}`} APR`} type="number" min="0" step="0.01" value={card.apr} onChange={(e) => updateCard(index, "apr", e.target.value)} className="mt-[4px] w-full px-[12px] py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></label></div></div>)}</div><label className="block text-[14px] font-semibold text-on-surface-variant mt-[20px]">Monthly payment for avalanche/snowball<input aria-label="Monthly payment for avalanche and snowball" type="number" min="0" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Math.max(0, Number(e.target.value) || 0))} className="mt-[4px] w-full px-[12px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></label></div></div><div className="lg:col-span-7"><div className="bg-[#263143] text-white p-[32px] rounded-xl shadow-lg"><span className="font-semibold text-[14px] uppercase tracking-wider opacity-80">Debt Payoff Comparison</span><div className="text-[48px] font-black leading-tight mt-[8px] text-primary-fixed-dim">{money(totalBalance)}</div><span className="text-[14px] opacity-80">Total credit card balance</span><div className="mt-[24px] space-y-[12px]">{rows.map(([name, result]) => <div key={name} className="bg-white/10 p-[16px] rounded-xl flex items-center justify-between gap-[16px]"><div><strong className="block">{name}</strong><span className="text-[12px] opacity-70">{payoffTime(result)}</span></div><div className="text-right"><strong className="block">{money(result.interest)}</strong><span className="text-[12px] opacity-70">interest paid</span></div></div>)}</div></div></div></section>
    <ToolInfoCard title="About the Credit Card Payoff Calculator" content={["Compare minimum payments, debt avalanche, and debt snowball strategies across up to three cards. Avalanche attacks the highest APR first to minimize interest; snowball attacks the smallest balance first for faster account wins.", "The projection assumes constant APRs, no new charges, and a consistent payment. Actual card issuers may calculate interest daily using different statement-cycle timing and fees."]} />
    <FaqSection items={faqItems} />
  </>;
}
