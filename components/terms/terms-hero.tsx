/** Inline Material Symbol — follows the existing project pattern */
function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

export function TermsHero() {
  return (
    <>
      {/* Mobile Hero — centered with gavel icon */}
      <section className="px-4 pb-4 pt-6 sm:px-6 md:hidden">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-[#2563eb] text-[#eeefff] shadow-sm">
            <Icon name="gavel" className="text-4xl" />
          </div>
          <h1 className="mb-1 text-[24px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            Jamro Tools Legal
          </h1>
          <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#434655] dark:text-on-surface-variant">
            Last updated: May 26, 2026
          </p>
        </div>
      </section>

      {/* Desktop Hero — inside the main content card */}
      <header className="hidden md:mb-12 md:block">
        <span className="mb-3 inline-block rounded-full bg-[#dbe1ff] dark:bg-surface-container px-4 py-1 text-[12px] font-normal uppercase leading-[1.4] tracking-widest text-[#00174b] dark:text-on-surface-variant">
          Legal Document
        </span>
        <h1 className="mb-2 text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
          Terms of Service
        </h1>
        <p className="mb-2 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          Last Updated: May 26, 2026. Please read these terms carefully before using Jamro Tools.
        </p>
      </header>
    </>
  );
}