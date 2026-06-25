"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search, Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { SearchDropdown } from "@/components/layout/search-dropdown";
import { SafeLink } from "@/components/ui/safe-link";

const navItems = [
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const hasDarkClass = document.documentElement.classList.contains("dark");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
    } else if (hasDarkClass) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const navOnEnterRef = useRef<(() => void) | null>(null);

  /* Derive active state from current pathname.
     /blog and /blog/* both highlight "Blog"; /about = "About", etc. */
  function isActive(itemHref: string): boolean {
    if (itemHref === "/") return pathname === "/";
    return pathname.startsWith(itemHref);
  }

  /* Close button coordinates (matches hamburger position exactly) */
  const [closePos, setClosePos] = useState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });

  /* ----- helpers --------------------------------------------------------- */

  const computeClosePos = useCallback(() => {
    const btn = hamburgerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setClosePos({
      top: rect.top,
      right: window.innerWidth - rect.right,
    });
  }, []);

  const openSidebar = useCallback(() => {
    computeClosePos();
    setSidebarOpen(true);
  }, [computeClosePos]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const enableSearchMode = useCallback(() => {
    setSearchMode(true);
  }, []);

  const disableSearchMode = useCallback(() => {
    setSearchMode(false);
    setSearchQuery("");
    setDropdownOpen(false);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setSearchQuery("");
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      if (e.target.value.trim().length > 0) {
        setDropdownOpen(true);
      } else {
        setDropdownOpen(false);
      }
    },
    []
  );

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && dropdownOpen) {
        e.preventDefault();
        navOnEnterRef.current?.();
      }
    },
    [dropdownOpen]
  );

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.trim().length > 0) {
      setDropdownOpen(true);
    }
  }, [searchQuery]);

  /* ----- effects --------------------------------------------------------- */

  // Auto-focus search input when entering search mode
  useEffect(() => {
    if (searchMode) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [searchMode]);

  // Recompute close button position on resize; close if >900px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(false);
      } else if (sidebarOpen) {
        computeClosePos();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen, computeClosePos]);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // ── Scroll shadow: adds shadow-md when page is scrolled past 10px ──
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── CMD+K / Ctrl+K : open search ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (window.innerWidth <= 580) {
          setSearchMode(true);
        } else {
          desktopInputRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ----- render ---------------------------------------------------------- */

  return (
    <>
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}
      <header ref={headerRef} className="sticky top-0 z-50 h-14 border-b border-white/60 dark:border-outline/60 bg-[rgba(250,251,255,0.76)] dark:bg-glass-bg shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150 transition-shadow min-[700px]:h-[72px]">
        {/* ================================================================ */}
        {/* NORMAL MODE — logo, nav, search (desktop), actions              */}
        {/* ================================================================ */}
        <div
          className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between max-[602px]:gap-2 gap-4 px-4 min-[700px]:px-9"
          style={{
            opacity: searchMode ? 0 : 1,
            transition: "opacity 150ms ease-in-out",
            pointerEvents: searchMode ? "none" : "auto",
          }}
        >
          {/* LEFT: Logo + Search (desktop) */}
          <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-3 min-[700px]:gap-5 xl:gap-8">
            <Link
              href="/"
              className="shrink-0 whitespace-nowrap text-[22px] font-extrabold leading-none text-[var(--color-brand)] dark:text-primary-fixed-dim min-[700px]:text-[23px]"
              aria-label="Jamro Tools home"
            >
              Jamro Tools
            </Link>
            <div className="relative flex h-[44px] min-w-[130px] max-w-[330px] max-[580px]:hidden flex-1 items-center min-[400px]:h-[40px] min-[1180px]:max-w-[410px] xl:h-[57px] xl:max-w-[508px]">
              <form
                role="search"
                className="flex h-full w-full items-center rounded-full border border-[var(--color-border)] dark:border-outline-variant/50 bg-[#f4f7ff] dark:bg-surface-container/50 px-4 text-[var(--color-muted)] dark:text-on-surface-variant shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] min-[400px]:px-5 xl:px-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <Search
                  className="mr-3 size-5 shrink-0 text-[var(--color-ink)] dark:text-on-surface-variant opacity-80 min-[400px]:mr-4 min-[400px]:size-6 xl:mr-5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <label htmlFor="site-search" className="sr-only">
                  Search tools
                </label>
                <input
                  ref={desktopInputRef}
                  id="site-search"
                  type="search"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={handleSearchFocus}
                  className="min-w-0 w-full bg-transparent text-[14px] font-medium outline-none placeholder:text-[#505a70] dark:placeholder:text-slate-400 dark:text-on-surface-variant min-[400px]:text-[16px] xl:text-[18px]"
                />
              </form>
              <SearchDropdown
                query={searchQuery}
                open={dropdownOpen}
                onClose={closeDropdown}
                inputRef={desktopInputRef}
                navOnEnterRef={navOnEnterRef}
              />
            </div>
          </div>

          {/* RIGHT: nav · moon · cta · search icon (mobile) · hamburger */}
          <div className="flex shrink-0 items-center gap-3 min-[700px]:gap-5 xl:gap-9">
            {/* Desktop nav — ≥901px */}
            <nav
              aria-label="Primary navigation"
              className="hidden h-[30px] items-center gap-4 xl:gap-8 min-[901px]:flex"
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex h-full items-center whitespace-nowrap border-b-2 px-0 text-[15px] font-medium transition min-[1180px]:text-[16px] xl:text-[17px] ${active
                        ? "border-[var(--color-brand)] text-[var(--color-brand)] dark:border-primary dark:text-primary-fixed-dim"
                        : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-brand)] dark:text-on-surface-variant dark:hover:text-primary-fixed-dim"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Night mode — ≥901px only */}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="hidden min-[901px]:inline-flex size-8 items-center justify-center rounded-full text-[#111827] dark:text-on-surface transition hover:bg-[#e8eefc] dark:hover:bg-surface-container min-[700px]:size-8 xl:size-9"
            >
              {theme === "dark" ? (
                <Sun className="size-6 min-[700px]:size-6" strokeWidth={2.35} aria-hidden="true" />
              ) : (
                <Moon className="size-6 min-[700px]:size-6" strokeWidth={2.35} aria-hidden="true" />
              )}
            </button>


            {/* Request a Tool — ≥901px only */}
            <SafeLink
              href="/request-tool"
              className="hidden min-[901px]:inline-flex h-10 w-[150px] shrink-0 items-center justify-center rounded-full bg-[#004ac6] text-[16px] font-extrabold text-white transition hover:bg-[#0649c5] min-[700px]:h-10 min-[700px]:w-[150px] min-[700px]:text-[14px] xl:h-[43px] xl:w-[150px]"
            >
              Request a Tool
            </SafeLink>

            {/* Search icon — ≤580px only (triggers header-morph search) */}
            <button
              type="button"
              aria-label="Search tools"
              className="hidden max-[580px]:inline-flex size-10 items-center justify-center rounded-lg text-[var(--color-muted)] dark:text-on-surface-variant transition hover:bg-[#e8eefc] dark:hover:bg-surface-container"
              onClick={enableSearchMode}
            >
              <Search className="size-6" strokeWidth={2.35} aria-hidden="true" />
            </button>

            {/* Hamburger — ≤900px only */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Open navigation menu"
              className="hidden max-[900px]:inline-flex size-10 items-center justify-center rounded-lg text-[var(--color-muted)] dark:text-on-surface-variant transition hover:bg-[#e8eefc] dark:hover:bg-surface-container"
              style={{
                opacity: sidebarOpen ? 0 : 1,
                transition: "opacity 150ms ease-in-out",
                willChange: "opacity",
              }}
              onClick={openSidebar}
            >
              <Menu className="size-7" strokeWidth={2.35} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SEARCH MODE — full-width search form with back arrow (≤580px)   */}
        {/* ================================================================ */}
        <div
          className="hidden max-[580px]:flex absolute inset-0 mx-auto h-full w-full max-w-[1300px] items-center gap-3 px-4"
          style={{
            opacity: searchMode ? 1 : 0,
            transition: "opacity 150ms ease-in-out",
            pointerEvents: searchMode ? "auto" : "none",
          }}
        >
          {/* Back arrow — returns to normal mode */}
          <button
            type="button"
            aria-label="Close search"
            onClick={disableSearchMode}
            className="shrink-0 inline-flex size-10 items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-[#e8eefc] dark:hover:bg-surface-container transition"
          >
            <ArrowLeft className="size-6" strokeWidth={2.25} aria-hidden="true" />
          </button>

          {/* Full-width search input */}
          <div className="relative flex flex-1 items-center">
            <form
              role="search"
              className="flex flex-1 items-center h-[44px] rounded-full border border-[var(--color-border)] bg-[#f4f7ff] px-4 text-[var(--color-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="site-search-mobile" className="sr-only">
                Search tools
              </label>
              <input
                ref={searchInputRef}
                id="site-search-mobile"
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={handleSearchFocus}
                className="min-w-0 w-full bg-transparent text-[16px] font-medium outline-none placeholder:text-[#505a70]"
              />
            </form>
            <SearchDropdown
              query={searchQuery}
              open={dropdownOpen}
              onClose={closeDropdown}
              inputRef={searchInputRef}
              navOnEnterRef={navOnEnterRef}
            />
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* SIDEBAR — always in DOM for CSS transitions (≤900px)           */}
      {/* ================================================================ */}
      <div
        className="fixed inset-0 z-60 min-[901px]:hidden"
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
      >
        {/* BACKDROP — fades opacity in/out */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            opacity: sidebarOpen ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            willChange: "opacity",
          }}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        {/* PANEL — slides in from the right edge */}
        <div
          className="absolute inset-0 flex flex-col bg-[#fafbff] dark:bg-background shadow-xl"
          style={{
            transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 300ms ease-in-out",
            willChange: "transform",
          }}
        >
          {/* ----- panel inner content ----- */}
          <div className="flex h-full flex-col p-6">
            {/* Top row: logo + spacer for close button */}
            <div
              className="mb-8 flex items-center"
              style={{ paddingRight: "48px" }}
            >
              <span className="text-[22px] relative -top-3 -left-2 font-extrabold text-[var(--color-brand)] dark:text-primary-fixed-dim">
                Jamro Tools
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`border-b text-center border-[var(--color-border)] dark:border-outline py-4 text-[17px] font-semibold transition ${active
                        ? "text-[var(--color-brand)] dark:text-primary-fixed-dim"
                        : "text-[var(--color-muted)] hover:text-[var(--color-brand)] dark:text-on-surface-variant dark:hover:text-primary-fixed-dim"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Request a Tool */}
            <Link
              href="/request-tool"
              onClick={closeSidebar}
              className="mb-4 flex h-12 w-full items-center justify-center rounded-full bg-[#004ac6] text-[16px] font-extrabold text-white transition hover:bg-[#0649c5]"
            >
              Request a Tool
            </Link>

            {/* Night mode toggle */}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[var(--color-border)] dark:border-outline-variant text-[16px] font-semibold text-[var(--color-ink)] dark:text-on-surface-variant transition hover:bg-[#e8eefc] dark:hover:bg-surface-container"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="size-6" strokeWidth={2.35} aria-hidden="true" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="size-6" strokeWidth={2.35} aria-hidden="true" />
                  Dark Mode
                </>
              )}
            </button>

          </div>
        </div>

        {/* CLOSE BUTTON — fixed overlay, replaces hamburger in-place */}
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inline-flex size-10 items-center justify-center rounded-lg text-[var(--color-muted)] dark:text-on-surface-variant hover:bg-[#e8eefc] dark:hover:bg-surface-container"
          style={{
            top: `${closePos.top}px`,
            right: `${closePos.right}px`,
            opacity: sidebarOpen ? 1 : 0,
            transition: "opacity 150ms ease-in-out, background-color 150ms",
            willChange: "opacity",
            pointerEvents: sidebarOpen ? "auto" : "none",
          }}
          onClick={closeSidebar}
        >
          <X className="size-7" strokeWidth={2.35} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
