import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { aboutNavItems } from "@/components/about/about-data";

export function AboutHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c3c6d7] bg-[#f9f9ff] shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Jamro Tools home"
          >
            <Image
              src="/jamro_tools_favicon.png"
              alt="Jamro Tools Logo"
              width={32}
              height={32}
              className="size-8"
            />
            <span className="text-[20px] font-bold leading-[1.4] text-[#004ac6]">
              Jamro Tools
            </span>
          </Link>

          <nav
            aria-label="About page navigation"
            className="hidden items-center gap-4 lg:flex"
          >
            {aboutNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[16px] leading-[1.6] text-[#434655] transition-colors duration-200 hover:text-[#004ac6]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <form role="search" className="relative hidden sm:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#737686]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <label htmlFor="about-tool-search" className="sr-only">
              Search tools
            </label>
            <input
              id="about-tool-search"
              type="search"
              placeholder="Search 1,000+ tools..."
              className="h-10 w-64 rounded-full border border-[#c3c6d7] bg-[#f0f3ff] py-2 pl-10 pr-4 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#111c2d] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#004ac6]"
            />
          </form>

          {/* Desktop Sign In */}
          <Link
            href="/signin"
            className="hidden h-10 items-center justify-center rounded-full bg-[#004ac6] px-6 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all active:scale-95 md:inline-flex"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex size-10 items-center justify-center rounded-full active:bg-[#d8e3fb] transition-colors md:hidden"
          >
            <Menu className="size-6 text-[#111c2d]" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
