import type { MetadataRoute } from "next";

import { calculatorCategories } from "@/data/calculator-tools";
import { allTools } from "@/data/tools";
import { blogPosts } from "@/data/blogPosts";
import { getCustomToolComponent } from "@/components/tools/calculators/registry";

const SITE_URL = "https://jamro-tools.vercel.app";

type Entry = MetadataRoute.Sitemap[number];

const NOW = new Date();

/** Slugifies a display name the same way the [type]/page.tsx does. */
function toToolSlug(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function url(path: string): string {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Top-level static pages ──
  const staticEntries: Entry[] = [
    {
      url: url("/"),
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: url("/tools"),
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/tools/calculators"),
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/about"),
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/blog"),
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: url("/contact"),
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: url("/privacy-policy"),
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: url("/terms"),
      lastModified: NOW,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Calculator category pages (9 of them) ──
  const categoryEntries: Entry[] = calculatorCategories.map((category) => ({
    url: url(`/tools/calculators/${category.slug}`),
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ── Individual calculator pages — only those that have a registered component.
  // This guarantees we never link to a 404. New tools show up automatically when
  // they're added to the registry + data/tools registry.
  const toolEntries: Entry[] = allTools
    .filter((tool) => tool.customComponent && getCustomToolComponent(tool.customComponent))
    .map((tool) => ({
      url: url(`/tools/calculators/${tool.category}/${tool.slug}`),
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // ── Blog posts ──
  const blogEntries: Entry[] = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries];
}
