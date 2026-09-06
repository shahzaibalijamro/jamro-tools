import type { ToolConfig } from "./types";
import { buildPercentagePageContent } from "./percentage-family-content";

export const percentageErrorCalculator: ToolConfig = {
  slug: "percentage-error-calculator",
  title: "Percentage Error Calculator",
  description: "Compare a signed measured value with a nonzero designated reference and see the absolute relative error as a percentage.",
  category: "math",
  customComponent: "PercentageErrorCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Error Calculator - Calculate Percent Error | Jamro Tools",
    description: "Use our free Percentage Error Calculator to compare a measured value with a reference value and see the percent error, formula, and steps.",
  },
  pageContent: buildPercentagePageContent({
    slug: "percentage-error-calculator",
    definition: [
      "Percentage error measures how far a measured value is from a designated accepted, expected, or theoretical reference value, relative to the magnitude of that reference.",
      "The result is non-negative. A separate signed-error metric and the interpretation show whether the measured value is above, below, or equal to the reference.",
    ],
    formulaHeading: "Percentage Error Formula",
    formula: "|Measured value − Reference value| ÷ |Reference value| × 100",
    formulaExplanation: [
      "The absolute reference value is the denominator, so signed measured and reference values are supported.",
      "The reference must be nonzero. The calculator uses the reference you designate and does not determine whether it is trustworthy.",
    ],
    steps: [
      "Subtract the reference value from the measured value to find signed error.",
      "Take the absolute value of that error.",
      "Divide by the absolute reference value and multiply by 100.",
    ],
    workedExample: ["Measured 95, reference 100: 95 − 100 = −5 and |−5| = 5.", "(5 ÷ |100|) × 100 = 5%; the measurement is below the reference."],
    examples: [
      { heading: "Above reference", lines: ["Measured 105, reference 100.", "The signed error is 5 and the percentage error is 5%."] },
      { heading: "Negative values", lines: ["Measured −95, reference −100.", "The measured value is numerically above the reference; percentage error is 5%."] },
      { heading: "Opposite signs", lines: ["Measured −90, reference 100.", "The absolute error is 190 and percentage error is 190%."] },
    ],
    comparison: [
      "Percentage Error requires a designated reference value. Percentage Difference treats the values as peers and instead uses their average.",
      "Percentage Change uses an original value and preserves a signed percentage. Percentage Error reports a non-negative percentage plus separate above-or-below context.",
    ],
    mistakes: [
      "Do not assume the calculator validates the quality of the chosen reference.",
      "Do not omit the absolute value around the reference when signed values are used.",
      "A zero reference makes relative and percentage error undefined.",
    ],
    source: "Relative-error definition reviewed against NIST DLMF Section 3.1(v), Error Measures.",
    faq: [
      { q: "How do I calculate percentage error?", a: "Take the absolute difference between measured and reference values, divide by the absolute reference value, and multiply by 100." },
      { q: "Can the inputs be negative?", a: "Yes. Signed measured and reference values are accepted, and the formula uses the absolute magnitude of the reference as its denominator." },
      { q: "Can percentage error be negative?", a: "No. The percentage uses an absolute error. The signed-error metric and interpretation separately show whether the measurement is above or below the reference." },
      { q: "What if the reference value is zero?", a: "Percentage error is undefined for a zero reference because the formula would divide by zero." },
    ],
  }),
};
