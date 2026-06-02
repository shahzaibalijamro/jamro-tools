import { ToolConfig } from "./mortgage-calculator";

export const ageDifferenceCalculator: ToolConfig = {
  slug: "age-difference-calculator",
  title: "Age Difference Calculator",
  description: "Calculate precise age gaps between two individuals. Accounts for leap years and varying month lengths for mathematical accuracy.",
  category: "date-time",
  customComponent: "AgeDifferenceCalculator",
};