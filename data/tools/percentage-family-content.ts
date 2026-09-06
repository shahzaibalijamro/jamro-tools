import type { ToolExamplesBlock, ToolFaqItem, ToolPageContent } from "./types";

interface PercentageContentOptions {
  slug: string;
  definition: string[];
  formulaHeading: string;
  formula: string;
  formulaExplanation: string[];
  steps: string[];
  workedExample: string[];
  examples: ToolExamplesBlock["items"];
  comparison: string[];
  mistakes: string[];
  source: string;
  faq: ToolFaqItem[];
}

const FAMILY_TOOLS = [
  ["Percentage Increase Calculator", "percentage-increase-calculator"],
  ["Percentage Decrease Calculator", "percentage-decrease-calculator"],
  ["Percentage Change Calculator", "percentage-change-calculator"],
  ["Percentage Difference Calculator", "percentage-difference-calculator"],
  ["Percentage Error Calculator", "percentage-error-calculator"],
] as const;

export function buildPercentagePageContent(options: PercentageContentOptions): ToolPageContent {
  return {
    blocks: [
      {
        type: "text",
        heading: "What This Calculator Measures",
        paragraphs: options.definition,
      },
      {
        type: "formulas",
        heading: options.formulaHeading,
        items: [{
          heading: "Formula",
          formula: options.formula,
          example: options.formulaExplanation,
        }],
      },
      {
        type: "steps",
        heading: "How to Calculate It",
        groups: [{
          heading: "Step-by-step method",
          steps: options.steps,
          example: options.workedExample,
        }],
      },
      {
        type: "examples",
        heading: "Examples",
        items: options.examples,
      },
      {
        type: "text",
        heading: "Choosing the Right Percentage Tool",
        paragraphs: options.comparison,
      },
      {
        type: "text",
        heading: "Common Mistakes and Limits",
        paragraphs: ["Keep full precision during the calculation and round only the displayed result."],
        bullets: options.mistakes,
      },
      {
        type: "text",
        heading: "Sources and Convention",
        paragraphs: [
          `${options.source} The public source link appears with the calculator. Percentage terminology can vary by field, so this page states the exact convention it uses.`,
        ],
      },
    ],
    relatedTools: FAMILY_TOOLS
      .filter(([, slug]) => slug !== options.slug)
      .map(([title, slug]) => ({
        title,
        href: `/tools/calculators/math/${slug}`,
      })),
    faq: options.faq,
  };
}
