import { ToolConfig } from "./mortgage-calculator";

export const rentVsBuyCalculator: ToolConfig = {
  slug: "rent-vs-buy",
  title: "Rent vs Buy Calculator",
  description:
    "Compare the total net cost of renting against buying over time. Factor in property appreciation, investment returns, and hidden costs to find your exact break-even point.",
  category: "financial",
  customComponent: "RentVsBuyCalculator",
};
