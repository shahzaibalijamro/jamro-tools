import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { calculatorCategories } from "@/data/calculator-tools";
import { CalculatorTypeView } from "@/components/tools/calculators/calculator-type-view";

export const metadata: Metadata = {
    title: "Text Tools – Word Counter & More | Jamro Tools",
    description:
        "Free text tools including a live Word Counter. Paste text to instantly count words, characters, sentences, and more — no sign-up.",
    alternates: { canonical: '/tools/text-tools' },
};

export default async function TextToolsPage() {
    const category = calculatorCategories.find((c) => c.slug === "text-tools");
    if (!category) notFound();

    // CalculatorTypeView is client-side; passing the category enables
    // scalable listing/search the same way as /tools/calculators/... pages.
    return <CalculatorTypeView category={category} />;
}

