import { Closing } from "@/components/closing";
import { Day } from "@/components/day";
import { Facts } from "@/components/facts";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { MotionProvider } from "@/components/motion";
import { Pricing } from "@/components/pricing";
import { Principles } from "@/components/principles";
import { Setup } from "@/components/setup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Facts />
        <Day />
        <Features />
        <Principles />
        <Setup />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
      <StickyCta />
    </MotionProvider>
  );
}
