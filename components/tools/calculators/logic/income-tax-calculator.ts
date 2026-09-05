export type FilingStatus = "single" | "mfj" | "hoh" | "mfs";
type Bracket = { rate: number; limit: number };
export const TAX_YEAR = 2026;
export const incomeTaxBrackets: Record<FilingStatus, Bracket[]> = {
  single: [{ rate: 10, limit: 12400 }, { rate: 12, limit: 50400 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256225 }, { rate: 35, limit: 640600 }, { rate: 37, limit: Infinity }],
  mfj: [{ rate: 10, limit: 24800 }, { rate: 12, limit: 100800 }, { rate: 22, limit: 211400 }, { rate: 24, limit: 403550 }, { rate: 32, limit: 512450 }, { rate: 35, limit: 768700 }, { rate: 37, limit: Infinity }],
  hoh: [{ rate: 10, limit: 17700 }, { rate: 12, limit: 67450 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256200 }, { rate: 35, limit: 640600 }, { rate: 37, limit: Infinity }],
  mfs: [{ rate: 10, limit: 12400 }, { rate: 12, limit: 50400 }, { rate: 22, limit: 105700 }, { rate: 24, limit: 201775 }, { rate: 32, limit: 256225 }, { rate: 35, limit: 384350 }, { rate: 37, limit: Infinity }],
};
export const standardDeductions: Record<FilingStatus, number> = { single: 16100, mfj: 32200, hoh: 24150, mfs: 16100 };

export function calculateProgressiveTax(income: number, status: FilingStatus) {
  let lower = 0;
  let tax = 0;
  const rows: Array<{ rate: number; income: number; tax: number }> = [];
  for (const bracket of incomeTaxBrackets[status]) {
    const taxableInBracket = Math.max(0, Math.min(income, bracket.limit) - lower);
    if (taxableInBracket > 0) rows.push({ rate: bracket.rate, income: taxableInBracket, tax: taxableInBracket * bracket.rate / 100 });
    tax += taxableInBracket * bracket.rate / 100;
    lower = bracket.limit;
    if (income <= bracket.limit) break;
  }
  return { tax, marginal: income > 0 ? rows.at(-1)?.rate ?? 0 : 0, rows };
}

export function calculateIncomeTax(input: { grossIncome: number; status: FilingStatus; retirementContribution: number; useItemized: boolean; itemizedDeduction: number; withholding: number; credits: number }) {
  const income = Math.max(0, input.grossIncome);
  const agi = Math.max(0, income - Math.min(income, Math.max(0, input.retirementContribution)));
  const deduction = Math.min(agi, Math.max(0, input.useItemized ? input.itemizedDeduction : standardDeductions[input.status]));
  const taxableIncome = Math.max(0, agi - deduction);
  const calculated = calculateProgressiveTax(taxableIncome, input.status);
  const taxAfterCredits = Math.max(0, calculated.tax - Math.max(0, input.credits));
  return { ...calculated, agi, deduction, taxableIncome, taxAfterCredits, refund: Math.max(0, input.withholding - taxAfterCredits), balanceDue: Math.max(0, taxAfterCredits - input.withholding), effective: income > 0 ? taxAfterCredits / income * 100 : 0 };
}
