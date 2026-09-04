import type { ToolConfig } from "./types";

export type { ToolConfig, ToolSection } from "./types";

export const mortgageCalculator: ToolConfig = {
  slug: "mortgage-calculator",
  title: "Mortgage Calculator",
  description:
    "Plan your future with precision. Calculate monthly payments, analyze tax implications, and understand your long-term equity growth with our professional-grade mortgage engine.",
  category: "financial",
  customComponent: "MortgageCalculator",
};
