import { ToolConfig } from "./mortgage-calculator";

export const scientificCalculator: ToolConfig = {
  slug: "scientific-calculator",
  title: "Scientific Calculator",
  description:
    "A professional-grade calculator designed for engineers, students, and scientists. Supporting complex arithmetic, trigonometry, and logarithms with 64-bit precision.",
  category: "math",
  customComponent: "ScientificCalculator",
  sections: [
    {
      type: "faq",
      items: [
        {
          question: "How precise is the Jamro Calculator?",
          answer:
            "Our engine uses IEEE 754 standard for 64-bit double-precision floating-point arithmetic. This ensures accuracy up to 15-17 significant decimal digits for all complex scientific operations.",
        },
        {
          question: "Does it support Radians or Degrees?",
          answer:
            "Both are supported. You can toggle between Degrees (Deg) and Radians (Rad) in the calculator settings panel or using the shortcut key 'R' on your keyboard.",
        },
        {
          question: "Is my history saved privately?",
          answer:
            "Your history is stored locally in your browser's session data. Jamro Utility System does not transmit or store your individual calculation inputs on our servers unless you explicitly save them to your account.",
        },
        {
          question: "Can I export results?",
          answer:
            "Yes, you can copy results to your clipboard with a single click, or download your entire session history as a CSV or PDF from the History sidebar.",
        },
      ],
    },
  ],
};
