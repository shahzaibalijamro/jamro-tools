import type { ToolConfig } from "./mortgage-calculator";

export const incomeTaxCalculator: ToolConfig = {
  slug: "income-tax-calculator",
  title: "Income Tax Calculator",
  description: "Estimate your 2026 federal income tax, effective rate, marginal rate, and refund or balance due.",
  category: "financial",
  customComponent: "IncomeTaxCalculator",
};
