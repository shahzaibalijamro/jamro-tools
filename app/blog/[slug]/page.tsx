"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogPosts";

// ────────────────────────────────────────────────────────────
// Placeholder body content — replace with post.content when the
// data field is added to blogPosts.
// ────────────────────────────────────────────────────────────
// TODO: Replace all PLACEHOLDER_BODY references with post.content
const PLACEHOLDER_BODY = {
  intro:
    "In the modern digital workplace, PDF documents are the bedrock of information exchange. Whether you're managing complex legal contracts or simple invoices, knowing how to manipulate these files efficiently can save you hours of manual work. This guide explores the advanced techniques of merging, splitting, and optimizing your PDF assets.",
  architecture:
    "Before diving into the tools, it is crucial to understand that a PDF isn't just a flat image. It's a complex container of objects—fonts, vector graphics, and metadata. When you use tools like Jamro's PDF Suite, you aren't just cutting and pasting; you are re-indexing these objects for maximum efficiency.",
  automation:
    "The next frontier of document management is automation. By leveraging API-first tools, teams can now trigger PDF transformations directly from their CRM or cloud storage systems. This eliminates the \"download-edit-upload\" cycle that plagues most administrative tasks.",
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  // ── Related posts: next 3 posts excluding the current slug ──
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="pt-9  pb-[48px]">
        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
           ══════════════════════════════════════════════════════════ */}
        <header className="max-w-[1280px] mx-auto px-[24px] mb-[48px]">
          <div className="flex flex-col items-center text-center mb-[24px]">
            {/* Category badge */}
            <span className="inline-flex items-center gap-[4px] px-[12px] py-[4px] rounded-full bg-primary-fixed text-on-primary-fixed text-label-md mb-[16px]">
              <span className="material-symbols-outlined text-[18px]">
                auto_awesome
              </span>
              {post.category ? post.category.toUpperCase() : "GUIDE"}
            </span>

            {/* Title */}
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface max-w-4xl mb-[16px]">
              {post.title}
            </h1>

            {/* Author / Date / Read time (hardcoded placeholders) */}
            <div className="flex items-center gap-[16px] text-on-surface-variant text-label-md">
              <div className="flex items-center gap-[4px]">
                <div className="w-[32px] h-[32px] rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[14px]">
                    person
                  </span>
                </div>
                {/* TODO: Replace with post.author when available */}
                <span>Shahzaib Ali Jamro</span>
              </div>
              <span className="w-[4px] h-[4px] rounded-full bg-outline-variant" />
              {/* TODO: Replace with post.date when available */}
              <span>Oct 24, 2026</span>
              <span className="w-[4px] h-[4px] rounded-full bg-outline-variant" />
              {/* TODO: Replace with post.readTime when available */}
              <span>8 min read</span>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-xl border border-outline-variant">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1024px, 1280px"
              priority
            />
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            THREE-COLUMN LAYOUT: Skyscraper · Content · Skyscraper
           ══════════════════════════════════════════════════════════ */}
        <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col xl:flex-row gap-[24px] justify-center items-start">
          {/* ── Left Skyscraper Ad (hidden below xl) ── */}
          <aside className="hidden xl:flex w-[160px] h-[600px] sticky top-[100px] bg-surface-container flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
              Advertisement
            </span>
            <div className="text-on-surface-variant text-label-md text-center px-[16px]">
              Skyscraper Ad - 160x600
            </div>
          </aside>

          {/* ── Central Content Column ── */}
          <div className="flex-1 w-full max-w-3xl">
            {/* Leaderboard Ad */}
            <div className="mb-[48px] flex justify-center">
              <div className="w-full max-w-[728px] h-[90px] bg-surface-container flex flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
                  Advertisement
                </span>
                <div className="text-on-surface-variant text-label-md">
                  Leaderboard Ad - 728x90
                </div>
              </div>
            </div>

            {/* ── Article Body ── */}
            <article className="text-body-lg text-on-surface-variant leading-relaxed">
              {/* First paragraph with drop-cap */}
              <p className="mb-[24px] first-letter:text-[48px] first-letter:font-bold first-letter:text-primary first-letter:mr-[12px] first-letter:float-left">
                {PLACEHOLDER_BODY.intro}
              </p>

              <h2 className="text-headline-md text-on-surface mt-[48px] mb-[16px]">
                The Architecture of a Modern PDF
              </h2>
              <p className="mb-[24px]">{PLACEHOLDER_BODY.architecture}</p>

              {/* Pro Tip callout */}
              <div className="bg-surface-container-low p-[24px] rounded-xl border-l-4 border-primary mb-[24px]">
                <h3 className="text-title-lg text-on-surface mb-[8px]">
                  Pro Tip: Optical Character Recognition
                </h3>
                <p className="text-body-md">
                  Always ensure your scanned documents undergo OCR before
                  manipulation. This transforms static pixels into searchable,
                  editable data layers, significantly improving the utility of
                  your merged files.
                </p>
              </div>

              <h2 className="text-headline-md text-on-surface mt-[48px] mb-[16px]">
                Key Techniques for Daily Workflows
              </h2>
              <ul className="space-y-[16px] mb-[24px]">
                <li className="flex gap-[16px]">
                  <span className="material-symbols-outlined text-primary shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Lossless Merging:</strong> Combine multiple report
                    sections without losing internal hyperlinks or bookmark
                    structures.
                  </span>
                </li>
                <li className="flex gap-[16px]">
                  <span className="material-symbols-outlined text-primary shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Intelligent Compression:</strong> Reduce file size
                    by up to 80% while maintaining crisp typography for digital
                    viewing.
                  </span>
                </li>
                <li className="flex gap-[16px]">
                  <span className="material-symbols-outlined text-primary shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Security Layers:</strong> Apply AES-256 encryption
                    during the export phase to protect sensitive corporate data.
                  </span>
                </li>
              </ul>

              <h3 className="text-title-lg text-on-surface mt-[24px] mb-[8px]">
                Streamlining with Automation
              </h3>
              <p className="mb-[24px]">{PLACEHOLDER_BODY.automation}</p>
            </article>

            {/* Large Rectangle Ad */}
            <div className="my-[48px] flex justify-center">
              <div className="w-full max-w-[336px] h-[280px] bg-surface-container flex flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
                  Advertisement
                </span>
                <div className="text-on-surface-variant text-label-md">
                  Large Rectangle Ad - 336x280
                </div>
              </div>
            </div>

            {/* ── FAQ Section ── */}
            <section className="mt-[48px]">
              <h2 className="text-headline-md text-on-surface mb-[24px] text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-[16px]">
                <details
                  className="group glass-card rounded-xl p-[16px] cursor-pointer transition-all "
                  open
                >
                  <summary className="flex items-center justify-between text-title-lg text-on-surface list-none">
                    Is it safe to upload PDFs to Jamro Tools?
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="pt-[16px] text-on-surface-variant text-body-md">
                    Absolutely. We use enterprise-grade end-to-end encryption.
                    Your files are processed in a secure environment and are
                    automatically deleted from our servers 60 minutes after
                    processing.
                  </div>
                </details>

                <details className="group glass-card rounded-xl p-[16px] cursor-pointer transition-all ">
                  <summary className="flex items-center justify-between text-title-lg text-on-surface list-none">
                    What are the file size limits for free users?
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="pt-[16px] text-on-surface-variant text-body-md">
                    Free users can upload files up to 50MB per document. For
                    larger enterprise files, our Pro and Team plans support up
                    to 2GB per upload.
                  </div>
                </details>

                <details className="group glass-card rounded-xl p-[16px] cursor-pointer transition-all ">
                  <summary className="flex items-center justify-between text-title-lg text-on-surface list-none">
                    Will merging files preserve my bookmarks?
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="pt-[16px] text-on-surface-variant text-body-md">
                    Yes, our tool is designed to intelligently merge Table of
                    Contents and internal bookmark structures so your final
                    document remains fully navigable.
                  </div>
                </details>
              </div>
            </section>
          </div>

          {/* ── Right Skyscraper Ad (hidden below xl) ── */}
          <aside className="hidden xl:flex w-[160px] h-[600px] sticky top-[100px] bg-surface-container flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
              Advertisement
            </span>
            <div className="text-on-surface-variant text-label-md text-center px-[16px]">
              Skyscraper Ad - 160x600
            </div>
          </aside>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RELATED ARTICLES
           ══════════════════════════════════════════════════════════ */}
        <section className="max-w-[1280px] mx-auto px-[24px] mt-[48px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h2 className="text-headline-md text-on-surface">
              Related Articles
            </h2>
            <Link
              href="/blog"
              className="text-primary text-label-md hover:underline flex items-center gap-[4px]"
            >
              View all posts{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter hasMarginBottom={false} />
    </div>
  );
}