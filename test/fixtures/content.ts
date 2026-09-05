import type { BlogPost } from "@/lib/types/blog";

export const FIXTURE_NOW = "2026-09-05T12:00:00.000Z";

export const fixtureCategories = ["Calculators", "Guides"] as const;

export const fixtureBlogPosts: readonly BlogPost[] = [
  {
    slug: "fixture-mortgage-guide",
    title: "A Fictional Guide to Mortgage Estimates",
    excerpt: "A stable invented article used to verify the blog journey.",
    seoTitle: "Fixture Mortgage Guide | Jamro Tools Blog",
    description: "Deterministic fixture content for automated browser tests.",
    categories: ["Calculators", "Guides"],
    imageUrl: "/mortgage-blog-img.webp",
    imageAlt: "Illustrated home and calculator",
    author: "Jamro Test Author",
    date: "September 5, 2026",
    readTime: "4",
    content: "## A deterministic guide\n\nThis invented post verifies the fixture-backed blog without contacting a remote service.",
    publishedAt: FIXTURE_NOW,
  },
  {
    slug: "fixture-percentage-guide",
    title: "Understanding Percentages with Fictional Examples",
    excerpt: "Stable percentage examples for the deterministic test catalog.",
    description: "A second invented fixture article.",
    categories: ["Guides"],
    imageUrl: "/VrQXCT.webp",
    imageAlt: "Abstract calculator illustration",
    author: "Jamro Test Author",
    date: "September 4, 2026",
    readTime: "3",
    content: "## Percentage examples\n\nAll names and examples in this fixture are fictional.",
    publishedAt: "2026-09-04T12:00:00.000Z",
  },
] as const;

export const fixtureContactResult = Object.freeze({
  _id: "fixture-contact-0001",
  _type: "contactQuery",
  createdAt: FIXTURE_NOW,
});
