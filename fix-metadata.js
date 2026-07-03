const fs = require('fs');

const updateMetadata = (filePath, type) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('openGraph: {')) {
    // We can just find the end of the metadata object and inject it before the closing };
    const insertString = `,
  openGraph: {
    title: "${type === 'about' ? 'About Jamro Tools - Free, Private & Browser-Based Utilities' : 'Contact Us - Request a Tool or Get Support | Jamro Tools'}",
    description: "${type === 'about' ? 'Jamro Tools is a free, privacy-first toolbox for students, developers & professionals. Every tool runs locally in your browser - zero data collected, zero sign-up.' : 'Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out - we usually respond within 48 hours.'}",
    url: "https://jamrotools.com/${type}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${type === 'about' ? 'About Jamro Tools - Free, Private & Browser-Based Utilities' : 'Contact Us - Request a Tool or Get Support | Jamro Tools'}",
    description: "${type === 'about' ? 'Jamro Tools is a free, privacy-first toolbox for students, developers & professionals. Every tool runs locally in your browser - zero data collected, zero sign-up.' : 'Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out - we usually respond within 48 hours.'}",
  }
};`;

    content = content.replace(/\s*};\s*(export default function)/, insertString + '\n\n$1');
    
    // Fix the weird unicode dash if it's there
    content = content.replace(/\?"/g, '-');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${type} metadata`);
  }
};

updateMetadata('app/about/page.tsx', 'about');
updateMetadata('app/contact/page.tsx', 'contact');
