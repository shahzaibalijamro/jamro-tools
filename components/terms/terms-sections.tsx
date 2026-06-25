"use client";

import Link from "next/link";

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
      {/* ============ Summary Card ============ */}
      <div className="rounded-xl bg-[#2563eb] p-6 text-[#eeefff] shadow-sm">
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
      <section id="acceptance-of-terms" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="task_alt" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            1. Acceptance of Terms
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="task_alt" className="text-[#004ac6]" />
          1. Acceptance of Terms
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            Welcome to Jamro Tools. By accessing or using <a href="https://jamrotools.com/" className="text-[#004ac6] hover:underline">https://jamrotools.com</a>, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 2 — Use of the Website ============ */}
      <section id="use-of-the-website" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-6 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="gavel" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            2. Use of the Website
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="gavel" className="text-[#004ac6]" />
          2. Use of the Website
        </h2>

        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>Jamro Tools provides free online utility tools and informational content for general use.</p>
          <p>You agree to use the website only for lawful purposes and in a manner that does not:</p>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#e7eeff] dark:bg-surface-container p-6">
              <Icon name="gavel" className="mb-2 text-[#004ac6]" />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
                Violate Laws
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
                Violate any applicable laws or regulations
              </p>
            </div>
            <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#e7eeff] dark:bg-surface-container p-6">
              <Icon name="security" className="mb-2 text-[#004ac6]" />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
                Interfere
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
                Interfere with the operation or security of the website
              </p>
            </div>
            <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#e7eeff] dark:bg-surface-container p-6">
              <Icon name="lock_open" className="mb-2 text-[#004ac6]" />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
                Unauthorized Access
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
                Attempt to gain unauthorized access to any part of the website
              </p>
            </div>
            <div className="rounded-xl border border-[#c3c6d7] dark:border-outline-variant bg-[#e7eeff] dark:bg-surface-container p-6">
              <Icon name="bug_report" className="mb-2 text-[#004ac6]" />
              <h3 className="mb-2 text-[20px] font-semibold leading-[1.4] text-[#004ac6]">
                Distribute Malware
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
                Distribute malicious software, spam, or harmful content
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 3 — Tool Accuracy Disclaimer ============ */}
      <section id="tool-accuracy-disclaimer" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#943700] text-[#ffede6]">
            <Icon name="warning" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            3. Tool Accuracy Disclaimer
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="warning" className="text-[#943700]" />
          3. Tool Accuracy Disclaimer
        </h2>
        
        <div className="mb-4 rounded-lg border-l-4 border-[#943700] bg-[#dee8ff] dark:bg-surface-container p-6">
          <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
            While we strive to provide accurate and reliable tools, we do not guarantee that all results, calculations, conversions, or outputs will always be accurate, complete, or error-free.
          </p>
        </div>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            Users are responsible for verifying any important information generated through our tools before relying on it.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 4 — Intellectual Property ============ */}
      <section id="intellectual-property" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] dark:bg-surface-container-high text-[#434655] dark:text-on-surface-variant">
            <Icon name="copyright" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            4. Intellectual Property
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="copyright" className="text-[#004ac6]" />
          4. Intellectual Property
        </h2>
        
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            Unless otherwise stated, all content on Jamro Tools, including text, design, logos, graphics, and website functionality, is the property of Jamro Tools and is protected by applicable intellectual property laws.
          </p>
          <p>
            You may use our website for personal and lawful purposes. You may not copy, reproduce, distribute, or republish substantial portions of our content without permission.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 5 — Third-Party Links ============ */}
      <section id="third-party-links" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="link" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            5. Third-Party Links
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="link" className="text-[#004ac6]" />
          5. Third-Party Links
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>Our website may contain links to third-party websites or services.</p>
          <p>
            These links are provided for convenience only. We do not control or endorse third-party websites and are not responsible for their content, services, or privacy practices.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 6 — Advertisements ============ */}
      <section id="advertisements" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="ads_click" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            6. Advertisements
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="ads_click" className="text-[#004ac6]" />
          6. Advertisements
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            Jamro Tools may display advertisements provided by third-party advertising networks, including Google AdSense.
          </p>
          <p>
            We are not responsible for the products, services, or claims made by advertisers appearing on our website.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 7 — Limitation of Liability ============ */}
      <section id="limitation-of-liability" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ffdad6] text-[#93000a]">
            <Icon name="security_update_warning" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            7. Limitation of Liability
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="security_update_warning" className="text-[#93000a]" />
          7. Limitation of Liability
        </h2>
        
        <div className="mb-4 rounded-lg border-l-4 border-[#ffdad6] dark:border-error/50 bg-[#fff5f4] dark:bg-error-container/30 p-6">
          <p className="mb-2 font-bold italic text-[#93000a]">
            USE OF THE WEBSITE IS AT YOUR OWN RISK.
          </p>
          <p className="text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
            To the fullest extent permitted by law, Jamro Tools and its owner shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
            <li>Use of or inability to use the website</li>
            <li>Errors or inaccuracies in tool results</li>
            <li>Website interruptions or downtime</li>
            <li>Loss of data, profits, or business opportunities</li>
          </ul>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 8 — Website Availability ============ */}
      <section id="website-availability" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] dark:bg-surface-container-high text-[#434655] dark:text-on-surface-variant">
            <Icon name="cloud_sync" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            8. Website Availability
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="cloud_sync" className="text-[#004ac6]" />
          8. Website Availability
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the website, tools, or services at any time without prior notice.
          </p>
          <p>
            We do not guarantee uninterrupted access to the website.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 9 — Privacy ============ */}
      <section id="privacy" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="shield" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            9. Privacy
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="shield" className="text-[#004ac6]" />
          9. Privacy
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            Your use of Jamro Tools is also governed by our Privacy Policy, which explains how information is collected and used.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 10 — Changes to These Terms ============ */}
      <section id="changes-to-these-terms" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="update" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            10. Changes to These Terms
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="update" className="text-[#004ac6]" />
          10. Changes to These Terms
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>We may update these Terms and Conditions at any time.</p>
          <p>
            Changes become effective immediately upon posting on this page. Continued use of the website after changes are posted constitutes acceptance of the updated terms.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 11 — Governing Law ============ */}
      <section id="governing-law" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] dark:bg-surface-container-high text-[#434655] dark:text-on-surface-variant">
            <Icon name="public" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            11. Governing Law
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="public" className="text-[#004ac6]" />
          11. Governing Law
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>
            These Terms and Conditions shall be governed and interpreted in accordance with the laws of Pakistan, without regard to conflict of law principles.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      {/* ============ Section 12 — Contact Information ============ */}
      <section id="contact-information" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="mail" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
            12. Contact Information
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
          <Icon name="mail" className="text-[#004ac6]" />
          12. Contact Information
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-4 rounded-lg bg-[#e7eeff] dark:bg-surface-container p-4">
              <Icon name="mail" className="text-[#004ac6]" />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em]">
                umeralijamro@gmail.com
              </span>
            </div>
            <Link
              href="/contact"
              className="flex flex-1 items-center gap-4 rounded-lg bg-[#e7eeff] dark:bg-surface-container p-4 transition-colors hover:bg-[#dee8ff] dark:bg-surface-container"
            >
              <Icon name="language" className="text-[#004ac6]" />
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6]">
                https://jamrotools.com/contact
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* ============ Mobile: Back to Top button ============ */}
      <div className="flex flex-col items-center border-t border-[#c3c6d7] dark:border-outline-variant pt-6 md:hidden">
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