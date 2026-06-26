import {
  Calculator,
  ChartNoAxesCombined,
  CircleDollarSign,
  Code2,
  FileText,
  Image,
  ImageUpscale,
  KeyRound,
  Languages,
  QrCode,
  Repeat2,
  Shapes,
  ShieldCheck,
  Wrench,
  Text,
  type LucideIcon,
} from "lucide-react";

import type { IconTone, LandingIcon } from "@/lib/landing-data";

const iconComponents = {
  calculator: Calculator,
  converter: Repeat2,
  currency: CircleDollarSign,
  dev: Code2,
  finance: ChartNoAxesCombined,
  generator: Wrench,
  graphics: Image,
  "image-resizer": ImageUpscale,
  others: Shapes,
  password: KeyRound,
  pdf: FileText,
  qr: QrCode,
  security: ShieldCheck,
  "text-seo": Languages,
  "text": Text
} satisfies Record<LandingIcon, LucideIcon>;

const toneStyles: Record<IconTone, string> = {
  blue: "bg-[var(--color-brand-light)] text-white dark:bg-[#004ac6] dark:text-white",
  blueSoft: "bg-[#e2efff] text-[#0666d3] dark:bg-[#004ac6] dark:text-white",
  orange: "bg-[#bd4a00] text-white dark:bg-tertiary dark:text-white",
  peach: "bg-[#f6e8e1] text-[#a74600] dark:bg-[#7c2d12] dark:text-tertiary",
  redSoft: "bg-[#fae5e9] text-[#dd3638] dark:bg-[#7f1d1d] dark:text-error",
};


type ToolIconProps = {
  icon: LandingIcon;
  tone: IconTone;
  className?: string;
  iconClassName?: string;
};

export function ToolIcon({
  icon,
  tone,
  className = "",
  iconClassName = "",
}: ToolIconProps) {
  const Icon = iconComponents[icon];

  return (
    <span className={`inline-flex items-center justify-center rounded-[12px] ${toneStyles[tone]} ${className}`}>
      <Icon className={iconClassName} strokeWidth={2.35} aria-hidden="true" />
    </span>
  );
}
