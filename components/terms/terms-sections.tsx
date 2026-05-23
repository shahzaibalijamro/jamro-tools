"use client";

/** Inline Material Symbol — follows the existing project pattern */
function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

export function TermsSections() {
  return (
    <article className="mt-6 space-y-6 px-4 pb-12 sm:px-6 md:py-0">
      {/* ============ MOBILE: Disclaimer Card (hidden on desktop) ============ */}
      <div className="rounded-xl bg-[#2563eb] p-6 text-[#eeefff] shadow-sm md:hidden">
        <div className="flex items-start gap-4">
          <Icon name="gavel" className="mt-1" />
          <div>
            <h3 className="mb-1 text-[20px] font-semibold leading-[1.4]">
              Please Read Carefully
            </h3>
            <p className="text-[16px] leading-[1.6] opacity-90">
              By using Jamro Tools, you agree to be bound by these conditions. Our tools are
              provided for legitimate productivity and development purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* ============ Section 1 — Acceptance of Terms ============ */}
      <section id="acceptance" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading with icon box */}
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="task_alt" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
            1. Acceptance of Terms
          </h2>
        </div>
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="task_alt" className="text-[#004ac6]" />
          1. Acceptance of Terms
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p className="hidden md:block">
            By accessing and using Jamro Tools ("the Service"), you signify your
            agreement to be bound by these Terms of Service. If you do not agree to all of
            these terms, do not use this Service. Jamro Tools provides a digital suite of
            utility tools including text processing, image manipulation, and mathematical
            conversion. Your continued use of the platform constitutes acceptance of any future
            modifications to these terms.
          </p>
          {/* Extra mobile-only content from mobile HTML */}
          <p className="md:hidden">
            Welcome to Jamro Tools. By accessing or using our platform, including our text,
            image, and math conversion tools, you agree to comply with and be bound by these
            Terms of Service. If you do not agree to these terms, please do not use our
            services.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[#c3c6d7] hidden md:block" />

      {/* ============ Mobile-only: Section 2 — Description of Service ============ */}
      <section id="description" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="description" className="text-[#004ac6]" />
          2. Description of Service
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            Jamro Tools provides a suite of digital utilities ("Tools") for
            developers, writers, and general users. We reserve the right to modify, suspend,
            or discontinue any tool or feature at any time without notice.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Text Processing (formatting, sanitization)</li>
            <li>Image Conversion and Optimization</li>
            <li>Mathematical and Developer Utilities</li>
            <li>Unit and Currency Converters</li>
          </ul>
        </div>
      </section>

      {/* ============ Section 3 (3 on desktop, 2 on desktop for "Terms of Use") — Terms of Use ============ */}
      <section id="terms-of-use" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading with icon box */}
        <div className="mb-6 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="gavel" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
            2. Terms of Use
          </h2>
        </div>
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="gavel" className="text-[#004ac6]" />
          3. Terms of Use
        </h2>

        {/* Desktop: Bento grid cards */}
        <div className="mb-4 hidden grid-cols-1 gap-4 md:grid md:grid-cols-2">
          <div className="rounded-xl border border-[#c3c6d7] bg-[#e7eeff] p-6">
            <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
              User Obligations
            </h3>
            <p className="text-[16px] leading-[1.6] text-[#434655]">
              Users must provide accurate information when creating an account and are
              responsible for maintaining the confidentiality of their credentials. You agree
              not to misuse the tools for any illegal or unauthorized purpose.
            </p>
          </div>
          <div className="rounded-xl border border-[#c3c6d7] bg-[#e7eeff] p-6">
            <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
              Acceptable Use
            </h3>
            <p className="text-[16px] leading-[1.6] text-[#434655]">
              Our tools are provided for legitimate productivity and development. Use of
              automated systems or "bots" to scrape or abuse our API without
              authorization is strictly prohibited.
            </p>
          </div>
        </div>

        {/* Mobile: simpler content */}
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] md:hidden">
          <p>
            Users must provide accurate information when creating an account and are
            responsible for maintaining the confidentiality of their credentials. You agree
            not to misuse the tools for any illegal or unauthorized purpose.
          </p>
          <p>
            Our tools are provided for legitimate productivity and development. Use of automated
            systems or "bots" to scrape or abuse our API without authorization is
            strictly prohibited.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[#c3c6d7] hidden md:block" />

      {/* ============ Mobile-only: Section 4 — User Responsibilities ============ */}
      <section id="responsibilities" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="assignment_ind" className="text-[#004ac6]" />
          4. User Responsibilities
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            You are responsible for any content you input or process through Jamro Tools. You
            agree not to use the service for:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Uploading malicious code or malware</li>
            <li>Attempting to bypass security measures</li>
            <li>Processing content that violates copyright or intellectual property rights</li>
            <li>Automated scraping that causes undue load on our infrastructure</li>
          </ul>
        </div>
      </section>

      {/* ============ Mobile-only: Section 5 — Intellectual Property ============ */}
      <section id="intellectual-property" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="copyright" className="text-[#004ac6]" />
          5. Intellectual Property
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            The Jamro Tools interface, brand, and proprietary algorithms are owned by Jamro
            Tools. Users retain full ownership of the data they process through our tools. We
            do not store or claim ownership of your uploaded files beyond the time necessary to
            perform the requested conversion.
          </p>
        </div>
      </section>

      {/* ============ Section: Disclaimer of Warranties (3 on desktop, 6 on mobile) ============ */}
      <hr className="border-[#c3c6d7] hidden md:block" />
      <section id="warranties" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading */}
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#943700] text-[#ffede6]">
            <Icon name="warning" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
            3. Disclaimer of Warranties
          </h2>
        </div>
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="warning" className="text-[#004ac6]" />
          6. Disclaimer of Warranties
        </h2>

        {/* Desktop: Highlight box */}
        <div className="mb-4 hidden rounded-lg border-l-4 border-[#943700] bg-[#dee8ff] p-6 md:block">
          <p className="mb-2 font-bold italic text-[#434655]">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE".
          </p>
          <p className="text-[16px] leading-[1.6] text-[#434655]">
            Jamro Tools expressly disclaims all warranties of any kind, whether express or
            implied, including but not limited to the implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement. We do not warrant that the
            results obtained from the use of the tools will be accurate or reliable at all
            times.
          </p>
        </div>

        {/* Mobile: simpler */}
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] md:hidden">
          <p className="font-bold">
            JAMRO TOOLS IS PROVIDED "AS IS" AND "AS AVAILABLE." WE DISCLAIM
            ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE ACCURACY,
            RELIABILITY, OR COMPLETENESS OF THE RESULTS PRODUCED BY OUR TOOLS.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[#c3c6d7] hidden md:block" />

      {/* ============ Section: Limitation of Liability (4 desktop, 7 mobile) ============ */}
      <section id="liability" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading */}
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ffdad6] text-[#93000a]">
            <Icon name="security_update_warning" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
            4. Limitation of Liability
          </h2>
        </div>
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="security_update_warning" className="text-[#004ac6]" />
          7. Limitation of Liability
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            In no event shall Jamro Tools, its directors, employees, or partners, be liable
            for any indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or inability to
            access or use the service; (ii) any conduct or content of any third party on the
            service.
          </p>
          <p className="md:hidden">
            Jamro Tools shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability to use
            the service, even if we have been advised of the possibility of such damages.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[#c3c6d7] hidden md:block" />

      {/* ============ Mobile-only: Section 8 — Privacy Policy ============ */}
      <section id="privacy" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="shield" className="text-[#004ac6]" />
          8. Privacy Policy
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            Your use of Jamro Tools is also governed by our Privacy Policy. We prioritize your
            data privacy and process most operations client-side when possible to ensure maximum
            security.
          </p>
        </div>
      </section>

      {/* ============ Mobile-only: Section 9 — Changes to Terms ============ */}
      <section id="changes" className="md:hidden scroll-mt-40">
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
          <Icon name="update" className="text-[#004ac6]" />
          9. Changes to Terms
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            We may update these terms from time to time. We will notify you of any changes by
            posting the new Terms of Service on this page and updating the "Last
            updated" date.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-[#c3c6d7] hidden md:block" />

      {/* ============ Section: Governing Law (5 desktop, 10 mobile) ============ */}
      <section id="governing-law" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading */}
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] text-[#434655]">
            <Icon name="public" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d]">
            5. Governing Law
          </h2>
        </div>
        {/* Mobile heading */}
        <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] md:hidden">
          <Icon name="public" className="text-[#004ac6]" />
          10. Governing Law
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
          <p>
            These Terms shall be governed and construed in accordance with the laws of the
            Jurisdiction in which Jamro Tools operates, without regard to its conflict of law
            provisions. Any dispute arising from these terms shall be resolved exclusively in
            the competent courts of said jurisdiction.
          </p>
        </div>
      </section>

      {/* ============ Section: Contact (6 desktop, 11 mobile) ============ */}
      <section id="contact-us" className="scroll-mt-24 md:scroll-mt-20">
        {/* Desktop heading */}
        <div className="mb-4 hidden items-center gap-4 md:block">
          {/* No icon-box heading for Contact in desktop — it's part of the CTA card outside this component */}
        </div>
        {/* Mobile heading & contact */}
        <div className="md:hidden">
          <h2 className="mb-2 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
            <Icon name="mail" className="text-[#004ac6]" />
            11. Contact Us
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655]">
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="flex items-center gap-4 rounded-lg bg-[#e7eeff] p-4">
              <Icon name="mail" className="text-[#004ac6]" />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em]">
                legal@jamrotools.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Mobile: Back to Top button ============ */}
      <div className="flex flex-col items-center border-t border-[#c3c6d7] pt-6 md:hidden">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] transition-all active:scale-95"
        >
          <Icon name="arrow_upward" />
          Back to top
        </button>
      </div>
    </article>
  );
}