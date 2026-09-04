import { client } from "@/lib/sanity";

export interface BlogTeaser {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  readTime?: string;
  publishedAt?: string;
}

const blogTeaserQuery = `*[
  _type == "blogPost" &&
  publishedAt <= now() &&
  defined(slug.current)
] | order(publishedAt desc, _createdAt desc) [0...30] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  readTime,
  publishedAt
}`;

export async function getRandomBlogTeasers(count = 3): Promise<BlogTeaser[]> {
  try {
    const posts = await client.fetch<BlogTeaser[]>(
      blogTeaserQuery,
      {},
      { next: { revalidate: 3600 } },
    );

    const uniquePosts = Array.from(
      new Map((posts ?? []).map((post) => [post.slug, post])).values(),
    );

    for (let index = uniquePosts.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [uniquePosts[index], uniquePosts[swapIndex]] = [
        uniquePosts[swapIndex],
        uniquePosts[index],
      ];
    }

    return uniquePosts.slice(0, Math.max(0, count));
  } catch {
    return [];
  }
}
