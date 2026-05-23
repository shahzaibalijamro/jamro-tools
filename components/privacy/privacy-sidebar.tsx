"use client";

import { useEffect, useRef } from "react";

import { privacySidebarLinks } from "@/components/privacy/privacy-data";

export function PrivacySidebar() {
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
                "border-l-[3px]",
                "border-[#004ac6]",
                "bg-[#e7eeff]",
                "text-[#004ac6]"
              );
            });
            // Add to current
            const sectionId = entry.target.id;
            const link = navLinks[sectionId];
            if (link) {
              link.classList.add(
                "border-l-[3px]",
                "border-[#004ac6]",
                "bg-[#e7eeff]",
                "text-[#004ac6]"
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
    <aside className="hidden w-64 lg:block shrink-0">
      <div className="sticky top-20">
        <div className="rounded-xl border border-[#c3c6d7] bg-white p-4 shadow-sm">
          <h2 className="mb-4 px-2 text-[12px] font-normal uppercase leading-[1.4] tracking-wider text-[#737686]">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            {privacySidebarLinks.map((link) => (
              <li key={link.id}>
                <a
                  ref={(el) => {
                    linksRef.current[link.sectionId] = el;
                  }}
                  href={link.href}
                  id={link.id}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block rounded-lg border-l-[3px] border-transparent px-2 py-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] transition-colors hover:bg-[#e7eeff]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl bg-[#2563eb] p-4 text-[#eeefff]">
          <p className="text-[14px] font-bold leading-[1.4] tracking-[0.01em]">
            Looking for Terms?
          </p>
          <p className="mt-1 text-[12px] leading-[1.4] opacity-90">
            Our Terms of Service govern your use of the tools.
          </p>
          <a
            href="/terms"
            className="mt-4 inline-block text-[14px] font-bold leading-[1.4] tracking-[0.01em] underline decoration-2"
          >
            Read Terms &rarr;
          </a>
        </div>
      </div>
    </aside>
  );
}