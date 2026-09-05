export function calculateLoan(principal: number, annualRate: number, termYears: number) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  let monthlyPayment = 0;
  if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
    monthlyPayment = principal * monthlyRate * (1 + monthlyRate) ** numberOfPayments / ((1 + monthlyRate) ** numberOfPayments - 1);
  } else if (principal > 0 && monthlyRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  }
  const totalCost = monthlyPayment * numberOfPayments;
  const totalInterest = totalCost > principal ? totalCost - principal : 0;
  return { monthlyRate, numberOfPayments, monthlyPayment, totalCost, totalInterest, principalPercent: totalCost > 0 ? principal / totalCost * 100 : 0, interestPercent: totalCost > 0 ? totalInterest / totalCost * 100 : 0 };
}
