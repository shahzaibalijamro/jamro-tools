import { ToolConfig } from "./mortgage-calculator";
import { mortgageCalculator } from "./mortgage-calculator";
import { apushScoreCalculator } from "./apush-score-calculator";
import { cylinderVolumeCalculator } from "./cylinder-volume-calculator";
import { percentageDecreaseCalculator } from "./percentage-decrease-calculator";

const allTools: ToolConfig[] = [mortgageCalculator, apushScoreCalculator, cylinderVolumeCalculator, percentageDecreaseCalculator];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export { allTools };