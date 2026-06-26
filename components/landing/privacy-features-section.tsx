import { Container } from "@/components/ui/container";
import { privacyFeatures } from "@/lib/landing-data";

export function PrivacyFeaturesSection() {
  return (
    <section className="bg-[var(--color-surface-container-low)] dark:bg-surface-container-low py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 min-[700px]:grid-cols-3 min-[700px]:gap-7">
          {privacyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-[14px] border border-[var(--color-border)] dark:border-outline-variant bg-white dark:bg-surface-container-lowest p-6 shadow-[0_4px_14px_rgba(36,61,107,0.06)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.3)] min-[700px]:p-7"
            >
              <span
                className="material-symbols-outlined text-[32px] text-[var(--color-brand)] dark:text-brand-light"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <h3 className="text-[20px] font-extrabold leading-tight text-[var(--color-ink)] min-[700px]:text-[18px]">
                {feature.title}
              </h3>
              <p className="text-[15px] font-medium leading-relaxed text-[var(--color-muted)] dark:text-on-surface-variant min-[700px]:text-[14px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
