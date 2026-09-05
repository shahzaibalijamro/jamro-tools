export interface RetirementInput { balance: number; salary: number; contributionPercent: number; matchPercent: number; returnPercent: number; years: number }
export function calculate401k(input: RetirementInput) {
  const rate = input.returnPercent / 100;
  const annual = input.salary * input.contributionPercent / 100;
  const employer = input.salary * Math.min(input.contributionPercent, input.matchPercent) / 100;
  const total = annual + employer;
  const future = rate === 0 ? input.balance + total * input.years : input.balance * (1 + rate) ** input.years + total * (((1 + rate) ** input.years - 1) / rate);
  return { annual, employer, total, future, contributions: total * input.years, growth: future - input.balance - total * input.years };
}
