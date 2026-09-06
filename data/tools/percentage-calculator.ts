import type { ToolConfig } from "./types";

export const percentageCalculator: ToolConfig = {
  slug: "percentage-calculator",
  title: "Percentage Calculator",
  description:
    "Use this free Percentage Calculator to quickly calculate percentages in different ways. Find a percentage of a number, calculate what percentage one number is of another, or find the original number from a percentage.",
  category: "math",
  customComponent: "PercentageCalculator",
  workspaceLayout: "balanced",
  metadata: {
    title: "Percentage Calculator - Calculate Percentages Online | Jamro Tools",
    description:
      "Use our free Percentage Calculator to calculate percentages, find a percentage of a number, and get accurate results instantly. Simple, fast, and easy to use.",
  },
  pageContent: {
    blocks: [
      {
        type: "text",
        heading: "How the Calculation Works",
        paragraphs: [
          "After you enter your values, the calculator shows the answer with a clear explanation of how it was calculated.",
          "For example, 20% of 500 is 100 because 500 × 20 ÷ 100 = 100. Showing the working helps you understand the result and check the calculation.",
        ],
      },
      {
        type: "text",
        heading: "What Is a Percentage?",
        paragraphs: [
          "A percentage expresses a value as a part of 100. The symbol % means “per hundred.”",
          "Percentages are commonly used for discounts, exam results, taxes, interest rates, commissions, statistics, and many other calculations.",
        ],
        bullets: [
          "10% means 10 out of 100.",
          "25% means 25 out of 100.",
          "50% means half of a whole.",
          "100% means the complete amount.",
        ],
      },
      {
        type: "formulas",
        heading: "Percentage Formulas",
        items: [
          {
            heading: "Find a Percentage of a Number",
            formula: "Percentage Value = Number × Percentage ÷ 100",
            example: [
              "To find 20% of 500:",
              "500 × 20 ÷ 100 = 100",
              "Therefore, 20% of 500 is 100.",
            ],
          },
          {
            heading: "Find What Percentage One Number Is of Another",
            formula: "Percentage = (Part ÷ Whole) × 100",
            example: [
              "What percentage is 50 of 200?",
              "(50 ÷ 200) × 100 = 25%",
              "Therefore, 50 is 25% of 200.",
            ],
          },
          {
            heading: "Find the Whole Number From a Percentage",
            formula: "Whole = Part ÷ Percentage × 100",
            example: [
              "If 50 is 25% of a number:",
              "50 ÷ 25 × 100 = 200",
              "Therefore, 50 is 25% of 200.",
            ],
          },
        ],
      },
      {
        type: "steps",
        heading: "How to Calculate a Percentage",
        groups: [
          {
            heading: "Calculate a Percentage of a Number",
            steps: [
              "Enter the percentage.",
              "Enter the number.",
              "Multiply the number by the percentage.",
              "Divide the result by 100.",
            ],
            example: [
              "To calculate 15% of 200:",
              "200 × 15 ÷ 100 = 30",
              "Therefore, 15% of 200 is 30.",
            ],
          },
          {
            heading: "Find What Percentage One Number Is of Another",
            steps: [
              "Divide the first number by the second number.",
              "Multiply the answer by 100.",
            ],
            example: [
              "What percentage is 30 of 120?",
              "30 ÷ 120 × 100 = 25%",
              "Therefore, 30 is 25% of 120.",
            ],
          },
          {
            heading: "Find the Original Number",
            steps: [
              "Divide the part by the percentage.",
              "Multiply the result by 100.",
            ],
            example: [
              "If 40 is 20% of a number:",
              "40 ÷ 20 × 100 = 200",
              "Therefore, 40 is 20% of 200.",
            ],
          },
        ],
      },
      {
        type: "examples",
        heading: "Percentage Calculation Examples",
        items: [
          {
            heading: "Calculate a Discount",
            lines: [
              "A product costs $200 and has a 15% discount.",
              "200 × 15 ÷ 100 = 30",
              "The discount is $30 and the new price is $170.",
            ],
          },
          {
            heading: "Calculate an Exam Percentage",
            lines: [
              "A student scores 72 marks out of 90.",
              "(72 ÷ 90) × 100 = 80%",
              "The student’s exam percentage is 80%.",
            ],
          },
          {
            heading: "Calculate Tax",
            lines: [
              "A purchase costs $500 and the tax rate is 10%.",
              "500 × 10 ÷ 100 = 50",
              "The tax amount is $50.",
            ],
          },
          {
            heading: "Calculate Commission",
            lines: [
              "A salesperson earns a 5% commission on $4,000 in sales.",
              "4,000 × 5 ÷ 100 = 200",
              "The commission amount is $200.",
            ],
          },
        ],
      },
    ],
    relatedTools: [
      {
        title: "Percentage Decrease Calculator",
        href: "/tools/calculators/math/percentage-decrease-calculator",
        description: "Measure the percentage drop between two values.",
      },
      {
        title: "Percentage Increase Calculator",
        href: "/tools/calculators/math/percentage-increase-calculator",
        description: "Measure growth from an original value.",
      },
      {
        title: "Percentage Change Calculator",
        href: "/tools/calculators/math/percentage-change-calculator",
        description: "Measure signed change from an original value.",
      },
      {
        title: "Percentage Difference Calculator",
        href: "/tools/calculators/math/percentage-difference-calculator",
        description: "Compare two peer values relative to their average.",
      },
    ],
    faq: [
      {
        q: "How do you calculate a percentage?",
        a: "To calculate a percentage of a number, multiply the number by the percentage and divide by 100. For example, 20% of 500 is 500 × 20 ÷ 100 = 100.",
      },
      {
        q: "How do I find a percentage of a number?",
        a: "Multiply the number by the percentage and divide by 100. For example, 15% of 200 is 200 × 15 ÷ 100 = 30.",
      },
      {
        q: "What is the formula for calculating percentage?",
        a: "To find a percentage of a number, use Number × Percentage ÷ 100. To find what percentage one number is of another, use (Part ÷ Whole) × 100. The correct formula depends on what you want to calculate.",
      },
      {
        q: "How do you find what percentage one number is of another?",
        a: "Divide the first number by the second number and multiply by 100. For example, (50 ÷ 200) × 100 = 25%, so 50 is 25% of 200.",
      },
      {
        q: "How do I calculate my exam percentage?",
        a: "Divide your obtained marks by the total marks and multiply by 100. If you score 72 out of 90, (72 ÷ 90) × 100 = 80%.",
      },
      {
        q: "Is this Percentage Calculator free?",
        a: "Yes. The Jamro Tools Percentage Calculator is free to use. Enter your values and get your percentage calculation instantly.",
      },
    ],
  },
};
