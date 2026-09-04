import React from "react";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section data-tool-faq className="border-t border-outline-variant pt-[40px]">
      <h2 className="mb-[18px] text-[28px] font-bold leading-tight tracking-[-0.02em] text-on-surface">
        Frequently Asked Questions
      </h2>
      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm dark:bg-surface-container-low">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border-b border-outline-variant last:border-b-0"
          >
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-[16px] px-[18px] py-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
              <span className="pr-4 text-[16px] font-semibold leading-[1.45] text-on-surface">
                {item.q}
              </span>
              <span className="material-symbols-outlined shrink-0 text-[20px] text-on-surface-variant transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="px-[18px] pb-[18px] text-[15px] leading-[1.65] text-on-surface-variant">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
