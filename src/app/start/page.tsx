import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { Logo } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Get Kikai" },
  description: "Tell us about your salon and we’ll build your AI receptionist. Live in about a week.",
};

export default function StartPage() {
  return (
    <>
      <header className="mx-auto flex max-w-[1408px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" aria-label="Kikai home">
          <Logo />
        </Link>
        {/* Without a booking link this would only point back at this page. */}
        {site.bookingUrl !== "/start" && (
          <Link href={site.bookingUrl} className="text-[15px] text-ink-soft hover:text-ink">
            Need help? Book a 30-min call
          </Link>
        )}
      </header>
      <main>
        <SignupForm bookingUrl={site.bookingUrl} />
      </main>
    </>
  );
}
