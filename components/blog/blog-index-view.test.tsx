import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BlogIndexView } from "./blog-index-view";

const content = vi.hoisted(() => ({ getBlogIndex: vi.fn() }));

vi.mock("@/lib/content/blog", () => ({ getBlogIndex: content.getBlogIndex }));
vi.mock("@/components/layout/site-header", () => ({ SiteHeader: () => <header /> }));
vi.mock("@/components/layout/site-footer", () => ({ SiteFooter: () => <footer /> }));
vi.mock("@/components/blog/BlogCard", () => ({
  BlogCard: ({ post }: { post: { title: string } }) => <article>{post.title}</article>,
}));

describe("blog index boundary states", () => {
  it("renders the existing empty state for an empty deterministic result", async () => {
    content.getBlogIndex.mockResolvedValueOnce({ posts: [], categories: [] });
    render(<BlogIndexView />);
    expect(await screen.findByText("No posts found")).toBeVisible();
  });

  it("renders the existing empty state when the content boundary fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    content.getBlogIndex.mockRejectedValueOnce(new Error("invented content failure"));
    render(<BlogIndexView />);
    expect(await screen.findByText("No posts found")).toBeVisible();
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: "invented content failure" }));
  });
});
