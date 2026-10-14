import type { Metadata } from "next";
import { FeatureSwitcher } from "@/components/feature-switcher";
import { HandsFull, Hero } from "@/components/hero";
import { answeredFaqs, faqLd, JsonLd, organizationLd, productLd } from "@/components/json-ld";
import { BuiltOn, DeskAndPocket, HowItWorks } from "@/components/how-it-works";
import { Calls, ClosingCta, Facts, Faq, Pricing, ValueComparison } from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { site } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd,
    { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url, publisher: { "@id": `${site.url}/#organization` } },
    productLd,
    { ...faqLd(answeredFaqs), "@id": `${site.url}/#faq` },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader />
      <main>
        <Hero />
        <HandsFull />
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
