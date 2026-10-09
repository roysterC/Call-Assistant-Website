"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { pricing } from "@/content/site";
import { ArrowRight, Check } from "@phosphor-icons/react/ssr";

// The values are what /api/lead accepts and the CRM receives; only the label shown changes.
const SIZES = ["Just me", "2–4", "5–9", "10+"] as const;
const sizeLabel = (s: (typeof SIZES)[number]) => s.replace("–", "-");
const CHANNELS = [
  { name: "Phone", sub: "Your existing number" },
  { name: "WhatsApp", sub: "Business account" },
  { name: "Instagram", sub: "DMs" },
  { name: "Facebook", sub: "Messenger" },
  { name: "Website chat", sub: "One line on your site" },
] as const;
const STEPS = ["Your salon", "Your number", "Go live"];

type Status = "idle" | "sending" | "done" | "not_configured" | "error";

const input = "min-h-13 rounded-part border border-field bg-surface px-4 text-base placeholder:text-muted";
const labelCls = "text-sm font-medium";

export function SignupForm({ bookingUrl }: { bookingUrl: string }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [salon, setSalon] = useState("");
  const [postcode, setPostcode] = useState("");
  const [size, setSize] = useState<(typeof SIZES)[number]>("2–4");
  const [channels, setChannels] = useState<string[]>(["Phone", "WhatsApp"]);
  const [bookingsToday, setBookingsToday] = useState("Paper diary");
  const [number, setNumber] = useState<"forward" | "new">("forward");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const toggle = (c: string) => setChannels((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  function next(e: FormEvent) {
    e.preventDefault();
    setStep(1);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ salon, postcode, size, channels, bookingsToday, number, name, email, phone }),
    }).catch(() => null);
    if (res?.ok) {
      setStatus("done");
      setStep(2);
    } else {
      setStatus(res?.status === 501 ? "not_configured" : "error");
    }
  }

  return (
    <div className="mx-auto flex max-w-[1408px] flex-wrap items-start gap-x-16 gap-y-8 px-6 pt-6 pb-20">
      <div className="flex min-w-0 max-w-[680px] flex-[999_1_560px] flex-col gap-8">
        <ol aria-label="Progress" className="flex flex-wrap gap-2 text-sm">
          {STEPS.map((s, i) => (
            <li
              key={s}
              aria-current={i === step ? "step" : undefined}
              className={`inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 ${i === step ? "bg-olive text-on-olive" : i < step ? "bg-olive-tint text-ink" : "bg-card text-muted"}`}
            >
              <span className={`grid size-[22px] place-items-center rounded-full bg-surface font-mono text-xs ${i === step ? "text-ink" : ""}`}>
                {i < step ? <Check size={12} weight="bold" aria-hidden="true" /> : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <form onSubmit={next} className="flex flex-col gap-8">
            <div>
              <h1 className="mb-2 text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none font-normal tracking-[-0.04em]">Tell us about your salon</h1>
              <p className="text-lg text-muted">Two minutes. We’ll use this to build your receptionist before our call.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="salon" className={labelCls}>
                  Salon name
                </label>
                <input id="salon" required value={salon} onChange={(e) => setSalon(e.target.value)} placeholder="e.g. Fern Studio" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="postcode" className={labelCls}>
                  Postcode
                </label>
                <input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. LS1 4AP" autoComplete="postal-code" className={input} />
              </div>
            </div>

            <fieldset className="flex flex-col gap-2.5">
              <legend className={`${labelCls} mb-2.5`}>How many people take bookings?</legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={s === size}
                    onClick={() => setSize(s)}
                    className={`min-h-12 rounded-full border-[1.5px] px-5.5 font-medium transition-[background-color,transform] active:scale-[0.98] ${s === size ? "border-olive bg-olive text-on-olive" : "border-field bg-surface"}`}
                  >
                    {sizeLabel(s)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2.5">
              <legend className={`${labelCls} mb-2.5`}>
                What should Kikai answer? <span className="font-normal text-muted">Pick any</span>
              </legend>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-2">
                {CHANNELS.map((c) => {
                  const on = channels.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(c.name)}
                      className={`flex min-h-16 items-center justify-between gap-3 rounded-card border-[1.5px] px-4 text-left transition-colors ${on ? "border-olive bg-olive-tint" : "border-field bg-surface"}`}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-[13px] text-muted">{c.sub}</span>
                      </span>
                      <span aria-hidden="true" className={`grid size-[22px] flex-none place-items-center rounded-full border-[1.5px] ${on ? "border-olive bg-olive text-on-olive" : "border-field bg-surface text-transparent"}`}>
                        <Check size={12} weight="bold" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex max-w-[420px] flex-col gap-1.5">
              <label htmlFor="system" className={labelCls}>
                Where do you take bookings today?
              </label>
              <select id="system" value={bookingsToday} onChange={(e) => setBookingsToday(e.target.value)} className={`${input} px-3.5`}>
                <option>Paper diary</option>
                <option>A booking app</option>
                <option>Spreadsheet or calendar</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-olive px-8 text-[17px] font-medium text-on-olive transition-[background-color,transform] hover:bg-olive-hover active:scale-[0.98]">
                Continue
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </button>
              <span className="text-sm text-muted">Nothing to pay today.</span>
            </div>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={submit} className="flex flex-col gap-8">
            <div>
              <h1 className="mb-2 text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none font-normal tracking-[-0.04em]">Your number and you</h1>
              <p className="text-lg text-muted">Who should we ring to book your setup call?</p>
            </div>

            <fieldset className="flex flex-col gap-2.5">
              <legend className={`${labelCls} mb-2.5`}>Your salon’s phone number</legend>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-2">
                {(
                  [
                    ["forward", "Keep my number", "Forward it to Kikai. Clients ring the number they know."],
                    ["new", "Get a new number", "We’ll set up a local number for you."],
                  ] as const
                ).map(([value, title, sub]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer gap-3 rounded-card border-[1.5px] p-4 ${number === value ? "border-olive bg-olive-tint" : "border-field bg-surface"}`}
                  >
                    <input type="radio" name="number" value={value} checked={number === value} onChange={() => setNumber(value)} className="mt-1 accent-olive" />
                    <span className="flex flex-col">
                      <span className="font-medium">{title}</span>
                      <span className="text-[13px] text-muted">{sub}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className={labelCls}>
                  Your name
                </label>
                <input id="name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className={labelCls}>
                  Mobile
                </label>
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={labelCls}>
                  Email
                </label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={input} />
              </div>
            </div>

            {status === "not_configured" && (
              <p role="alert" className="rounded-card border-[1.5px] border-alert bg-surface p-4">
                Online sign-up isn’t switched on yet.{" "}
                <Link href={bookingUrl} className="font-medium underline">
                  Book a 30-min call
                </Link>{" "}
                and we’ll take it from there.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="rounded-card border-[1.5px] border-alert bg-surface p-4">
                That didn’t go through. Try again, or{" "}
                <Link href={bookingUrl} className="font-medium underline">
                  book a 30-min call
                </Link>
                .
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setStep(0)} className="min-h-14 rounded-full border border-field px-6 font-medium transition-[background-color,transform] hover:bg-card active:scale-[0.98]">
                Back
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-olive px-8 text-[17px] font-medium text-on-olive transition-[background-color,transform] hover:bg-olive-hover active:scale-[0.98] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send"}
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && status === "done" && (
          <div className="flex flex-col gap-4" role="status">
            <h1 className="text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none font-normal tracking-[-0.04em]">Thanks, {name.split(" ")[0]}.</h1>
            <p className="max-w-[46ch] text-lg text-muted">
              We’ve got {salon}’s details. We’ll be in touch to book your setup call, then you’re live in about a week.
            </p>
            <Link href="/" className="self-start font-medium text-olive-text underline">
              Back to the home page
            </Link>
          </div>
        )}
      </div>

      <aside className="flex min-w-0 flex-[1_1_360px] flex-col gap-6 rounded-panel bg-olive-tint p-7">
        <div className="flex items-center justify-between">
          <span className="text-xl font-medium">Your Kikai</span>
          <span className="rounded-full bg-surface px-3 py-1 text-[13px] font-medium">Live in a week</span>
        </div>
        <div className="flex flex-col gap-2.5 rounded-card bg-surface p-5">
          <span className="text-sm text-muted">{sizeLabel(size)} taking bookings</span>
          <span className="text-[17px]">{channels.length ? CHANNELS.filter((c) => channels.includes(c.name)).map((c) => c.name).join(", ") : "Pick at least one channel"}</span>
          {pricing.monthly && (
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="text-5xl leading-none tracking-[-0.05em]">{pricing.monthly}</span>
              <span className="text-muted">/ month</span>
            </p>
          )}
          <span className="font-mono text-xs text-muted">{pricing.setup ? `+ ${pricing.setup} one-off setup` : "+ one-off setup fee"}</span>
        </div>
        <div className="flex flex-col">
          <span className="mb-3 text-sm font-medium text-muted">What happens next</span>
          {[
            ["Your number", "Forward the number you have, or get a new one."],
            ["A 30-minute call", "We go through your price list, team and rules."],
            ["Go live", "Usually within a week. We test it with you first."],
          ].map(([t, b], i) => (
            <div key={t} className="flex gap-3.5 border-t border-line-strong py-3">
              <span className="grid size-7 flex-none place-items-center rounded-full bg-surface font-mono text-xs text-olive-text">{i + 1}</span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-muted">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
