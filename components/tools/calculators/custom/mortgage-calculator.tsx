"use client";

import { useState, useMemo } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downAmt, setDownAmt] = useState(90000);
  const [downPct, setDownPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showSchedule, setShowSchedule] = useState(false);

  const loanAmount = homePrice - downAmt;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  let monthlyPI = 0;
  if (loanAmount > 0 && monthlyRate > 0 && numPayments > 0) {
    monthlyPI =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else if (loanAmount > 0 && monthlyRate === 0) {
    monthlyPI = loanAmount / numPayments;
  }

  const monthlyTax = homePrice * 0.0011;
  const monthlyInsurance = 150;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;
  const totalInterest = monthlyPI * numPayments - loanAmount;
  const totalCost = monthlyPI * numPayments;

  const totalForPie = monthlyPI + monthlyTax + monthlyInsurance;
  const piFraction = totalForPie > 0 ? monthlyPI / totalForPie : 0;
  const taxFraction = totalForPie > 0 ? monthlyTax / totalForPie : 0;

  const amortizationSchedule = useMemo(() => {
    const rows: {
      month: number;
      year: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];
    let balance = loanAmount;
    for (let i = 1; i <= numPayments && balance > 0; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance = balance - principalPayment;
      if (balance < 0) balance = 0;
      rows.push({
        month: i,
        year: Math.ceil(i / 12),
        payment: monthlyPI,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }
    return rows;
  }, [loanAmount, monthlyPI, monthlyRate, numPayments]);

  const handleDownPctChange = (val: number) => {
    setDownPct(val);
    setDownAmt(Math.round(homePrice * (val / 100)));
  };

  const handleDownAmtChange = (val: number) => {
    setDownAmt(val);
    if (homePrice > 0) {
      setDownPct(parseFloat(((val / homePrice) * 100).toFixed(1)));
    }
  };

  // Proper home price change with sync
  const onHomePriceChange = (val: number) => {
    setHomePrice(val);
    setDownAmt(Math.round(val * (downPct / 100)));
  };

  const faqItems = [
    {
      q: "What is the difference between a fixed-rate and adjustable-rate mortgage?",
      a: "A fixed-rate mortgage maintains the same interest rate for the entire life of the loan, providing predictable payments. An adjustable-rate mortgage (ARM) typically offers a lower initial rate for a set period, after which the rate fluctuates based on market indices.",
    },
    {
      q: "How much should I spend on a home monthly?",
      a: "A common rule of thumb is the 28/36 rule: your mortgage payment shouldn't exceed 28% of your gross monthly income, and your total debt payments shouldn't exceed 36%.",
    },
    {
      q: "What is Private Mortgage Insurance (PMI)?",
      a: "PMI is a type of insurance that protects the lender if you default on your loan. It's usually required if your down payment is less than 20% of the home's purchase price.",
    },
    {
      q: "Can I pay off my mortgage early?",
      a: "Yes, most modern mortgages allow for early repayment or extra principal payments without penalty. This can significantly reduce the total interest paid over the life of the loan.",
    },
    {
      q: "How do interest rates affect my purchasing power?",
      a: "Even a 1% increase in interest rates can reduce your purchasing power by roughly 10%. As rates go up, your monthly payment for the same loan amount increases, often forcing buyers to look at lower-priced homes.",
    },
  ];

  return (
    <>
      {/* Tool Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Inputs Panel */}
        <div className="lg:col-span-5 space-y-[16px]">
          <div
            className="glass-panel p-[24px] rounded-xl shadow-sm"
          >
            <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px] flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">
                settings_input_component
              </span>
              Loan Parameters
            </h3>
            <div className="space-y-[24px]">
              {/* Home Price */}
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">
                    $
                  </span>
                  <input
                    className="w-full pl-[36px] pr-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    type="number"
                    value={homePrice}
                    onChange={(e) =>
                      onHomePriceChange(Number(e.target.value) || 0)
                    }
                  />
                </div>
              </div>

              {/* Down Payment row */}
              <div className="grid grid-cols-2 gap-[16px]">
                <div>
                  <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                    Down Payment ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">
                      $
                    </span>
                    <input
                      className="w-full pl-[36px] pr-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      type="number"
                      value={downAmt}
                      onChange={(e) =>
                        handleDownAmtChange(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                    Down Payment (%)
                  </label>
                  <div className="relative">
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-outline">
                      %
                    </span>
                    <input
                      className="w-full pl-[16px] pr-[36px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      type="number"
                      value={downPct}
                      onChange={(e) =>
                        handleDownPctChange(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Interest Rate + Loan Term */}
              <div className="grid grid-cols-2 gap-[16px]">
                <div>
                  <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-outline">
                      %
                    </span>
                    <input
                      className="w-full pl-[16px] pr-[36px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) =>
                        setInterestRate(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                    Loan Term
                  </label>
                  <select
                    className="w-full px-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  >
                    <option value={30}>30 Years Fixed</option>
                    <option value={20}>20 Years Fixed</option>
                    <option value={15}>15 Years Fixed</option>
                    <option value={10}>10 Years Fixed</option>
                  </select>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-[8px] bg-primary text-on-primary hover:shadow-lg active:scale-95 transition-all px-[24px] py-[16px] rounded-xl font-semibold text-[14px] mt-[24px] shadow-sm">
                <span className="material-symbols-outlined">calculate</span>
                Recalculate Estimate
              </button>
            </div>
          </div>

          {/* Savings Tip */}
          <div className="bg-[#263143] dark:bg-surface-container-high text-[#ecf1ff] dark:text-on-surface p-[24px] rounded-xl shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h4 className="text-[22px] leading-[28px] font-semibold mb-[8px]">
                Maximize Your Savings
              </h4>
              <p className="text-[12px] font-medium opacity-80 mb-[16px]">
                Increasing your down payment to 25% could save you $42,300 in
                interest over the life of the loan.
              </p>
              <button className="bg-[#004ac6] text-white px-[16px] py-[8px] rounded-full text-[14px] font-semibold hover:brightness-110 transition-all">
                View Strategies
              </button>
              <button className="ml-[16px] border border-[#004ac6] text-white px-[16px] py-[8px] rounded-full text-[14px] font-semibold hover:bg-[#004ac6]/20 transition-all">
                Save Calculation
              </button>
            </div>
            <div className="absolute -right-[16px] -bottom-[16px] opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span
                className="material-symbols-outlined text-[120px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                trending_up
              </span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          <div
            className="glass-panel rounded-xl overflow-hidden h-full flex flex-col shadow-sm"
          >
            <div className="p-[24px] flex-grow grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* Donut Chart */}
              <div className="flex flex-col items-center justify-center relative min-h-[250px]">
                <div className="relative w-48 h-48 rounded-full border-[24px] border-[#e7eeff] dark:border-surface-container-high flex items-center justify-center">
                  {/* P&I segment */}
                  <div
                    className="absolute inset-[-24px] rounded-full border-[24px] border-primary"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${100 - piFraction * 100}%)`,
                    }}
                  />
                  {/* Taxes segment */}
                  <div
                    className="absolute inset-[-24px] rounded-full border-[24px] border-[#5b94fd] dark:border-primary-fixed-dim"
                    style={{
                      clipPath:
                        piFraction >= 1
                          ? "polygon(50% 50%, 0% 0%, 0% 0%)"
                          : `polygon(50% 50%, 0% ${100 - piFraction * 100}%, 0% ${100 - (piFraction + taxFraction) * 100}%)`,
                    }}
                  />
                  <div className="text-center">
                    <span className="block text-[12px] font-medium text-outline">
                      Total
                    </span>
                    <span className="text-[22px] leading-[28px] font-semibold">
                      ${Math.round(totalMonthly).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-[24px] flex gap-[16px] flex-wrap justify-center">
                  <div className="flex items-center gap-[4px]">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-[12px] font-medium">P&I</span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <span className="w-3 h-3 rounded-full bg-[#5b94fd] dark:bg-primary-fixed-dim"></span>
                    <span className="text-[12px] font-medium">Taxes</span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <span className="w-3 h-3 rounded-full bg-[#d8e3fb] dark:bg-surface-container-high"></span>
                    <span className="text-[12px] font-medium">Insurance</span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-[16px]">
                <div className="flex flex-col items-center md:items-start text-center md:text-left pt-[24px] md:pt-0">
                  <span className="text-[14px] font-semibold text-primary uppercase tracking-widest mb-[4px]">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-on-surface text-[48px] leading-[56px] font-black mb-[8px]">
                    ${monthlyPI > 0 ? monthlyPI.toFixed(2) : "0.00"}
                  </div>
                  <div className="flex items-center gap-[4px] text-on-surface-variant text-[12px] font-medium mb-[24px]">
                    <span className="material-symbols-outlined text-[16px]">
                      info
                    </span>
                    <span>Includes principal and interest</span>
                  </div>
                  <div className="w-full mt-auto pt-[24px] border-t border-outline-variant grid grid-cols-2 gap-[16px]">
                    <div>
                      <span className="block text-[12px] font-medium text-outline mb-[4px] uppercase tracking-tight">
                        Total Interest
                      </span>
                      <span className="text-[22px] leading-[28px] text-on-surface font-bold">
                        $
                        {totalInterest > 0
                          ? Math.round(totalInterest).toLocaleString()
                          : "0"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[12px] font-medium text-outline mb-[4px] uppercase tracking-tight">
                        Total Loan Cost
                      </span>
                      <span className="text-[22px] leading-[28px] text-on-surface font-bold">
                        $
                        {totalCost > 0
                          ? Math.round(totalCost).toLocaleString()
                          : "0"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full mt-[24px] pt-[16px] border-t border-outline-variant/30">
                    <button
                      onClick={() => setShowSchedule((v) => !v)}
                      className="group w-full flex justify-between items-center text-primary text-[14px] font-semibold"
                    >
                      <span className="group-hover:underline">
                        {showSchedule ? "Hide" : "View"} Full Amortization
                        Schedule
                      </span>

                      <span
                        className={`material-symbols-outlined transition-transform group-hover:translate-x-1 ${
                          showSchedule ? "rotate-90" : ""
                        }`}
                      >
                        {showSchedule ? "expand_more" : "arrow_forward_ios"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Amortization Schedule ── */}
      {showSchedule && (
        <section className="mb-[48px]">
          <div
            className="glass-panel rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-[24px] border-b border-outline-variant/30 flex items-center justify-between">
              <h3 className="text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-[8px]">
                <span className="material-symbols-outlined text-primary">
                  table_chart
                </span>
                Amortization Schedule
              </h3>
              <span className="text-label-sm text-on-surface-variant">
                {amortizationSchedule.length} payments
              </span>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-surface-container/80 backdrop-blur-sm">
                  <tr className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-tight">
                    <th className="p-[16px] whitespace-nowrap">Month</th>
                    <th className="p-[16px] whitespace-nowrap">Year</th>
                    <th className="p-[16px] whitespace-nowrap">Payment</th>
                    <th className="p-[16px] whitespace-nowrap">Principal</th>
                    <th className="p-[16px] whitespace-nowrap">Interest</th>
                    <th className="p-[16px] whitespace-nowrap">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row) => (
                    <tr
                      key={row.month}
                      className="border-t border-outline-variant/20 text-[14px] text-on-surface hover:bg-primary/5 transition-colors"
                    >
                      <td className="p-[16px] whitespace-nowrap font-medium">
                        {row.month}
                      </td>
                      <td className="p-[16px] whitespace-nowrap">{row.year}</td>
                      <td className="p-[16px] whitespace-nowrap">
                        ${row.payment > 0 ? row.payment.toFixed(2) : "0.00"}
                      </td>
                      <td className="p-[16px] whitespace-nowrap text-green-700 dark:text-green-400 font-medium">
                        ${row.principal > 0 ? row.principal.toFixed(2) : "0.00"}
                      </td>
                      <td className="p-[16px] whitespace-nowrap text-amber-700 dark:text-amber-400">
                        ${row.interest > 0 ? row.interest.toFixed(2) : "0.00"}
                      </td>
                      <td className="p-[16px] whitespace-nowrap">
                        ${row.balance > 0 ? row.balance.toFixed(2) : "0.00"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-[48px] border-t border-outline-variant">
        <h2 className="text-[28px] leading-[36px] font-semibold mb-[24px] text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-[16px]">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="glass-panel group rounded-xl"
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
