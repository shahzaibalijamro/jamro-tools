"use client";

import Link from "next/link";
import { SafeLink } from "@/components/ui/safe-link";
import { useState } from "react";

import { notFoundNavItems } from "@/components/not-found/not-found-data";

export function NotFoundHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Fixed glass header */}
      <header className="fixed top-0 z-50 w-full bg-glass-bg/70 backdrop-blur-md border-b border-glass-border shadow-sm">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          {/* Brand */}
          <Link
            href="/"
            className="shrink-0 text-[20px] font-bold leading-[1.4] text-primary"
            aria-label="Jamro Tools home"
          >
            Jamro Tools
          </Link>

          {/* Desktop nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {notFoundNavItems.map((item) => (
              <SafeLink
                key={item.href}
                href={item.href}
                className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-on-surface-variant transition-colors duration-200 hover:text-primary px-2 py-1 rounded"
              >
                {item.label}
              </SafeLink>
            ))}
          </nav>

          {/* Right side: Sign In + hamburger */}
          <div className="flex items-center gap-3">
            <SafeLink
              href="/signin"
              className="hidden items-center justify-center rounded-full bg-primary px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-on-primary transition-all hover:shadow-md active:scale-95 md:inline-flex"
            >
              Sign In
            </SafeLink>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={toggleDrawer}
              aria-label="Open navigation menu"
              className="flex size-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-low md:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="nav-drawer"
        aria-hidden={!drawerOpen}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={toggleDrawer}
        />

        {/* Drawer panel */}
        <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-surface shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[20px] font-bold text-primary">
              Jamro Tools
            </span>
            <button type="button" onClick={toggleDrawer} aria-label="Close navigation menu">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {notFoundNavItems.map((item) => (
            <SafeLink
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className="py-4 border-b border-outline-variant text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-on-surface"
            >
              {item.label}
            </SafeLink>
          ))}

          <SafeLink
            href="/signin"
            onClick={() => setDrawerOpen(false)}
            className="mt-4 flex items-center justify-center rounded-full bg-primary py-4 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-on-primary transition-all active:scale-95"
          >
            Sign In
          </SafeLink>
        </div>
      </div>
    </>
  );
}
