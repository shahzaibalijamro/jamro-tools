export function calculateNetWorth(assets: number[], liabilities: number[]) {
  const totalAssets = assets.reduce((sum, value) => sum + Math.max(0, value), 0);
  const totalLiabilities = liabilities.reduce((sum, value) => sum + Math.max(0, value), 0);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

export function netWorthBenchmark(age: number) {
  if (age < 35) return { label: "Under 35", median: 39_000 };
  if (age < 45) return { label: "35-44", median: 135_000 };
  if (age < 55) return { label: "45-54", median: 247_000 };
  if (age < 65) return { label: "55-64", median: 364_000 };
  if (age < 75) return { label: "65-74", median: 410_000 };
  return { label: "75+", median: 335_000 };
}
