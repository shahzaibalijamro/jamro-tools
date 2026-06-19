import type { MetadataRoute } from "next";

import { calculatorCategories } from "@/data/calculator-tools";
import { allTools } from "@/data/tools";
import dbConnect from "@/lib/mongoose";
import BlogPostModel from "@/models/BlogPost";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: Entry[] = [
    {
      url: url("/"),
      lastModified: NOW,
      priority: 1.00,
    },
    {
      url: url("/tools"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/tools/calculators"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/about"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/blog"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/contact"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/privacy-policy"),
      lastModified: NOW,
      priority: 0.80,
    },
    {
      url: url("/terms"),
      lastModified: NOW,
      priority: 0.80,
    },
  ];

  const categoryEntries: Entry[] = calculatorCategories.map((category) => ({
    url: url(`/tools/calculators/${category.slug}`),
    lastModified: NOW,
    priority: 0.64,
  }));

  const toolEntries: Entry[] = allTools
    .filter((tool) => tool.customComponent && getCustomToolComponent(tool.customComponent))
    .map((tool) => ({
      url: url(`/tools/calculators/${tool.category}/${tool.slug}`),
      lastModified: NOW,
      priority: 0.51,
    }));

  await dbConnect();
  const blogPosts = await BlogPostModel.find({}).select("slug").lean();
  const blogEntries: Entry[] = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: NOW,
    priority: 0.64,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries];
}
