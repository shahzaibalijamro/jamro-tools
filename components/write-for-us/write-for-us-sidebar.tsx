"use client";

import { useEffect, useRef } from "react";

import { writeForUsSidebarLinks } from "@/components/write-for-us/write-for-us-data";

export function WriteForUsSidebar() {
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = linksRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          Object.values(navLinks).forEach((link) => {
            link?.classList.remove(
              "border-[#004ac6]",
              "dark:border-primary",
              "bg-[#e7eeff]",
              "dark:bg-surface-container-high",
              "text-[#004ac6]",
              "dark:text-primary"
            );
          });

          const link = navLinks[entry.target.id];
          link?.classList.add(
            "border-[#004ac6]",
            "dark:border-primary",
            "bg-[#e7eeff]",
            "dark:bg-surface-container-high",
            "text-[#004ac6]",
            "dark:text-primary"
          );
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-20">
        <div className="rounded-xl border border-[#c3c6d7] bg-white p-4 shadow-sm dark:border-outline-variant dark:bg-surface-container">
          <h2 className="mb-4 px-2 text-[12px] font-normal uppercase leading-[1.4] tracking-wider text-[#737686] dark:text-on-surface-variant">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            {writeForUsSidebarLinks.map((link) => (
              <li key={link.id}>
                <a
                  ref={(element) => {
                    linksRef.current[link.sectionId] = element;
                  }}
                  href={link.href}
                  id={link.id}
                  onClick={(event) => handleClick(event, link.href)}
                  className="block rounded-lg border-l-[3px] border-transparent px-2 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] transition-colors hover:bg-[#e7eeff] dark:text-on-surface-variant dark:hover:bg-surface-container-high"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl bg-[#2563eb] p-4 text-[#eeefff]">
          <p className="text-[14px] font-bold leading-[1.4] tracking-[0.01em]">
            Ready to contribute?
          </p>
          <p className="mt-1 text-[12px] leading-[1.4] opacity-90">
            Guest posting is free for articles that meet our editorial standards.
          </p>
          <a
            href="#submission-guidelines"
            onClick={(event) => handleClick(event, "#submission-guidelines")}
            className="mt-4 inline-block text-[14px] font-bold leading-[1.4] tracking-[0.01em] underline decoration-2"
          >
            How to submit &rarr;
          </a>
        </div>
      </div>
    </aside>
  );
}
