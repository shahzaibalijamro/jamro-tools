"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { mobileJumpLinks } from "@/components/privacy/privacy-data";

export function PrivacyMobileNav() {
  const [activeId, setActiveId] = useState("introduction");
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const setRef = useCallback((el: HTMLAnchorElement | null, index: number) => {
    if (el) linksRef.current[index] = el;
  }, []);

  useEffect(() => {
    // Collect the actual target elements using their IDs
    const sectionElements = mobileJumpLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const handleScroll = () => {
      let current = "introduction";

      // Iterate in reverse so the last section whose top has passed (or is at)
      // the top of the viewport wins — the section you're currently "in".
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];

        // Skip hidden elements (e.g. desktop-only sections)
        const style = window.getComputedStyle(el);
        if (style.display === "none") continue;

        const rect = el.getBoundingClientRect();
        // The section is considered active once its top reaches the top of the viewport
        if (rect.top <= 1) {
          current = el.getAttribute("id") || current;
          break;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky min-[700px]:top-18 top-14 z-40 border-b border-white/60 bg-[rgba(250,251,255,0.76)] shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 md:hidden">
      <div className="flex snap-x-mandatory gap-2 mx-4 sm:mx-6 overflow-x-auto whitespace-nowrap px-4 py-2 no-scrollbar sm:px-6">
        {mobileJumpLinks.map((link, index) => {
          const isActive = activeId === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              ref={(el) => {
                setRef(el, index);
              }}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`snap-start flex-none rounded-full border px-4 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] transition-all ${
                isActive
                  ? "border-[#004ac6]/10 bg-[#2563eb] text-[#eeefff]"
                  : "border-[#c3c6d7] bg-[#e7eeff] text-[#434655]"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}