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
  | "text"
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
    title: "SEO Tools",
    count: "45+ tools",
    href: "/tools/seo-tools",
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
    title: "Image Tools",
    count: "64+ tools",
    href: "/tools/image-tools",
    icon: "graphics",
    tone: "orange",
  },
  {
    title: "PDF Tools",
    count: "112+ tools",
    href: "/tools/pdf-tools",
    icon: "pdf",
    tone: "blue",
  },
  {
    title: "Text Tools",
    count: "25+ tools",
    href: "/tools/text-tools",
    icon: "text",
    tone: "blue",
  },
  {
    title: "Security Tools",
    count: "58+ tools",
    href: "/tools/security-tools",
    icon: "security",
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

export type PrivacyFeature = {
  icon: string;
  title: string;
  description: string;
};

export const privacyFeatures: PrivacyFeature[] = [
  {
    icon: "shield_person",
    title: "Absolute Data Privacy",
    description: "As a strict privacy-first web utility platform, all data processing happens locally within your browser sandbox. Your sensitive files, strings, and inputs are never uploaded to remote servers or stored in databases. What stays on your machine stays yours.",
  },
  {
    icon: "bolt",
    title: "Sub-100ms Performance",
    description: "Engineered for ultimate efficiency, our free online web utilities leverage advanced client-side JavaScript. By eliminating slow server roundtrips and API delays, you get near-instantaneous output. This ensures a fluid experience even on low-bandwidth connections.",
  },
  {
    icon: "offline_bolt",
    title: "Zero Installation Required",
    description: "Access a comprehensive digital workshop instantly from any device. There are no bulky software downloads, browser extensions, or account sign-ups required. You get pure, web-based utility tools available whenever you are connected.",
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
    question: "What are the best free online web utilities for developers?",
    answer:
      "Jamro Tools provides a comprehensive suite of free online web utilities designed for developers, creators, and SEO professionals. Our cloud-based workshop features over 50 specialized tools, including a client-side JSON formatter, an efficient image compressor, and a secure password generator to help streamline daily technical workflows instantly.",
  },
  {
    question: "Do client-side web tools require an internet connection?",
    answer:
      "Yes, Jamro Tools is a fully online web utility platform that requires an active internet connection to load and initialize its scripts. Once the web-based utility is loaded on your screen, the processing executes securely inside your browser sandbox, eliminating the need to upload files or private text to a remote database.",
  },
  {
    question: "How does internet connection affect online tool performance?",
    answer:
      "Because Jamro Tools operates as an online service, your initial loading times depend on your current internet speed. A stable, high-speed connection ensures that complex developer tools, calculators, and graphics scripts render quickly in your browser for immediate, real-time data processing.",
  },
  {
    question: "Are there safe online tools that don't upload my data?",
    answer:
      "Absolutely. Jamro Tools is engineered as a privacy-first web utility platform. Even though the platform is accessed online over the internet, we never upload your data, input strings, or sensitive files to our servers. All operations happen directly inside your web browser to maintain strict data privacy.",
  },
  {
    question: "Can I access free web tools without downloading software?",
    answer:
      "Yes, you can access the entire catalog at Jamro Tools instantly through any modern web browser without downloading bulky software, desktop applications, or third-party browser extensions. Simply visit the website to access professional-grade utilities completely free with no registration required.",
  },
];