import { FeatureSwitcher } from "@/components/feature-switcher";
import { Hero } from "@/components/hero";
import { BuiltOn, DeskAndPocket, HowItWorks } from "@/components/how-it-works";
import { Calls, ClosingCta, Facts, Faq, Pricing, ValueComparison } from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BuiltOn />
        <HowItWorks />
        <DeskAndPocket />
        <FeatureSwitcher />
        <ValueComparison />
        <Calls />
        <Pricing />
        <Facts />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
