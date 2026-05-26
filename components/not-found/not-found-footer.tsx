import Link from "next/link";

export function NotFoundFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-[20px] font-bold leading-[1.4] text-primary">
            Jamro Tools
          </span>
          <p className="text-[16px] leading-[1.6] text-on-surface-variant">
            © 2026 Jamro Utility System. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-[16px] leading-[1.6] text-on-surface-variant transition-all hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[16px] leading-[1.6] text-on-surface-variant transition-all hover:text-primary hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="/api"
            className="text-[16px] leading-[1.6] text-on-surface-variant transition-all hover:text-primary hover:underline"
          >
            API Documentation
          </Link>
          <Link
            href="/contact"
            className="text-[16px] leading-[1.6] text-on-surface-variant transition-all hover:text-primary hover:underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}