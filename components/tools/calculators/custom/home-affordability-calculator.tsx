"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";
import { useState, useMemo } from "react";

export default function HomeAffordabilityCalculator() {
  // Inputs
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebt, setMonthlyDebt] = useState(450);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualInsurance, setAnnualInsurance] = useState(1500);
  const [hoaMonthly, setHoaMonthly] = useState(0);

  // Expandable state
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Math Logic
  const affordabilityData = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = loanTerm * 12;
    const t = (propertyTaxRate / 100) / 12;
    const k =
      monthlyRate > 0
        ? (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : 1 / totalMonths;
    const ins = annualInsurance / 12;

    function getAffordability(maxMonthlyPITI: number, pmiAnnualRate: number) {
      if (maxMonthlyPITI <= 0) return { price: 0, pmi: 0 };
      const pmiMonthlyRate = pmiAnnualRate / 12;
      const mAdjusted = maxMonthlyPITI - ins - hoaMonthly;
      const denom = k + pmiMonthlyRate + t;
      if (denom <= 0) return { price: 0, pmi: 0 };
      const price = (mAdjusted + downPayment * (k + pmiMonthlyRate)) / denom;

      const loanAmt = Math.max(0, price - downPayment);
      const pmiCost = loanAmt * pmiMonthlyRate;
      return { price: Math.max(0, price), pmi: pmiCost };
    }

    function solveForPrice(maxMonthlyPITI: number) {
      let result = getAffordability(maxMonthlyPITI, 0); // Try without PMI
      if (result.price > 0 && downPayment < 0.2 * result.price) {
        // Less than 20% down, recalculate with PMI
        result = getAffordability(maxMonthlyPITI, 0.005); // 0.5% annual PMI
      }
      return result;
    }

    // 28% Front-End (Housing only), but must also pass 36% back-end (Housing + Debt)
    const maxPITI28Front = Math.min(monthlyIncome * 0.28, monthlyIncome * 0.36 - monthlyDebt);
    const conservative = solveForPrice(maxPITI28Front);

    // 36% DTI (Housing + Debt)
    const maxPITI36 = monthlyIncome * 0.36 - monthlyDebt;
    const recommended = solveForPrice(maxPITI36);

    // 43% DTI (Housing + Debt)
    const maxPITI43 = monthlyIncome * 0.43 - monthlyDebt;
    const aggressive = solveForPrice(maxPITI43);

    // Calculate details for Recommended
    const recPrice = recommended.price;
    const loanAmount = Math.max(0, recPrice - downPayment);
    const pi = loanAmount > 0 ? loanAmount * k : 0;
    const taxes = (recPrice * propertyTaxRate) / 100 / 12;
    const pmi = recommended.pmi;
    const totalMonthly = pi + taxes + ins + hoaMonthly + pmi;

    let yearsToPMI = 0;
    if (pmi > 0 && loanAmount > 0 && monthlyRate > 0) {
      const targetBalance = 0.8 * recPrice;
      if (loanAmount > targetBalance) {
        const M_over_r = pi / monthlyRate;
        const num = targetBalance - M_over_r;
        const den = loanAmount - M_over_r;
        if (num / den > 0) {
          const months = Math.log(num / den) / Math.log(1 + monthlyRate);
          yearsToPMI = Math.max(0, months / 12);
        }
      }
    }

    return {
      conservativePrice: conservative.price,
      recommendedPrice: recPrice,
      aggressivePrice: aggressive.price,
      loanAmount,
      pi,
      taxes,
      ins,
      pmi,
      hoa: hoaMonthly,
      totalMonthly,
      hasPMI: pmi > 0,
      yearsToPMI,
    };
  }, [
    annualIncome,
    monthlyDebt,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    annualInsurance,
    hoaMonthly,
  ]);

  // Sensitivity Analysis
  const sensitivityData = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxPITI36 = monthlyIncome * 0.36 - monthlyDebt;
    const t = (propertyTaxRate / 100) / 12;
    const ins = annualInsurance / 12;

    function solveScenario(ratePct: number, termYrs: number) {
      const r = (ratePct / 100) / 12;
      const months = termYrs * 12;
      const k =
        r > 0 ? (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : 1 / months;

      function calc(pmiAnnual: number) {
        const mAdj = maxPITI36 - ins - hoaMonthly;
        const denom = k + pmiAnnual / 12 + t;
        return denom > 0 ? (mAdj + downPayment * (k + pmiAnnual / 12)) / denom : 0;
      }

      let price = calc(0);
      if (price > 0 && downPayment < 0.2 * price) {
        price = calc(0.005);
      }
      return Math.max(0, price);
    }

    const rateMinus1 = Math.max(0, interestRate - 1);
    const ratePlus1 = interestRate + 1;
    const altTerm = loanTerm === 30 ? 15 : 30;

    return {
      rateDown: solveScenario(rateMinus1, loanTerm),
      rateUp: solveScenario(ratePlus1, loanTerm),
      rateDownLabel: `${rateMinus1.toFixed(2)}%`,
      rateUpLabel: `${ratePlus1.toFixed(2)}%`,
      altTermLabel: `${altTerm}-Year`,
      altTermVal: solveScenario(interestRate, altTerm),
    };
  }, [annualIncome, monthlyDebt, downPayment, interestRate, loanTerm, propertyTaxRate, annualInsurance, hoaMonthly]);

  const {
    conservativePrice,
    recommendedPrice,
    aggressivePrice,
    loanAmount,
    pi,
    taxes,
    ins,
    pmi,
    hoa,
    totalMonthly,
    hasPMI,
    yearsToPMI,
  } = affordabilityData;

  // Bar progress calculation
  const getWidth = (val: number) => (totalMonthly > 0 ? (val / totalMonthly) * 100 : 0);
  const wPI = getWidth(pi);
  const wTax = getWidth(taxes);
  const wIns = getWidth(ins);
  const wHoa = getWidth(hoa);
  const wPMI = getWidth(pmi);

  const faqItems = [
    {
      q: `What is a home affordability calculator?`,
      a: `A home affordability calculator is a digital real estate tool that estimates the maximum home price a person can comfortably afford to buy. By analyzing your gross income, existing monthly debts, available down payment, and current mortgage interest rates, the tool calculates a safe maximum monthly housing payment and translates that into an overall target purchase price.`,
    },
    {
      q: `What is the 28/36 rule in real estate?`,
      a: `The 28/36 rule is the gold standard used by mortgage lenders to determine housing affordability. The rule states that a household should spend a maximum of 28% of its gross (pre-tax) monthly income on total housing expenses. Furthermore, no more than 36% of the gross monthly income should go toward total debt (housing plus car loans, credit cards, student loans).`,
    },
    {
      q: `What is a Debt-to-Income (DTI) ratio?`,
      a: `Your Debt-to-Income (DTI) ratio compares your total monthly debt payments to your gross monthly income. Lenders use this to measure your ability to manage monthly payments. If your DTI is too high (typically above 43%), lenders will view you as a high-risk borrower.`,
    },
    {
      q: `How does my down payment affect home affordability?`,
      a: `A larger down payment drastically impacts what you can afford. It reduces the total money borrowed, lowering monthly payments. Putting down at least 20% of the purchase price also eliminates Private Mortgage Insurance (PMI), freeing up more budget for the house itself.`,
    },
    {
      q: `What are the hidden costs of homeownership?`,
      a: `Beyond the base mortgage (Principal and Interest), you must include property taxes, homeowners insurance, and Homeowners Association (HOA) fees. You should also budget 1% to 2% of the home's value annually for maintenance.`,
    },
    {
      q: `Does a home affordability calculator guarantee mortgage pre-approval?`,
      a: `No. It provides a highly educated estimate. To get officially pre-approved, a licensed lender must pull your credit score, verify employment, and review bank statements.`,
    },
    {
      q: `How do rising interest rates impact my budget?`,
      a: `Interest rates have a massive impact. When rates rise, more of your payment goes toward interest rather than the principal. Even a 1% increase in mortgage rates can reduce your total purchasing power by tens of thousands of dollars.`,
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-4 space-y-[16px]">
          <div className="glass-panel p-[24px] rounded-xl shadow-sm space-y-[24px]">
            <h3 className="text-[20px] font-semibold flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">payments</span>
              Financial Profile
            </h3>

            <div>
              <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                Annual Household Income
              </label>
              <div className="relative">
                <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">$</span>
                <input
                  type="number"
                  min="0"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-[36px] pr-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                Monthly Debts (Car, Credit Cards, etc.)
              </label>
              <div className="relative">
                <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">$</span>
                <input
                  type="number"
                  min="0"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-[36px] pr-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div className="col-span-2">
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Available Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline">$</span>
                  <input
                    type="number"
                    min="0"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-[36px] pr-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Interest Rate
                </label>
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
              <div>
                <label className="block text-[14px] font-semibold text-on-surface-variant mb-[4px]">
                  Loan Term
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-[16px] py-[12px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value={30}>30 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>

            {/* Expandable: Ownership Costs */}
            <div className="border-t border-outline-variant/50 pt-[16px]">
              <button
                className="w-full flex items-center justify-between text-[14px] font-semibold text-primary hover:underline"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                Ownership Costs
                <span
                  className={`material-symbols-outlined transition-transform ${showAdvanced ? "rotate-180" : ""
                    }`}
                >
                  expand_more
                </span>
              </button>
              {showAdvanced && (
                <div className="grid grid-cols-2 gap-[16px] mt-[16px]">
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">
                      Prop. Tax / Yr
                    </label>
                    <div className="relative">
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-outline text-[12px]">
                        %
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={propertyTaxRate}
                        onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)}
                        className="w-full pl-[12px] pr-[28px] py-[8px] text-[14px] border border-outline-variant rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">
                      Home Ins. / Yr
                    </label>
                    <div className="relative">
                      <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-outline text-[12px]">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={annualInsurance}
                        onChange={(e) => setAnnualInsurance(Number(e.target.value) || 0)}
                        className="w-full pl-[20px] pr-[8px] py-[8px] text-[14px] border border-outline-variant rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12px] font-semibold text-on-surface-variant mb-[4px]">
                      HOA / Mo
                    </label>
                    <div className="relative">
                      <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-outline text-[12px]">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={hoaMonthly}
                        onChange={(e) => setHoaMonthly(Number(e.target.value) || 0)}
                        className="w-full pl-[20px] pr-[8px] py-[8px] text-[14px] border border-outline-variant rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Results & Breakdown */}
        <div className="lg:col-span-8 flex flex-col gap-[24px]">
          {/* Main Hero Result Box */}
          <div className="bg-[#263143] text-white p-[32px] rounded-xl shadow-lg relative overflow-hidden">
            <span className="font-semibold text-[14px] uppercase tracking-wider opacity-80 mb-[8px] block">
              Recommended (36% DTI)
            </span>
            <div className="flex items-baseline gap-[8px] mb-[4px]">
              <span className="text-[48px] font-bold text-primary-fixed-dim">$</span>
              <span className="text-[64px] font-black tracking-tight text-white leading-none">
                {Math.round(recommendedPrice).toLocaleString()}
              </span>
            </div>

            <p className="text-[14px] text-primary-fixed-dim/90 mb-[24px]">
              Home Price ${Math.round(recommendedPrice).toLocaleString()} = ${Math.round(loanAmount).toLocaleString()} loan + ${Math.round(downPayment).toLocaleString()} down
            </p>

            <div className="grid grid-cols-2 gap-[16px] mb-[32px]">
              <div className="bg-white/10 p-[16px] rounded-xl backdrop-blur-sm border border-white/5">
                <span className="text-[12px] block opacity-70 mb-[4px] uppercase tracking-wider">
                  Conservative (28% Front-End)
                </span>
                <span className="text-[24px] font-bold">
                  ${Math.round(conservativePrice).toLocaleString()}
                </span>
              </div>
              <div className="bg-white/10 p-[16px] rounded-xl backdrop-blur-sm border border-white/5">
                <span className="text-[12px] block opacity-70 mb-[4px] uppercase tracking-wider">
                  Aggressive (43% DTI)
                </span>
                <span className="text-[24px] font-bold">
                  ${Math.round(aggressivePrice).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-[16px] border-t border-white/20 pt-[24px]">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[14px] block mb-[4px] opacity-90">Monthly Payment Breakown</span>
                  {hasPMI && (
                    <span className="text-[12px] text-[#ffb596] block">
                      *Includes estimated PMI since down payment is &lt;20%. PMI removed once you reach 20% equity (~{yearsToPMI.toFixed(1)} years at this rate)
                    </span>
                  )}
                </div>
                <span className="text-[28px] font-bold">${Math.round(totalMonthly).toLocaleString()}</span>
              </div>

              {/* Progress Bar */}
              <div className="h-[8px] w-full bg-white/10 rounded-full overflow-hidden flex">
                <div style={{ width: `${wPI}%` }} className="h-full bg-primary-fixed-dim transition-all" />
                <div style={{ width: `${wTax}%` }} className="h-full bg-secondary-container transition-all" />
                <div style={{ width: `${wIns}%` }} className="h-full bg-tertiary-fixed-dim transition-all" />
                {wHoa > 0 && <div style={{ width: `${wHoa}%` }} className="h-full bg-[#cbd5e1] transition-all" />}
                {wPMI > 0 && <div style={{ width: `${wPMI}%` }} className="h-full bg-[#f87171] transition-all" />}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-[16px] pt-[8px]">
                <div className="flex items-center gap-[6px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-primary-fixed-dim"></span>
                  <span className="text-[12px] opacity-90">P&amp;I (${Math.round(pi)})</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-secondary-container"></span>
                  <span className="text-[12px] opacity-90">Taxes (${Math.round(taxes)})</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-tertiary-fixed-dim"></span>
                  <span className="text-[12px] opacity-90">Ins. (${Math.round(ins)})</span>
                </div>
                {wHoa > 0 && (
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[12px] h-[12px] rounded-full bg-[#cbd5e1]"></span>
                    <span className="text-[12px] opacity-90">HOA (${Math.round(hoa)})</span>
                  </div>
                )}
                {wPMI > 0 && (
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[12px] h-[12px] rounded-full bg-[#f87171]"></span>
                    <span className="text-[12px] opacity-90">PMI (${Math.round(pmi)})</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Sensitivity Area */}
          <div className="glass-panel p-[24px] rounded-xl border border-outline-variant/30 flex gap-[24px] overflow-x-auto">
            <div className="flex-1 min-w-[150px]">
              <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-[8px]">
                If Rate was {sensitivityData.rateDownLabel}
              </span>
              <span className="text-[20px] font-bold text-on-surface">
                ${Math.round(sensitivityData.rateDown).toLocaleString()}
              </span>
            </div>
            <div className="w-[1px] bg-outline-variant/50"></div>
            <div className="flex-1 min-w-[150px]">
              <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-[8px]">
                If Rate was {sensitivityData.rateUpLabel}
              </span>
              <span className="text-[20px] font-bold text-on-surface">
                ${Math.round(sensitivityData.rateUp).toLocaleString()}
              </span>
            </div>
            <div className="w-[1px] bg-outline-variant/50"></div>
            <div className="flex-1 min-w-[150px]">
              <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-[8px]">
                {sensitivityData.altTermLabel} Term
              </span>
              <span className="text-[20px] font-bold text-on-surface">
                ${Math.round(sensitivityData.altTermVal).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      <ToolInfoCard
        title="About the Home Affordability Calculator"
        content={[
          "Before you fall in love with a property listing or start attending open houses, you need to know exactly what your budget can handle. The JamroTools Home Affordability Calculator is a comprehensive financial utility designed to help you determine your true purchasing power. Operating entirely online directly in your browser, this tool processes your income, debts, and local market factors to generate a realistic maximum home price without requiring any offline downloads or personal data collection.",
          "Rather than just calculating a basic mortgage payment, this tool looks at your complete financial picture. By entering your annual household income, monthly debts, estimated down payment, and current interest rates, the calculator instantly evaluates your financial health the same way a mortgage lender would, giving you a safe and accurate target price for your home search.",
          "/ Optimize Your Home Search",
          "Understanding your maximum affordability is the most important step in the real estate process. Using this calculator helps you transition from dreaming about homeownership to executing a financially sound plan.",
          "* Determine Your Maximum Purchase Price: Instantly translate your current salary and monthly expenses into a concrete maximum home value so you only look at houses you can actually afford.",
          "* Factor in the True Costs: Go beyond the base principal and interest by factoring in property taxes, homeowners insurance, HOA fees, and potential Private Mortgage Insurance (PMI) to see your actual monthly obligation.",
          "* Protect Your Debt-to-Income Ratio: See exactly how your existing car loans, student loans, and credit card minimums restrict your borrowing power, helping you decide if you need to pay down debt before buying.",
          "Whether you are a first-time homebuyer preparing for pre-approval or an experienced owner looking to upgrade, this calculator provides the exact financial data required to buy with confidence.",
        ]}
      />

      <FaqSection items={faqItems} />
    </>
  );
}
