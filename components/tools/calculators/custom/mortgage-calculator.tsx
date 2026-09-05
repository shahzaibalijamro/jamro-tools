"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { useState, useMemo } from "react";
import { calculateMortgage, syncDownPaymentFromPercent, syncDownPaymentPercent } from "../logic/mortgage-calculator";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downAmt, setDownAmt] = useState(90000);
  const [downPct, setDownPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showSchedule, setShowSchedule] = useState(false);

  const mortgage = useMemo(() => calculateMortgage({ homePrice, downPayment: downAmt, interestRate, loanTermYears: loanTerm }), [homePrice, downAmt, interestRate, loanTerm]);
  const { monthlyPrincipalAndInterest: monthlyPI, monthlyTax, monthlyInsurance, totalMonthly, totalInterest, totalCost } = mortgage;

  const totalForPie = monthlyPI + monthlyTax + monthlyInsurance;
  const piFraction = totalForPie > 0 ? monthlyPI / totalForPie : 0;
  const taxFraction = totalForPie > 0 ? monthlyTax / totalForPie : 0;

  const amortizationSchedule = mortgage.schedule;

  const handleDownPctChange = (val: number) => {
    setDownPct(val);
    setDownAmt(syncDownPaymentFromPercent(homePrice, val));
  };

  const handleDownAmtChange = (val: number) => {
    setDownAmt(val);
    if (homePrice > 0) {
      setDownPct(syncDownPaymentPercent(homePrice, val));
    }
  };

  // Proper home price change with sync
  const onHomePriceChange = (val: number) => {
    setHomePrice(val);
    setDownAmt(syncDownPaymentFromPercent(val, downPct));
  };

  const faqItems = [
    {
      q: `What is a mortgage calculator and how does it help me?`,
      a: `A mortgage calculator is a digital financial tool that estimates your future monthly housing payments based on a specific set of loan variables. By entering details like the total home purchase price, down payment amount, interest rate, and loan length, you receive an instant breakdown of your upcoming financial commitments. This helps you avoid overextending your budget and determines exactly how much house you can comfortably afford before engaging with lenders.`,
    },
    {
      q: `What is the difference between principal and interest in a mortgage?`,
      a: `Your base mortgage payment is split into two primary components:
* Principal: The actual balance of the money you borrowed from the lender to buy the home. Paying this down directly builds your home equity.
* Interest: The ongoing fee the bank or lender charges you for borrowing that money, calculated as a percentage of the remaining loan balance.
In the initial years of a long-term loan, your monthly payments are heavily weighted toward paying off interest, shifting gradually toward the principal as the years progress.`,
    },
    {
      q: `How do loan terms affect my monthly payment and lifetime interest?`,
      a: `The length of your loan dramatically alters your financial strategy. A 30-year fixed mortgage spreads your payments over a longer duration, resulting in lower, highly manageable monthly payments but a much higher total interest cost over the life of the loan. Conversely, a 15-year fixed mortgage features significantly higher monthly payments but secures a lower interest rate, allowing you to build equity twice as fast and save tens of thousands of dollars in lifetime interest.`,
    },
    {
      q: `Why is a 20% down payment highly recommended for home buyers?`,
      a: `Putting 20% down is the industry benchmark because it immediately establishes a solid equity stake in your property and minimizes your total loan balance. Most importantly, crossing the 20% threshold eliminates the requirement for Private Mortgage Insurance (PMI) on conventional loans. PMI is an extra monthly fee that protects the lender—not you—if you default on the loan, adding zero value to your actual home equity.`,
    },
    {
      q: `What is the 28% rule in mortgage affordability?`,
      a: `The 28% rule is a classic financial framework used by underwriters and financial planners to gauge borrowing safety. It dictates that a household should spend a maximum of 28% of its gross (pre-tax) monthly income on total housing expenses, including your principal, interest, property taxes, and home insurance. Sticking to this threshold ensures you maintain a comfortable financial buffer for daily life and emergency savings.`,
    },
    {
      q: `Does using a mortgage calculator guarantee loan pre-approval?`,
      a: `No, a mortgage calculator provides an informational estimate based entirely on the data you supply; it does not guarantee loan approval. Real-world qualification requires a comprehensive financial review by a licensed lender. The bank will evaluate variable factors that a standalone calculator cannot verify, such as your official credit score, debt-to-income (DTI) ratio, steady employment history, and verified asset statements.`,
    },
    {
      q: `How does an interest rate increase impact my buying power?`,
      a: `Even a minor bump in interest rates significantly reduces the size of the loan you can qualify for. When interest rates climb, a larger share of your fixed monthly budget is instantly consumed by interest payments rather than purchasing power. For example, a 1% or 2% hike in market interest rates can easily add hundreds of dollars to a monthly payment, forcing many buyers to lower their target home price to keep payments affordable.`,
    },
    {
      q: `What additional costs should I budget for besides the base mortgage payment?`,
      a: `Owning a home involves several expenses beyond the core loan payment. A complete housing budget should account for property taxes levied by your local municipality, homeowners insurance premiums, and potentially HOA (Homeowners Association) fees if you live in a managed community. Additionally, you must factor in one-time closing costs (typically 2% to 5% of the total loan amount due when signing the paperwork) and an ongoing maintenance fund for unexpected home repairs.`,
    },
  ]

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
                    aria-label="Home Price"
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
                      aria-label="Down Payment ($)"
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
                      aria-label="Down Payment (%)"
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
                      aria-label="Interest Rate"
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
                    aria-label="Loan Term"
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
                        className={`material-symbols-outlined transition-transform group-hover:translate-x-1 ${showSchedule ? "rotate-90" : ""
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

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Mortgage Calculator."
        content={[
          "Buying a home is one of the most significant financial milestones you will ever achieve. However, before you start browsing listings or attending open houses, you need a clear picture of what that investment actually costs month-to-month. The JamroTools Mortgage Calculator is designed to take the guesswork out of home financing.",
          "By calculating your estimated Principal and Interest (P&I), our tool helps you map out your financial future in seconds. Rather than relying on vague estimates, you can plug in your specific home price, down payment, loan term, and current market interest rates to see an instant breakdown of your projected monthly obligations.",
          "/ Master Your Mortgage Math",
          "A predictable monthly budget is the foundation of long-term financial health. When you use this calculator, you aren't just getting a single number—you are gaining insight into the moving pieces of a home loan.",
          "* Visualize the Amortization Shift: See exactly how your early payments heavily cover interest charges, and watch how that balance transitions toward building equity over the lifetime of the loan.",
          "* Test Diverse Scenarios: Compare the short-term budgeting friction of a 15-year fixed loan against the long-term breathing room (but higher lifetime interest) of a traditional 30-year fixed term.",
          "* Optimize Your Down Payment: Instantly see how hitting the 20% down payment threshold alters your loan-to-value (LTV) ratio, reducing your total loan amount and eliminating the need for costly private mortgage insurance (PMI).",
          "Whether you are a first-time homebuyer testing the waters or an experienced homeowner calculating the benefits of a potential refinance, this calculator gives you the objective data required to make an informed, stress-free decision."
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}
