"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { type BlogPost } from "@/lib/types/blog";
import { Mail } from "lucide-react";

interface BlogPostViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostView({ post, relatedPosts }: BlogPostViewProps) {
  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="pt-9  pb-[48px]">
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HERO SECTION
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <header className="max-w-[1280px] mx-auto px-[24px] mb-[48px]">
          <div className="flex flex-col items-center text-center mb-[24px]">
            {/* Category badges */}
            <div className="flex flex-wrap gap-2 justify-center mb-[16px]">
              {post.categories && post.categories.length > 0 ? (
                post.categories.map((cat) => (
                  <span key={cat} className="inline-flex items-center gap-[4px] px-[12px] py-[4px] rounded-full bg-primary-fixed text-on-primary-fixed text-label-md">
                    <span className="material-symbols-outlined text-[18px]">
                      auto_awesome
                    </span>
                    {cat.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center gap-[4px] px-[12px] py-[4px] rounded-full bg-primary-fixed text-on-primary-fixed text-label-md">
                  <span className="material-symbols-outlined text-[18px]">
                    auto_awesome
                  </span>
                  GUIDE
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface max-w-4xl mb-[16px]">
              {post.title}
            </h1>

            {/* Author / Date / Read time */}
            <div className="flex items-center gap-[16px] text-on-surface-variant text-label-md">
              <div className="flex items-center gap-[4px]">
                <div className="w-[32px] h-[32px] rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[14px]">
                    person
                  </span>
                </div>
                <span>{post.author ?? "Jamro Tools"}</span>
              </div>
              {post.date && (
                <>
                  <span className="w-[4px] h-[4px] rounded-full bg-outline-variant" />
                  <span>{post.date}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span className="w-[4px] h-[4px] rounded-full bg-outline-variant" />
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
          </div>

          {/* Featured image */}
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-xl border border-outline-variant">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              className={`object-cover ${post.imageUrl === "/first-time-home-buyer-mortgage-calculator-guide.jpg" && "object-top"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1024px, 1280px"
              priority
              loading="eager"
            />
          </div>
        </header>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            THREE-COLUMN LAYOUT: Skyscraper Â· Content Â· Skyscraper
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col min-[1180px]:flex-row gap-[24px] justify-center items-start">
          {/* â”€â”€ Left Skyscraper Ad (hidden below xl) â”€â”€ */}
          <aside className="hidden min-[1180px]:flex w-[160px] h-[600px] sticky top-[100px] bg-surface-container flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
              Advertisement
            </span>
            <div className="text-on-surface-variant text-label-md text-center px-[16px]">
              Skyscraper Ad - 160x600
            </div>
          </aside>

          {/* â”€â”€ Central Content Column â”€â”€ */}
          <div className="flex-1 w-full mx-auto max-w-3xl">
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

            {/* â”€â”€ Article Body â”€â”€ */}
            <article className="text-body-lg text-on-surface-variant leading-relaxed">
              {post.content ? (
                <Markdown content={post.content} />
              ) : (
                <p className="mb-[24px]">
                  Full content for this post is coming soon.
                </p>
              )}
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

            {/* â”€â”€ FAQ Section (auto-extracted from "## Frequently Asked Questions") â”€â”€ */}
            <FAQFromContent content={post.content} />
          </div>

          {/* â”€â”€ Right Skyscraper Ad (hidden below xl) â”€â”€ */}
          <aside className="hidden min-[1180px]:flex w-[160px] h-[600px] sticky top-[100px] bg-surface-container flex-col items-center justify-center border border-outline-variant rounded-lg overflow-hidden shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-outline mb-[4px] text-label-sm">
              Advertisement
            </span>
            <div className="text-on-surface-variant text-label-md text-center px-[16px]">
              Skyscraper Ad - 160x600
            </div>
          </aside>
        </div>

        {/* 
            AUTHOR CARD
        */}
        <section className="max-w-[1280px] mx-auto px-[24px] mt-[48px]">
          <div className="glass-card rounded-2xl border border-outline-variant p-[32px] md:p-[40px] flex flex-col md:flex-row items-center md:items-start gap-[24px] md:gap-[32px]">
            {/* Avatar */}
            <div className="w-[96px] h-[96px] md:w-[112px] md:h-[112px] shrink-0 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container border-2 border-outline-variant">
              <img src="https://secure.gravatar.com/avatar/01a107cf38b86d6375dfc125b405d97f9545d8495fdd8b636b29082f99d0fbab?s=192&d=mm&r=g" alt="Profile Pic of Shahzaib Ali" className="w-full h-full object-cover rounded-full" />
            </div>

            {/* Text content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-title-lg text-on-surface mb-[8px]">
                Written by Umer Ali
              </h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Umer Ali is an SEO expert and founder of Jamro Tools, helping websites improve visibility, rankings, and organic growth through modern search optimization and AI-driven strategies.
              </p>

              {/* Social links */}
              <div className="mt-[16px] flex items-center justify-center md:justify-start gap-[12px]">
                <a
                  href="mailto:umeralijamro@gmail.com"
                  className="group w-[40px] h-[40px] rounded-full bg-surface-container-highest flex items-center justify-center transition-colors border border-outline-variant hover:border-[#EA4335] hover:bg-[#EA4335]/10"
                  aria-label="Email Shahzaib Ali"
                >
                  <Mail className="w-[20px] h-[20px] text-[#EA4335]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/umeralijamro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-[40px] h-[40px] rounded-full bg-surface-container-highest flex items-center justify-center transition-colors border border-outline-variant hover:border-[#0A66C2] hover:bg-[#0A66C2]/10"
                  aria-label="Shahzaib Ali on LinkedIn"
                >
                  <svg className="w-[20px] h-[20px] text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/theprofessionalmarketer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-[40px] h-[40px] rounded-full bg-surface-container-highest flex items-center justify-center transition-colors border border-outline-variant hover:border-[#E1306C] hover:bg-[#E1306C]/10"
                  aria-label="Shahzaib Ali on Instagram"
                >
                  <svg className="w-[20px] h-[20px]" fill="url(#ig-gradient)" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#feda75" />
                        <stop offset="30%" stopColor="#fa7e1e" />
                        <stop offset="50%" stopColor="#d62976" />
                        <stop offset="75%" stopColor="#962fbf" />
                        <stop offset="100%" stopColor="#4f5bd5" />
                      </linearGradient>
                    </defs>
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.351.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.667 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.717 2.126-1.384.667-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.179-.464-.358-1.097-.414-2.227-.057-1.274-.07-1.649-.07-4.859s.015-3.585.07-4.85c.057-1.171.249-1.814.414-2.235.222-.56.477-.96.896-1.381.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            RELATED ARTICLES
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Markdown renderer (block-level + inline)
// Supports: H2/H3/H4, paragraphs, blockquotes, code blocks,
// ordered/unordered lists, tables, horizontal rules,
// inline **bold**, *italic*, `code`, [text](url).
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Block =
  | { kind: "h"; level: 2 | 3 | 4; text: string }
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "code"; lang: string; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "hr" };

const HEADING_CLASS: Record<2 | 3 | 4, string> = {
  2: "text-headline-md text-on-surface mt-[48px] mb-[16px]",
  3: "text-title-lg text-on-surface mt-[24px] mb-[8px]",
  4: "text-title-md text-on-surface mt-[24px] mb-[8px]",
};

function parseBlocks(md: string): Block[] {
  // Drop HTML comments (e.g. <!-- FEATURED IMAGE: ... -->) and strip
  // {#anchor} IDs from heading text. Both come up in the mortgage
  // posts and would otherwise leak into the rendered page.
  //
  // Some blog content is stored with escaped markdown backticks wrapped
  // in extra backslashes (e.g. "\\`...\\"). Normalize those backtick wrappers
  // back to standard inline code markers before parsing.
  const cleaned = md
    // \`...\`  -> `...`
    .replace(/\\`([^]*)\\`/g, "`$1`")
    // \` (leading) or \` (trailing) leftovers -> `
    .replace(/\\`/g, "`")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^(#{2,4}\s+.+?)\s*\{#[^}]+\}\s*$/gm, "$1");

  const lines = cleaned.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  // Track which lines belong to the FAQ section so we can drop them
  // from the body â€” that section is rendered separately by
  // FAQFromContent. The FAQ is the last H2/H3/H4 section whose title
  // matches "Frequently Asked Questions" before the next same-or-higher
  // heading or end of file.
  const faqLineRange = findFAQLineRange(lines);

  const isTableRow = (s: string) => s.trim().startsWith("|") && s.trim().endsWith("|");
  const splitRow = (s: string) =>
    s
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/, "");

    // Skip lines that fall inside the FAQ section (rendered separately)
    if (faqLineRange && i >= faqLineRange[0] && i < faqLineRange[1]) {
      i++;
      continue;
    }

    // Skip blank lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }

    // Fenced code block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      // skip closing fence if present
      if (i < lines.length) i++;
      blocks.push({ kind: "code", lang, text: buf.join("\n") });
      continue;
    }

    // Heading
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length as 2 | 3 | 4;
      const headingText = h[2].trim();
      // Skip the auto-generated "Table of Contents" block at the top of
      // the post â€” it duplicates navigation that's already in the page.
      if (/^table of contents$/i.test(headingText)) {
        i++;
        while (
          i < lines.length &&
          !/^#{2,4}\s+/.test(lines[i])
        ) {
          i++;
        }
        continue;
      }
      blocks.push({ kind: "h", level, text: headingText });
      i++;
      continue;
    }

    // Table
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[i + 1])) {
      const header = splitRow(line);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ kind: "table", header, rows });
      continue;
    }

    // Blockquote (allow leading "> " on a single line, or accumulate multi-line)
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ kind: "quote", text: buf.join(" ") });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // Paragraph (gather contiguous non-empty, non-special lines)
    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,4})\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !isTableRow(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", text: buf.join(" ") });
  }

  return blocks;
}

