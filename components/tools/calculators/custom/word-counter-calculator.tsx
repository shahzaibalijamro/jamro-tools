"use client";

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

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto py-[48px] border-t border-outline-variant">
                <h2 className="text-[28px] leading-[36px] font-semibold mb-[24px] text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-[16px]">
                    {[
                        {
                            q: "How is word count calculated?",
                            a: "Words are counted by splitting your text on whitespace (spaces, tabs, and newlines). Multiple spaces are treated as a single separator.",
                        },
                        {
                            q: "What does ‘No Spaces’ mean?",
                            a: "It’s the number of characters after removing all whitespace (spaces, tabs, and newlines).",
                        },
                        {
                            q: "Why might sentence count differ from other counters?",
                            a: "Sentence detection uses a simple punctuation heuristic ([.!?]) and may not match every writing style or abbreviation pattern.",
                        },
                        {
                            q: "Is this tool private?",
                            a: "Yes. Everything runs in your browser; your text is not sent to a server.",
                        },
                    ].map((item, i) => (
                        <details
                            key={i}
                            className="group rounded-xl backdrop-blur-[12px] bg-white/70 dark:bg-surface-container/70 border border-slate-200/80 dark:border-outline-variant/80"
                        >
                            <summary className="flex justify-between items-center p-[24px] cursor-pointer list-none">
                                <span className="text-[14px] font-semibold text-on-surface">
                                    {item.q}
                                </span>
                                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                                    expand_more
                                </span>
                            </summary>
                            <div className="px-[24px] pb-[24px] text-on-surface-variant">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}

