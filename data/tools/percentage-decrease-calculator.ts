import type { ToolConfig } from "./types";
import { buildPercentagePageContent } from "./percentage-family-content";

export const percentageDecreaseCalculator: ToolConfig = {
  slug: "percentage-decrease-calculator",
  title: "Percentage Decrease Calculator",
  description: "Calculate how much a non-negative value fell relative to its original value, with the formula and working shown.",
  category: "math",
  customComponent: "PercentageDecreaseCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Decrease Calculator - Calculate Percent Decrease | Jamro Tools",
    description: "Use our free Percentage Decrease Calculator to calculate the percent decrease from an original value to a new value, with the formula and steps.",
  },
  pageContent: buildPercentagePageContent({
    slug: "percentage-decrease-calculator",
    definition: [
      "Percentage decrease measures a reduction from an original value to a lower new value. It expresses the amount of decrease as a percentage of the original value.",
      "Use it for reductions in prices, quantities, sales, traffic, or other values measured in the same unit.",
    ],
    formulaHeading: "Percentage Decrease Formula",
    formula: "((Original value − New value) ÷ Original value) × 100",
    formulaExplanation: [
      "The original value is the denominator because it is the starting reference.",
      "The original value must be greater than zero. A higher new value is an increase and is identified as such by the calculator.",
    ],
    steps: [
      "Subtract the new value from the original value.",
      "Divide that decrease by the original value.",
      "Multiply by 100 to express the result as a percentage.",
    ],
    workedExample: ["From 200 to 150: 200 − 150 = 50.", "(50 ÷ 200) × 100 = 25% decrease."],
    examples: [
      { heading: "Price reduction", lines: ["A price falls from 80 to 60.", "(20 ÷ 80) × 100 = 25% decrease."] },
      { heading: "Sales decline", lines: ["Sales fall from 10,000 to 8,000.", "(2,000 ÷ 10,000) × 100 = 20% decrease."] },
      { heading: "Complete reduction", lines: ["A value falls from 100 to 0.", "(100 ÷ 100) × 100 = 100% decrease."] },
    ],
    comparison: [
      "Use Percentage Change when the direction may be either positive or negative. Use Percentage Difference when neither value is an original baseline.",
      "Percentage Increase uses the same original-value reference for movement in the opposite direction. Percentage Error instead compares a measured value with a designated reference.",
    ],
    mistakes: [
      "Do not divide by the new value; the original value is the reference.",
      "An original value of zero makes this formula undefined.",
      "If the new value is higher, interpret the result as an increase rather than a negative decrease.",
    ],
    source: "Formula reviewed against OpenStax Prealgebra 2e, Section 6.2.",
    faq: [
      { q: "How do I calculate percentage decrease?", a: "Subtract the new value from the original value, divide by the original value, and multiply by 100." },
      { q: "Does a 100% decrease mean the new value is zero?", a: "Yes. For non-negative inputs, a 100% decrease removes the full original amount and leaves zero." },
      { q: "What if the new value is higher?", a: "That is a percentage increase. The calculator reports the actual increase and links to the Percentage Increase Calculator." },
      { q: "Why must the original value be greater than zero?", a: "The formula divides by the original value, so zero cannot serve as its denominator." },
    ],
  }),
};
