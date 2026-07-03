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
    <section className="max-w-4xl mx-auto py-[48px] border-t border-outline-variant">
      <h2 className="text-[32px] leading-[1.2] font-semibold mb-[24px] text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-[16px]">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/30 transition-all"
          >
            <summary className="flex justify-between items-center p-[24px] cursor-pointer list-none">
              <span className="text-[20px] leading-[1.4] font-semibold text-on-surface pr-4">
                {item.q}
              </span>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-on-surface-variant shrink-0">
                expand_more
              </span>
            </summary>
            <div className="px-[24px] pb-[24px] text-[16px] leading-[1.6] text-on-surface-variant">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
