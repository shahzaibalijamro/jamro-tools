export interface RoiInput { investment: number; netReturn: number; years: number; revenue: number; cogs: number; operatingExpenses: number; otherCosts: number }
export function calculateRoi(input: RoiInput) {
  const roi = input.investment > 0 ? (input.netReturn - input.investment) / input.investment * 100 : 0;
  const annualizedRoi = input.investment > 0 && input.years > 0 ? (Math.max(input.netReturn / input.investment, 0) ** (1 / input.years) - 1) * 100 : 0;
  const grossMargin = input.revenue > 0 ? (input.revenue - input.cogs) / input.revenue * 100 : 0;
  const operatingMargin = input.revenue > 0 ? (input.revenue - input.cogs - input.operatingExpenses) / input.revenue * 100 : 0;
  const netMargin = input.revenue > 0 ? (input.revenue - input.cogs - input.operatingExpenses - input.otherCosts) / input.revenue * 100 : 0;
  return { roi, annualizedRoi, grossMargin, operatingMargin, netMargin, netGain: input.netReturn - input.investment, returnMultiple: input.investment > 0 ? input.netReturn / input.investment : 0 };
}
