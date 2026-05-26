export function PrivacyHero() {
  return (
    <>
      {/* Mobile Hero */}
      <section className="px-4 pb-4 pt-6 sm:px-6 md:hidden bg-[#f0f3ff]">
        <h1 className="mb-1 text-[24px] font-semibold leading-[1.2] text-[#111c2d]">
          Privacy Policy
        </h1>
        <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655]">
          Last updated: May 26, 2026
        </p>
      </section>

      {/* Desktop Hero — inside the main content card */}
      <header className="hidden md:mb-12 md:block">
        <h1 className="mb-2 text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
          Privacy Policy
        </h1>
        <p className="text-[16px] leading-[1.6] text-[#434655]">
          Last updated: May 26, 2026
        </p>
        <hr className="mt-4 border-[#c3c6d7]" />
      </header>
    </>
  );
}