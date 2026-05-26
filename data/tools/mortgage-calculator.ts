export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  customComponent?: string;
  sections?: ToolSection[];
}

export interface ToolSection {
  type: "inputs" | "donut-chart" | "bar-chart" | "results-grid" | "info-banner" | "faq" | "amortization-table";
  [key: string]: unknown;
}

export const mortgageCalculator: ToolConfig = {
  slug: "mortgage-calculator",
  title: "Mortgage Calculator",
  description:
    "Plan your future with precision. Calculate monthly payments, analyze tax implications, and understand your long-term equity growth with our professional-grade mortgage engine.",
  category: "financial",
  customComponent: "MortgageCalculator",
};