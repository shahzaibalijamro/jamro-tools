"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchTools, SearchEntry } from "@/lib/search-index";

interface SearchDropdownProps {
  query: string;
  open: boolean;
  onClose: () => void;
  /** Optional ref for the input element, so we can return focus on close */
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** Ref that the parent can call to navigate to the currently selected result */
  navOnEnterRef?: React.MutableRefObject<(() => void) | null>;
}

export function SearchDropdown({ query, open, onClose, inputRef, navOnEnterRef }: SearchDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<number>(0);

  const results: SearchEntry[] = open && query.trim().length > 0 ? searchTools(query) : [];

  /* Expose a stable navigation callback to the parent so the input can trigger Enter-to-navigate */
  useEffect(() => {
    if (!navOnEnterRef) return;
    navOnEnterRef.current = () => {
      if (!open || results.length === 0) return;
      const entry = results[selectedRef.current];
      if (entry) {
        onClose();
        router.push(entry.href);
      }
    };
  }, [open, results, onClose, router, navOnEnterRef]);

  /* Reset selected index when results change */
  useEffect(() => {
    selectedRef.current = 0;
  }, [query]);

  /* Click outside → close */
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedRef.current = Math.min(selectedRef.current + 1, results.length - 1);
        scrollSelectedIntoView();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedRef.current = Math.max(selectedRef.current - 1, 0);
        scrollSelectedIntoView();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const entry = results[selectedRef.current];
        if (entry) {
          onClose();
          router.push(entry.href);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        inputRef?.current?.focus();
      }
    },
    [open, results, onClose, router, inputRef]
  );

  function scrollSelectedIntoView() {
    const el = dropdownRef.current?.querySelector(
      `[data-search-index="${selectedRef.current}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      role="listbox"
      aria-label="Search results"
      className="absolute left-0 top-full mt-2 w-full max-h-[420px] overflow-y-auto rounded-xl shadow-2xl z-[60]"
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(250, 251, 255, 0.96)",
        border: "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15), 0 4px 12px rgba(15, 23, 42, 0.08)",
      }}
      onKeyDown={handleKeyDown}
    >
      {results.length === 0 ? (
        <div
          className="px-5 py-6 text-center"
          style={{ color: "var(--color-muted)" }}
        >
          <p className="text-[14px] font-medium">No tools found for &ldquo;{query}&rdquo;</p>
          <p className="text-[12px] mt-1 opacity-70">Try a different search term</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            className="px-5 py-3 text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-muted)", opacity: 0.7 }}
          >
            {results.length} tool{results.length !== 1 ? "s" : ""} found
          </div>

          {/* Results */}
          <div className="px-1 pb-1">
            {results.map((entry, i) => {
              const selected = i === selectedRef.current;
              return (
                <button
                  key={entry.slug}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-search-index={i}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors mx-1 cursor-pointer"
                  style={{
                    backgroundColor: selected ? "rgba(0, 53, 148, 0.07)" : "transparent",
                    color: "var(--color-ink)",
                  }}
                  onMouseEnter={() => {
                    selectedRef.current = i;
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    router.push(entry.href);
                    onClose();
                  }}
                >
                  {/* Tool title */}
                  <div className="text-[15px] font-semibold leading-snug">
                    {highlightMatch(entry.title, query)}
                  </div>

                  {/* Breadcrumb */}
                  <div
                    className="flex items-center gap-[4px] mt-1 text-[12px] leading-[1.4]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span>Tools</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span>Calculators</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span>{entry.categoryTitle}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-brand)" }}
                    >
                      {entry.title}
                    </span>
                  </div>

                  {/* Description (truncated) */}
                  <div className="text-[12px] mt-1 truncate opacity-60" style={{ color: "var(--color-muted)" }}>
                    {entry.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div
            className="px-5 py-2 text-[11px] text-center border-t"
            style={{ borderColor: "rgba(226, 232, 240, 0.7)", color: "var(--color-muted)", opacity: 0.6 }}
          >
            <kbd className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(0,0,0,0.06)" }}>↑↓</kbd> Navigate &nbsp;
            <kbd className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(0,0,0,0.06)" }}>↵</kbd> Open &nbsp;
            <kbd className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(0,0,0,0.06)" }}>Esc</kbd> Close
          </div>
        </>
      )}
    </div>
  );
}

/** Wrap matching substrings in <mark> tags for visual highlighting */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);

  return (
    <>
      {before}
      <mark style={{ background: "rgba(0, 53, 148, 0.12)", color: "var(--color-brand)", borderRadius: "2px", padding: "0 1px" }}>
        {match}
      </mark>
      {after}
    </>
  );
}