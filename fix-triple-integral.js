const fs = require('fs');

let content = fs.readFileSync('components/tools/calculators/custom/triple-integral-calculator.tsx', 'utf8');

// 1. Fix "use client" and import
if (!content.includes('FaqSection')) {
  content = content.replace(/"use client";\r?\n?/g, '');
  content = '"use client";\nimport { FaqSection } from "@/components/ui/faq-section";\n' + content;
}

// 2. Fix the Fubini's apostrophe
content = content.replace("Fubini's Theorem", "Fubini&apos;s Theorem");

// 3. Replace the FAQ section
const sectionRegex = /\{\/\* FAQ Section \*\/\}\s*<section[\s\S]*?Frequently Asked Questions[\s\S]*?<\/section>/;
if (sectionRegex.test(content)) {
  content = content.replace(sectionRegex, `{/* FAQ Section */}\n      <FaqSection items={faqItems} />`);
}

fs.writeFileSync('components/tools/calculators/custom/triple-integral-calculator.tsx', content, 'utf8');
console.log('Fixed triple integral');
