import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogTeaser } from "@/lib/blog-teasers";
import type {
  ToolEditorialBlock,
  ToolLink,
} from "@/data/tools/types";

export function ToolEditorialContent({ blocks }: { blocks?: ToolEditorialBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return <div data-tool-editorial aria-hidden="true" className="min-h-[220px]" />;
  }

  return (
    <article data-tool-editorial className="space-y-[32px] text-on-surface">
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <section key={block.heading} className="space-y-[12px]">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em]">
                {block.heading}
              </h2>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-[1.65] text-on-surface-variant">
                  {paragraph}
                </p>
              ))}
              {block.bullets && block.bullets.length > 0 ? (
                <ul className="list-disc space-y-[6px] pl-[22px] text-[16px] leading-[1.6] text-on-surface-variant">
                  {block.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </section>
          );
        }

        if (block.type === "formulas") {
          return (
            <section key={block.heading} className="space-y-[16px]">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em]">
                {block.heading}
              </h2>
              <div className="space-y-[16px]">
                {block.items.map((item) => (
                  <div key={item.heading} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-[20px] shadow-sm dark:bg-surface-container-low">
                    <h3 className="text-[18px] font-bold leading-snug">{item.heading}</h3>
                    <p className="mt-[12px] overflow-x-auto rounded-lg bg-surface-container-low px-[14px] py-[12px] font-mono text-[14px] font-semibold text-primary">
                      {item.formula}
                    </p>
                    <div className="mt-[12px] space-y-[3px] text-[15px] leading-[1.55] text-on-surface-variant">
                      {item.example.map((line) => <p key={line}>{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "steps") {
          return (
            <section key={block.heading} className="space-y-[16px]">
              <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em]">
                {block.heading}
              </h2>
              <div className="space-y-[24px]">
                {block.groups.map((group) => (
                  <div key={group.heading}>
                    <h3 className="text-[18px] font-bold leading-snug">{group.heading}</h3>
                    <ol className="mt-[10px] list-decimal space-y-[5px] pl-[22px] text-[16px] leading-[1.55] text-on-surface-variant">
                      {group.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <div className="mt-[12px] border-l-[3px] border-primary pl-[14px] text-[15px] leading-[1.55] text-on-surface-variant">
                      {group.example.map((line) => <p key={line}>{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return (
          <section key={block.heading} className="space-y-[16px]">
            <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em]">
              {block.heading}
            </h2>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
              {block.items.map((item) => (
                <div key={item.heading} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-[18px] shadow-sm dark:bg-surface-container-low">
                  <h3 className="text-[16px] font-bold leading-snug">{item.heading}</h3>
                  <div className="mt-[8px] space-y-[3px] text-[14px] leading-[1.55] text-on-surface-variant">
                    {item.lines.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}

export function ToolPageRail({
  relatedTools,
  blogs,
}: {
  relatedTools?: ToolLink[];
  blogs: BlogTeaser[];
}) {
  return (
    <aside data-tool-rail className="space-y-[32px]">
      {relatedTools && relatedTools.length > 0 ? (
        <section aria-labelledby="related-tools-heading">
          <h2 id="related-tools-heading" className="text-[24px] font-bold leading-tight tracking-[-0.02em]">
            Related Tools
          </h2>
          <div className="mt-[14px] grid grid-cols-1 gap-[10px] xl:grid-cols-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex min-h-[92px] flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-[14px] shadow-sm transition-colors hover:border-primary dark:bg-surface-container-low"
              >
                <span className="text-[14px] font-bold leading-snug text-on-surface">{tool.title}</span>
                <ArrowRight className="mt-[10px] size-4 self-end text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div aria-hidden="true" className="min-h-[150px]" />
      )}

      {blogs.length > 0 ? (
        <section aria-labelledby="blog-teasers-heading">
          <div className="flex items-end justify-between gap-[12px]">
            <h2 id="blog-teasers-heading" className="text-[24px] font-bold leading-tight tracking-[-0.02em]">
              From the Jamro Blog
            </h2>
            <Link href="/blog" className="shrink-0 text-[13px] font-bold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-[14px] divide-y divide-outline-variant">
            {blogs.map((post) => (
              <article key={post._id} className="py-[14px] first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <h3 className="text-[15px] font-bold leading-snug text-on-surface group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.excerpt || post.description ? (
                    <p className="mt-[5px] line-clamp-2 text-[13px] leading-[1.5] text-on-surface-variant">
                      {post.excerpt || post.description}
                    </p>
                  ) : null}
                  {post.readTime ? (
                    <p className="mt-[6px] text-[12px] font-semibold text-primary">{post.readTime}</p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div aria-hidden="true" className="min-h-[210px]" />
      )}

      <section className="rounded-xl border border-outline-variant bg-surface-container p-[24px] text-center" aria-label="Advertisement">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Advertisement</p>
        <p className="mt-[8px] text-[20px] font-bold text-on-surface">Advertisement Space</p>
        <p className="mt-[5px] text-[13px] text-on-surface-variant">Reserved for future partners.</p>
      </section>
    </aside>
  );
}
