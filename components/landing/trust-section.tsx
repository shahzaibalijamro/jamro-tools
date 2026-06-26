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
                The modern web is cluttered with single-purpose online tools that are bogged down by aggressive ad networks, forced registrations, and questionable data-logging practices. Jamro Tools provides a clean, professional-grade alternative. Our platform serves as a public digital good for developers, content creators, and SEO professionals who require precise results without sacrificing data security.
                <br />
                <br />
                By utilizing modern client-side engineering, Jamro Tools shifts the computational heavy lifting directly to your browser. Your operations execute locally and securely right on your screen, whether you are using our high-fidelity image compressor to optimize web assets, generating cryptographically secure strings using the password generator, or parsing complex nested arrays in our JSON formatter.
                <br />
                <br />
                The expansive directory at Jamro Tools is meticulously categorized to support diverse technical workflows. Digital marketers can leverage our text and SEO tools to analyze metadata and clean string inputs. At the same time, engineers can utilize our robust client-side developer tools for daily debugging and code formatting. By maintaining a highly optimized, low-overhead static infrastructure, we commit to keeping our entire catalog of free web utilities 100% free. We avoid paywalls, subscription traps, and intrusive account requirements.
                <br />
                <br />
                As the digital landscape evolves, Jamro Tools continues to expand its library to meet the demands of modern professionals. Our roadmap is heavily driven by community feedback, allowing us to deploy new free online web utilities that solve real-world technical challenges. By refining our code scripts and keeping infrastructure bloated to an absolute minimum, we ensure that every new addition to our online workshop loads efficiently on your screen. Whether you rely on our platform for daily code debugging or quick asset optimization, we remain committed to delivering a fast, dependable, and highly precise web service.
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
