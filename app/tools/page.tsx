import type { Metadata } from "next";

import { ToolsIndexView } from "@/components/tools/tools-index-view";

export const metadata: Metadata = {
  title: "All Free Online Tools – Browse 1,000+ Utilities | Jamro Tools",
  description:
    "Browse 1,000+ free online tools across 10 categories — calculators, dev tools, converters, PDF utils & more. No sign-up, instant results, works on any device.",
};

export default function ToolsPage() {
  return <ToolsIndexView />;
}
