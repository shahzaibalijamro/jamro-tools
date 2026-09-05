import type { BlogPost } from "@/lib/types/blog";
import { isFixtureMode } from "@/lib/test-mode";

export interface BlogIndexData {
  posts: BlogPost[];
  categories: string[];
}

const postProjection = `{
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

async function fixtures() {
  return import("@/test/fixtures/content");
}

export async function getBlogIndex(): Promise<BlogIndexData> {
  if (isFixtureMode()) {
    const { fixtureBlogPosts, fixtureCategories } = await fixtures();
    return {
      posts: fixtureBlogPosts.map((post) => ({ ...post, categories: [...post.categories] })),
      categories: [...fixtureCategories],
    };
  }

  const { client } = await import("@/lib/sanity");
  const [posts, categories] = await Promise.all([
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc, _createdAt desc) ${postProjection}`,
    ),
    client.fetch<Array<{ title: string }>>(
      `*[_type == "category"] | order(title asc) { title }`,
    ),
  ]);

  return {
    posts: posts ?? [],
    categories: (categories ?? []).map(({ title }) => title),
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (isFixtureMode()) {
    const { fixtureBlogPosts } = await fixtures();
    const post = fixtureBlogPosts.find((candidate) => candidate.slug === slug);
    return post ? { ...post, categories: [...post.categories] } : null;
  }

  const { client } = await import("@/lib/sanity");
  return client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] ${postProjection}`,
    { slug },
  );
}

export async function getRelatedBlogPosts(slug: string, count = 3): Promise<BlogPost[]> {
  if (isFixtureMode()) {
    const { fixtureBlogPosts } = await fixtures();
    return fixtureBlogPosts
      .filter((post) => post.slug !== slug)
      .slice(0, Math.max(0, count))
      .map((post) => ({ ...post, categories: [...post.categories] }));
  }

  const { client } = await import("@/lib/sanity");
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && slug.current != $slug && publishedAt <= now()] | order(publishedAt desc, _createdAt desc)[0...$count] ${postProjection}`,
    { slug, count },
  );
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  if (isFixtureMode()) {
    const { fixtureBlogPosts } = await fixtures();
    return fixtureBlogPosts.map(({ slug }) => slug);
  }

  const { client } = await import("@/lib/sanity");
  const posts = await client.fetch<Array<{ slug: string }>>(
    `*[_type == "blogPost" && publishedAt <= now()] { "slug": slug.current }`,
  );
  return posts.map(({ slug }) => slug);
}
