export interface AffordabilityInput { annualIncome: number; monthlyDebt: number; downPayment: number; interestRate: number; loanTermYears: number; propertyTaxRate: number; annualInsurance: number; hoaMonthly: number }
export function calculateHomeAffordability(input: AffordabilityInput) {
  const monthlyIncome = input.annualIncome / 12;
  const monthlyRate = input.interestRate / 100 / 12;
  const months = input.loanTermYears * 12;
  const taxRate = input.propertyTaxRate / 100 / 12;
  const factor = monthlyRate > 0 ? monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1) : 1 / months;
  const insurance = input.annualInsurance / 12;
  const affordability = (limit: number, pmiAnnualRate: number) => {
    if (limit <= 0) return { price: 0, pmi: 0 };
    const pmiMonthlyRate = pmiAnnualRate / 12;
    const denominator = factor + pmiMonthlyRate + taxRate;
    if (denominator <= 0) return { price: 0, pmi: 0 };
    const price = (limit - insurance - input.hoaMonthly + input.downPayment * (factor + pmiMonthlyRate)) / denominator;
    const loan = Math.max(0, price - input.downPayment);
    return { price: Math.max(0, price), pmi: loan * pmiMonthlyRate };
  };
  const solve = (limit: number) => {
    let result = affordability(limit, 0);
    if (result.price > 0 && input.downPayment < result.price * 0.2) result = affordability(limit, 0.005);
    return result;
  };
  const conservative = solve(Math.min(monthlyIncome * 0.28, monthlyIncome * 0.36 - input.monthlyDebt));
  const recommended = solve(monthlyIncome * 0.36 - input.monthlyDebt);
  const aggressive = solve(monthlyIncome * 0.43 - input.monthlyDebt);
  const loanAmount = Math.max(0, recommended.price - input.downPayment);
  const principalAndInterest = loanAmount > 0 ? loanAmount * factor : 0;
  const taxes = recommended.price * input.propertyTaxRate / 100 / 12;
  const totalMonthly = principalAndInterest + taxes + insurance + input.hoaMonthly + recommended.pmi;
  let yearsToPmi = 0;
  if (recommended.pmi > 0 && loanAmount > 0 && monthlyRate > 0) {
    const target = recommended.price * 0.8;
    if (loanAmount > target) {
      const paymentOverRate = principalAndInterest / monthlyRate;
      const ratio = (target - paymentOverRate) / (loanAmount - paymentOverRate);
      if (ratio > 0) yearsToPmi = Math.max(0, Math.log(ratio) / Math.log(1 + monthlyRate) / 12);
    }
  }
  return { conservativePrice: conservative.price, recommendedPrice: recommended.price, aggressivePrice: aggressive.price, loanAmount, principalAndInterest, taxes, insurance, pmi: recommended.pmi, hoa: input.hoaMonthly, totalMonthly, hasPmi: recommended.pmi > 0, yearsToPmi };
}

export function calculateAffordabilitySensitivity(input: AffordabilityInput) {
  const monthlyIncome = input.annualIncome / 12;
  const maxMonthlyPiti = monthlyIncome * 0.36 - input.monthlyDebt;
  const monthlyTaxRate = input.propertyTaxRate / 100 / 12;
  const monthlyInsurance = input.annualInsurance / 12;

  const solveScenario = (ratePercent: number, termYears: number) => {
    const monthlyRate = ratePercent / 100 / 12;
    const months = termYears * 12;
    const paymentFactor = monthlyRate > 0
      ? monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1)
      : 1 / months;
    const calculatePrice = (pmiAnnualRate: number) => {
      const pmiMonthlyRate = pmiAnnualRate / 12;
      const denominator = paymentFactor + pmiMonthlyRate + monthlyTaxRate;
      return denominator > 0
        ? (maxMonthlyPiti - monthlyInsurance - input.hoaMonthly + input.downPayment * (paymentFactor + pmiMonthlyRate)) / denominator
        : 0;
    };
    let price = calculatePrice(0);
    if (price > 0 && input.downPayment < price * 0.2) price = calculatePrice(0.005);
    return Math.max(0, price);
  };

  const lowerRate = Math.max(0, input.interestRate - 1);
  const higherRate = input.interestRate + 1;
  const alternateTerm = input.loanTermYears === 30 ? 15 : 30;
  return {
    rateDown: solveScenario(lowerRate, input.loanTermYears),
    rateUp: solveScenario(higherRate, input.loanTermYears),
    rateDownLabel: `${lowerRate.toFixed(2)}%`,
    rateUpLabel: `${higherRate.toFixed(2)}%`,
    altTermLabel: `${alternateTerm}-Year`,
    altTermVal: solveScenario(input.interestRate, alternateTerm),
  };
}
