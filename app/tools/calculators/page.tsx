import type { Metadata } from "next";

import { CalculatorsIndexView } from "@/components/tools/calculators/calculators-index-view";

export const metadata: Metadata = {
  title: "Free Online Calculators – 120+ Tools Across Every Category",
  description:
    "Use 120+ free online calculators for math, finance, health, engineering, science & more. No sign-up, no downloads. Instant answers right in your browser.",
};

export default function CalculatorsPage() {
  return <CalculatorsIndexView />;
}
