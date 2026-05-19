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
        className="flex min-h-[180px] min-w-0 flex-col rounded-[18px] border border-[var(--color-border-strong)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)] min-[700px]:min-h-[260px] min-[700px]:p-9 lg:min-h-[210px] lg:rounded-[12px] lg:p-7 xl:min-h-[190px]"
      >
        <ToolIcon
          icon={category.icon}
          tone={category.tone}
          className="size-16 shrink-0 min-[700px]:size-[86px] lg:size-[64px]"
          iconClassName="size-9 min-[700px]:size-12 lg:size-9"
        />
        <h3 className="mt-8 min-w-0 break-words text-[24px] font-extrabold leading-[1.08] text-[var(--color-ink)] min-[700px]:mt-12 min-[700px]:text-[30px] lg:mt-7 lg:text-[clamp(20px,2vw,24px)] xl:text-[24px]">
          {category.title}
        </h3>
        <p className="mt-4 text-[14px] font-medium leading-none text-[var(--color-ink)] min-[700px]:mt-5 min-[700px]:text-[18px] lg:text-[13px] xl:mt-4 xl:text-[12px]">
          {category.count}
        </p>
      </Link>
    </li>
  );
}

export function CategorySection() {
  return (
    <section className="bg-[var(--color-page)] pt-20 pb-20 min-[700px]:pt-[145px] min-[700px]:pb-[120px] lg:pt-[111px] lg:pb-[130px]">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:text-[48px] lg:text-[36px]">
            Browse by Category
          </h2>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-[14px] font-extrabold leading-none text-[var(--color-brand)] transition hover:text-[#0649c5] min-[700px]:text-[22px] lg:text-[14px]"
          >
            <span>View All</span>
            <ChevronRight className="size-5 lg:size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-9 min-[700px]:mt-[72px] min-[700px]:grid-cols-2 lg:mt-[57px] lg:grid-cols-4 lg:gap-7 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
