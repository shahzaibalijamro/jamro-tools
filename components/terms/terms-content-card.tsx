"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

interface TermsContentCardProps {
  children: ReactNode;
}

export function TermsContentCard({ children }: TermsContentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shadowStyle, setShadowStyle] = useState<string>(
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const moveX = (x - 0.5) * 10;
    const moveY = (y - 0.5) * 10;
    setShadowStyle(`${moveX}px ${moveY}px 40px -20px rgba(0, 74, 198, 0.15)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShadowStyle(
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-w-0 flex-1 rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-white dark:bg-surface-container p-8 transition-shadow duration-150"
      style={{ boxShadow: shadowStyle }}
    >
      {children}
    </div>
  );
}