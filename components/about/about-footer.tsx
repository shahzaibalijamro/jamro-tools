import Image from "next/image";
import { SafeLink } from "@/components/ui/safe-link";
import { Mail, Share2 } from "lucide-react";

import { footerLinks } from "@/components/about/about-data";

export function AboutFooter() {
  return (
    <footer className="w-full border-t border-[#c3c6d7] bg-[#f0f3ff]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">
        {/* Mobile: centered logo + name */}
        <div className="flex flex-col items-center gap-2 md:items-start md:gap-1">
          <div className="flex items-center gap-2 md:hidden">
            <Image
              src="/favicon.png"
              alt="Jamro Tools Logo"
              width={24}
              height={24}
              className="size-6"
            />
            <span className="text-[20px] font-bold leading-[1.4] text-[#111c2d]">
              Jamro Tools
            </span>
          </div>
          <SafeLink
            href="/"
            className="hidden text-[20px] font-bold leading-[1.4] text-[#111c2d] md:block"
            aria-label="Jamro Tools home"
          >
            Jamro Tools
          </SafeLink>
          <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]">
            &copy; 2026 Jamro Tools. All rights reserved.
          </p>
        </div>

        {/* Mobile: simplified 4 links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:hidden"
        >
          <SafeLink
            href="/about"
            className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] underline"
          >
            About Us
          </SafeLink>
          <SafeLink
            href="/privacy"
            className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]"
          >
            Privacy Policy
          </SafeLink>
          <SafeLink
            href="/terms"
            className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]"
          >
            Terms of Service
          </SafeLink>
          <SafeLink
            href="/contact"
            className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]"
          >
            Contact
          </SafeLink>
        </nav>

        {/* Desktop: full link list */}
        <nav
          aria-label="Footer navigation"
          className="hidden flex-wrap justify-center gap-6 md:flex"
        >
          {footerLinks.map((link) => (
            <SafeLink
              key={link.href}
              href={link.href}
              className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] transition-colors duration-200 hover:text-[#0058be]"
            >
              {link.label}
            </SafeLink>
          ))}
        </nav>

        <div className="flex gap-4">
          <button
            type="button"
            aria-label="Share Jamro Tools"
            className="flex size-10 items-center justify-center rounded-full bg-[#dee8ff] text-[#434655] dark:bg-surface-container dark:text-on-surface-variant transition-colors hover:text-[#004ac6]"
          >
            <Share2 className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Email Jamro Tools"
            className="flex size-10 items-center justify-center rounded-full bg-[#dee8ff] text-[#434655] dark:bg-surface-container dark:text-on-surface-variant transition-colors hover:text-[#004ac6]"
          >
            <Mail className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
