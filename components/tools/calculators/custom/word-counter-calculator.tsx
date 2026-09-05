"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useMemo, useState } from "react";
import { calculateWordStats } from "../logic/word-counter-calculator";

export default function WordCounterCalculator() {
    const [text, setText] = useState("");

    const stats = useMemo(() => calculateWordStats(text), [text]);

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
            a: `Yes. The Word Counter processes text directly in your browser. Your text is not uploaded, saved, or sent to an external server.`,
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
                title="About the Word Counter."
                content={[
                    `About the Word Counter`,
                    `Whether you are drafting an SEO-optimized article, a university research paper, or a targeted social media campaign, hitting the right length is critical for your success. The JamroTools Word Counter is a precision text-analysis utility designed to give you an instant, comprehensive breakdown of your content. Built as a fully online platform that relies on your active internet connection, this tool processes your text directly in your browser, delivering lightning-fast, real-time results without the need for offline software or bulky word processors.`,
                    `Instead of just giving you a single number, this tool provides a complete x-ray of your text. By simply pasting your content into the interface, you instantly see your total word count, character count (both with and without spaces), and sentence structure metrics, allowing you to edit and format your content with total confidence.`,
                    `/ Optimize Your Writing for Every Platform`,
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
