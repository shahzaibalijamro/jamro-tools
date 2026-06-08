"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { type BlogPost } from "@/data/blogPosts";

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
                  <span>{post.readTime}</span>
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

            {/* ── FAQ Section (auto-extracted from "## Frequently Asked Questions") ── */}
            <FAQFromContent content={post.content} />
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

// ────────────────────────────────────────────────────────────
// Markdown renderer (block-level + inline)
// Supports: H2/H3/H4, paragraphs, blockquotes, code blocks,
// ordered/unordered lists, tables, horizontal rules,
// inline **bold**, *italic*, `code`, [text](url).
// ────────────────────────────────────────────────────────────

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
  const cleaned = md
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^(#{2,4}\s+.+?)\s*\{#[^}]+\}\s*$/gm, "$1");

  const lines = cleaned.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  // Track which lines belong to the FAQ section so we can drop them
  // from the body — that section is rendered separately by
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
      // the post — it duplicates navigation that's already in the page.
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
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
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
                {t.value}
              </strong>
            );
          case "italic":
            return (
              <em key={idx} className="italic">
                {t.value}
              </em>
            );
          case "link":
            return (
              <Link
                key={idx}
                href={t.href ?? "#"}
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                {t.value}
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

// ────────────────────────────────────────────────────────────
// Extract a "Frequently Asked Questions" section from the
// markdown and render it as a collapsible list. The post's
// FAQ lives in the body already, so this hides that section
// and surfaces it in the design's FAQ block.
// ────────────────────────────────────────────────────────────
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
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#{2,4}\s+(.*)/);
    if (m && /frequently asked questions/i.test(m[1])) {
      startIdx = i;
      break;
    }
  }
  if (startIdx === -1) return null;

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (/^#{2,4}\s+/.test(lines[i])) {
      endIdx = i;
      break;
    }
  }
  return [startIdx, endIdx];
}

function extractFAQSection(md: string): { qa: Array<{ q: string; a: string }> } | null {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let startIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#{2,4}\s+(.*)/);
    if (m && /frequently asked questions/i.test(m[1])) {
      startIdx = i;
      break;
    }
  }
  if (startIdx === -1) return null;

  // Find the next heading after startIdx to bound the section
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (/^#{2,4}\s+/.test(lines[i])) {
      endIdx = i;
      break;
    }
  }

  const body = lines.slice(startIdx + 1, endIdx).join("\n");
  const qa: Array<{ q: string; a: string }> = [];

  // Match paragraphs that start with "**Q: ..." (used by these blog posts)
  const re = /\*\*Q:\s*([^*]+?)\*\*\s*([\s\S]*?)(?=\*\*Q:|\s*$)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    const q = match[1].trim();
    const a = match[2].replace(/---+\s*$/m, "").trim();
    if (q && a) qa.push({ q, a });
  }

  if (qa.length === 0) return null;
  return { qa };
}
