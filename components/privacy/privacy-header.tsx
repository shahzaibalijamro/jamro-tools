"use client";

import Link from "next/link";
import { SafeLink } from "@/components/ui/safe-link";
import { useRouter } from "next/navigation";

import { privacyDesktopNavItems } from "@/components/privacy/privacy-data";

export function PrivacyHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c3c6d7] bg-[#f9f9ff] shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
        {/* Mobile Left: Back arrow + Brand */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => router.back()}
            className="-ml-1 cursor-pointer p-1 text-[#004ac6] transition-all active:scale-95"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-[20px] font-bold leading-[1.4] text-[#004ac6]">
            Jamro Tools
          </span>
        </div>

        {/* Desktop Left: Brand + Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className="cursor-pointer text-[20px] font-bold leading-[1.4] text-[#004ac6] transition-all active:scale-95"
            aria-label="Jamro Tools home"
          >
            Jamro Tools
          </Link>
          <nav
            aria-label="Primary navigation"
            className="ml-6 hidden gap-4 md:flex"
          >
            {privacyDesktopNavItems.map((item) => (
              <SafeLink
                key={item.href}
                href={item.href}
                className="cursor-pointer text-[16px] leading-[1.6] text-[#434655] transition-all hover:text-[#004ac6] active:scale-95"
              >
                {item.label}
              </SafeLink>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden items-center rounded-full border border-[#c3c6d7] bg-[#e7eeff] px-4 py-1 sm:flex">
            <span
              className="material-symbols-outlined text-[#737686]"
              aria-hidden="true"
            >
              search
            </span>
            <label htmlFor="privacy-tool-search" className="sr-only">
              Search tools
            </label>
            <input
              id="privacy-tool-search"
              type="text"
              placeholder="Search tools..."
              className="w-32 border-none bg-transparent text-[14px] font-semibold leading-[1.4] tracking-[0.01em] outline-none md:w-48"
            />
          </div>

          {/* Mobile Search + More */}
          <span className="material-symbols-outlined cursor-pointer text-[#434655] transition-all active:scale-95 md:hidden">
            search
          </span>
          <span className="material-symbols-outlined cursor-pointer text-[#434655] transition-all active:scale-95 md:hidden">
            more_vert
          </span>

          {/* Desktop Sign In */}
          <SafeLink
            href="/signin"
            className="hidden items-center justify-center rounded-full bg-[#004ac6] px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all active:scale-95 hover:bg-[#0058be] md:inline-flex"
          >
            Sign In
          </SafeLink>
        </div>
      </div>
    </header>
  );
}
