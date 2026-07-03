import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { client } from "@/lib/sanity";
import { BlogPostView } from "@/components/blog/blog-post-view";
import type { BlogPost } from "@/lib/types/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
    title,
    seoTitle,
    description,
    "imageUrl": mainImage.asset->url
  }`;
  
  const post = await client.fetch(query, { slug });

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
  
  const query = `*[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seoTitle,
    description,
    "categories": categories[]->title,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    author,
    date,
    readTime,
    content,
    publishedAt,
    "createdAt": _createdAt,
    updatedAt
  }`;

  const post = await client.fetch(query, { slug }) as BlogPost;

  if (!post) {
    notFound();
  }

  const relatedQuery = `*[_type == "blogPost" && slug.current != $slug && publishedAt <= now()] | order(publishedAt desc, _createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seoTitle,
    description,
    "categories": categories[]->title,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    author,
    date,
    readTime,
    content,
    publishedAt,
    "createdAt": _createdAt,
    updatedAt
  }`;

  const relatedPosts = await client.fetch(relatedQuery, { slug }) as BlogPost[];

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
