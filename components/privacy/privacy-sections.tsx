import Image from "next/image";
import Link from "next/link";

/** Inline Material Symbol — follows the existing about page pattern */
function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

export function PrivacySections() {
  return (
    <article className="space-y-6 mt-6 px-4 pb-12 sm:px-6 md:py-0">
      {/* ============ MOBILE: Summary Card (hidden on desktop) ============ */}
      <div className="rounded-xl bg-[#2563eb] p-6 text-[#eeefff] shadow-sm md:hidden">
        <div className="flex items-start gap-4">
          <Icon name="shield" className="mt-1" />
          <div>
            <h3 className="mb-1 text-[20px] font-semibold leading-[1.4]">
              Privacy at a Glance
            </h3>
            <p className="text-[16px] leading-[1.6] opacity-90">
              We believe in radical transparency. Jamro Tools does not sell your personal
              data. We only collect what is strictly necessary to provide our digital utility
              services.
            </p>
          </div>
        </div>
      </div>

      {/* ============ DESKTOP: Section 1 — Introduction ============ */}
      <section
        id="introduction"
        className="scroll-mt-24 md:scroll-mt-20"
      >
        {/* Mobile heading style */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="info" className="text-[#004ac6]" />
          Introduction
        </h2>

        {/* Desktop heading style */}
        <h2 className="mb-4 hidden text-[20px] font-semibold leading-[1.4] text-[#004ac6] md:flex md:items-center md:gap-1">
          1. Introduction
        </h2>

        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            Welcome to Jamro Tools. We respect your privacy and are committed to protecting
            it through our compliance with this policy. This Privacy Policy describes the
            types of information we may collect from you or that you may provide when you
            visit the Jamro Tools website and our practices for collecting, using,
            maintaining, protecting, and disclosing that information.
          </p>
          {/* Extra paragraph for mobile */}
          <p className="md:hidden">
            By using Jamro Tools, you agree to the practices described in this policy. We
            encourage you to read this document carefully to understand our commitment to
            your data security.
          </p>
          <p className="hidden md:block">
            This policy applies to information we collect on this Website and in email,
            text, or other electronic messages between you and this Website.
          </p>
        </div>
      </section>

      {/* ============ MOBILE: Data Collection (hidden on desktop) ============ */}
      <section id="data-collection" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="database" className="text-[#004ac6]" />
          Data Collection
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>We collect information in the following ways:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Voluntary Information:</strong> When you create an account, we store
              your email address and name.
            </li>
            <li>
              <strong>Usage Metadata:</strong> To optimize our tools, we collect anonymous
              data on how frequently specific features are used.
            </li>
            <li>
              <strong>Tool Inputs:</strong> For most tools (e.g., Text Formatters,
              Converters), the data is processed in your browser and never sent to our
              servers.
            </li>
          </ul>
        </div>
      </section>

      {/* ============ DESKTOP: Section 2 — Information We Collect (hidden on mobile) ============ */}
      <section id="information-collect" className="hidden md:block scroll-mt-20">
        <h2 className="mb-4 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
          2. Information We Collect
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            We believe in data minimization. As a utility-focused platform, we collect very
            limited information:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Device Information:</strong> We may collect basic information about
              your device, including your IP address and browser type, to ensure tool
              compatibility and prevent abuse.
            </li>
            <li>
              <strong>Tool Inputs:</strong> For most tools (like Text Formatters or Math
              Converters), the data you process remains client-side. We do not store the
              content of your inputs unless explicitly stated for specific "Cloud
              Save" features.
            </li>
            <li>
              <strong>Account Data:</strong> If you create an account, we collect your name
              and email address to manage your preferences and subscription status.
            </li>
          </ul>
        </div>
      </section>

      {/* ============ Shared: Divider (mobile) / Banner Image (desktop) ============ */}
      <div className="h-px bg-[#c3c6d7] md:hidden" />

      {/* Mobile: Security illustration */}
      <div className="relative aspect-video overflow-hidden rounded-xl shadow-sm group md:hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhdqqaM8iUHwUaMkjJQhNuDjHPZa07aCTEWfgD3ZiH-ADECEnpbiKd4jgHvIiLPZLCZzIOrFfa5An6Ddzpq01ThOtciUFWcRX-XsAUVUW4QJDIf1tfRXPcOSbPrT_N1036NkXIor9WVYckW3w-fzCpoRjcBcsjYQVB_nHuZPKi_oBdH6NgRUaVE0ZE3TTLUaACtZW5HGXDVULEPporeyx7ipcZKzbZro-_Ezro_OsYMGtYWk4DmMj4Sh7e2H37BRv0gR5-p_Qjd6Rj"
          alt="A clean, modern digital illustration showcasing data security concepts for a mobile UI."
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Desktop: Banner image with shield */}
      <div className="my-12 hidden items-center justify-center overflow-hidden rounded-xl bg-[#dee8ff] h-48 md:flex md:h-64">
        <div className="p-6 text-center">
          <Icon name="shield_with_heart" className="mb-2 text-[32px] text-[#004ac6]" />
          <p className="text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
            Your data security is our top priority.
          </p>
        </div>
        <div className="hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvziqFrrMMtBH0YZ-vTgWbqvY1dRlyoN0L06kRaZOQj9EQNit_zNZnCRAlATEdTX6lzUeNPVMcbq_jvIFlzNLOvWAEp6IU58ooazQBjv7Hp4kGUVVzcJcSXE-vH4pY7WtEokuKqIVFJQIiJ_t3mmy7ogXOd7Jn9q5-QhtSB-vjcw6A8G5yh3sLKzvDnYrFgGCPFW5yaSjTu4XNsVxZkpSGprVqfRJVi6jjLUTwk1LKdPR9YsFJ2y_pKlQA0FPlruIxFdCOysbOyGDo"
            alt="Privacy and Security Illustration"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* ============ MOBILE: Cookies (hidden on desktop) ============ */}
      <section id="cookies" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="cookie" className="text-[#004ac6]" />
          Cookies & Tracking
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            We use essential cookies to maintain your session and remember your preferences
            (like Dark Mode settings). We do not use third-party advertising cookies that
            track you across other websites.
          </p>
        </div>
      </section>

      {/* ============ MOBILE: Security (hidden on desktop) ============ */}
      <section id="security" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="lock" className="text-[#004ac6]" />
          Security Measures
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            We employ industry-standard encryption (TLS/SSL) for all data transmissions. Our
            databases are encrypted at rest and access is strictly controlled via
            multi-factor authentication for our internal systems.
          </p>
        </div>
      </section>

      {/* ============ MOBILE: Your Rights (hidden on desktop) ============ */}
      <section id="rights" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="person" className="text-[#004ac6]" />
          Your Data Rights
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>Under GDPR and CCPA, you have the right to:</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-[#f9f9ff] p-2">
              <Icon name="visibility" className="text-[#0058be]" />
              <span>Access your stored data</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#f9f9ff] p-2">
              <Icon name="edit" className="text-[#0058be]" />
              <span>Correct inaccuracies</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#f9f9ff] p-2">
              <Icon name="delete" className="text-[#0058be]" />
              <span>Delete your account</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DESKTOP: Section 3 — How We Use Information (hidden on mobile) ============ */}
      <section id="how-we-use" className="hidden md:block scroll-mt-20">
        <h2 className="mb-4 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
          3. How We Use Information
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>To provide and maintain the Website and its features.</li>
            <li>To personalize your experience and remember your tool settings.</li>
            <li>
              <strong>AdSense & Advertising:</strong> We use Google AdSense to serve
              advertisements. Google, as a third-party vendor, uses cookies to serve ads on
              our site based on your visit to this site and other sites on the Internet.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies to manage your session and
              preference cookies to store your preferred tool layouts.
            </li>
          </ul>
        </div>
      </section>

      {/* ============ DESKTOP: Section 4 — Third-Party Services (hidden on mobile) ============ */}
      <section id="third-party" className="hidden md:block scroll-mt-20">
        <h2 className="mb-4 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
          4. Third-Party Services
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            We may employ third-party companies and individuals due to the following
            reasons:
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#c3c6d7] bg-[#f0f3ff] p-4">
              <h3 className="mb-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#111c2d]">
                Analytics
              </h3>
              <p className="text-[12px] leading-[1.4]">
                We use Google Analytics to monitor and analyze the use of our Service to
                improve performance.
              </p>
            </div>
            <div className="rounded-lg border border-[#c3c6d7] bg-[#f0f3ff] p-4">
              <h3 className="mb-1 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#111c2d]">
                Advertising
              </h3>
              <p className="text-[12px] leading-[1.4]">
                Google AdSense may use cookies and web beacons to collect data in the
                ad-serving process.
              </p>
            </div>
          </div>
          <p className="mt-4">
            We have no control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>
        </div>
      </section>

      {/* ============ Shared: Contact Section ============ */}
      <section
        id="contact"
        className="scroll-mt-40 md:scroll-mt-20"
      >
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="mail" className="text-[#004ac6]" />
          Contact Us
        </h2>

        {/* Desktop heading */}
        <h2 className="mb-4 hidden text-[20px] font-semibold leading-[1.4] text-[#004ac6] md:block">
          5. Contact Us
        </h2>

        {/* Mobile contact */}
        <div className="md:hidden">
          <p className="mb-4 text-[16px] leading-[1.6] text-[#434655]">
            If you have any questions about this Privacy Policy, please contact our data
            protection officer at:
          </p>
          <Link
            href="mailto:privacy@jamrotools.com"
            className="inline-flex items-center gap-1 rounded-full bg-[#0058be] px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all active:scale-95"
          >
            <Icon name="send" />
            privacy@jamrotools.com
          </Link>
        </div>

        {/* Desktop contact */}
        <div className="hidden space-y-4 rounded-xl border border-[#004ac6]/20 bg-[#f0f3ff] p-6 text-[16px] leading-[1.6] text-[#434655] md:block">
          <p>
            If you have any questions about this Privacy Policy, you can contact our privacy
            team:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Icon name="mail" className="text-[#004ac6]" />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em]">
                privacy@jamrotools.com
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="location_on" className="text-[#004ac6]" />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em]">
                123 Utility Ave, Suite 500, San Francisco, CA
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-4 rounded-lg bg-[#0058be] px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all hover:shadow-md active:scale-95"
          >
            Send a Message
          </button>
        </div>
      </section>
    </article>
  );
}