import {
  Drill,
  Heart,
  LayoutGrid,
  ShieldCheck,
  WandSparkles,
  Zap,
} from "lucide-react";

export const aboutNavItems = [
  { label: "All Tools", href: "/tools" },
  { label: "Text", href: "/tools/text" },
  { label: "Images", href: "/tools/images" },
  { label: "Math", href: "/tools/math" },
  { label: "Dev", href: "/tools/dev" },
  { label: "Converters", href: "/tools/converters" },
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
    title: "Unrivaled Speed",
    description:
      "Optimized for performance. Our tools process data locally in your browser whenever possible for instant results.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your data stays with you. We don't store the text, images, or files you process on our platform.",
  },
  {
    icon: LayoutGrid,
    title: "Pure Utility",
    description:
      "No bloat. No complex workflows. Just enter your input and get your output in seconds.",
  },
];

export const teamMembers = [
  {
    name: "David Chen",
    role: "Founder & Lead Engineer",
    quote:
      '"Tools should be invisible\u2014they should just work so you can focus on the result."',
    image: "/about/david-chen.png",
    alt: "David Chen, Founder and Lead Engineer",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Product Design",
    quote: '"Simplicity is the ultimate sophistication in utility design."',
    image: "/about/sarah-jenkins.png",
    alt: "Sarah Jenkins, Head of Product Design",
  },
];

export const philosophy = {
  icon: Heart,
  title: "Our Philosophy",
  description:
    "We believe that professional-grade tools shouldn't require a professional budget. Accessibility is our primary metric of success.",
};

export const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "API", href: "/api" },
  { label: "Help Center", href: "/help" },
];
