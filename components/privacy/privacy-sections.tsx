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
      {/* ============ Summary Card ============ */}
      <div className="rounded-xl bg-[#2563eb] p-6 text-[#eeefff] shadow-sm">
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

      {/* ============ Section 1 — Introduction ============ */}
      <section id="introduction" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="info" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            1. Introduction
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="info" className="text-[#004ac6]" />
          1. Introduction
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>
            Welcome to Jamro Tools ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information when you visit <a href="https://jamrotools.com/" className="text-[#004ac6] hover:underline">https://jamrotools.com</a>.
          </p>
          <p>
            By using our website, you agree to the practices described in this Privacy Policy.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 2 — Information We Collect ============ */}
      <section id="information-we-collect" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="database" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            2. Information We Collect
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="database" className="text-[#004ac6]" />
          2. Information We Collect
        </h2>
        
        <div className="space-y-6 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <div>
            <h3 className="mb-2 text-[18px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100">Information You Provide</h3>
            <p className="mb-2">When you contact us through our contact form, we may collect:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Your name</li>
              <li>Your email address</li>
              <li>The message or information you submit</li>
            </ul>
            <p className="mt-2">We use this information solely to respond to your inquiries and provide support.</p>
          </div>

          <div>
            <h3 className="mb-2 text-[18px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100">Automatically Collected Information</h3>
            <p className="mb-2">When you visit our website, certain technical information may be collected automatically by our hosting provider, analytics services, or advertising partners, including:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Date and time of visits</li>
              <li>Referring website information</li>
            </ul>
            <p className="mt-2">This information helps us improve website performance, security, and user experience.</p>
          </div>
        </div>
      </section>

      {/* Banner image with shield */}
      <div className="my-12 flex items-center justify-center overflow-hidden rounded-xl bg-[#e7eeff] dark:bg-slate-800 h-48 md:h-64">
        <div className="p-6 text-center">
          <Icon name="shield_with_heart" className="mb-2 text-[32px] text-[#004ac6] dark:text-blue-400" />
          <p className="text-[20px] font-semibold leading-[1.4] text-[#004ac6] dark:text-blue-200">
            Your data security is our top priority.
          </p>
        </div>
      </div>

      {/* ============ Section 3 — How We Use Your Information ============ */}
      <section id="how-we-use-your-information" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#943700] text-[#ffede6]">
            <Icon name="build" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            3. How We Use Your Information
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="build" className="text-[#943700]" />
          3. How We Use Your Information
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>We may use collected information to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Operate and maintain our website</li>
            <li>Respond to messages submitted through our contact form</li>
            <li>Improve website functionality and performance</li>
            <li>Analyze website traffic and usage trends</li>
            <li>Protect against spam, abuse, and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 4 — Tool Usage and User Content ============ */}
      <section id="tool-usage-and-user-content" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ffdad6] text-[#93000a]">
            <Icon name="construction" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            4. Tool Usage and User Content
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="construction" className="text-[#93000a]" />
          4. Tool Usage and User Content
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>
            Most tools available on Jamro Tools process information directly within your browser.
          </p>
          <p>
            We do not intentionally store, save, or retain the content entered into our tools unless explicitly stated otherwise.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 5 — Cookies ============ */}
      <section id="cookies" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] dark:bg-slate-700 text-[#434655] dark:text-slate-200">
            <Icon name="cookie" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            5. Cookies
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="cookie" className="text-[#004ac6]" />
          5. Cookies
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>Jamro Tools may use cookies and similar technologies to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Improve website functionality</li>
            <li>Remember user preferences</li>
            <li>Analyze website traffic</li>
            <li>Support advertising services</li>
          </ul>
          <p>You can control or disable cookies through your browser settings.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 6 — Google Analytics ============ */}
      <section id="google-analytics" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="analytics" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            6. Google Analytics
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="analytics" className="text-[#004ac6]" />
          6. Google Analytics
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>We use Google Analytics to understand how visitors interact with our website.</p>
          <p>
            Google Analytics may collect information such as pages visited, device information, browser type, and usage statistics. This information helps us improve our services and user experience.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 7 — Google AdSense and Advertising ============ */}
      <section id="google-adsense-and-advertising" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="ads_click" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            7. Google AdSense and Advertising
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="ads_click" className="text-[#004ac6]" />
          7. Google AdSense and Advertising
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>We may use Google AdSense and other advertising partners to display advertisements on our website.</p>
          <p>Google and its partners may use cookies to serve ads based on your previous visits to this website or other websites.</p>
          <p>These cookies enable personalized advertising and help measure advertising performance.</p>
          <p>Users can manage advertising preferences through Google's Ad Settings.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 8 — Third-Party Services ============ */}
      <section id="third-party-services" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#943700] text-[#ffede6]">
            <Icon name="integration_instructions" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            8. Third-Party Services
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="integration_instructions" className="text-[#943700]" />
          8. Third-Party Services
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>Our website may contain links to third-party websites or services.</p>
          <p>
            We are not responsible for the privacy practices, policies, or content of external websites. We encourage users to review the privacy policies of any third-party services they visit.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 9 — Data Security ============ */}
      <section id="data-security" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ffdad6] text-[#93000a]">
            <Icon name="lock" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            9. Data Security
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="lock" className="text-[#93000a]" />
          9. Data Security
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>We take reasonable measures to protect information against unauthorized access, alteration, disclosure, or destruction.</p>
          <p>However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 10 — Children's Privacy ============ */}
      <section id="childrens-privacy" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#d8e3fb] dark:bg-slate-700 text-[#434655] dark:text-slate-200">
            <Icon name="child_care" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            10. Children's Privacy
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="child_care" className="text-[#004ac6]" />
          10. Children's Privacy
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>Jamro Tools is not directed toward children under the age of 13.</p>
          <p>We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us so we can remove it.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 11 — Changes to This Privacy Policy ============ */}
      <section id="changes-to-this-privacy-policy" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb] text-[#eeefff]">
            <Icon name="update" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            11. Changes to This Privacy Policy
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="update" className="text-[#004ac6]" />
          11. Changes to This Privacy Policy
        </h2>
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>We may update this Privacy Policy from time to time.</p>
          <p>Any changes will be posted on this page with an updated revision date.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-slate-700" />

      {/* ============ Section 12 — Contact Us ============ */}
      <section id="contact-us" className="scroll-mt-24 md:scroll-mt-20">
        <div className="mb-4 hidden items-center gap-4 md:flex">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#085ac0] text-white">
            <Icon name="mail" />
          </div>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100">
            12. Contact Us
          </h2>
        </div>
        <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-slate-100 md:hidden">
          <Icon name="mail" className="text-[#004ac6]" />
          12. Contact Us
        </h2>
        
        <div className="space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          <p>If you have questions regarding this Privacy Policy, please contact us:</p>
          
          <div className="rounded-xl border border-[#004ac6]/20 bg-[#f0f3ff] dark:bg-slate-800 p-6 text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Icon name="mail" className="text-[#004ac6]" />
                <span className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em]">
                  umeralijamro@gmail.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="language" className="text-[#004ac6]" />
                <Link
                  href="/contact"
                  className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6] hover:underline"
                >
                  https://jamrotools.com/contact
                </Link>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0058be] px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all hover:shadow-md active:scale-95"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}