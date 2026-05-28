import { ComponentType } from "react";
import MortgageCalculator from "./custom/mortgage-calculator";
import ApushScoreCalculator from "./custom/apush-score-calculator";
import CylinderVolumeCalculator from "./custom/cylinder-volume-calculator";
import PercentageDecreaseCalculator from "./custom/percentage-decrease-calculator";

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
};

export function getCustomToolComponent(
  name: string
): ComponentType | null {
  return customToolRegistry[name] || null;
}

export { MortgageCalculator, ApushScoreCalculator, CylinderVolumeCalculator, PercentageDecreaseCalculator };