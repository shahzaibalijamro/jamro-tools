export type PercentageMode = "of" | "percent" | "whole";
export interface PercentageResult { value: number; headline: string; formula: string; steps: string[]; explanation: string }
const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 });
export function formatPercentageNumber(value: number) { return formatter.format(Object.is(value, -0) ? 0 : value); }

export function calculatePercentage(mode: PercentageMode, firstValue: string, secondValue: string): { result: PercentageResult | null; errors: { first?: string; second?: string } } {
  const labels = mode === "of" ? ["percentage", "number"] : mode === "percent" ? ["first number", "second number"] : ["number", "percentage"];
  const first = Number(firstValue);
  const second = Number(secondValue);
  const errors: { first?: string; second?: string } = {};
  if (firstValue.trim() === "" || !Number.isFinite(first)) errors.first = `Enter a valid ${labels[0]}.`;
  if (secondValue.trim() === "" || !Number.isFinite(second)) errors.second = `Enter a valid ${labels[1]}.`;
  else if ((mode === "percent" || mode === "whole") && second === 0) errors.second = mode === "percent" ? "The second number cannot be zero." : "The percentage cannot be zero.";
  if (Object.keys(errors).length) return { result: null, errors };
  const f = formatPercentageNumber;
  if (mode === "of") {
    const value = second * first / 100;
    return { errors, result: { value, headline: `${f(first)}% of ${f(second)} = ${f(value)}`, formula: "Number × Percentage ÷ 100", steps: [`${f(second)} × ${f(first)} = ${f(second * first)}`, `${f(second * first)} ÷ 100 = ${f(value)}`], explanation: `${f(first)} percent of ${f(second)} is ${f(value)}.` } };
  }
  const value = first / second * 100;
  if (mode === "percent") return { errors, result: { value, headline: `${f(first)} is ${f(value)}% of ${f(second)}`, formula: "(Part ÷ Whole) × 100", steps: [`${f(first)} ÷ ${f(second)} = ${f(first / second)}`, `${f(first / second)} × 100 = ${f(value)}%`], explanation: `${f(first)} represents ${f(value)} percent of ${f(second)}.` } };
  return { errors, result: { value, headline: `${f(first)} is ${f(second)}% of ${f(value)}`, formula: "Part ÷ Percentage × 100", steps: [`${f(first)} ÷ ${f(second)} = ${f(first / second)}`, `${f(first / second)} × 100 = ${f(value)}`], explanation: `The original whole is ${f(value)}.` } };
}
