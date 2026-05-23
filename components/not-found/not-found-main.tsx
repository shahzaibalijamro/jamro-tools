"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { bentoCategories } from "@/components/not-found/not-found-data";

export function NotFoundMain() {
  const router = useRouter();
  const floatRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  /* ── Desktop parallax on the floating 404 icon ── */
  const handleDesktopParallax = useCallback((e: MouseEvent) => {
    const el = floatRef.current;
    if (!el) return;
    const amount = 20;
    const x = (e.clientX / window.innerWidth - 0.5) * amount;
    const y = (e.clientY / window.innerHeight - 0.5) * amount;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  /* ── Mobile glass-card 3D tilt (activates only > 768 px, as in the original HTML) ── */
  const handleGlassTilt = useCallback((e: MouseEvent) => {
    const card = glassCardRef.current;
    if (!card) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleDesktopParallax);
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleGlassTilt);
    }
    return () => {
      window.removeEventListener("mousemove", handleDesktopParallax);
      window.removeEventListener("mousemove", handleGlassTilt);
    };
  }, [handleDesktopParallax, handleGlassTilt]);

  /* ── Search enter handler ── */
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value.trim();
      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center pt-10 pb-12 px-4 sm:px-6 max-w-[1280px] mx-auto w-full relative overflow-hidden">
      {/* ── Atmospheric blobs (mobile only) ── */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl md:hidden" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl md:hidden" />

      {/* ======================================================================== */}
      {/* DESKTOP HERO                                                             */}
      {/* ======================================================================== */}
      <div className="relative w-full max-w-2xl flex-col items-center text-center hidden md:flex">
        {/* Floating icon with 404 overlay */}
        <div ref={floatRef} className="animate-float mb-6">
          <div className="relative">
            <span
              className="material-symbols-outlined text-[120px] text-primary/20 select-none"
              style={{ fontVariationSettings: "'wght' 200", fontSize: "120px !important" }}
            >
              extension_off
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-primary opacity-90">
                404
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-on-surface mb-2">
          Oops! Tool Not Found
        </h1>
        <p className="text-[18px] leading-[1.6] text-on-surface-variant max-w-md mb-12">
          The utility you're looking for seems to have vanished into the
          digital void. Don't worry, our workshop is still full of other
          helpful tools.
        </p>

        {/* Search (desktop) */}
        <div className="w-full max-w-lg glass-panel p-4 rounded-xl mb-12 shadow-sm">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Search for another utility (e.g., JSON Formatter)..."
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-surface-container-low border-none rounded-full py-4 pl-12 pr-4 text-[16px] leading-[1.6] focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none"
            />
          </div>
        </div>

        {/* Action buttons (desktop) */}
        <div className="flex flex-row gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-12 py-4 rounded-full text-[14px] font-semibold leading-[1.4] tracking-[0.01em] hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-12 py-4 rounded-full text-[14px] font-semibold leading-[1.4] tracking-[0.01em] hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Previous Page
          </button>
        </div>

        {/* Bento category grid (desktop only) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {bentoCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="glass-panel p-6 rounded-xl flex flex-col items-center group hover:bg-surface-container-high transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">
                  {cat.icon}
                </span>
              </div>
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-on-surface">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ======================================================================== */}
      {/* MOBILE HERO                                                              */}
      {/* ======================================================================== */}
      <div className="w-full max-w-md text-center flex flex-col items-center md:hidden">
        {/* Glass card with image and 404 */}
        <div
          ref={glassCardRef}
          className="glass-panel w-full aspect-square mb-12 rounded-xl flex items-center justify-center relative group overflow-hidden"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuADN2zOorOw0-XHN7ef4ig624x1GwCPuz25MmS4BubG_xNumD14z2cQmJR_NL6O-s2TJEuJaSNjeopicPxsLiJml5wo7IITNEXkjETUB9x13Zwa0bM2kqJ2ynyT-NvZIL69ipkC7RY4-QYKWu1X408ikPfZ3yfhGm3TeQpCSrT_V4YZ6d-r2f4W7gA-PirlqT7W13nKP8X5PQ-Z9SrAtnS6jbAtkH2HXadnX9Co12i87p-kii2CceUYQ7GjUBbI1LT8UfOAfmBfWV4B"
            alt="Error 404 Illustration"
            fill
            className="absolute inset-0 object-cover opacity-10 grayscale group-hover:opacity-20 transition-opacity"
            sizes="(max-width: 768px) 100vw, 0vw"
            priority
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[120px] font-extrabold text-primary leading-none tracking-tighter mb-1">
              404
            </span>
            <div className="bg-primary/10 px-4 py-1 rounded-full border border-primary/20 backdrop-blur-md">
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-primary">
                FILE_NOT_FOUND
              </span>
            </div>
          </div>
        </div>

        {/* Error messaging (mobile) */}
        <div className="space-y-2 mb-12">
          <h1 className="text-[36px] font-semibold leading-[1.1] text-on-surface">
            Lost in the System?
          </h1>
          <p className="text-[16px] leading-[1.6] text-on-surface-variant max-w-[280px] mx-auto">
            The tool or documentation you are looking for has either been moved
            or never existed in this dimension.
          </p>
        </div>

        {/* Search (mobile) */}
        <div className="w-full mb-6">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search for a tool..."
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-surface-container-low border border-outline-variant rounded-full py-4 pl-[52px] pr-4 text-[16px] leading-[1.6] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Action buttons (mobile — stacked) */}
        <div className="flex flex-col w-full gap-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-4 rounded-full text-[14px] font-semibold leading-[1.4] tracking-[0.01em] shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
            Return Home
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center bg-surface-container-lowest border border-outline-variant text-on-surface-variant py-4 rounded-full text-[14px] font-semibold leading-[1.4] tracking-[0.01em] hover:bg-surface-container-low transition-all active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}