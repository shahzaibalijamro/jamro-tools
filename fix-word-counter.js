const fs = require('fs');
let c = fs.readFileSync('components/tools/calculators/custom/word-counter-calculator.tsx', 'utf8');

if (!c.includes('FaqSection')) {
  c = c.replace(/"use client";\r?\n/, '"use client";\nimport { FaqSection } from "@/components/ui/faq-section";\n');
}

c = c.replace(/\{\/\* FAQ Section \*\/\}[\s\S]*?<\/section>/, `{/* FAQ Section */}
            <FaqSection items={[
                {
                    q: "How is word count calculated?",
                    a: "Words are counted by splitting your text on whitespace (spaces, tabs, and newlines). Multiple spaces are treated as a single separator.",
                },
                {
                    q: "What does 'No Spaces' mean?",
                    a: "It's the number of characters after removing all whitespace (spaces, tabs, and newlines).",
                },
                {
                    q: "Why might sentence count differ from other counters?",
                    a: "Sentence detection uses a simple punctuation heuristic ([.!?]) and may not match every writing style or abbreviation pattern.",
                },
                {
                    q: "Is this tool private?",
                    a: "Yes. Everything runs in your browser; your text is not sent to a server.",
                },
            ]} />`);

fs.writeFileSync('components/tools/calculators/custom/word-counter-calculator.tsx', c);
console.log('Fixed word-counter');
