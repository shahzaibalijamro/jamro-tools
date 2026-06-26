import { Container } from "@/components/ui/container";
import { homeFaqItems } from "@/lib/landing-data";

export function FaqSection() {
  return (
    <section className="bg-[var(--color-surface-container-low)] dark:bg-surface-container-low py-20">
      <Container className="max-w-3xl">
        <h2 className="text-center mb-12 text-[28px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:mb-14 min-[700px]:text-[36px]">
          Common Questions
        </h2>
        <div className="space-y-4">
          {homeFaqItems.map((item) => (
            <details
              key={item.question}
              className="glass-panel group rounded-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 min-[700px]:p-7">
                <span className="text-[16px] font-bold text-[var(--color-ink)] dark:text-on-surface min-[700px]:text-[18px]">
                  {item.question}
                </span>
                <span
                  className="material-symbols-outlined text-[var(--color-brand)] dark:text-brand-light transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-[15px] font-medium leading-relaxed text-[var(--color-muted)] dark:text-on-surface-variant min-[700px]:px-7 min-[700px]:pb-7 min-[700px]:text-[16px]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
