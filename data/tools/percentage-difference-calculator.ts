import type { ToolConfig } from "./types";
import { buildPercentagePageContent } from "./percentage-family-content";

export const percentageDifferenceCalculator: ToolConfig = {
  slug: "percentage-difference-calculator",
  title: "Percentage Difference Calculator",
  description: "Compare two non-negative values symmetrically by expressing their absolute difference relative to their arithmetic mean.",
  category: "math",
  customComponent: "PercentageDifferenceCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Difference Calculator - Compare Two Values | Jamro Tools",
    description: "Use our free Percentage Difference Calculator to compare two values relative to their average, with instant results, the formula, and steps.",
  },
  pageContent: buildPercentagePageContent({
    slug: "percentage-difference-calculator",
    definition: [
      "Percentage difference compares two peer values when neither one is designated as the original or reference value.",
      "This calculator uses the absolute difference divided by the arithmetic mean, so swapping the two inputs does not change the result.",
    ],
    formulaHeading: "Percentage Difference Formula",
    formula: "|Value 1 − Value 2| ÷ ((Value 1 + Value 2) ÷ 2) × 100",
    formulaExplanation: [
      "The denominator is the arithmetic mean of the two values rather than either value alone.",
      "If one value is zero the result is 200%. If both are zero, this product reports 0% by an explicit no-difference convention.",
    ],
    steps: [
      "Find the absolute difference between the values.",
      "Add the values and divide by two to find their arithmetic mean.",
      "Divide the absolute difference by the mean and multiply by 100.",
    ],
    workedExample: ["For 80 and 100: |80 − 100| = 20 and the mean is 90.", "(20 ÷ 90) × 100 = 22.2222%."],
    examples: [
      { heading: "Two measurements", lines: ["Values 50 and 70 differ by 20 and average 60.", "(20 ÷ 60) × 100 = 33.3333%."] },
      { heading: "Decimal values", lines: ["Values 2.5 and 3 differ by 0.5 and average 2.75.", "(0.5 ÷ 2.75) × 100 = 18.1818%."] },
      { heading: "One zero", lines: ["Values 0 and 10 differ by 10 and average 5.", "(10 ÷ 5) × 100 = 200%."] },
    ],
    comparison: [
      "Use Percentage Change when one value is the original and the other is new. Use Percentage Increase or Decrease when that direction is known.",
      "Use Percentage Error when one value is a measured result and the other is a designated reference. Those tools use a baseline denominator rather than the average.",
    ],
    mistakes: [
      "Do not use either input alone as the denominator under this convention.",
      "Do not describe the result as an increase or decrease because the inputs are peers.",
      "For 0 and 0, the displayed 0% is a stated product convention that avoids evaluating 0 ÷ 0.",
    ],
    source: "Average-denominator variant reviewed against the NIST Dataplot PERCDIF reference.",
    faq: [
      { q: "How do I calculate percentage difference?", a: "Divide the absolute difference between the values by their arithmetic mean, then multiply by 100." },
      { q: "Does input order matter?", a: "No. The formula uses an absolute difference and the same arithmetic mean in either order." },
      { q: "What happens when one value is zero?", a: "If exactly one value is zero, the percentage difference is 200% because the difference is twice the arithmetic mean." },
      { q: "What happens when both values are zero?", a: "Jamro Tools reports 0% by an explicit no-difference convention because the values are identical; this avoids evaluating the undefined expression 0 divided by 0." },
    ],
  }),
};
