import type { Metadata } from "next";

import { BlogIndexView } from "@/components/blog/blog-index-view";

export const metadata: Metadata = {
  title: "Free Tool Guides, Tips & How-Tos | Jamro Tools Blog",
  description:
    "Step-by-step guides on calculators, converters & dev tools. Learn how to use free online tools to solve real problems — no jargon, always free to read.",
};

export default function BlogPage() {
  return <BlogIndexView />;
}
