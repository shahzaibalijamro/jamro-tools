import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongoose";
import BlogPostModel from "@/models/BlogPost";
import { BlogPostView } from "@/components/blog/blog-post-view";
import type { BlogPost } from "@/lib/types/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const post = await BlogPostModel.findOne({ slug }).lean();

  console.log(post)

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
  await dbConnect();
  const postRaw = await BlogPostModel.findOne({ slug }).lean();
  const post = JSON.parse(JSON.stringify(postRaw)) as BlogPost;

  if (!post) {
    notFound();
  }

  const relatedPostsRaw = await BlogPostModel.find({ slug: { $ne: slug } })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  const relatedPosts = JSON.parse(JSON.stringify(relatedPostsRaw)) as BlogPost[];

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
