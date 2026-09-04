export interface ToolMetadataConfig {
  title: string;
  description: string;
}

export interface ToolFaqItem {
  q: string;
  a: string;
}

export interface ToolLink {
  title: string;
  href: string;
  description?: string;
}

export interface ToolTextBlock {
  type: "text";
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ToolFormulaBlock {
  type: "formulas";
  heading: string;
  items: Array<{
    heading: string;
    formula: string;
    example: string[];
  }>;
}

export interface ToolStepsBlock {
  type: "steps";
  heading: string;
  groups: Array<{
    heading: string;
    steps: string[];
    example: string[];
  }>;
}

export interface ToolExamplesBlock {
  type: "examples";
  heading: string;
  items: Array<{
    heading: string;
    lines: string[];
  }>;
}

export type ToolEditorialBlock =
  | ToolTextBlock
  | ToolFormulaBlock
  | ToolStepsBlock
  | ToolExamplesBlock;

export interface ToolPageContent {
  blocks?: ToolEditorialBlock[];
  relatedTools?: ToolLink[];
  faq?: ToolFaqItem[];
}

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  customComponent?: string;
  sections?: ToolSection[];
  metadata?: ToolMetadataConfig;
  pageContent?: ToolPageContent;
  workspaceLayout?: "balanced" | "controls-narrow" | "wide";
}

export interface ToolSection {
  type:
    | "inputs"
    | "donut-chart"
    | "bar-chart"
    | "results-grid"
    | "info-banner"
    | "faq"
    | "amortization-table";
  [key: string]: unknown;
}
