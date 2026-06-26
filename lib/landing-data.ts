export type LandingIcon =
  | "calculator"
  | "converter"
  | "currency"
  | "dev"
  | "finance"
  | "generator"
  | "graphics"
  | "image-resizer"
  | "others"
  | "password"
  | "pdf"
  | "qr"
  | "security"
  | "text-seo";

export type IconTone = "blue" | "blueSoft" | "orange" | "peach" | "redSoft";

export type FeaturedTool = {
  title: string;
  href: string;
  icon: LandingIcon;
  tone: IconTone;
};

export type ToolCategory = {
  title: string;
  count: string;
  href: string;
  icon: LandingIcon;
  tone: IconTone;
};

export type FooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const featuredTools: FeaturedTool[] = [
  {
    title: "Currency",
    href: "/tools/currency",
    icon: "currency",
    tone: "blueSoft",
  },
  {
    title: "Image Resizer",
    href: "/tools/image-resizer",
    icon: "image-resizer",
    tone: "blueSoft",
  },
  {
    title: "Pass Gen",
    href: "/tools/password-generator",
    icon: "password",
    tone: "peach",
  },
  {
    title: "QR Code",
    href: "/tools/qr-code",
    icon: "qr",
    tone: "redSoft",
  },
];

export const categories: ToolCategory[] = [
  {
    title: "Calculators",
    count: "120+ tools",
    href: "/tools/calculators",
    icon: "calculator",
    tone: "blue",
  },
  {
    title: "Converters",
    count: "80+ tools",
    href: "/tools/converters",
    icon: "converter",
    tone: "blue",
  },
  {
    title: "Generators",
    count: "45+ tools",
    href: "/tools/generators",
    icon: "generator",
    tone: "orange",
  },
  {
    title: "Dev Tools",
    count: "200+ tools",
    href: "/tools/dev-tools",
    icon: "dev",
    tone: "blue",
  },
  {
    title: "Graphics",
    count: "64+ tools",
    href: "/tools/graphics",
    icon: "graphics",
    tone: "orange",
  },
  {
    title: "Text & SEO",
    count: "112+ tools",
    href: "/tools/text-seo",
    icon: "text-seo",
    tone: "blue",
  },
  {
    title: "Cybersec",
    count: "25+ tools",
    href: "/tools/cybersec",
    icon: "security",
    tone: "blue",
  },
  {
    title: "Finance",
    count: "58+ tools",
    href: "/tools/finance",
    icon: "finance",
    tone: "orange",
  }
];

export const trustHighlights = [
  {
    title: "1000+ Tools",
    description: "Growing library",
    icon: "toolBox",
    tone: "blue",
  },
  {
    title: "100% Client-side",
    description: "Zero data uploads",
    icon: "shield",
    tone: "blue",
  },
  {
    title: "0ms Latency",
    description: "Instant processing",
    icon: "bolt",
    tone: "orange",
  },
  {
    title: "2M+ Users",
    description: "Trusted Worldwide",
    icon: "users",
    tone: "orange",
  }
] as const;

