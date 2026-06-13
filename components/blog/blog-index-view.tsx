"use client";

import { useState, useRef, useEffect } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const POSTS_PER_PAGE = 9;

export function BlogIndexView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["All", "Tutorials", "Product Updates", "Privacy", "Efficiency"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "shortest", label: "Shortest Read" },
    { value: "longest", label: "Longest Read" },
  ];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setIsSortOpen(false);
    setCurrentPage(1);
  };

  // Filter logic
  let filteredPosts = blogPosts;
  if (selectedCategory !== "All") {
    filteredPosts = filteredPosts.filter((p) => p.category === selectedCategory);
  }

  // Sort logic
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest" || sortBy === "oldest") {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    }
    if (sortBy === "shortest" || sortBy === "longest") {
      const readA = a.readTime ? parseInt(a.readTime) : 0;
      const readB = b.readTime ? parseInt(b.readTime) : 0;
      return sortBy === "shortest" ? readA - readB : readB - readA;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;

  // Visible posts for current page
  const visiblePosts = filteredPosts.slice(
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
          {/* ── Filter & Sort Bar ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-[16px] mb-[32px] bg-surface-container rounded-2xl p-[8px] border border-outline-variant">
            {/* Categories */}
            <div className="flex overflow-x-auto w-full md:w-auto gap-[8px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-[16px] py-[8px] rounded-xl text-label-md transition-colors whitespace-nowrap ${selectedCategory === cat
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-auto" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-auto flex items-center justify-between bg-surface px-[16px] py-[10px] rounded-xl border border-outline-variant text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
              >
                <span className="flex items-center gap-[8px]">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    sort
                  </span>
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform ${isSortOpen ? "rotate-180" : ""
                    }`}
                >
                  expand_more
                </span>
              </button>

              {isSortOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-full md:w-[180px] bg-surface rounded-xl border border-outline-variant shadow-lg z-20 py-[8px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full text-left px-[16px] py-[8px] text-label-md transition-colors ${sortBy === option.value
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface hover:bg-surface-container-high"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
              {visiblePosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-[80px] px-[24px] bg-surface-container rounded-2xl border border-outline-variant text-center">
              <div className="w-[80px] h-[80px] mb-[24px] bg-surface rounded-full flex items-center justify-center shadow-sm border border-outline-variant/50">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
                  article
                </span>
              </div>
              <h3 className="text-headline-sm text-on-surface mb-[12px]">
                No posts found
              </h3>
              <p className="text-body-lg text-on-surface-variant max-w-md mb-[32px]">
                We couldn't find any blogs in the &quot;{selectedCategory}&quot; category right now. Check back later for updates!
              </p>
              <button
                onClick={() => handleCategoryChange("All")}
                className="px-[32px] py-[14px] bg-primary text-on-primary rounded-full text-label-lg transition-all hover:shadow-md hover:opacity-90"
              >
                View all posts
              </button>
            </div>
          )}

          {/* ── Pagination ── */}
          {visiblePosts.length > 0 && (
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
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-label-md transition-colors ${currentPage === page
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
          )}
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
