import { ToolConfig } from "./mortgage-calculator";
import { mortgageCalculator } from "./mortgage-calculator";
import { apushScoreCalculator } from "./apush-score-calculator";
import { cylinderVolumeCalculator } from "./cylinder-volume-calculator";
import { percentageDecreaseCalculator } from "./percentage-decrease-calculator";
import { ageDifferenceCalculator } from "./age-difference-calculator";
import { middleSchoolGpaCalculator } from "./middle-school-gpa-calculator";
import { tripleIntegralCalculator } from "./triple-integral-calculator";
import { wordCounterCalculator } from "./word-counter-calculator";
import { basicCalculator } from "./basic-calculator";
import { scientificCalculator } from "./scientific-calculator";
import { loanCalculator } from "./loan-calculator";
import { rentVsBuyCalculator } from "./rent-vs-buy";
import { homeAffordabilityCalculator } from "./home-affordability-calculator";

const allTools: ToolConfig[] = [
  mortgageCalculator,
  apushScoreCalculator,
  cylinderVolumeCalculator,
  percentageDecreaseCalculator,
  ageDifferenceCalculator,
  middleSchoolGpaCalculator,
  tripleIntegralCalculator,
  wordCounterCalculator,
  basicCalculator,
  scientificCalculator,
  loanCalculator,
  rentVsBuyCalculator,
  homeAffordabilityCalculator,
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export { allTools };

