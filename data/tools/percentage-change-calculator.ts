import type { ToolConfig } from "./types";
import { buildPercentagePageContent } from "./percentage-family-content";

export const percentageChangeCalculator: ToolConfig = {
  slug: "percentage-change-calculator",
  title: "Percentage Change Calculator",
  description: "Calculate signed percentage change from an original value to a new value and see whether it increased, decreased, or stayed equal.",
  category: "math",
  customComponent: "PercentageChangeCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Change Calculator - Calculate Percent Change | Jamro Tools",
    description: "Use our free Percentage Change Calculator to calculate a signed percentage change from an original value to a new value, with the formula and steps.",
  },
  pageContent: buildPercentagePageContent({
    slug: "percentage-change-calculator",
    definition: [
      "Percentage change measures movement from an original value to a new value relative to the original value.",
      "A positive result is an increase, a negative result is a decrease, and zero means the value did not change. The order of the values matters.",
    ],
    formulaHeading: "Percentage Change Formula",
    formula: "((New value − Original value) ÷ Original value) × 100",
    formulaExplanation: [
      "The original value is the base or starting reference and must be greater than zero.",
      "The sign is retained so the result communicates direction as well as magnitude.",
    ],
    steps: [
      "Subtract the original value from the new value.",
      "Divide the signed change by the original value.",
      "Multiply by 100 and interpret the sign in words.",
    ],
    workedExample: ["From 80 to 100: 100 − 80 = 20.", "(20 ÷ 80) × 100 = 25%, an increase."],
    examples: [
      { heading: "Decrease", lines: ["Sales move from 10,000 to 8,000.", "(−2,000 ÷ 10,000) × 100 = −20%, a decrease."] },
      { heading: "Increase", lines: ["A score moves from 60 to 75.", "(15 ÷ 60) × 100 = 25%, an increase."] },
      { heading: "Reversal", lines: ["100 to 120 is 20%.", "120 to 100 is −16.6667% because the base changes."] },
    ],
    comparison: [
      "Percentage Increase and Percentage Decrease are direction-specific versions of this baseline comparison. Percentage Change keeps a signed result for either direction.",
      "Percentage Difference is symmetric and uses the average of two peer values, while Percentage Error uses a designated reference value.",
    ],
    mistakes: [
      "Do not swap the original and new values; doing so changes both the sign and denominator.",
      "Do not remove the negative sign from a decrease.",
      "An original value of zero makes this convention undefined.",
    ],
    source: "Formula reviewed against OpenStax Principles of Financial Accounting, Appendix A.",
    faq: [
      { q: "How do I calculate percentage change?", a: "Subtract the original value from the new value, divide by the original value, and multiply by 100." },
      { q: "Can percentage change be negative?", a: "Yes. A negative result means the new value is lower than the original value, so the change is a decrease." },
      { q: "Does input order matter?", a: "Yes. Percentage change uses the original value as its denominator, so reversing the values changes the result." },
      { q: "How is percentage change different from percentage difference?", a: "Percentage change uses an original value as the baseline. Percentage difference treats the two values as peers and divides by their average." },
    ],
  }),
};
