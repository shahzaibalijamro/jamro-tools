import { beforeEach, describe, expect, it, vi } from "vitest";
import { getJamroTestMode } from "@/lib/test-mode";
import { getBlogIndex, getBlogPost, getPublishedBlogSlugs, getRelatedBlogPosts } from "./blog";
import { createContactQuery } from "@/lib/contact/create-contact-query";
import { FIXTURE_NOW } from "@/test/fixtures/content";

const sanity = vi.hoisted(() => ({ fetch: vi.fn(), create: vi.fn() }));
vi.mock("@/lib/sanity", () => ({ client: { fetch: sanity.fetch }, writeClient: { create: sanity.create } }));

describe("fixture-mode guard", () => {
  it.each([
    [{ NEXT_PUBLIC_JAMRO_TEST_MODE: "fixtures" }, "fixtures"],
    [{ NEXT_PUBLIC_JAMRO_TEST_MODE: "fixture" }, null],
    [{ NEXT_PUBLIC_JAMRO_TEST_MODE: "fixtures", NODE_ENV: "production" }, null],
    [{ NEXT_PUBLIC_JAMRO_TEST_MODE: "fixtures", VERCEL_ENV: "production" }, null],
    [{ NEXT_PUBLIC_JAMRO_TEST_MODE: "fixtures", VERCEL_ENV: "preview" }, "fixtures"],
  ] as const)("selects only an exact non-production fixture value", (env, expected) => expect(getJamroTestMode(env)).toBe(expected));
});

describe("content and write boundaries", () => {
  beforeEach(() => {
    sanity.fetch.mockReset();
    sanity.create.mockReset();
    vi.stubEnv("VERCEL_ENV", "development");
  });

  it("returns stable invented content without a Sanity read", async () => {
    vi.stubEnv("NEXT_PUBLIC_JAMRO_TEST_MODE", "fixtures");
    const first = await getBlogIndex();
    const second = await getBlogIndex();
    expect(first).toEqual(second);
    expect(first.categories).toEqual(["Calculators", "Guides"]);
    expect(first.posts[0]).toMatchObject({ slug: "fixture-mortgage-guide", author: "Jamro Test Author", publishedAt: FIXTURE_NOW });
    expect(await getBlogPost("fixture-mortgage-guide")).toMatchObject({ title: "A Fictional Guide to Mortgage Estimates" });
    expect(await getRelatedBlogPosts("fixture-mortgage-guide")).toHaveLength(1);
    expect(await getPublishedBlogSlugs()).toEqual(["fixture-mortgage-guide", "fixture-percentage-guide"]);
    expect(sanity.fetch).not.toHaveBeenCalled();
  });

  it("returns deterministic contact success without constructing/calling the writer path", async () => {
    vi.stubEnv("NEXT_PUBLIC_JAMRO_TEST_MODE", "fixtures");
    const input = { name: "Avery Example", email: "avery@example.test", subject: "Fixture question", message: "This message is invented." };
    expect(await createContactQuery(input)).toEqual({ _id: "fixture-contact-0001", _type: "contactQuery", createdAt: FIXTURE_NOW });
    expect(await createContactQuery(input)).toEqual({ _id: "fixture-contact-0001", _type: "contactQuery", createdAt: FIXTURE_NOW });
    expect(sanity.create).not.toHaveBeenCalled();
  });

  it("keeps normal and production-guarded paths on Sanity", async () => {
    sanity.fetch.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    vi.stubEnv("NEXT_PUBLIC_JAMRO_TEST_MODE", "fixtures");
    vi.stubEnv("VERCEL_ENV", "production");
    expect(await getBlogIndex()).toEqual({ posts: [], categories: [] });
    expect(sanity.fetch).toHaveBeenCalledTimes(2);

    sanity.create.mockResolvedValue({ _id: "sanity-result" });
    await createContactQuery({ name: "A", email: "a@example.test", subject: "S", message: "M" });
    expect(sanity.create).toHaveBeenCalledTimes(1);
  });
});
