const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Desktop/jamro-tools/components/tools/calculators/custom';
const files = [
  'apush-score-calculator.tsx',
  'middle-school-gpa-calculator.tsx',
  'mortgage-calculator.tsx',
  'age-difference-calculator.tsx',
  'cylinder-volume-calculator.tsx',
  'percentage-decrease-calculator.tsx',
  'triple-integral-calculator.tsx',
  'word-counter-calculator.tsx'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  if (!content.includes('FaqSection')) {
    // find last import
    const importMatch = content.match(/import .*?;?\n/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, lastImport + 'import { FaqSection } from "@/components/ui/faq-section";\n');
    } else {
      content = 'import { FaqSection } from "@/components/ui/faq-section";\n' + content;
    }
  }

  // Handle word-counter differently because it has inline array
  if (file === 'word-counter-calculator.tsx') {
    const sectionRegex = /\{\/\* FAQ Section \*\/\}\s*<section.*?Frequently Asked Questions[\s\S]*?<\/section>/;
    const inlineArrayMatch = content.match(/\{\[\s*([\s\S]*?)\s*\]\.map\(/);
    if (inlineArrayMatch && sectionRegex.test(content)) {
      const arrayContent = `[\n${inlineArrayMatch[1]}\n]`;
      content = content.replace(sectionRegex, `{/* FAQ Section */}\n            <FaqSection items={${arrayContent}} />`);
    }
  } else {
    // Replace FAQ section with <FaqSection items={faqItems} />
    const sectionRegex = /\{\/\* (?:── )?FAQ Section(?: ──)? \*\/\}\s*<section[\s\S]*?Frequently Asked Questions[\s\S]*?<\/section>/;
    if (sectionRegex.test(content)) {
      content = content.replace(sectionRegex, `{/* FAQ Section */}\n      <FaqSection items={faqItems} />`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Refactored ${file}`);
}
