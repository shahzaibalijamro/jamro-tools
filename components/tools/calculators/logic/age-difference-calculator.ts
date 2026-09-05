export function calculateAgeDifference(first: string, second: string, firstLabel = "Person 1", secondLabel = "Person 2") {
  const d1 = new Date(first);
  const d2 = new Date(second);
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return { years: 0, months: 0, days: 0, totalDays: 0, older: "", isValid: false };
  const totalDays = Math.floor(Math.abs(d2.getTime() - d1.getTime()) / 86_400_000);
  const years = Math.floor(totalDays / 365.25);
  const remaining = totalDays % 365.25;
  return { years, months: Math.floor(remaining / 30.44), days: Math.floor(remaining % 30.44), totalDays, older: d1.getTime() < d2.getTime() ? firstLabel : secondLabel, isValid: true };
}
