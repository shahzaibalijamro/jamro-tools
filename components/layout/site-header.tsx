import Link from "next/link";
import { Moon, Search } from "lucide-react";

const navItems = [
  { label: "Tools", href: "/tools", active: true },
  { label: "Categories", href: "/categories" },
  { label: "API", href: "/api" },
  { label: "Pricing", href: "/pricing" },
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

          <form
            role="search"
            className="hidden h-[50px] min-w-[220px] max-w-[330px] flex-1 items-center rounded-full border border-[var(--color-border)] bg-[#f4f7ff] px-5 text-[var(--color-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:flex min-[1180px]:max-w-[410px] xl:h-[57px] xl:max-w-[508px] xl:px-6"
          >
            <Search className="mr-4 size-6 shrink-0 text-[var(--color-ink)] opacity-80 xl:mr-5" strokeWidth={2.25} aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search tools
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search 1,000+ tools..."
              className="min-w-0 w-full bg-transparent text-[16px] font-medium outline-none placeholder:text-[#505a70] xl:text-[18px]"
            />
          </form>
        </div>

        <div className="flex shrink-0 items-center gap-3 min-[700px]:gap-8 lg:gap-3 xl:gap-9">
          <nav aria-label="Primary navigation" className="hidden h-[72px] items-center gap-4 xl:gap-8 lg:flex">
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
            href="/feedback"
            className="inline-flex h-10 w-[112px] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[16px] font-extrabold text-white transition hover:bg-[#0649c5] min-[700px]:h-[54px] min-[700px]:w-[178px] min-[700px]:text-[22px] lg:h-10 lg:w-[108px] lg:text-[14px] xl:h-[43px] xl:w-[132px]"
          >
            Feedback
          </Link>
        </div>
      </div>
    </header>
  );
}
