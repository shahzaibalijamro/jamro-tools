import type { ToolConfig } from "./types";
import { buildPercentagePageContent } from "./percentage-family-content";

export const percentageIncreaseCalculator: ToolConfig = {
  slug: "percentage-increase-calculator",
  title: "Percentage Increase Calculator",
  description: "Calculate how much a non-negative value grew relative to its original value, with the formula and working shown.",
  category: "math",
  customComponent: "PercentageIncreaseCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Increase Calculator - Calculate Percent Increase | Jamro Tools",
    description: "Use our free Percentage Increase Calculator to calculate the percent increase from an original value to a new value, with the formula and steps.",
  },
  pageContent: buildPercentagePageContent({
    slug: "percentage-increase-calculator",
    definition: [
      "Percentage increase measures growth from an original value to a higher new value. It expresses the amount of increase as a percentage of the original value.",
      "Use it for increases in prices, quantities, scores, traffic, or other values measured in the same unit.",
    ],
    formulaHeading: "Percentage Increase Formula",
    formula: "((New value − Original value) ÷ Original value) × 100",
    formulaExplanation: [
      "The original value is the denominator because it is the starting reference.",
      "The original value must be greater than zero. A lower new value is a decrease and is identified as such by the calculator.",
    ],
    steps: [
      "Subtract the original value from the new value.",
      "Divide that increase by the original value.",
      "Multiply by 100 to express the result as a percentage.",
    ],
    workedExample: ["From 100 to 125: 125 − 100 = 25.", "(25 ÷ 100) × 100 = 25% increase."],
    examples: [
      { heading: "Price", lines: ["A price rises from 50 to 60.", "(10 ÷ 50) × 100 = 20% increase."] },
      { heading: "Attendance", lines: ["Attendance rises from 200 to 250.", "(50 ÷ 200) × 100 = 25% increase."] },
      { heading: "More than 100%", lines: ["A value rises from 100 to 250.", "(150 ÷ 100) × 100 = 150% increase."] },
    ],
    comparison: [
      "Use Percentage Change when the direction may be either positive or negative. Use Percentage Difference when neither value is an original baseline.",
      "Percentage Decrease uses the same original-value reference for movement in the opposite direction. Percentage Error instead compares a measured value with a designated reference.",
    ],
    mistakes: [
      "Do not divide by the new value; the original value is the reference.",
      "An original value of zero makes this formula undefined.",
      "If the new value is lower, interpret the result as a decrease rather than a negative increase.",
    ],
    source: "Formula reviewed against OpenStax Prealgebra 2e, Section 6.2.",
    faq: [
      { q: "How do I calculate percentage increase?", a: "Subtract the original value from the new value, divide by the original value, and multiply by 100." },
      { q: "Can a percentage increase exceed 100%?", a: "Yes. A rise from 100 to 250 is a 150% increase because the increase of 150 is 150% of the original 100." },
      { q: "What if the new value is lower?", a: "That is a percentage decrease. The calculator reports the actual decrease and links to the Percentage Decrease Calculator." },
      { q: "Why must the original value be greater than zero?", a: "The formula divides by the original value, so zero cannot serve as its denominator." },
    ],
  }),
};
