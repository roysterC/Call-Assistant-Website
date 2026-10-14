"use client";

import { ArrowRight } from "@phosphor-icons/react/ssr";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Outcome } from "@/content/site";

const outcomeStyle: Record<Outcome, string> = {
  Booked: "bg-blush",
  "Left a message": "bg-sage",
  Enquiry: "border border-line-strong bg-surface",
};

type Call = { question: string; answer: string; outcome: Outcome };

/**
 * Pick a caller's question, see what Kikai does with it. Tabs in the ARIA
 * sense: arrow keys, Home and End move between questions.
 */
export function TradeCalls({ calls }: { calls: Call[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const call = calls[active];

  function onKey(e: KeyboardEvent, i: number) {
    const last = calls.length - 1;
    const next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const to = (next + calls.length) % calls.length;
    setActive(to);
    tabs.current[to]?.focus();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div role="tablist" aria-label="Example calls" aria-orientation="vertical" className="flex flex-col gap-1.5">
        {calls.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.question}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-16 items-center justify-between gap-4 rounded-card border px-5 text-left text-lg tracking-[-0.01em] transition-[background-color,border-color,transform] active:scale-[0.99] ${
                selected ? "border-line-strong bg-surface" : "border-transparent hover:bg-card"
              }`}
            >
              “{c.question}”
              <ArrowRight size={16} weight="bold" aria-hidden="true" className={`flex-none transition-opacity ${selected ? "opacity-100" : "opacity-0"}`} />
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex min-h-[380px] flex-col gap-5 rounded-panel bg-card p-[clamp(28px,4vw,48px)]"
      >
        <div key={active} className="flex flex-1 animate-swap flex-col gap-5">
          <span className="text-sm text-muted">The caller asks</span>
          <p className="text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.15] tracking-[-0.025em]">“{call.question}”</p>
          <span className="mt-2 text-sm text-muted">Kikai</span>
          <p className="max-w-[46ch] text-lg text-ink-soft">{call.answer}</p>
          <span className={`mt-auto self-start rounded-full px-3.5 py-1.5 text-sm font-medium ${outcomeStyle[call.outcome]}`}>{call.outcome}</span>
        </div>
      </div>
    </div>
  );
}
