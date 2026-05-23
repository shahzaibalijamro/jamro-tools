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
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const handleScroll = () => {
      let current = "introduction";
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        if (scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || current;
        }
      });

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
    <nav className="sticky top-16 z-40 border-b border-[#c3c6d7] bg-[#f9f9ff]/95 backdrop-blur-md md:hidden">
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