import { Container } from "@/components/ui/container";
import { simplicitySteps } from "@/lib/landing-data";

export function SimplicitySection() {
  return (
    <section className="bg-[var(--color-page)] py-20 min-[700px]:py-[120px] overflow-hidden">
      <Container>
        <div className="flex flex-col items-center text-center mb-12 min-[700px]:mb-14">
          <h2 className="text-[28px] font-extrabold leading-none text-[var(--color-ink)] min-[700px]:text-[36px]">
            Simplicity by Design
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 min-[700px]:grid-cols-3 min-[700px]:gap-8">
          {/* Connector line for desktop */}
          <div
            className="hidden min-[700px]:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-[var(--color-brand)]/20 via-[var(--color-brand)] to-[var(--color-brand)]/20"
            aria-hidden="true"
          />

          {simplicitySteps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col items-center text-center z-20"
            >
              <div className="flex size-24 items-center justify-center rounded-full bg-[var(--color-brand)] text-white text-[36px] font-extrabold shadow-lg border-8 border-[var(--color-page)] dark:border-surface-container dark:text-on-primary dark:bg-primary">
                {step.step}
              </div>
              <h3 className="mt-4 text-[20px] font-extrabold leading-tight text-[var(--color-ink)] min-[700px]:text-[18px]">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--color-muted)] dark:text-on-surface-variant min-[700px]:text-[14px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
