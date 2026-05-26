import { ToolConfig } from "./mortgage-calculator";
import { mortgageCalculator } from "./mortgage-calculator";

const allTools: ToolConfig[] = [mortgageCalculator];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return allTools.filter((t) => t.category === category);
}

export { allTools };