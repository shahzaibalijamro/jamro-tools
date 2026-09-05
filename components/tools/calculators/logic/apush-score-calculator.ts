export const apushDefinitions: Record<number, { label: string; colorClass: string }> = {
  5: { label: "Extremely Well Qualified", colorClass: "text-primary" }, 4: { label: "Well Qualified", colorClass: "text-secondary" }, 3: { label: "Qualified", colorClass: "text-on-secondary-fixed-variant" }, 2: { label: "Possibly Qualified", colorClass: "text-outline" }, 1: { label: "Not Qualified", colorClass: "text-error" },
};
export function calculateApushScore(mcq: number, saq1: number, saq2: number, saq3: number, dbq: number, leq: number) {
  const totalRaw = mcq + saq1 + saq2 + saq3 + dbq + leq;
  const roundedComposite = Math.round(mcq + (saq1 + saq2 + saq3) * 3.11 + dbq * 4.5 + leq * 4.25);
  const finalScore = roundedComposite >= 105 ? 5 : roundedComposite >= 88 ? 4 : roundedComposite >= 70 ? 3 : roundedComposite >= 50 ? 2 : 1;
  const percent = Math.min(100, Math.round(roundedComposite / 140 * 100));
  const circle = 2 * Math.PI * 40;
  return { totalRaw, roundedComposite, finalScore, percent, circumference: circle, offset: circle - percent / 100 * circle, definition: apushDefinitions[finalScore] };
}
