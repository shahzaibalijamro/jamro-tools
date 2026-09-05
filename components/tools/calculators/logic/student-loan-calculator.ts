export function studentLoanPayment(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const rate = annualRate / 100 / 12;
  if (principal <= 0 || months <= 0) return 0;
  if (rate === 0) return principal / months;
  return principal * rate * (1 + rate) ** months / ((1 + rate) ** months - 1);
}

export function calculateStudentLoanPlans(balance: number, interestRate: number, income: number, familySize: number, dependents: number) {
  const standardMonthly = studentLoanPayment(balance, interestRate, 10);
  const tieredYears = balance < 25_000 ? 10 : balance < 50_000 ? 15 : balance < 100_000 ? 20 : 25;
  const calculatedTieredMonthly = studentLoanPayment(balance, interestRate, tieredYears);
  const tieredMonthly = balance < 50 ? balance : Math.max(50, calculatedTieredMonthly);
  const povertyAllowance = 15_960 + Math.max(0, familySize - 1) * 5_680;
  const discretionaryIncome = Math.max(0, income - povertyAllowance * 1.5);
  const ibrMonthly = Math.min(standardMonthly, discretionaryIncome * 0.1 / 12);
  const rapRate = income <= 20_000 ? 0.01 : income <= 30_000 ? 0.02 : income <= 40_000 ? 0.03 : income <= 50_000 ? 0.04 : income <= 60_000 ? 0.05 : income <= 70_000 ? 0.06 : income <= 80_000 ? 0.07 : income <= 90_000 ? 0.08 : income <= 100_000 ? 0.09 : 0.1;
  const rapMonthly = Math.max(10, income * rapRate / 12 - dependents * 50);
  return [
    { name: "Standard", monthly: standardMonthly, years: 10, total: standardMonthly * 120, note: "Lowest fixed-plan interest" },
    { name: "Tiered Standard", monthly: tieredMonthly, years: tieredYears, total: tieredMonthly * tieredYears * 12, note: "Fixed payment by debt level" },
    { name: "IBR (estimate)", monthly: ibrMonthly, years: 20, total: ibrMonthly * 240, note: "Assumes newer-borrower 10% / 20-year IBR" },
    { name: "RAP (estimate)", monthly: rapMonthly, years: 30, total: rapMonthly * 360, note: "Includes dependent deduction" },
  ];
}
