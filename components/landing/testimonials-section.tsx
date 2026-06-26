import { Container } from "@/components/ui/container";
import { testimonials } from "@/lib/landing-data";

const accentBg: Record<string, string> = {
  blue: "bg-[var(--color-primary-fixed)] dark:bg-primary-container",
  secondary: "bg-[var(--color-secondary-fixed)] dark:bg-secondary-container",
  tertiary: "bg-[var(--color-tertiary-fixed)] dark:bg-tertiary-container",
};

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--color-page)] py-20 min-[700px]:py-[120px]">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-surface-container)] dark:bg-surface-container p-8 min-[700px]:p-12">
          {/* Decorative quote mark */}
          <div className="absolute top-0 right-0 p-8 opacity-10 min-[700px]:p-12" aria-hidden="true">
            <span className="material-symbols-outlined text-[120px] text-[var(--color-brand)] dark:text-brand-light">
              format_quote
            </span>
          </div>

          <div className="relative z-10">
            <h2 className="mb-12 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] min-[700px]:mb-14 min-[700px]:text-[36px]">
              Loved by makers everywhere.
            </h2>
            <div className="grid grid-cols-1 gap-8 min-[700px]:grid-cols-3 min-[700px]:gap-12">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="flex flex-col gap-4">
                  <p className="text-[18px] italic font-medium leading-relaxed text-[var(--color-ink)] min-[700px]:text-[17px]">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-10 rounded-full ${accentBg[testimonial.accent]}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[14px] font-bold text-[var(--color-ink)]">
                        {testimonial.name}
                      </p>
                      <p className="text-[12px] text-[var(--color-muted)] dark:text-on-surface-variant">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
