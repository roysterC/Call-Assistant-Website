"use client";

import { List, X } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { ButtonLink, Logo } from "./ui";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#handles", label: "What it handles" },
  { href: "/#calls", label: "Hear it" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 mx-auto flex max-w-[1408px] items-center justify-between gap-6 px-6 py-4">
      <Link href="/" aria-label="Kikai home">
        <Logo />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] text-ink-soft lg:flex">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* A wrapper, because ButtonLink sets its own display. */}
        <span className="hidden sm:contents">
          <ButtonLink href={site.loginUrl} variant="secondary" size="md">
            Log in
          </ButtonLink>
        </span>
        <ButtonLink href="/start" size="md">
          Get Kikai
        </ButtonLink>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line-strong transition-transform active:scale-[0.96] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-4 top-full flex animate-swap flex-col rounded-card border border-line bg-surface p-2 shadow-float lg:hidden"
        >
          {[...links, { href: site.loginUrl, label: "Log in" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-part px-4 py-3 text-lg hover:bg-card">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
