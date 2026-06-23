export type BlogCategory =
  | "Finance"
  | "Product Updates"
  | "Privacy"
  | "Efficiency"
  | "Tutorials";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  description: string;
  category?: string;      // Backwards compatibility fallback
  categories: string[];   // Multiple categories
  imageUrl: string;
  imageAlt: string;
  author?: string;
  date?: string;
  readTime?: string;
  content?: string;
  publishedAt?: string;
};

export const categoryBadgeClasses: Record<string, string> = {
  Finance: "bg-primary text-on-primary",
  "Product Updates": "bg-primary text-on-primary",
  Privacy: "bg-secondary text-on-secondary",
  Efficiency: "bg-tertiary-container text-on-tertiary-container",
  Tutorials: "bg-primary text-on-primary",
};
