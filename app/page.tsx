import { CategorySection } from "@/components/landing/category-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategorySection />
        <TrustSection />
      </main>
      <SiteFooter />
    </>
  );
}
