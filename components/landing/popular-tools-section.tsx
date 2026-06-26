import { SafeLink } from "@/components/ui/safe-link";
import { Container } from "@/components/ui/container";
import { popularTools } from "@/lib/landing-data";

export function PopularToolsSection() {
  return (
    <section className="bg-[linear-gradient(135deg,#273247_0%,#223b68_100%)] dark:bg-none dark:bg-surface-container-low py-20 min-[700px]:py-[120px]">
      <Container>
        <div className="flex flex-col gap-3 mb-12 min-[700px]:flex-row min-[700px]:items-end min-[700px]:justify-between min-[700px]:mb-14">
          <div>
            <h2 className="text-[28px] font-extrabold leading-tight text-white min-[700px]:text-[36px]">
              Most Popular Tools
            </h2>
            <p className="mt-2 text-[16px] font-medium text-white/70 dark:text-on-surface-variant min-[700px]:text-[18px]">
              Trusted daily by developers and professionals.
            </p>
          </div>
          <SafeLink
            href="/tools"
            className="text-[14px] font-bold text-primary-fixed hover:underline dark:text-brand-light min-[700px]:mb-2"
          >
            View all 50+ tools →
          </SafeLink>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[700px]:grid-cols-2 lg:grid-cols-3 min-[700px]:gap-7">
          {popularTools.map((tool) => (
            <SafeLink
              key={tool.title}
              href={tool.href}
              className="group flex flex-col rounded-[16px] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 dark:border-outline-variant dark:bg-surface-container dark:hover:bg-surface-container-high min-[700px]:p-7"
            >
              <div className="mb-4 flex items-start justify-between">
                <span
                  className="material-symbols-outlined text-[32px] text-primary-fixed dark:text-brand-light"
                  aria-hidden="true"
                >
                  {tool.icon}
                </span>
                <span className="rounded bg-white/5 px-2 py-1 text-[12px] font-semibold text-white/70 dark:bg-surface-container-high dark:text-on-surface-variant">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-[20px] font-extrabold leading-tight text-white dark:text-on-surface min-[700px]:text-[18px]">
                {tool.title}
              </h3>
              <p className="mt-2 mb-5 text-[14px] font-medium leading-relaxed text-white/70 dark:text-on-surface-variant min-[700px]:text-[13px]">
                {tool.description}
              </p>
              <span className="mt-auto w-full rounded-lg bg-[var(--color-brand)] py-2 text-center text-[14px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-primary dark:text-on-primary">
                Launch Tool
              </span>
            </SafeLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