/** Render inline markdown: **bold**, *italic*, `code`, [text](url). */
function RichText({ text }: { text: string }) {
  // Tokenize: split on inline patterns while preserving delimiters.
  // Patterns (in order): `code`, **bold**, *italic*, [text](url)
  const tokens: Array<{ kind: "text" | "code" | "bold" | "italic" | "link"; value: string; href?: string }> = [];

  let rest = text;
  // Loop until no more matches
  while (rest.length > 0) {
    const patterns: Array<{ re: RegExp; kind: "code" | "bold" | "italic" | "link" }> = [
      { re: /^`([^`]+)`/, kind: "code" },
      { re: /^\*\*([^*]+)\*\*/, kind: "bold" },
      { re: /^\*([^*]+)\*/, kind: "italic" },
      { re: /^\[([^\]]+)\]\(([^)]+)\)/, kind: "link" },
    ];

    let matched = false;
    for (const { re, kind } of patterns) {
      const m = rest.match(re);
      if (m) {
        if (kind === "link") {
          tokens.push({ kind: "link", value: m[1], href: m[2] });
        } else {
          tokens.push({ kind, value: m[1] });
        }
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Take a chunk up to the next special char
    const next = rest.search(/[`*[]/);
    const chunk = next === -1 ? rest : rest.slice(0, next === 0 ? 1 : next);
    if (chunk) {
      tokens.push({ kind: "text", value: chunk });
      rest = rest.slice(chunk.length);
    }
  }

  return (
    <>
      {tokens.map((t, idx) => {
        switch (t.kind) {
          case "code":
            return (
              <code
                key={idx}
                className="bg-surface-container px-[6px] py-[2px] rounded text-body-md font-mono text-on-surface"
              >
                {t.value}
              </code>
            );
          case "bold":
            return (
              <strong key={idx} className="text-on-surface font-semibold">
                <RichText text={t.value} />
              </strong>
            );
          case "italic":
            return (
              <em key={idx} className="italic">
                <RichText text={t.value} />
              </em>
            );
          case "link":
            return (
              <Link
                key={idx}
                href={t.href ?? "#"}
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                <RichText text={t.value} />
              </Link>
            );
          default:
            return <Fragment key={idx}>{t.value}</Fragment>;
        }
      })}
    </>
  );
}

function Markdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h":
            return b.level === 2 ? (
              <h2 key={i} className={HEADING_CLASS[2]}>
                <RichText text={b.text} />
              </h2>
            ) : b.level === 3 ? (
              <h3 key={i} className={HEADING_CLASS[3]}>
                <RichText text={b.text} />
              </h3>
            ) : (
              <h4 key={i} className={HEADING_CLASS[4]}>
                <RichText text={b.text} />
              </h4>
            );
          case "p":
            return (
              <p key={i} className="mb-[24px]">
                <RichText text={b.text} />
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary bg-surface-container-low p-[16px] mb-[24px] italic text-on-surface-variant"
              >
                <RichText text={b.text} />
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                className="bg-surface-container border border-outline-variant rounded-lg p-[16px] mb-[24px] overflow-x-auto text-body-md font-mono text-on-surface"
              >
                <code>{b.text}</code>
              </pre>
            );
          case "ul":
            return (
              <ul key={i} className="list-none space-y-[12px] mb-[24px] pl-0">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-[12px]">
                    <span className="material-symbols-outlined text-primary shrink-0">
                      check_circle
                    </span>
                    <span>
                      <RichText text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-[24px] space-y-[12px] mb-[24px]">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichText text={it} />
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={i}
                className="mb-[24px] overflow-x-auto rounded-lg border border-outline-variant"
              >
                <table className="w-full text-body-md">
                  <thead className="bg-surface-container">
                    <tr>
                      {b.header.map((h, k) => (
                        <th
                          key={k}
                          className="text-left px-[12px] py-[10px] font-semibold text-on-surface"
                        >
                          <RichText text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr
                        key={r}
                        className="border-t border-outline-variant"
                      >
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="px-[12px] py-[10px] align-top text-on-surface-variant"
                          >
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "hr":
            return (
              <hr
                key={i}
                className="my-[32px] border-t border-outline-variant"
              />
            );
        }
      })}
    </>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Extract a "Frequently Asked Questions" section from the
