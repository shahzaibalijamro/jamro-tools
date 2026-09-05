"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { useState, useMemo } from "react";
import { calculateRentVsBuy } from "@/components/tools/calculators/logic/rent-vs-buy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function RentVsBuyCalculator() {
  // Core Inputs
  const [homePrice, setHomePrice] = useState(450000);
  const [monthlyRent, setMonthlyRent] = useState(2800);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Advanced Options
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState(1200);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [maintenanceRate, setMaintenanceRate] = useState(1.0);
  const [closingCostsPct, setClosingCostsPct] = useState(3.0);
  const [sellingCostsPct, setSellingCostsPct] = useState(6.0);

  // Assumptions
  const [appreciationRate, setAppreciationRate] = useState(3.0);
  const [rentIncreaseRate, setRentIncreaseRate] = useState(4.0);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(7.0);
  const [ownershipInflationRate, setOwnershipInflationRate] = useState(2.0);
  const [years, setYears] = useState(30);

  // Expandable sections state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const chartData = useMemo(() => calculateRentVsBuy({
    homePrice,
    monthlyRent,
    downPaymentPercent: downPaymentPct,
    interestRate,
    loanTermYears: loanTerm,
    propertyTaxRate,
    homeInsuranceAnnual,
    hoaMonthly,
    maintenanceRate,
    closingCostsPercent: closingCostsPct,
    sellingCostsPercent: sellingCostsPct,
    appreciationRate,
    rentIncreaseRate,
    investmentReturnRate,
    ownershipInflationRate,
    years,
  }), [homePrice, monthlyRent, downPaymentPct, interestRate, loanTerm, propertyTaxRate,
    homeInsuranceAnnual, hoaMonthly, maintenanceRate, closingCostsPct, sellingCostsPct,
    appreciationRate, rentIncreaseRate, investmentReturnRate, ownershipInflationRate, years]);

  const { data, breakEvenYear, finalBuyerNetWorth, finalRenterNetWorth } = chartData;

  const currentMonthlyBuyCost =
    (homePrice - homePrice * (downPaymentPct / 100) > 0
      ? ((homePrice - homePrice * (downPaymentPct / 100)) *
        (interestRate / 100 / 12) *
        Math.pow(1 + interestRate / 100 / 12, loanTerm * 12)) /
      (Math.pow(1 + interestRate / 100 / 12, loanTerm * 12) - 1)
      : 0) +
    (homePrice * (propertyTaxRate / 100)) / 12 +
    (homePrice * (maintenanceRate / 100)) / 12 +
    homeInsuranceAnnual / 12 +
    hoaMonthly;

  const faqItems = [
    {
      q: `What is a rent vs. buy calculator?`,
      a: `A rent vs. buy calculator is a digital personal finance tool that compares the total net cost of renting a home against the total net cost of purchasing a similar home over a specific period of time. By factoring in housing costs, investment growth, and property appreciation, the tool mathematically determines which housing scenario will result in a higher overall net worth.`,
    },
    {
      q: `Why does this calculator assume both parties have the same budget?`,
      a: `To make a fair "apples-to-apples" comparison, the calculator assumes both the buyer and the renter start with the exact same initial cash (the down payment + closing costs) and have the exact same monthly housing budget. Whichever housing option is cheaper in any given month, that person invests the difference into the stock market.`,
    },
    {
      q: `Is renting a house considered "throwing money away"?`,
      a: `No, renting is not throwing money away. When you rent, you are paying for shelter, flexibility, and a ceiling on your housing costs. Homeowners "throw away" money as well through unrecoverable costs like mortgage interest, property taxes, homeowners insurance, and maintenance. A true financial comparison weighs the cost of renting against these unrecoverable costs of owning.`,
    },
    {
      q: `How long do I need to live in a house to make buying worth it?`,
      a: `As a general rule in real estate, you should plan to live in a home for at least 5 to 7 years to make buying a better financial decision than renting. Purchasing a home requires massive upfront closing costs (typically 2% to 5% of the loan). It takes several years of property appreciation and debt paydown to offset those initial losses and reach your "break-even point."`,
    },
    {
      q: `What is "opportunity cost" in a rent vs. buy analysis?`,
      a: `Opportunity cost is the potential profit you lose when you choose one option over another. If you buy a $400,000 house, you must put down roughly $80,000 in cash. That money is now trapped in the house. If you decided to rent instead, you could have invested that $80,000 into the stock market. A good calculator compares the returns of real estate equity against the compounding returns of the stock market.`,
    },
    {
      q: `What is the 5% Rule in real estate?`,
      a: `The 5% Rule is a quick financial metric used to compare the unrecoverable costs of homeownership with the cost of renting. It assumes that a homeowner's unrecoverable costs (property taxes, maintenance, and capital costs) average roughly 5% of the property's total value each year. If a year of rent is cheaper than 5% of a comparable home's value, renting is financially better.`,
    },
    {
      q: `How does inflation impact the rent vs. buy decision?`,
      a: `Inflation heavily favors buying a home. If you secure a 30-year fixed-rate mortgage, your principal and interest payments are locked in for three decades, meaning your housing payment actually becomes cheaper over time as the value of the dollar decreases. In contrast, landlords will continuously raise the cost of rent to keep up with annual inflation.`,
    },
    {
      q: `What are the hidden costs of homeownership?`,
      a: `When budgeting for a house, many buyers forget the hidden, unrecoverable costs that renters do not pay. These include property taxes (which generally increase every year), homeowners insurance, HOA (Homeowners Association) fees, and routine maintenance. Financial experts recommend budgeting at least 1% to 2% of the home's total value every single year just for repairs and upkeep.`,
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-4 space-y-[16px]">
          <div className="glass-panel p-[24px] rounded-xl shadow-sm space-y-[24px]">
            <h3 className="text-[20px] font-semibold flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Core Parameters
            </h3>

            {/* Core Inputs */}
            <div>
              <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">Target Home Price</label>
              <div className="relative">
                <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">$</span>
                <input
                  type="number"
                  min="0"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-[36px] pr-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">Monthly Rent</label>
              <div className="relative">
                <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">$</span>
                <input
                  type="number"
                  min="0"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-[36px] pr-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">Down Payment</label>
                <div className="relative">
                  <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-outline">%</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-[16px] pr-[36px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">Interest Rate</label>
                <div className="relative">
                  <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-outline">%</span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-[16px] pr-[36px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">Loan Term</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value={30}>30 Years</option>
                <option value={15}>15 Years</option>
              </select>
            </div>

            {/* Expandable: Advanced Costs */}
            <div className="border-t border-outline-variant/50 pt-[16px]">
              <button
                className="w-full flex items-center justify-between text-[14px] font-semibold text-primary hover:underline"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                Advanced Buying Costs
                <span className={`material-symbols-outlined transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {showAdvanced && (
                <div className="grid grid-cols-2 gap-[16px] mt-[16px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Prop. Tax / Yr</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Maint. / Yr</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={maintenanceRate} onChange={(e) => setMaintenanceRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Home Ins. / Yr</label>
                    <div className="relative">
                      <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-outline text-[12px]">$</span>
                      <input type="number" min="0" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value) || 0)} className="w-full pl-[20px] pr-[8px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">HOA / Mo</label>
                    <div className="relative">
                      <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-outline text-[12px]">$</span>
                      <input type="number" min="0" value={hoaMonthly} onChange={(e) => setHoaMonthly(Number(e.target.value) || 0)} className="w-full pl-[20px] pr-[8px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Closing Costs</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={closingCostsPct} onChange={(e) => setClosingCostsPct(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Selling Costs</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={sellingCostsPct} onChange={(e) => setSellingCostsPct(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable: Assumptions */}
            <div className="border-t border-outline-variant/50 pt-[16px]">
              <button
                className="w-full flex items-center justify-between text-[14px] font-semibold text-primary hover:underline"
                onClick={() => setShowAssumptions(!showAssumptions)}
              >
                Market Assumptions
                <span className={`material-symbols-outlined transition-transform ${showAssumptions ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {showAssumptions && (
                <div className="grid grid-cols-2 gap-[16px] mt-[16px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Home Apprec.</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={appreciationRate} onChange={(e) => setAppreciationRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Rent Increase</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={rentIncreaseRate} onChange={(e) => setRentIncreaseRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Invest Return</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={investmentReturnRate} onChange={(e) => setInvestmentReturnRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Cost Inflation</label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">%</span>
                      <input type="number" min="0" step="0.1" value={ownershipInflationRate} onChange={(e) => setOwnershipInflationRate(Number(e.target.value) || 0)} className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">Analysis Period (Years)</label>
                    <input type="number" min="5" max="50" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} className="w-full px-[12px] py-[8px] text-[14px] border border-outline-variant rounded-lg" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Results & Chart */}
        <div className="lg:col-span-8 flex flex-col gap-[24px]">
          {/* Recommendation Box */}
          <div className={`p-[32px] rounded-xl shadow-lg relative overflow-hidden ${breakEvenYear ? 'bg-primary text-white' : 'bg-[#263143] text-white'}`}>
            <h2 className="text-[32px] font-bold leading-tight mb-[16px]">
              {breakEvenYear ? 'Buying is your best move.' : 'Renting is better for this timeframe.'}
            </h2>
            <p className="text-[16px] opacity-90 max-w-2xl leading-relaxed mb-[24px]">
              {breakEvenYear ? (
                <>
                  In exactly <span className="font-bold underline decoration-2 underline-offset-4">{breakEvenYear} years</span>, the equity gained from property appreciation and mortgage paydown will exceed the unrecoverable costs of buying and the opportunity cost of your down payment.
                </>
              ) : (
                <>
                  Based on your inputs, renting and investing the difference yields a higher net worth over the next {years} years. The costs of buying (closing costs, taxes, maintenance, and interest) outweigh the equity gained.
                </>
              )}
            </p>
            <div className="grid grid-cols-2 gap-[24px] border-t border-white/20 pt-[24px]">
              <div>
                <p className="text-[12px] uppercase tracking-wider opacity-70 mb-[4px]">Buying Net Worth ({years} yrs)</p>
                <p className="text-[28px] font-bold">${finalBuyerNetWorth.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider opacity-70 mb-[4px]">Renting Net Worth ({years} yrs)</p>
                <p className="text-[28px] font-bold">${finalRenterNetWorth.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Quick Comparison */}
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="glass-panel p-[24px] rounded-xl border border-primary/20">
              <p className="text-[14px] font-semibold text-primary uppercase tracking-wider mb-[8px]">Monthly Buy Cost</p>
              <p className="text-[36px] font-black text-on-surface">${Math.round(currentMonthlyBuyCost).toLocaleString()}</p>
              <p className="text-[12px] text-on-surface-variant mt-[4px]">Includes P&I, taxes, insurance, HOA & maintenance.</p>
            </div>
            <div className="glass-panel p-[24px] rounded-xl border border-[#5b94fd]/20">
              <p className="text-[14px] font-semibold text-[#5b94fd] uppercase tracking-wider mb-[8px]">Monthly Rent Cost</p>
              <p className="text-[36px] font-black text-on-surface">${Math.round(monthlyRent).toLocaleString()}</p>
              <p className="text-[12px] text-on-surface-variant mt-[4px]">Starting rent (increases {rentIncreaseRate}%/yr).</p>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-panel pt-[24px] pe-[24px] pb-[24px] rounded-xl shadow-sm flex-grow min-h-[400px]">
            <h3 className="text-[20px] ps-[24px] font-semibold mb-[24px]">Net Worth Projection</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis
                    dataKey="year"
                    tickFormatter={(v) => `Year ${v}`}
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--outline-variant)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />

                  {breakEvenYear && (
                    <ReferenceLine
                      x={breakEvenYear}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      label={{ position: 'insideTopLeft', value: 'Break-Even', fill: '#10b981', fontWeight: 'bold' }}
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="buyerNetWorth"
                    name="Buying Net Worth"
                    stroke="#003594"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="renterNetWorth"
                    name="Renting Net Worth"
                    stroke="#5b94fd"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <ToolInfoCard
        title="About the Rent vs. Buy Calculator"
        content={[
          "Deciding whether to sign another lease or purchase a home is one of the most heavily debated financial decisions you will ever make. The JamroTools Rent vs. Buy Calculator is a comprehensive financial modeling utility designed to cut through the emotional stress of real estate and provide clear, data-driven answers. Operating entirely locally within your web browser, this tool processes complex financial projections instantly and privately, ensuring your personal financial data never leaves your device.",
          "Many people mistakenly compare a monthly rent check directly to a monthly mortgage payment, but this ignores the hidden mechanics of wealth building. By factoring in property appreciation, stock market returns, closing costs, inflation, and maintenance, this calculator runs a side-by-side projection to reveal exactly which path leaves you with a higher net worth over time.",
          "/ Make Data-Driven Real Estate Decisions",
          "Understanding the true cost of housing requires looking decades into the future. When you use this calculator, you transform emotional guesswork into a concrete financial strategy.",
          "* Find Your Break-Even Point: Discover exactly how many years you need to live in a purchased home before the upfront closing costs and interest payments are justified by the equity you build.",
          "* Analyze Opportunity Cost: See exactly what happens to your net worth if you take your cash down payment and invest it in the stock market while continuing to rent.",
          "* Calculate Total Cost of Ownership: Look beyond basic principal and interest to include the unrecoverable costs of buying, such as property taxes, HOA fees, maintenance, and homeowners insurance.",
          "Whether you are a digital nomad debating your first mortgage or a family looking to settle down, this calculator provides the exact financial clarity required to make the most profitable housing choice."
        ]}
      />

      <FaqSection items={faqItems} />
    </>
  );
}
