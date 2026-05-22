import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Tools", href: "/tools", icon: "category" },
  { label: "About", href: "/about", icon: "info", active: true },
  { label: "Sign In", href: "/signin", icon: "account_circle" },
];

function NavIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
      {name}
    </span>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[#c3c6d7] bg-[#f9f9ff] shadow-lg md:hidden">
      {navItems.map((item) =>
        item.active ? (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 font-bold text-[#004ac6]"
          >
            <NavIcon name={item.icon} />
            <span className="text-[12px] leading-[1.4]">{item.label}</span>
          </Link>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 text-[#434655] transition-colors hover:text-[#004ac6]"
          >
            <NavIcon name={item.icon} />
            <span className="text-[12px] leading-[1.4]">{item.label}</span>
          </Link>
        ),
      )}
    </nav>
  );
}