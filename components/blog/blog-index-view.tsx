"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const POSTS_PER_PAGE = 9;

export function BlogIndexView() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  // Visible posts for current page (all 12 for now, pagination handles slicing)
  const visiblePosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for subscribing! (placeholder)");
  };

  // Generate page numbers for pagination
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="min-h-screen">
        {/* ── Hero ── */}
        <section className="hero-mesh py-12 relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-gutter text-center relative z-10">
            <div className="inline-flex items-center bg-primary-container/10 px-4 py-1 rounded-full mb-[24px] glass-card border-primary/20">
              <span
                className="material-symbols-outlined text-primary mr-xs"
                style={{ fontSize: "18px" }}
              >
                auto_awesome
              </span>
              <span className="text-primary text-label-md">
                LATEST INSIGHTS
              </span>
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface mb-[16px]">
              Jamro Tools Blog
            </h1>
            <p className="max-w-2xl mx-auto text-body-lg text-on-surface-variant">
              Expert guides on PDF manipulation, high-fidelity image
              processing, and digital efficiency workflows. Everything you
              need to master your digital toolbox.
            </p>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-container/20 blur-3xl rounded-full" />
        </section>

        {/* ── Blog Grid ── */}
        <section className="max-w-container-max mx-auto px-gutter py-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* ── Pagination ── */}
          <nav
            aria-label="Blog pagination"
            className="mt-[48px] flex justify-center items-center gap-[16px]"
          >
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, i) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="text-on-surface-variant px-[8px]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-label-md transition-colors ${
                    currentPage === page
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </section>

        {/* ── Newsletter ── */}
        <section className="max-w-container-max mx-auto px-gutter pb-[48px]">
          <div className="bg-inverse-surface rounded-2xl p-[48px] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-[48px]">
            <div>
              <h3 className="text-headline-md text-inverse-on-surface mb-[8px]">
                Stay ahead of the curve
              </h3>
              <p className="text-body-md text-surface-variant">
                Get the latest tools, tips, and security updates delivered to
                your inbox.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-[16px] w-full md:w-auto"
            >
              <input
                className="bg-white/10 border border-white/20 text-white rounded-full px-[24px] py-[16px] focus:ring-2 focus:ring-primary-fixed w-full sm:w-64 placeholder:text-surface-variant"
                placeholder="Enter your email"
                type="email"
                required
              />
              <button
                type="submit"
                className="bg-primary-fixed text-on-primary-fixed text-label-md px-[48px] py-[16px] rounded-full hover:bg-white transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter hasMarginBottom={false} />
    </div>
  );
}

/** Generates compact page number array with ellipsis */
function generatePageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  // Pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  // Always show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