// markdown and render it as a collapsible list. The post's
// FAQ lives in the body already, so this hides that section
// and surfaces it in the design's FAQ block.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FAQFromContent({ content }: { content?: string }) {
  if (!content) return null;

  const faqSection = extractFAQSection(content);
  if (!faqSection || faqSection.qa.length === 0) return null;

  return (
    <section className="mt-[48px]">
      <h2 className="text-headline-md text-on-surface mb-[24px] text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-[16px]">
        {faqSection.qa.map((item, i) => (
          <details
            key={i}
            className="group glass-card rounded-xl p-[16px] cursor-pointer transition-all"
            open={i === 0}
          >
            <summary className="flex items-center justify-between text-title-lg text-on-surface list-none">
              {item.q}
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <div className="pt-[16px] text-on-surface-variant text-body-md">
              <RichText text={item.a} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/**
 * Find the line range that bounds a "Frequently Asked Questions" section
 * in the markdown body. Returns [start, end) or null if none found. The
 * start is the FAQ heading line; the end is the next same-or-higher
 * heading or end of file. Used to drop the FAQ from the body so it can
 * be rendered separately by FAQFromContent.
 */
function findFAQLineRange(
  lines: string[]
): [number, number] | null {
  let startIdx = -1;
  let headingLevel = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s+(.*)/);
    if (m && /frequently asked questions/i.test(m[2])) {
      startIdx = i;
      headingLevel = m[1].length;
      break;
    }
  }
  if (startIdx === -1) return null;

  const endPattern = new RegExp(`^#{1,${headingLevel}}\\s+`);
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (endPattern.test(lines[i])) {
      endIdx = i;
      break;
    }
  }
  return [startIdx, endIdx];
}

function extractFAQSection(md: string): { qa: Array<{ q: string; a: string }> } | null {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let startIdx = -1;
  let headingLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s+(.*)/);
    if (m && /frequently asked questions/i.test(m[2])) {
      startIdx = i;
      headingLevel = m[1].length;
      break;
    }
  }
  if (startIdx === -1) return null;

  // Find the next same-or-higher heading after startIdx to bound the section
  let endIdx = lines.length;
  const endPattern = new RegExp(`^#{1,${headingLevel}}\\s+`);
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (endPattern.test(lines[i])) {
      endIdx = i;
      break;
    }
  }

  const body = lines.slice(startIdx + 1, endIdx).join("\n");
  const qa: Array<{ q: string; a: string }> = [];

  // Match ### question headings followed by answer paragraphs
  const re = /(?:^|\n)#{3,4}\s+(.+?)\n([\s\S]*?)(?=\n#{3,4}\s+|$)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    const q = match[1].trim();
    const a = match[2].replace(/---+\s*$/m, "").trim();
    if (q && a) qa.push({ q, a });
  }

  if (qa.length === 0) return null;
  return { qa };
}
