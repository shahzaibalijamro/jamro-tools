import { ToolConfig } from "./mortgage-calculator";

export const basicCalculator: ToolConfig = {
  slug: "basic-calculator",
  title: "Basic Calculator",
  description:
    "A high-precision, distraction-free environment for your daily arithmetic. Jamro Tools ensures every calculation is lightning fast and privacy-first.",
  category: "math",
  customComponent: "BasicCalculator",
  sections: [
    {
      type: "faq",
      items: [
        {
          question: "How precise is the Jamro Calculator?",
          answer:
            "Our calculator uses high-precision floating-point arithmetic compliant with IEEE 754 standards. It is designed to handle up to 16 decimal places of precision for standard calculations, ensuring accuracy for both professional and academic use.",
        },
        {
          question: "Does it support scientific functions?",
          answer:
            "This basic version focuses on essential arithmetic. For trigonometry, logarithms, and advanced calculus, please switch to our Scientific Tool in the sidebar menu.",
        },
        {
          question: "Is my calculation history private?",
          answer:
            "Yes. Jamro Tools follows a 'Privacy-First' architecture. Your calculation history is stored locally in your browser's session storage. We never transmit your specific calculations or results to our servers.",
        },
      ],
    },
  ],
};
