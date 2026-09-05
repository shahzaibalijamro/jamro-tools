"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { useState } from "react";
import { calculateLoan } from "../logic/loan-calculator";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const { monthlyPayment, totalCost, totalInterest, principalPercent: principalPct, interestPercent: interestPct } = calculateLoan(loanAmount, interestRate, loanTerm);

  const faqItems = [
    {
      q: `What is a loan calculator?`,
      a: `A loan calculator is an automated digital finance tool that determines your exact monthly payment and total interest costs based on a specific set of borrowing variables. By entering the total amount you wish to borrow (the principal), the annual interest rate, and the length of the loan (the term), the tool instantly computes your payment schedule so you can evaluate the affordability of the debt.`,
    },
    {
      q: `What is the difference between a loan's Principal and Interest?`,
      a: `Every loan payment is divided into two parts. The Principal is the actual amount of money you borrowed from the lender; paying this down reduces your total debt balance. The Interest is the fee the lender charges you for the privilege of borrowing their money, calculated as a percentage of your remaining principal balance.`,
    },
    {
      q: `What is the difference between an Interest Rate and an APR?`,
      a: `The Interest Rate is the base percentage the lender charges you to borrow the money. The APR (Annual Percentage Rate) is a broader, more accurate metric that includes the base interest rate plus any mandatory lender fees, origination fees, and closing costs. When comparing two loan offers, always compare the APR, as it reflects the true total cost of borrowing the money.`,
    },
    {
      q: `How does a loan term affect my monthly payments?`,
      a: `The "term" is the amount of time you have to pay the loan back. A longer term (like 72 months) spreads your debt out, resulting in lower, more affordable monthly payments—but it significantly increases the total interest you will pay over time. A shorter term (like 36 months) forces a much higher monthly payment but drastically reduces the total interest you pay to the bank.`,
    },
    {
      q: `What is loan amortization?`,
      a: `Amortization is the financial process of paying off debt through a schedule of fixed, equal monthly payments over a specific period. In an amortized loan, your early payments are heavily weighted toward paying off the interest. As the months pass and your principal balance shrinks, a larger percentage of your fixed monthly payment automatically shifts toward paying down the actual principal.`,
    },
    {
      q: `What is the plain-text formula for calculating a monthly loan payment?`,
      a: `To manually calculate the fixed monthly payment for an amortized loan, financial institutions use a complex equation utilizing the principal (P), the monthly interest rate (r), and the total number of months (n). The plain-text formula is:\nMonthly Payment = [ P * (r * (1 + r)^n) ] / [ ((1 + r)^n) - 1 ]\nBecause this formula requires calculating exponents (represented by the ^ symbol), using an automated online calculator is the safest way to guarantee accuracy and avoid manual math errors.`,
    },
    {
      q: `Will paying extra each month save me money?`,
      a: `Yes. If your lender does not charge prepayment penalties, making extra payments directly reduces your core principal balance. Because your monthly interest charge is calculated based on how much principal you owe, reducing that balance early means you will pay less interest over the life of the loan and pay off your debt months or even years ahead of schedule.`,
    },
    {
      q: `Does using an online loan calculator affect my credit score?`,
      a: `No, using an online calculator does not affect your credit score in any way. Calculators do not require your personal information or Social Security Number, and they do not trigger a "hard inquiry" or a "soft pull" on your credit report. They are simply mathematical utilities that run hypothetical numbers to help you budget safely.`,
    }
  ];

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Inputs Panel */}
        <div className="lg:col-span-5 space-y-[16px]">
          <div className="glass-panel p-[24px] rounded-xl shadow-sm">
            <h3 className="text-[22px] leading-[28px] font-semibold mb-[24px] flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">
                payments
              </span>
              Loan Parameters
            </h3>
            <div className="space-y-[24px]">
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">
                    $
                  </span>
                  <input
                    className="w-full pl-[36px] pr-[16px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    type="number"
                    min="0"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value) || 0))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[16px]">
                <div>
                  <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                    Interest Rate (APR)
                  </label>
                  <div className="relative">
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-outline">
                      %
                    </span>
                    <input
                      className="w-full pl-[16px] pr-[36px] py-[16px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      type="number"
                      step="0.1"
                      min="0"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value) || 0))}
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
                    onChange={(e) => setLoanTerm(Math.max(0, Number(e.target.value) || 0))}
                  >
                    <option value={30}>30 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={10}>10 Years</option>
                    <option value={7}>7 Years</option>
                    <option value={5}>5 Years</option>
                    <option value={3}>3 Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-xl overflow-hidden h-full flex flex-col shadow-sm">
            <div className="p-[24px] flex-grow grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* SVG Donut Chart */}
              <div className="flex flex-col items-center justify-center relative min-h-[250px]">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle cx="18" cy="18" fill="transparent" r="16" stroke="currentColor" className="text-surface-container-high" strokeWidth="4"></circle>
                    {/* Principal Segment */}
                    <circle
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="16"
                      stroke="currentColor"
                      className="text-primary"
                      strokeDasharray={`${principalPct} 100`}
                      strokeLinecap="round"
                      strokeWidth="4">
                    </circle>
                    {/* Interest Segment */}
                    {interestPct > 0 && (
                      <circle
                        cx="18"
                        cy="18"
                        fill="transparent"
                        r="16"
                        stroke="currentColor"
                        className="text-[#5b94fd] dark:text-primary-fixed-dim"
                        strokeDasharray={`${interestPct} 100`}
                        strokeDashoffset={`-${principalPct}`}
                        strokeLinecap="round"
                        strokeWidth="4">
                      </circle>
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="block text-[12px] font-medium text-outline">
                      Total Cost
                    </span>
                    <span className="text-[22px] leading-[28px] font-semibold text-on-surface">
                      ${Math.round(totalCost).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-[24px] flex gap-[16px] flex-wrap justify-center">
                  <div className="flex items-center gap-[4px]">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-[12px] font-medium">Principal</span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <span className="w-3 h-3 rounded-full bg-[#5b94fd] dark:bg-primary-fixed-dim"></span>
                    <span className="text-[12px] font-medium">Interest</span>
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
                    ${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : "0.00"}
                  </div>
                  <div className="flex items-center gap-[4px] text-on-surface-variant text-[12px] font-medium mb-[24px]">
                    <span className="material-symbols-outlined text-[16px]">
                      info
                    </span>
                    <span>Fixed monthly payment (P&I)</span>
                  </div>
                  <div className="w-full mt-auto pt-[24px] border-t border-outline-variant grid grid-cols-2 gap-[16px]">
                    <div>
                      <span className="block text-[12px] font-medium text-outline mb-[4px] uppercase tracking-tight">
                        Total Interest
                      </span>
                      <span className="text-[22px] leading-[28px] text-on-surface font-bold">
                        ${(totalInterest > 0 ? Math.round(totalInterest) : 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[12px] font-medium text-outline mb-[4px] uppercase tracking-tight">
                        Total Principal
                      </span>
                      <span className="text-[22px] leading-[28px] text-on-surface font-bold">
                        ${(loanAmount > 0 ? Math.round(loanAmount) : 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolInfoCard
        title="About the Loan Calculator"
        content={[
          "Borrowing money—whether for a new vehicle, a personal emergency, or a small business expansion—requires absolute financial clarity. The JamroTools Loan Calculator is a precision financial utility designed to instantly compute your future monthly payments, total interest costs, and full loan payoff schedule. Built as a fast, privacy-first web tool, it processes complex financial mathematics directly within your browser, ensuring you get real-time answers without exposing your personal financial data.",
          "Rather than relying on a lender's vague estimates or confusing terms, you can input your exact loan amount, interest rate, and repayment term to see exactly how much your debt will cost. By breaking down the true lifetime cost of a loan, this calculator empowers you to compare different lending offers side-by-side, negotiate better terms, and borrow with total confidence.",
          "/ Take Control of Your Debt Strategy",
          "Understanding the mechanics of a loan is the best way to protect your personal net worth. When you use this calculator, you transform complex banking terms into a clear, actionable budget.",
          "* Determine Fixed Monthly Costs: Instantly calculate your exact monthly payment obligation so you can accurately adjust your household budget before signing any paperwork.",
          "* Analyze Total Lifetime Interest: Look beyond the monthly payment to see exactly how much money the bank is charging you in interest over the full lifespan of the loan.",
          "* Optimize Your Loan Term: Easily test scenarios to see how shortening your loan (e.g., 3 years instead of 5 years) raises your monthly payment but saves you thousands of dollars in total interest.",
          "Whether you are evaluating a personal loan to consolidate credit card debt or calculating the monthly costs of a new auto loan, this tool provides the exact financial data required to make a smart borrowing decision."
        ]}
      />

      <FaqSection items={faqItems} />
    </>
  );
}
