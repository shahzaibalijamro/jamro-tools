"use client";

import { useEffect, useState } from "react";

type SectionNavLink = {
  label: string;
  href: string;
};

type MobileSectionNavProps = {
  ariaLabel: string;
  links: readonly SectionNavLink[];
};

export function MobileSectionNav({ ariaLabel, links }: MobileSectionNavProps) {
  const [activeId, setActiveId] = useState(() => links[0]?.href.slice(1) ?? "");

  useEffect(() => {
    const sectionElements = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sectionElements.length === 0) return;

    const handleScroll = () => {
      let current = sectionElements[0].id;

      for (let index = sectionElements.length - 1; index >= 0; index -= 1) {
        if (sectionElements[index].getBoundingClientRect().top <= 112) {
          current = sectionElements[index].id;
          break;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-14 z-40 border-b border-white/60 bg-[rgba(250,251,255,0.76)] shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 dark:border-outline-variant/70 dark:bg-[rgba(9,9,11,0.84)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] min-[700px]:top-18 md:hidden"
    >
      <div className="no-scrollbar mx-4 flex snap-x-mandatory gap-2 overflow-x-auto whitespace-nowrap px-4 py-2 sm:mx-6 sm:px-6">
        {links.map((link) => {
          const sectionId = link.href.slice(1);
          const isActive = activeId === sectionId;

          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => handleClick(event, link.href)}
              className={`snap-start flex-none rounded-full border px-4 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] transition-all ${
                isActive
                  ? "border-[#004ac6]/10 bg-[#2563eb] text-[#eeefff] dark:border-primary/30 dark:bg-primary-container dark:text-on-primary-container"
                  : "border-[#c3c6d7] bg-[#e7eeff] dark:border-outline-variant dark:bg-surface-container-high dark:text-on-surface-variant"
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
