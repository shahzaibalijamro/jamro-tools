import type { ToolConfig } from "./types";
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
import { netWorthCalculator } from "./net-worth-calculator";
import { roiCalculator } from "./roi-calculator";
import { fourOhOneKPlanner } from "./401k-planner";
import { studentLoanCalculator } from "./student-loan-calculator";
import { creditCardPayoffCalculator } from "./credit-card-payoff-calculator";
import { incomeTaxCalculator } from "./income-tax-calculator";
import { percentageCalculator } from "./percentage-calculator";

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
  netWorthCalculator,
  roiCalculator,
  fourOhOneKPlanner,
  studentLoanCalculator,
  creditCardPayoffCalculator,
  incomeTaxCalculator,
  percentageCalculator,
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export { allTools };

