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
    title: "PDF Utils",
    count: "32+ tools",
    href: "/tools/pdf-utils",
    icon: "pdf",
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
  },
  {
    title: "Others",
    count: "150+ tools",
    href: "/tools/others",
    icon: "others",
    tone: "blue",
  },
];

export const trustHighlights = [
  {
    title: "Lightning Fast",
    description: "Tools load in under 100ms.",
    icon: "gauge",
    tone: "blue",
  },
  {
    title: "Any Device",
    description: "Seamless mobile experience.",
    icon: "devices",
    tone: "blue",
  },
  {
    title: "API Ready",
    description: "Developer endpoints available.",
    icon: "api",
    tone: "orange",
  },
] as const;

export const footerColumns: FooterColumn[] = [
  {
    title: "Categories",
    links: [
      { label: "Calculators", href: "/categories/calculators" },
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
