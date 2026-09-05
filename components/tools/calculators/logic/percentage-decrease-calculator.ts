const circumference = 691;
export function calculatePercentageDecrease(initialValue: number, finalValue: number) {
  const initial = initialValue || 0;
  const final = finalValue || 0;
  if (initial === 0) return { percentage: 0, absoluteDrop: 0, retention: 0, dashOffset: circumference, isValid: false, displayText: "Invalid Input" };
  const absoluteDrop = initial - final;
  const percentage = absoluteDrop / Math.abs(initial) * 100;
  const clamped = Math.max(0, Math.min(100, percentage));
  return { percentage, absoluteDrop, retention: final / initial * 100, dashOffset: circumference - clamped / 100 * circumference, isValid: true, displayText: `${percentage.toFixed(2)}% Decrease` };
}
