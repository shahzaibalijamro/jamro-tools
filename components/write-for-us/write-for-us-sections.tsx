import type { ReactNode } from "react";

import { BackToTop } from "@/components/write-for-us/back-to-top";

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

type SectionHeadingProps = {
  icon: string;
  number: number;
  title: string;
  tone?: "blue" | "navy" | "orange" | "red" | "neutral";
};

const toneClasses: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  blue: "bg-[#2563eb] text-[#eeefff]",
  navy: "bg-[#085ac0] text-white",
  orange: "bg-[#943700] text-[#ffede6]",
  red: "bg-[#ffdad6] text-[#93000a]",
  neutral: "bg-[#d8e3fb] text-[#434655] dark:bg-surface-container-high dark:text-on-surface-variant",
};

function SectionHeading({ icon, number, title, tone = "blue" }: SectionHeadingProps) {
  const mobileIconColor = tone === "orange" ? "text-[#943700]" : tone === "red" ? "text-[#93000a]" : "text-[#004ac6]";

  return (
    <>
      <div className="mb-4 hidden items-center gap-4 md:flex">
        <div className={`flex size-10 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon name={icon} />
        </div>
        <h2 className="text-[32px] font-semibold leading-[1.2] text-[#111c2d] dark:text-on-surface">
          {number}. {title}
        </h2>
      </div>
      <h2 className="mb-4 flex items-center gap-1 text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface md:hidden">
        <Icon name={icon} className={mobileIconColor} />
        {number}. {title}
      </h2>
    </>
  );
}

function Guideline({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-[18px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
        {number}. {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

const bodyClasses = "space-y-4 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant";
const listClasses = "list-disc space-y-1 pl-6";

export function WriteForUsSections() {
  return (
    <article className="mt-6 space-y-6 px-4 pb-12 sm:px-6 md:py-0">
      <div className="rounded-xl bg-[#2563eb] p-6 text-[#eeefff] shadow-sm">
        <div className="flex items-start gap-4">
          <Icon name="edit_note" className="mt-1" />
          <div>
            <h2 className="mb-1 text-[20px] font-semibold leading-[1.4]">
              Free to Submit, Carefully Reviewed
            </h2>
            <p className="text-[16px] leading-[1.6] opacity-90">
              Are you a writer, developer, marketer, SEO professional, or industry expert with something genuinely valuable to share? Jamro Tools welcomes high-quality guest posts that educate our readers and provide practical value.
            </p>
            <p className="mt-3 text-[16px] leading-[1.6] opacity-90">
              Guest posting is free, but that does not mean lower standards. Our editorial team reviews every submission, and we reserve the right to reject content that does not meet our requirements.
            </p>
          </div>
        </div>
      </div>

      <section id="topics-we-accept" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="topic" number={1} title="Topics We Accept" />
        <div className={bodyClasses}>
          <p>We are primarily interested in original, informative content about:</p>
          <ul className={listClasses}>
            <li>Digital marketing and SEO</li>
            <li>Web and software development</li>
            <li>AI and automation tools</li>
            <li>Online tools and productivity</li>
            <li>Technology</li>
            <li>Cybersecurity</li>
            <li>Content creation</li>
            <li>Image and PDF tools</li>
            <li>Developer and software resources</li>
            <li>Guides, tutorials, and how-to articles</li>
            <li>Tips, strategies, and practical workflows</li>
          </ul>
          <p>If your topic is relevant to our audience but is not listed above, you are welcome to pitch it to us.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="guest-post-guidelines" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="fact_check" number={2} title="Guest Post Guidelines" tone="navy" />
        <div className="space-y-6 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">
          <p>All of the following requirements are mandatory and help us maintain the quality of our website.</p>

          <Guideline number={1} title="Original, Human-Written Content">
            <p>We only accept original, human-written content.</p>
            <ul className={listClasses}>
              <li>Do not submit AI-generated content.</li>
              <li>Do not submit AI-written or spun content as original work.</li>
              <li>Articles should demonstrate real knowledge, experience, research, and useful insight.</li>
            </ul>
            <p>We reserve the right to reject content that we believe was created, spun, or substantially produced by AI.</p>
          </Guideline>

          <Guideline number={2} title="High-Quality Featured Image">
            <p>Every guest post must include a relevant featured image. The image must:</p>
            <ul className={listClasses}>
              <li>Be relevant to the article.</li>
              <li>Be high quality.</li>
              <li>Be legally usable by the contributor.</li>
              <li>Not be AI-generated.</li>
              <li>Not be copyrighted material submitted without permission.</li>
            </ul>
          </Guideline>

          <Guideline number={3} title="Author Photo">
            <p>Please include a clear author headshot. It must be a real photograph suitable for display with your author bio.</p>
          </Guideline>

          <Guideline number={4} title="Author Bio">
            <p>Every submission must include a short author bio that explains:</p>
            <ul className={listClasses}>
              <li>Who you are</li>
              <li>What you do</li>
              <li>Your area of expertise</li>
            </ul>
          </Guideline>

          <Guideline number={5} title="Social Media Profiles">
            <p>Please include genuine professional profiles that belong to the author, such as:</p>
            <ul className={listClasses}>
              <li>LinkedIn</li>
              <li>Twitter/X</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Other relevant professional profiles</li>
            </ul>
          </Guideline>

          <Guideline number={6} title="Two Dofollow Links">
            <p>Each approved guest post may include up to two relevant dofollow links. Links must:</p>
            <ul className={listClasses}>
              <li>Be relevant to the article.</li>
              <li>Provide real value to readers.</li>
              <li>Lead directly to high-quality, trustworthy websites or sources.</li>
              <li>Be embedded naturally within the content.</li>
            </ul>
            <p>We reserve the right to remove, modify, or reject links that appear promotional, manipulative, irrelevant, or purely SEO-driven.</p>
          </Guideline>

          <Guideline number={7} title="Frequently Asked Questions">
            <p>Every guest post must include at least five relevant FAQs about the article topic. They should be useful and informative, not written simply to increase the word count.</p>
          </Guideline>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="content-quality" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="verified" number={3} title="Content Quality Is Important" tone="orange" />
        <div className={bodyClasses}>
          <p>Jamro Tools accepts guest posts free of charge, and we expect every contributor to take the quality of their submission seriously. We do not charge contributors to submit or publish an approved article.</p>
          <p>In return, we expect:</p>
          <ul className={listClasses}>
            <li>Original, relevant content</li>
            <li>Strong research</li>
            <li>Precise and unambiguous information</li>
            <li>Excellent grammar and readability</li>
            <li>Practical insight</li>
            <li>Relevant examples where appropriate</li>
            <li>Natural link use</li>
            <li>Correct formatting</li>
            <li>Genuine expertise or experience</li>
          </ul>
          <p>We do not compromise on content quality. Even a submission that meets the basic requirements may be rejected if it is:</p>
          <ul className={listClasses}>
            <li>Thin</li>
            <li>Poorly researched</li>
            <li>Overly promotional</li>
            <li>Repetitive</li>
            <li>Inaccurate</li>
            <li>Not useful to our readers</li>
          </ul>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="articles-we-do-not-accept" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="block" number={4} title="Articles We Do Not Accept" tone="red" />
        <div className="rounded-lg border-l-4 border-[#ffdad6] bg-[#fff5f4] p-6 dark:border-error/50 dark:bg-error-container/30">
          <p className="mb-3 text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant">We do not accept:</p>
          <ul className={`${listClasses} text-[16px] leading-[1.6] text-[#434655] dark:text-on-surface-variant`}>
            <li>AI-generated or spun content</li>
            <li>Plagiarized or copied content</li>
            <li>Articles rewritten from other websites</li>
            <li>Low-quality SEO articles</li>
            <li>Keyword-stuffed copy</li>
            <li>Short or overly general articles</li>
            <li>Excessive promotional material</li>
            <li>Articles written mainly to gain backlinks</li>
            <li>Unrelated subjects</li>
            <li>Misleading information</li>
            <li>Spammy or suspicious links</li>
            <li>Content containing unlawful or harmful material</li>
          </ul>
          <p className="mt-4 text-[16px] font-semibold leading-[1.6] text-[#93000a] dark:text-on-surface">
            Meeting our submission requirements does not guarantee publication.
          </p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="editorial-rights" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="edit_document" number={5} title="Editorial Rights" tone="neutral" />
        <div className={bodyClasses}>
          <p>By submitting an article, you agree that Jamro Tools may:</p>
          <ul className={listClasses}>
            <li>Edit the article for grammar, clarity, style, and accuracy.</li>
            <li>Change the title or headings.</li>
            <li>Request revisions before publication.</li>
            <li>Reject the article.</li>
            <li>Publish updated or amended versions of the content.</li>
          </ul>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="submission-guidelines" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="send" number={6} title="Submission Guidelines" />
        <div className={bodyClasses}>
          <p>Please make sure your submission includes every required item before sending your full article.</p>
          <div className="rounded-xl border border-[#c3c6d7] bg-[#e7eeff] p-6 dark:border-outline-variant dark:bg-surface-container">
            <div className="flex items-start gap-4">
              <Icon name="mail" className="mt-1 text-[#004ac6] dark:text-primary" />
              <div className="min-w-0">
                <h3 className="text-[20px] font-semibold leading-[1.4] text-[#111c2d] dark:text-on-surface">
                  Send Your Guest Post
                </h3>
                <p className="mt-2 break-all text-[14px] font-semibold text-[#004ac6] dark:text-primary-fixed-dim">
                  umeralijamro@gmail.com
                </p>
                <p className="mt-2 text-[14px] leading-[1.6]">
                  <strong>Subject:</strong> Submit a Guest Post – [Your Post Name]
                </p>
                <a
                  href="mailto:umeralijamro@gmail.com?subject=Submit%20a%20Guest%20Post%20%E2%80%93%20%5BYour%20Post%20Name%5D"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#0058be] px-6 py-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-white transition-all hover:shadow-md active:scale-95"
                >
                  Email Your Submission
                </a>
              </div>
            </div>
          </div>
          <p>Your email must contain:</p>
          <ul className={listClasses}>
            <li>The full article</li>
            <li>A featured image</li>
            <li>An author headshot</li>
            <li>An author bio</li>
            <li>Social media links</li>
            <li>Two requested dofollow links</li>
            <li>Five frequently asked questions</li>
          </ul>
          <p>Submissions that do not include all required items will not be considered.</p>
        </div>
      </section>

      <hr className="border-[#c3c6d7] dark:border-outline-variant" />

      <section id="conclusion" className="scroll-mt-28 md:scroll-mt-20">
        <SectionHeading icon="handshake" number={7} title="Conclusion" tone="navy" />
        <div className={bodyClasses}>
          <p>We are looking for contributors who want to educate, inform, and genuinely help our readers. If your main goal is simply to place backlinks, Jamro Tools is probably not the right publication for you.</p>
          <p>We want to hear from people with something valuable to share—knowledge, original insight, practical experience, or a good story.</p>
          <p className="font-semibold text-[#111c2d] dark:text-on-surface">Guest posting is free. Quality is not negotiable.</p>
          <p>
            Send your finished submission to{" "}
            <a className="font-semibold text-[#004ac6] hover:underline dark:text-primary-fixed-dim" href="mailto:umeralijamro@gmail.com">
              umeralijamro@gmail.com
            </a>{" "}
            and tell us what you can offer the Jamro Tools community.
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center border-t border-[#c3c6d7] pt-6 dark:border-outline-variant md:hidden">
        <BackToTop />
      </div>
    </article>
  );
}
