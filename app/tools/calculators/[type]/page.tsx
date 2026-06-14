import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { calculatorCategories } from "@/data/calculator-tools";
import { CalculatorTypeView } from "@/components/tools/calculators/calculator-type-view";

interface PageProps {
  params: Promise<{ type: string }>;
}

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  financial: {
    title: "Free Financial Calculators – Mortgage, Loan & Investment",
    description:
      "Free financial calculators for mortgage payments, loan amortization, savings growth, compound interest & investments. Instant results — no sign-up required.",
  },
  math: {
    title: "Free Math Calculators – Geometry, Calculus & More Online",
    description:
      "Free math calculators for geometry, calculus, algebra & percentages — cylinder volume, triple integrals, percent change & more. No sign-up, instant results.",
  },
  health: {
    title: "Free Health Calculators – BMI, Calories & Body Metrics",
    description:
      "Calculate BMI, daily calories, body fat percentage, ideal weight & more with free health calculators. Private, browser-only processing. No sign-up required.",
  },
  unit: {
    title: "Free Unit Calculators & Converters – Any Measurement",
    description:
      "Convert and calculate units of length, weight, volume, temperature, pressure & more. Free online unit calculators — no registration, instant results.",
  },
  "date-time": {
    title: "Free Date & Time Calculators – Age, Countdown & More",
    description:
      "Calculate exact ages, days between dates, countdowns, time zones & date differences with free date-time tools. Instant, accurate — no sign-up required.",
  },
  engineering: {
    title: "Free Engineering Calculators – Structural, Electrical & Civil",
    description:
      "Free engineering calculators for volume, electrical load, fluid dynamics, pipe sizing & structural analysis. Browser-based, no sign-up. Accurate to 15 decimal places.",
  },
  science: {
    title: "Free Science Calculators – Chemistry, Physics & Biology",
    description:
      "Free online science calculators for chemistry, physics & biology — molarity, kinematics, energy, periodic table data & more. No registration, instant results.",
  },
  educational: {
    title: "Free Educational Calculators for Students | Jamro Tools",
    description:
      "Free student calculators for GPA, AP exam scores, grade tracking & academic planning. Perfect for middle school, high school & college. No sign-up needed.",
  },
  others: {
    title: "Other Free Calculators – Specialty & Niche Tools | Jamro Tools",
    description:
      "Can't find the calculator you need? Browse our specialty and miscellaneous collection. All tools are free, browser-based, and require no sign-up.",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const category = calculatorCategories.find((c) => c.slug === type);
  const meta = CATEGORY_META[type];

  if (!category || !meta) {
    return { title: "Calculator Not Found | Jamro Tools" };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/tools/calculators/${type}` },
  };
}

export default async function CalculatorTypePage({ params }: PageProps) {
  const { type } = await params;
  const category = calculatorCategories.find((c) => c.slug === type);

  if (!category) {
    notFound();
  }

  return <CalculatorTypeView category={category} />;
}
