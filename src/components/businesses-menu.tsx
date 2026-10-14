"use client";

import { CaretDown } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trades } from "@/content/trades";
import { pillClass, useDisclosure } from "./use-disclosure";

/** The "Businesses" pill in the header: the trade pages, with a photo each. */
export function BusinessesMenu() {
  const { open, close, wrapperProps, buttonProps, panelId } = useDisclosure();
  const pathname = usePathname();

  return (
    <div {...wrapperProps} className="relative">
      <button {...buttonProps} className={pillClass(open)}>
        Businesses
        <CaretDown size={14} weight="bold" aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={panelId} className="absolute top-[calc(100%+10px)] -left-2 w-[360px] animate-swap rounded-card border border-line bg-surface p-2 shadow-float">
          <ul className="flex flex-col gap-1">
            {trades.map((t) => {
              const href = `/for/${t.slug}`;
              const current = pathname === href;
              return (
                <li key={t.slug}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    onClick={close}
                    className={`flex items-center gap-3.5 rounded-part p-2.5 transition-colors hover:bg-olive-tint ${current ? "bg-olive-tint" : ""}`}
                  >
                    <Image src={t.hero.image} alt="" sizes="56px" className="size-14 flex-none rounded-part object-cover" />
                    <span className="flex flex-col">
                      <span className="font-medium text-ink">{t.label}</span>
                      <span className="text-sm text-muted">{t.blurb}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
