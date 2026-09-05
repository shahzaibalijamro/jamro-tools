export interface MortgageInput { homePrice: number; downPayment: number; interestRate: number; loanTermYears: number }
export interface AmortizationRow { month: number; year: number; payment: number; principal: number; interest: number; balance: number }

export function calculateMortgage(input: MortgageInput) {
  const loanAmount = input.homePrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.loanTermYears * 12;
  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0 && monthlyRate > 0 && numberOfPayments > 0) {
    monthlyPrincipalAndInterest = loanAmount * monthlyRate * (1 + monthlyRate) ** numberOfPayments / ((1 + monthlyRate) ** numberOfPayments - 1);
  } else if (loanAmount > 0 && monthlyRate === 0) {
    monthlyPrincipalAndInterest = loanAmount / numberOfPayments;
  }
  const monthlyTax = input.homePrice * 0.0011;
  const monthlyInsurance = 150;
  const totalMonthly = monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance;
  const totalInterest = monthlyPrincipalAndInterest * numberOfPayments - loanAmount;
  const totalCost = monthlyPrincipalAndInterest * numberOfPayments;
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  for (let month = 1; month <= numberOfPayments && balance > 0; month += 1) {
    const interest = balance * monthlyRate;
    const principal = monthlyPrincipalAndInterest - interest;
    balance -= principal;
    if (balance < 0) balance = 0;
    schedule.push({ month, year: Math.ceil(month / 12), payment: monthlyPrincipalAndInterest, principal, interest, balance });
  }
  return { loanAmount, monthlyRate, numberOfPayments, monthlyPrincipalAndInterest, monthlyTax, monthlyInsurance, totalMonthly, totalInterest, totalCost, schedule };
}

export function syncDownPaymentFromPercent(homePrice: number, percent: number) {
  return Math.round(homePrice * percent / 100);
}

export function syncDownPaymentPercent(homePrice: number, amount: number) {
  return homePrice > 0 ? Number(((amount / homePrice) * 100).toFixed(1)) : 0;
}
