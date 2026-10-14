"use client";

import { CaretDown } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { trades } from "@/content/trades";

/**
 * The "Businesses" pill in the header. A disclosure, not an ARIA menu: it
 * opens a short list of ordinary links, which Tab already walks through.
 * Closes on Escape (focus back to the pill), on a click outside, and when
 * focus leaves it.
 */
export function BusinessesMenu() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong pr-3.5 pl-4 text-ink transition-[background-color,transform] active:scale-[0.98] ${open ? "bg-card" : "hover:bg-card"}`}
      >
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
                    onClick={() => setOpen(false)}
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
