import {
  BadgeCheck,
  CircleGauge,
  Code2,
  MonitorSmartphone,
  ShieldCheck,
  Toolbox,
  Bolt,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { trustHighlights } from "@/lib/landing-data";

const highlightIcons = {
  gauge: CircleGauge,
  devices: MonitorSmartphone,
  api: Code2,
  shield: ShieldCheck,
  toolBox: Toolbox,
  bolt: Bolt,
  users: Users,
};

const highlightTone = {
  blue: "text-[var(--color-brand)] dark:text-brand-light",
  orange: "text-[#a74600] dark:text-tertiary",
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
      className={`rounded-[10px] min-w-[170px] bg-white flex-1 dark:bg-surface p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)] dark:shadow-none min-[700px]:p-4 xl:p-[17px] ${isTall ? "xl:min-h-[170px]" : "xl:min-h-[97px]"
        }`}
    >
      <Icon
        className={`size-5 ${highlightTone[highlight.tone]}`}
        strokeWidth={2.35}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-[20px] font-extrabold leading-tight text-[var(--color-ink)] min-[700px]:text-[18px]">
        {highlight.title}
      </h3>
      <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#273247] dark:text-on-surface-variant min-[700px]:text-[13px]">
        {highlight.description}
      </p>
    </li>
  );
}

export function TrustSection() {
  return (
    <section className="bg-[var(--color-page)] py-20 min-[700px]:py-[120px]">
      <Container>
        <div className="mx-auto flex flex-col lg:flex-row w-full gap-6 min-[700px]:grid-cols-[minmax(0,647px)_317px]">
          <div className="flex min-h-[420px] flex-1 flex-col rounded-[14px] bg-[linear-gradient(135deg,#273247_0%,#223b68_100%)] dark:bg-none dark:bg-surface-container dark:border-0 p-8 text-white dark:text-on-surface shadow-[0_18px_48px_rgba(15,23,42,0.12)] min-[700px]:min-h-[480px] min-[700px]:p-[38px]">
            <div>
              <h2 className="text-[30px] font-extrabold leading-tight tracking-[-0.01em] min-[700px]:text-[28px]">
                Your all-in-one digital workshop.
              </h2>
              <p className="mt-5 text-[17px] font-medium leading-[1.55] text-[#d8e0ee] dark:text-on-surface-variant min-[700px]:text-[16px]">
                Jamro Tools was born from a simple observation: the web is cluttered with utility tools that are slow, ad-heavy, and often compromise user privacy by uploading sensitive data to remote servers. Our mission is to provide a professional-grade suite of utilities that operate with technical precision while maintaining the highest standards of data sovereignty. Every tool in our library is engineered to run entirely within your browser's sandbox, ensuring that your data never leaves your machine.
                <br />
                <br />
                Our technical architecture leverages modern web standards like WebAssembly and advanced client-side JavaScript to deliver near-native performance. Whether you are compressing high-resolution images, generating cryptographically secure passwords, or formatting complex JSON structures, the processing happens locally and instantaneously. This 'privacy-by-design' approach doesn't just protect your information—it eliminates the latency associated with server-side roundtrips, providing a fluid and responsive experience even on slower connections.
                <br />
                <br />
                We believe that high-quality digital tools should be a public good. By maintaining a low-overhead infrastructure and focusing on efficient, client-side execution, we are able to offer our entire suite 100% free of charge, without the need for intrusive sign-ups or data-harvesting business models. Our commitment to the developer and creator community is to keep expanding this workshop, adding more specialized utilities that simplify your daily workflow without ever asking you to trade your privacy for convenience.
                <br />
                <br />
                As we look toward the future, Jamro Tools continues to evolve with the needs of modern professionals. From advanced cybersecurity modules to specialized financial calculators, our roadmap is driven by community feedback and the pursuit of technical excellence. We invite you to explore the suite, integrate it into your workflow, and experience the peace of mind that comes with tools that respect your data as much as you do.
              </p>
            </div>
          </div>

          <aside className="rounded-[14px] bg-[#dce8ff]  dark:bg-[#18181b63] dark:border-2 dark:border-[#18181b] p-6 min-[700px]:p-[38px]">
            <ul className="flex flex-wrap lg:flex-col lg:flex-no-wrap h-full flex-row gap-6 min-[700px]:grid-cols-1 min-[700px]:gap-5">
              {trustHighlights.map((highlight, index) => (
                <HighlightCard
                  key={highlight.title}
                  highlight={highlight}
                />
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