export const footerColumns: FooterColumn[] = [
  {
    title: "Categories",
    links: [
      { label: "Calculators", href: "/tools/calculators" },
      { label: "Converters", href: "/categories/converters" },
      { label: "Generators", href: "/categories/generators" },
      { label: "Developer Tools", href: "/categories/developer-tools" },
      { label: "Graphics", href: "/categories/graphics" },
    ],
  },
  {
    title: "Popular Tools",
    links: [
      { label: "JSON Formatter", href: "/tools/json-formatter" },
      { label: "Unit Converter", href: "/tools/unit-converter" },
      { label: "Password Generator", href: "/tools/password-generator" },
      { label: "Image Compressor", href: "/tools/image-compressor" },
      { label: "Markdown Preview", href: "/tools/markdown-preview" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

﻿export type PrivacyFeature = {
  icon: string;
  title: string;
  description: string;
};

export const privacyFeatures: PrivacyFeature[] = [
  {
    icon: "shield_person",
    title: "Absolute Privacy",
    description: "All processing happens locally in your browser. We never see your data, nor do we store it on our servers. Your security is our priority.",
  },
  {
    icon: "bolt",
    title: "Instant Speed",
    description: "Optimized for sub-100ms response times. No waiting for server responses or bloated dependencies. Just immediate results.",
  },
  {
    icon: "offline_bolt",
    title: "Works Offline",
    description: "Full Progressive Web App (PWA) support allows you to use your favorite tools even when you are completely disconnected from the web.",
  },
];

export type SimplicityStep = {
  step: string;
  title: string;
  description: string;
};

export const simplicitySteps: SimplicityStep[] = [
  {
    step: "1",
    title: "Select Tool",
    description: "Pick from our library of 50+ specialized utilities.",
  },
  {
    step: "2",
    title: "Input Data",
    description: "Paste your text, upload your files, or enter values.",
  },
  {
    step: "3",
    title: "Instant Results",
    description: "Get your output instantly. No loading bars, no wait.",
  },
];

export type PopularTool = {
  icon: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

export const popularTools: PopularTool[] = [
  {
    icon: "data_object",
    category: "Dev",
    title: "JSON Formatter",
    description: "Clean, validate, and beautify messy JSON strings instantly for better readability.",
    href: "/tools/json-formatter",
  },
  {
    icon: "password",
    category: "Security",
    title: "Password Generator",
    description: "Generate cryptographically secure passwords with custom entropy requirements.",
    href: "/tools/password-generator",
  },
  {
    icon: "image",
    category: "Graphics",
    title: "Image Compressor",
    description: "Reduce file size of PNG/JPG/WebP images without losing visual quality.",
    href: "/tools/image-compressor",
  },
  {
    icon: "qr_code_2",
    category: "Utility",
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, WiFi, or text with high-resolution export.",
    href: "/tools/qr-code",
  },
  {
    icon: "currency_exchange",
    category: "Finance",
    title: "Currency Converter",
    description: "Real-time conversion rates for 150+ global currencies and crypto assets.",
    href: "/tools/currency",
  },
  {
    icon: "straighten",
    category: "Text",
    title: "Unit Converter",
    description: "Switch between metric and imperial units for length, weight, and volume.",
    href: "/tools/unit-converter",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  accent: "blue" | "secondary" | "tertiary";
};

export const testimonials: Testimonial[] = [
  {
    quote: "The JSON formatter is a life-saver for my daily debugging. No ads, no lag, just speed.",
    name: "Sarah K.",
    role: "Fullstack Engineer",
    accent: "blue",
  },
  {
    quote: "Privacy is huge for me. Knowing my client data never leaves my machine makes Jamro my go-to.",
    name: "Michael T.",
    role: "Security Analyst",
    accent: "secondary",
  },
  {
    quote: "I use the image compressor for every blog post. The quality retention is absolutely insane.",
    name: "Elena R.",
    role: "Content Creator",
    accent: "tertiary",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const homeFaqItems: FaqItem[] = [
  {
    question: "Is my data really secure?",
    answer: "Yes. Jamro Tools uses client-side JavaScript for all operations. This means your data is processed directly in your browser and is never uploaded to any server. You can even use the site while offline.",
  },
  {
    question: "Is Jamro Tools really free?",
    answer: "Yes, every tool is 100% free with no hidden costs or premium tiers. We maintain low overhead by running tools locally and support the project through optional corporate sponsorships and minor non-intrusive affiliate links.",
  },
  {
    question: "Can I suggest a new tool?",
    answer: "Absolutely! We love community input. Please visit our Contact page or reach out on social media to suggest new features or specific tools you would like to see added to the system.",
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, Jamro Tools is fully responsive and designed to work seamlessly on smartphones, tablets, and desktops. The experience is optimized for touch and keyboard input alike.",
  },
];
