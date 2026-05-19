import {
  BadgeCheck,
  CircleGauge,
  Code2,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { trustHighlights } from "@/lib/landing-data";

const highlightIcons = {
  gauge: CircleGauge,
  devices: MonitorSmartphone,
  api: Code2,
};

const highlightTone = {
  blue: "text-[var(--color-brand)]",
  orange: "text-[#a74600]",
};

function HighlightCard({
  highlight,
  isTall = false,
}: {
  highlight: (typeof trustHighlights)[number];
  isTall?: boolean;
}) {
  const Icon = highlightIcons[highlight.icon];

  return (
    <li
      className={`rounded-[10px] bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)] min-[700px]:p-7 lg:p-4 xl:p-[17px] ${
        isTall ? "xl:min-h-[170px]" : "xl:min-h-[97px]"
      }`}
    >
      <Icon
        className={`size-5 ${highlightTone[highlight.tone]}`}
        strokeWidth={2.35}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-[20px] font-extrabold leading-tight text-[var(--color-ink)] lg:text-[18px]">
        {highlight.title}
      </h3>
      <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#273247] lg:text-[13px]">
        {highlight.description}
      </p>
    </li>
  );
}

export function TrustSection() {
  return (
    <section className="bg-[var(--color-page)] py-20 min-[700px]:py-28 lg:py-[120px]">
      <Container>
        <div className="mx-auto grid max-w-[988px] gap-6 lg:grid-cols-[minmax(0,647px)_317px]">
          <div className="flex min-h-[420px] flex-col rounded-[14px] bg-[linear-gradient(135deg,#273247_0%,#223b68_100%)] p-8 text-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] min-[700px]:p-12 lg:min-h-[480px] lg:p-[38px]">
            <div>
              <h2 className="text-[30px] font-extrabold leading-tight tracking-[-0.01em] lg:text-[28px]">
                No Sign-up. Ever.
              </h2>
              <p className="mt-5 max-w-[430px] text-[17px] font-medium leading-[1.55] text-[#d8e0ee] lg:text-[16px]">
                We value your privacy. All Jamro tools process your data locally in your browser.
                We don&apos;t see, store, or sell your data.
              </p>
            </div>

            <div className="mt-auto flex flex-wrap gap-6 pt-16 text-[14px] font-semibold text-white min-[700px]:gap-8 lg:text-[13px]">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-5" strokeWidth={2.35} aria-hidden="true" />
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="size-5" strokeWidth={2.35} aria-hidden="true" />
                Works Offline
              </span>
            </div>
          </div>

          <aside className="rounded-[14px] bg-[#dce8ff] p-6 min-[700px]:p-12 lg:p-[38px]">
            <ul className="grid gap-6 min-[700px]:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {trustHighlights.map((highlight, index) => (
                <HighlightCard
                  key={highlight.title}
                  highlight={highlight}
                  isTall={index === trustHighlights.length - 1}
                />
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
