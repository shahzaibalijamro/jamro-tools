"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useMemo, useState } from "react";

function countWords(text: string): number {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    // Split on any whitespace; handles multiple spaces/newlines.
    return trimmed.split(/\s+/).filter(Boolean).length;
}

function countSentences(text: string): number {
    // Simple heuristic: count . ! ? sequences.
    // Works well for typical prose; avoids over-engineering.
    const matches = text
        .trim()
        .match(/[.!?]+(?:\s|$)/g);
    return matches ? matches.length : 0;
}

export default function WordCounterCalculator() {
    const [text, setText] = useState("");

    const stats = useMemo(() => {
        const words = countWords(text);
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const lines = text ? text.split(/\r?\n/).length : 0;
        const sentences = countSentences(text);

        // Reading time heuristic (200 WPM)
        const minutes = words / 200;
        const readTimeText = words === 0 ? "0 min" : `${Math.max(1, Math.round(minutes))} min`;

        return {
            words,
            characters,
            charactersNoSpaces,
            lines,
            sentences,
            readTimeText,
        };
    }, [text]);

    const faqItems = [
  {
    q: `What is a word counter tool?`,
    a: `A word counter is a digital text-analysis tool that automatically calculates the total number of words, characters, sentences, and paragraphs within a given piece of text. It is used by writers, editors, students, and SEO professionals to ensure their content meets specific length requirements or stays within platform-imposed character limits.`,
  },
  {
    q: `What is the exact difference between word count and character count?`,
    a: `Word count measures the total number of complete words in your text, regardless of how long those individual words are. Character count measures every single keystroke you make. For example, the phrase "Search Engine Optimization" is exactly 3 words long, but it has a character count of 26 (including the spaces between the words).`,
  },
  {
    q: `Why do some character counts include spaces while others do not?`,
    a: `Most writing platforms and databases view a space as a distinct keystroke, which is why "Characters (with spaces)" is the standard metric used for social media limits and database entry fields. However, "Characters (without spaces)" is occasionally used in specific academic assignments, translation billing, or coding environments to measure the raw density of the actual text without formatting gaps.`,
  },
  {
    q: `How does a software tool actually count words?`,
    a: `Digital word counters use a simple parsing algorithm to identify words. The software looks for "delimiters"—which are usually spaces, line breaks, or specific punctuation marks like hyphens. Every time the algorithm detects a cluster of letters or numbers separated by a space, it registers that cluster as one single word.`,
  },
  {
    q: `What is the ideal word count for an SEO blog post?`,
    a: `While there is no single magic number that guarantees a number-one ranking, comprehensive SEO data suggests that the ideal word count for a standard, informative blog post is typically between 1,500 and 2,000 words. Long-form content tends to perform better in organic search because it allows for greater topic depth, naturally includes more semantic keywords, and earns more backlinks.`,
  },
  {
    q: `What are the standard character limits for Google search results?`,
    a: `To ensure your web pages look clean on a search engine results page (SERP) without being cut off with an ellipsis (...), you must adhere to strict character limits. An SEO Title Tag should generally stay under 60 characters. A Meta Description should generally stay between 150 and 160 characters.`,
  },
  {
    q: `What are the character limits for major social media platforms?`,
    a: `Every social media platform enforces its own character limits to control how content is displayed to users. As a general rule:
* X (formerly Twitter): 280 characters for standard users.
* LinkedIn: 3,000 characters for a standard post.
* Instagram: 2,200 characters for a caption (though it truncates in the feed after about 125 characters).`,
  },
  {
    q: `Is it safe to paste confidential documents into an online word counter?`,
    a: `Yes, using a modern, browser-based word counter is generally safe for confidential text. High-quality web utilities execute their text-parsing scripts directly within your local internet browser (client-side processing). This means your text is analyzed in real-time on your own device and is not uploaded, saved, or stored on an external database or server.
About Us
Hero Section
One Platform. Every Tool You Need.
No sign‑up. No clutter. Everything runs privately on your device.
________________
Our Mission
Jamro Tools brings together over 1,000 powerful, free utilities in one place. Stop jumping between websites for calculators, converters, image editors, and developer tools – we’ve built the only toolkit you’ll ever need.[a]
________________
How It All Began
Jamro Tools was born from a simple frustration: getting everyday digital tasks done meant bouncing between dozens of different websites, each with its own sign‑up, paywall, or privacy risk. In 2026, we decided to fix that. What started as a small private collection of scripts has grown into a comprehensive ecosystem of over 1,000 tools, all accessible from a single, distraction‑free workspace.
Every tool is built on a straightforward belief: you should be able to get things done instantly, without handing over your data, and without having to remember which site does what.
________________
Why Creators and Developers Choose Jamro Tools
One Medium for All Tools
No more bookmarks to ten different sites. From JSON formatters to PDF editors, image compressors to password generators – every utility lives on Jamro Tools. One platform, one experience, zero fragmentation.
Private by Default
There’s no sign‑up, no login, and no server‑side processing. Everything you type, paste, or upload stays locked inside your browser. We never see, store, or touch your data – because we physically can’t.
99.9% Accuracy Standard
Every calculator, converter, and formatter is tested against industry benchmarks. We obsess over precision so you can trust the output every time.
Unrivaled Speed
All tools run locally using JavaScript and WebAssembly. No server round trips. Instant results, every time.
Zero Friction
Pick a tool, drop in your input, get your output. No accounts, no tutorials, no onboarding – just pure, undiluted utility.
________________
[b]
The People Behind the Tools
A distributed, two‑person team backed by a community of contributors who share our passion for accessible, privacy‑first tools.
Umer – Founder & SEO Expert
“We wanted to eliminate the hassle of chasing tools across the internet. One website should be enough for any digital task.”
Shahzaib – Co‑Founder & Software Engineer
“The best tools are the ones you don’t notice. Our job is to make sure everything just works, so you can stay in your flow.”
Our Philosophy
Accessibility isn’t just about price – it’s about removing every possible barrier. No sign‑ups, no separate sites to remember, no data leaving your machine. A student debugging code, a designer retouching images, and a small business owner generating invoices all deserve the same frictionless experience. The moment you need a tool, it should already be there, ready to work.
________________
[c]
Need a Tool We Don’t Have?
Jamro Tools is built around user needs. If there’s a utility missing that would make your life easier, simply send us an email with your request – we’ll do our best to build it and add it to the platform. Your ideas shape our roadmap.
(Link to an email address or a contact form.)
________________
Ready to Simplify Your Workflow?
Explore 1,000+ tools, all under one roof, with the privacy and speed you deserve.
[Explore All Tools] [Try a Random Tool]
Home Affordability Calculator
About the Home Affordability Calculator
Before you fall in love with a property listing or start attending open houses, you need to know exactly what your budget can handle. The JamroTools Home Affordability Calculator is a comprehensive financial utility designed to help you determine your true purchasing power. Operating entirely online directly in your browser, this tool processes your income, debts, and local market factors to generate a realistic maximum home price without requiring any offline downloads or personal data collection.
Rather than just calculating a basic mortgage payment, this tool looks at your complete financial picture. By entering your annual household income, monthly debts, estimated down payment, and current interest rates, the calculator instantly evaluates your financial health the same way a mortgage lender would, giving you a safe and accurate target price for your home search.
Optimize Your Home Search
Understanding your maximum affordability is the most important step in the real estate process. Using this calculator helps you transition from dreaming about homeownership to executing a financially sound plan.
* Determine Your Maximum Purchase Price: Instantly translate your current salary and monthly expenses into a concrete maximum home value so you only look at houses you can actually afford.
* Factor in the True Costs: Go beyond the base principal and interest by factoring in property taxes, homeowners insurance, and Homeowners Association (HOA) fees to see your actual monthly obligation.
* Protect Your Debt-to-Income Ratio: See exactly how your existing car loans, student loans, and credit card minimums restrict your borrowing power, helping you decide if you need to pay down debt before buying.
Whether you are a first-time homebuyer preparing for pre-approval or an experienced owner looking to upgrade, this calculator provides the exact financial data required to buy with confidence.`,
  },
  {
    q: `What is a home affordability calculator?`,
    a: `A home affordability calculator is a digital real estate tool that estimates the maximum home price a person can comfortably afford to buy. By analyzing your gross income, existing monthly debts, available down payment, and current mortgage interest rates, the tool calculates a safe maximum monthly housing payment and translates that into an overall target purchase price.`,
  },
  {
    q: `What is the 28/36 rule in real estate?`,
    a: `The 28/36 rule is the gold standard used by mortgage lenders to determine housing affordability. The rule states that a household should spend a maximum of 28% of its gross (pre-tax) monthly income on total housing expenses (including mortgage, taxes, and insurance). Furthermore, it dictates that no more than 36% of the gross monthly income should go toward total debt (housing expenses plus car loans, credit cards, and student loans).`,
  },
  {
    q: `What is a Debt-to-Income (DTI) ratio?`,
    a: `Your Debt-to-Income (DTI) ratio is a personal finance measure that compares your total monthly debt payments to your gross monthly income. Lenders use this percentage to measure your ability to manage monthly payments and repay the money you plan to borrow. If your DTI is too high (typically above 43%), lenders will view you as a high-risk borrower and may deny your mortgage application.`,
  },
  {
    q: `How does my down payment affect home affordability?`,
    a: `Your down payment drastically impacts what you can afford. A larger down payment reduces the total amount of money you need to borrow, which lowers your monthly payments and decreases the total interest you will pay over the life of the loan. Additionally, putting down at least 20% of the home’s purchase price eliminates the need to pay for Private Mortgage Insurance (PMI), freeing up more of your budget for the actual house.`,
  },
  {
    q: `What are the hidden costs of homeownership?`,
    a: `When calculating affordability, you must look beyond the base mortgage payment (Principal and Interest). A true affordability calculation must include property taxes (which vary by location), homeowners insurance, and potential HOA fees. You should also budget an additional 1% to 2% of the home's value annually for general maintenance and unexpected repairs.`,
  },
  {
    q: `Does a home affordability calculator guarantee mortgage pre-approval?`,
    a: `No, an online calculator provides a highly educated financial estimate, but it does not guarantee a loan. To get officially pre-approved, a licensed lender must pull your official credit score, verify your employment history, and review official bank statements. A calculator cannot account for a poor credit score or a volatile employment history, both of which can result in a loan denial regardless of income.`,
  },
  {
    q: `How do rising interest rates impact my home buying budget?`,
    a: `Interest rates have a massive impact on your buying power. When interest rates rise, a much larger portion of your monthly payment goes toward the bank rather than the principal balance of the home. Even a 1% increase in mortgage rates can reduce your total purchasing power by tens of thousands of dollars, forcing you to look at lower-priced homes to keep your monthly payments within the 28% safety zone.`,
  },
  {
    q: `What is the plain-text formula for calculating maximum housing costs?`,
    a: `To manually calculate the maximum you should spend on a house using the standard 28/36 rule, you use your gross (pre-tax) monthly income in two plain-text formulas:
Maximum Housing Expense = Gross Monthly Income * 0.28 Maximum Total Debt = Gross Monthly Income * 0.36
Your future mortgage payment, combined with your existing debts, must stay below that "Maximum Total Debt" number to be considered financially safe by most underwriters.
[a]this section is not appearing on desktop
[b]this section is not appearing on mobile
[c]copy this section from /tool page`,
  },
];

    return (
        <>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[48px]">
                {/* Inputs Panel */}
                <div className="lg:col-span-5 space-y-[16px]">
                    <div
                        className="p-[24px] rounded-xl shadow-sm backdrop-blur-[12px] bg-white/70 dark:bg-surface-container/70 border border-slate-200/80 dark:border-outline-variant/80"
                    >
                        <h3 className="text-[22px] leading-[28px] font-semibold mb-[16px] flex items-center gap-[8px]">
                            <span className="material-symbols-outlined text-primary">text_fields</span>
                            Text Input
                        </h3>

                        <label className="block text-[14px] font-semibold text-on-surface-variant mb-[8px]">
                            Paste your text
                        </label>

                        <textarea
                            className="w-full min-h-[220px] resize-y px-[16px] py-[14px] bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-[14px]"
                            placeholder="Type or paste text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <div className="mt-[16px] flex gap-[12px] flex-wrap">
                            <button
                                type="button"
                                onClick={() => setText("")}
                                className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant px-[16px] py-[10px] rounded-xl font-semibold text-[14px] hover:bg-surface-container-low transition-all"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => setText((t) => t + (t ? "\n" : "") + "")}
                                className="hidden"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-7">
                    <div
                        className="rounded-xl overflow-hidden h-full flex flex-col shadow-sm backdrop-blur-[12px] bg-white/70 dark:bg-surface-container/70 border border-slate-200/80 dark:border-outline-variant/80"
                    >
                        <div className="p-[24px] flex-grow">
                            <h3 className="text-[18px] leading-[26px] font-semibold mb-[16px] text-on-surface">
                                Word Counter Results
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        Words
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.words.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        Characters
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.characters.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        No Spaces
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.charactersNoSpaces.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        Sentences
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.sentences.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        Lines
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.lines.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-[16px] rounded-xl border border-outline-variant/60 bg-white/40 dark:bg-surface-container/40">
                                    <div className="text-[12px] font-semibold text-outline uppercase tracking-tight">
                                        Reading Time
                                    </div>
                                    <div className="text-[28px] leading-[36px] font-black text-on-surface">
                                        {stats.readTimeText}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] border-t border-outline-variant/50 pt-[16px]">
                                <div className="flex items-start gap-[10px]">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    <p className="text-[14px] text-on-surface-variant leading-relaxed">
                                        Counts are updated live. Word detection splits by whitespace; sentence detection uses basic punctuation heuristics.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                  {/* Tool Info Section */}
      <ToolInfoCard 
        title="Your all-in-one digital workshop."
        content={[
          `About the Word Counter`,
          `Whether you are drafting an SEO-optimized article, a university research paper, or a targeted social media campaign, hitting the right length is critical for your success. The JamroTools Word Counter is a precision text-analysis utility designed to give you an instant, comprehensive breakdown of your content. Built as a fully online platform that relies on your active internet connection, this tool processes your text directly in your browser, delivering lightning-fast, real-time results without the need for offline software or bulky word processors.`,
          `Instead of just giving you a single number, this tool provides a complete x-ray of your text. By simply pasting your content into the interface, you instantly see your total word count, character count (both with and without spaces), and sentence structure metrics, allowing you to edit and format your content with total confidence.`,
          `Optimize Your Writing for Every Platform`,
          `Different platforms demand different content lengths. Using this online calculator helps you tailor your writing to meet strict external guidelines.`,
          `* SEO & Content Marketing: Hit exact word count targets to satisfy search engine algorithms and ensure your title tags and meta descriptions stay within Google’s strict character display limits.`,
          `* Academic & Professional Writing: Verify that your essays, grant proposals, and professional reports meet the minimum or maximum length requirements set by professors or publishers.`,
          `* Social Media Management: Prevent your text from being truncated by tracking platform-specific character limits for platforms like X (Twitter), LinkedIn, and Instagram.`,
          `Whether you are a copywriter auditing a landing page or a student finalizing a thesis, this word counter gives you the exact typographical data required to publish perfectly formatted text.`,
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
        </>
    );
}
