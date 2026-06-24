"use client";

import { useEffect, useRef } from "react";

import { termsSidebarLinks } from "@/components/terms/terms-data";

export function TermsSidebar() {
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = linksRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove active class from all links
            Object.values(navLinks).forEach((link) => {
              link?.classList.remove(
                "border-l-[4px]",
                "border-[#004ac6]",
                "dark:border-blue-400",
                "font-bold",
                "text-[#004ac6]",
                "dark:text-blue-400"
              );
              link?.classList.add(
                "border-l-[4px]",
                "border-transparent",
                "text-[#434655]",
                "dark:text-slate-300"
              );
            });
            // Add to current
            const sectionId = entry.target.id;
            const link = navLinks[sectionId];
            if (link) {
              link.classList.remove(
                "border-transparent",
                "text-[#434655]",
                "dark:text-slate-300"
              );
              link.classList.add(
                "border-l-[4px]",
                "border-[#004ac6]",
                "dark:border-blue-400",
                "font-bold",
                "text-[#004ac6]",
                "dark:text-blue-400"
              );
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24">
        <div className="rounded-xl border border-[#c3c6d7] dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <h2 className="mb-4 px-2 text-[12px] font-normal uppercase leading-[1.4] tracking-wider text-[#737686] dark:text-slate-400">
            Contents
          </h2>
          <ul className="space-y-1">
            {termsSidebarLinks.map((link) => (
              <li key={link.id}>
                <a
                  ref={(el) => {
                    linksRef.current[link.sectionId] = el;
                  }}
                  href={link.href}
                  id={link.id}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block border-l-[4px] border-transparent px-2 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] dark:text-slate-300 transition-colors hover:bg-[#e7eeff] dark:hover:bg-slate-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA card in sidebar */}
        <div className="mt-6 rounded-xl bg-[#2563eb] p-4 text-[#eeefff]">
          <p className="text-[14px] font-bold leading-[1.4] tracking-[0.01em]">
            Looking for Privacy?
          </p>
          <p className="mt-1 text-[12px] leading-[1.4] opacity-90">
            Read how we handle and protect your personal data.
          </p>
          <a
            href="/privacy-policy"
            className="mt-4 inline-block text-[14px] font-bold leading-[1.4] tracking-[0.01em] underline decoration-2"
          >
            Privacy Policy &rarr;
          </a>
        </div>
      </div>
    </aside>
  );
}