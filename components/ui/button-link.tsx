import Link from "next/link";
import { ArrowRight, Shuffle } from "lucide-react";

type ButtonVariant = "primary" | "secondary";
type ButtonIcon = "arrow" | "random";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand)] text-white shadow-[0_12px_24px_rgba(4,84,207,0.12)] hover:bg-[#0649c5]",
  secondary:
    "border border-[var(--color-border-strong)] bg-white text-[var(--color-ink)] shadow-[0_12px_24px_rgba(15,23,42,0.03)] hover:border-[var(--color-brand)]",
};

const iconMap = {
  arrow: ArrowRight,
  random: Shuffle,
};

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  icon: ButtonIcon;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({
  children,
  href,
  icon,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-4 rounded-full font-bold transition ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      <Icon className="size-6 min-[700px]:size-8 lg:size-5" aria-hidden="true" />
    </Link>
  );
}
