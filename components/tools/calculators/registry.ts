import { ComponentType, createElement } from "react";
import MortgageCalculator from "./custom/mortgage-calculator";
import ApushScoreCalculator from "./custom/apush-score-calculator";
import CylinderVolumeCalculator from "./custom/cylinder-volume-calculator";
import PercentageDecreaseCalculator from "./custom/percentage-decrease-calculator";
import AgeDifferenceCalculator from "./custom/age-difference-calculator";
import MiddleSchoolGpaCalculator from "./custom/middle-school-gpa-calculator";
import TripleIntegralCalculator from "./custom/triple-integral-calculator";
import WordCounterCalculator from "./custom/word-counter-calculator";
import BasicCalculator from "./custom/basic-calculator";
import ScientificCalculator from "./custom/scientific-calculator";
import LoanCalculator from "./custom/loan-calculator";
import RentVsBuyCalculator from "./custom/rent-vs-buy";
import HomeAffordabilityCalculator from "./custom/home-affordability-calculator";
import NetWorthCalculator from "./custom/net-worth-calculator";
import RoiCalculator from "./custom/roi-calculator";
import FourOhOneKPlanner from "./custom/401k-planner";
import StudentLoanCalculator from "./custom/student-loan-calculator";
import CreditCardPayoffCalculator from "./custom/credit-card-payoff-calculator";
import IncomeTaxCalculator from "./custom/income-tax-calculator";
import PercentageCalculator from "./custom/percentage-calculator";

/**
 * Registry maps custom component names (as stored in ToolConfig.customComponent)
 * to the actual React components that render them.
 *
 * To add a new custom calculator:
 * 1. Create the component in components/tools/calculators/custom/
 * 2. Add a mapping here
 * 3. Create a data/tools/[slug].ts config with customComponent pointing to the key
 */
const customToolRegistry: Record<string, ComponentType> = {
  MortgageCalculator,
  ApushScoreCalculator,
  CylinderVolumeCalculator,
  PercentageDecreaseCalculator,
  AgeDifferenceCalculator,
  MiddleSchoolGpaCalculator,
  TripleIntegralCalculator,
  WordCounterCalculator,
  BasicCalculator,
  ScientificCalculator,
  LoanCalculator,
  RentVsBuyCalculator,
  HomeAffordabilityCalculator,
  NetWorthCalculator,
  RoiCalculator,
  FourOhOneKPlanner,
  StudentLoanCalculator,
  CreditCardPayoffCalculator,
  IncomeTaxCalculator,
  PercentageCalculator,
};

export function getCustomToolComponent(
  name: string
): ComponentType | null {
  return customToolRegistry[name] || null;
}

export function hasCustomToolComponent(name: string): boolean {
  return Boolean(customToolRegistry[name]);
}

export function getRegisteredCustomToolNames(): string[] {
  return Object.keys(customToolRegistry);
}

export function CustomToolRenderer({ name }: { name: string }) {
  const component = customToolRegistry[name];
  return component ? createElement(component) : null;
}

export {
  MortgageCalculator,
  ApushScoreCalculator,
  CylinderVolumeCalculator,
  PercentageDecreaseCalculator,
  AgeDifferenceCalculator,
  MiddleSchoolGpaCalculator,
  TripleIntegralCalculator,
  WordCounterCalculator,
  BasicCalculator,
  ScientificCalculator,
  LoanCalculator,
  RentVsBuyCalculator,
  HomeAffordabilityCalculator,
  NetWorthCalculator,
  RoiCalculator,
  FourOhOneKPlanner,
  StudentLoanCalculator,
  CreditCardPayoffCalculator,
  IncomeTaxCalculator,
  PercentageCalculator,
};

