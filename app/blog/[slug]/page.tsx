import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts } from "@/data/blogPosts";
import { BlogPostView } from "@/components/blog/blog-post-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Jamro Tools Blog" };
  }

  return {
    title: post.seoTitle || `${post.title} | Jamro Tools Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // ── Related posts: next 3 posts excluding the current slug ──
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
