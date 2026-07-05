import {
  Drill,
  Heart,
  LayoutGrid,
  ShieldCheck,
  WandSparkles,
  Zap,
} from "lucide-react";

export const aboutNavItems = [
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const missionFacts = ["100% Free Forever", "No Sign-up Required"];

export const storyHighlight = {
  icon: WandSparkles,
  title: "Evolution of Utility",
  description: "From simple scripts to a global platform.",
};

export const precisionMetric = {
  icon: Drill,
  value: "99.9%",
  title: "Accuracy Standard",
  description:
    "Every tool is rigorously tested against industry standards for mathematical and technical precision.",
};

export const valueCards = [
  {
    icon: Zap,
    title: "Zero Friction",
    description:
      "Pick a tool, drop in your input, get your output. No accounts, no tutorials, no onboarding – just pure, undiluted utility.",
  },
  {
    icon: ShieldCheck,
    title: "Unrivaled Speed",
    description:
      "All tools run locally using JavaScript and WebAssembly. No server round trips. Instant results, every time.",
  },
  {
    icon: LayoutGrid,
    title: "Private by Default",
    description:
      "There’s no sign‑up, no login, and no server‑side processing. Everything you type, paste, or upload stays locked inside your browser.",
  },
];

export const teamMembers = [
  {
    name: "Umer",
    role: "Founder & SEO Expert",
    quote:
      '"We wanted to eliminate the hassle of chasing tools across the internet. One website should be enough for any digital task."',
    image: "/about/david-chen.png",
    alt: "Umer, Founder & SEO Expert",
  },
  {
    name: "Shahzaib Ali",
    role: "Co‑Founder & Software Engineer",
    quote: '"The best tools are the ones you don’t notice. Our job is to make sure everything just works, so you can stay in your flow."',
    image: "/about/sarah-jenkins.png",
    alt: "Shahzaib Ali, Co‑Founder & Software Engineer",
  },
];

export const philosophy = {
  icon: Heart,
  title: "Our Philosophy",
  description:
    "Accessibility isn’t just about price – it’s about removing every possible barrier. No sign‑ups, no separate sites to remember, no data leaving your machine. The moment you need a tool, it should already be there, ready to work.",
};

export const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "API", href: "/api" },
  { label: "Help Center", href: "/help" },
];
