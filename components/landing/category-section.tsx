import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ToolIcon } from "@/components/landing/tool-icon";
import { Container } from "@/components/ui/container";
import { categories, type ToolCategory } from "@/lib/landing-data";

function CategoryCard({ category }: { category: ToolCategory }) {
  return (
    <li>
      <Link
        href={category.href}
        className="flex min-h-[180px] text-center justify-center min-w-0 flex-col rounded-[18px] border border-[var(--color-border-strong)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)] min-[700px]:min-h-[210px] min-[700px]:rounded-[12px] min-[700px]:p-7 xl:min-h-[190px]"
      >
        <ToolIcon
          icon={category.icon}
          tone={category.tone}
          className="size-16 mx-auto shrink-0 min-[700px]:size-[64px]"
          iconClassName="size-9 min-[700px]:size-9"
        />
        <h3 className="mt-8 min-w-0 break-words text-[24px] font-extrabold leading-[1.08] text-[var(--color-ink)] min-[700px]:mt-7 min-[700px]:text-[clamp(20px,2vw,24px)] xl:text-[24px]">
          {category.title}
        </h3>
        <p className="mt-4 text-[14px] font-medium leading-none text-[var(--color-ink)] min-[700px]:text-[13px] xl:mt-4 xl:text-[12px]">
          {category.count}
        </p>
      </Link>
    </li>
  );
}

export function CategorySection() {
  return (
    <section className="bg-[var(--color-page)] pt-20 pb-20 min-[700px]:pt-[111px] min-[700px]:pb-[130px]">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:text-[36px]">
            Browse by Category
          </h2>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-[14px] font-extrabold leading-none text-[var(--color-brand)] transition hover:text-[#0649c5] min-[700px]:text-[14px]"
          >
            <span>View All</span>
            <ChevronRight className="size-5 min-[700px]:size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-9 min-[700px]:mt-[57px] min-[700px]:grid-cols-4 min-[700px]:gap-7 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
