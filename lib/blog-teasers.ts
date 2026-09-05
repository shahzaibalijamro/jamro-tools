import { getBlogIndex } from "@/lib/content/blog";

export interface BlogTeaser {
  _id?: string;
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
    const fixtureMode = isFixtureTeaserMode();
    const posts = fixtureMode
      ? (await getBlogIndex()).posts.map((post) => ({ ...post, _id: `fixture-${post.slug}` }))
      : await fetchSanityTeasers();

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

function isFixtureTeaserMode() {
  return process.env.NEXT_PUBLIC_JAMRO_TEST_MODE === "fixtures" && process.env.VERCEL_ENV !== "production";
}

async function fetchSanityTeasers(): Promise<BlogTeaser[]> {
  const { client } = await import("@/lib/sanity");
  return client.fetch<BlogTeaser[]>(blogTeaserQuery, {}, { next: { revalidate: 3600 } });
}
