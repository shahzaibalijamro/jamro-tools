import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#004ac6] text-white hover:shadow-[0_10px_24px_rgba(0,74,198,0.18)]",
  secondary:
    "border border-[#004ac6] text-[#004ac6] hover:bg-[#004ac6]/5",
};

type AboutButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
};

export function AboutButton({
  children,
  href,
  variant = "primary",
  className = "",
}: AboutButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-12 py-3 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] transition-all active:scale-95 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-[24px] font-semibold leading-[1.2] text-[#111c2d] dark:text-slate-100 md:text-[32px]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-2xl text-[16px] leading-[1.6] text-[#434655] dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <div
      className={`rounded-[12px] border border-[#c3c6d7] dark:border-slate-700 bg-[#e7eeff] dark:bg-slate-800 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
