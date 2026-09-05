import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getRelatedBlogPosts } from "@/lib/content/blog";
import { BlogPostView } from "@/components/blog/blog-post-view";
import type { BlogPost } from "@/lib/types/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found | Jamro Tools Blog" };
  }

  const title = post.seoTitle || `${post.title} | Jamro Tools Blog`;
  const url = `https://jamrotools.com/blog/${slug}`;

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts: BlogPost[] = await getRelatedBlogPosts(slug);

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
