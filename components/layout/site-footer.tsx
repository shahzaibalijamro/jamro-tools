import Link from "next/link";
import { SafeLink } from "@/components/ui/safe-link";
import { AtSign, Globe2, Heart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { footerColumns } from "@/lib/landing-data";

export function SiteFooter({ hasMarginBottom = false }) {
  return (
    <footer
      className={`bg-[#273247] min-[700px]:pb-0 text-[#d9e4f6] ${hasMarginBottom ? "pb-16" : ""}`}
    >
      <Container>
        <div className="mx-auto max-w-full">
          <div className="grid gap-12 justify-center min-[700px]:justify-start text-center min-[700px]:text-start py-14 min-[700px]:py-16 min-[700px]:grid-cols-[1fr_0.8fr_1fr_0.95fr] min-[700px]:gap-20">
            <div>
              <Link
                href="/"
                className="text-[20px] font-extrabold leading-none text-[#c9dbff]"
                aria-label="Jamro Tools home"
              >
                Jamro Tools
              </Link>
              <p className="mt-6 max-w-[270px] text-[15px] font-medium leading-[1.7]  text-[#526075]">
                500+ free tools, one platform. <br />
                Math, converters, SEO, dev, images, PDFs, text, security. <br />
                Built for accuracy and simplicity.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#d9e4f6]">
                  {column.title}
                </h2>
                <ul className="mt-6 space-y-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <SafeLink
                        href={link.href}
                        className="text-[15px] font-medium  text-[#526075] transition hover:text-[#d9e4f6]"
                      >
                        {link.label}
                      </SafeLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] py-7 text-center text-[12px] font-medium leading-8  text-[#526075]">
            <p>© 2026 Jamro Tools. Built for speed.</p>
            <p className="inline-flex items-center justify-center gap-1">
              Made with
              <Heart
                className="size-3 fill-red-500 text-red-500"
                aria-hidden="true"
              />
              by{" "}
              <a
                href="https://github.com/shahzaibalijamro"
                className="underline hover:text-[#d9e4f6]"
              >
                Shahzaib Ali
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
