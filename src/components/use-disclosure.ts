"use client";

import { useEffect, useId, useRef, useState, type FocusEvent } from "react";

/**
 * Open/close state for a header dropdown (a disclosure, not an ARIA menu: it
 * shows ordinary links, which Tab already walks through). Closes on Escape,
 * putting focus back on the button, on a click outside, and when focus
 * leaves the wrapper.
 */
export function useDisclosure() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

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

  return {
    open,
    close: () => setOpen(false),
    wrapperProps: {
      ref: wrapper,
      onBlur: (e: FocusEvent) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      },
    },
    buttonProps: {
      ref: button,
      type: "button" as const,
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: () => setOpen((o) => !o),
    },
    panelId,
  };
}

/** The pill both header dropdowns use, open or closed. */
export const pillClass = (open: boolean) =>
  `inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong pr-3.5 pl-4 text-ink transition-[background-color,transform] active:scale-[0.98] ${open ? "bg-card" : "hover:bg-card"}`;
