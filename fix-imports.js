const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Desktop/jamro-tools/components/tools/calculators/custom';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('"use client";') && !content.startsWith('"use client";')) {
    content = content.replace(/"use client";\r?\n?/g, '');
    content = '"use client";\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
