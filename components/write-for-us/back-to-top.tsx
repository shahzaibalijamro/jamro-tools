"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] transition-all active:scale-95"
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        arrow_upward
      </span>
      Back to top
    </button>
  );
}
