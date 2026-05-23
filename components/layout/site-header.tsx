import Link from "next/link";
import { Moon, Search } from "lucide-react";

const navItems = [
  { label: "Tools", href: "/tools", active: true },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-white/60 bg-[rgba(250,251,255,0.76)] shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition-shadow min-[700px]:h-24 lg:h-[72px]">
      <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between gap-4 px-4 min-[700px]:px-9">
        <div className="flex h-full min-w-0 flex-1 items-center lg:gap-5 xl:gap-8">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap text-[22px] font-extrabold leading-none text-[var(--color-brand)] min-[700px]:text-[34px] lg:text-[23px]"
            aria-label="Jamro Tools home"
          >
            Jamro Tools
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3 min-[700px]:gap-8 lg:gap-4 xl:gap-9">
          <nav aria-label="Primary navigation" className="hidden h-[30px] items-center gap-4 xl:gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-full items-center whitespace-nowrap border-b-2 px-0 text-[15px] font-medium transition min-[1180px]:text-[16px] xl:text-[17px] ${
                  item.active
                    ? "border-[var(--color-brand)] text-[var(--color-brand)]"
                    : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-brand)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle dark mode"
            className="inline-flex size-8 items-center justify-center rounded-full text-[#111827] transition hover:bg-[#e8eefc] min-[700px]:size-10 lg:size-8 xl:size-9"
          >
            <Moon className="size-6 min-[700px]:size-9 lg:size-6" strokeWidth={2.35} aria-hidden="true" />
          </button>

          <Link
            href="/request-tool"
            className="inline-flex h-10 w-[150px] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[16px] font-extrabold text-white transition hover:bg-[#0649c5] min-[700px]:h-[54px] min-[700px]:w-[210px] min-[700px]:text-[22px] lg:h-10 lg:w-[150px] lg:text-[14px] xl:h-[43px] xl:w-[150px]"
          >
            Request a Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
