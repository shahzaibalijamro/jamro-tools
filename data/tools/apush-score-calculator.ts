import { ToolConfig } from "./mortgage-calculator";

export const apushScoreCalculator: ToolConfig = {
  slug: "apush-score-calculator",
  title: "APUSH Score Calculator",
  description:
    "Calculate your projected AP U.S. History exam score based on the latest College Board weighting. Enter your MCQ, SAQ, DBQ, and LEQ raw scores to see your estimated composite result and final AP grade.",
  category: "educational",
  customComponent: "ApushScoreCalculator",
};