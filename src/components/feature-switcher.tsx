"use client";

import { useState, type ReactNode } from "react";
import { features } from "@/content/site";
import { Container, MicIcon, SectionHeading } from "./ui";

function Bubble({ from, children }: { from: "them" | "us"; children: ReactNode }) {
  return from === "them" ? (
    <p className="max-w-[85%] self-start rounded-[14px_14px_14px_4px] bg-card px-3 py-2.5">{children}</p>
  ) : (
    <p className="max-w-[85%] self-end rounded-[14px_14px_4px_14px] bg-olive px-3 py-2.5 text-white">{children}</p>
  );
}

const screenLabel = "font-mono text-[11px] text-muted";

function CallScreen() {
  return (
    <>
      <span className={screenLabel}>LIVE CALL · 02:14</span>
      <span className="text-[22px] font-medium tracking-[-0.02em]">Amira K.</span>
      <Bubble from="them">Anything for a cut and colour on Saturday?</Bubble>
      <Bubble from="us">Have you had a skin test with us in the last six months?</Bubble>
      <Bubble from="them">Yes, in August.</Bubble>
      <Bubble from="us">Jess has half past two. Shall I pop you in?</Bubble>
      <div className="mt-auto rounded-[14px] bg-blush p-3 font-medium">Booked · Sat 14:30 · Jess</div>
    </>
  );
}

const day = [
  { t: "10:00", what: "Wash & blow dry", who: "Priya", fresh: false },
  { t: "11:30", what: "Gents cut", who: "Sam", fresh: false },
  { t: "13:00", what: "Full head colour", who: "Priya", fresh: false },
  { t: "14:30", what: "Cut & colour · new", who: "Jess · booked by Kikai", fresh: true },
  { t: "15:15", what: "Skin test · new", who: "Priya · booked by Kikai", fresh: true },
  { t: "16:00", what: "Blow dry", who: "Jess", fresh: false },
];

function DiaryScreen() {
  return (
    <>
      <span className={screenLabel}>DIARY · SATURDAY</span>
      {day.map((d) => (
        <div key={d.t} className="flex gap-2.5">
          <span className="w-10 pt-2 font-mono text-xs text-muted">{d.t}</span>
          <span className={`flex flex-1 flex-col rounded-[10px] px-2.5 py-2 ${d.fresh ? "bg-blush" : "bg-card"}`}>
            <span className="font-medium">{d.what}</span>
            <span className="text-xs text-ink-soft">{d.who}</span>
          </span>
        </div>
      ))}
    </>
  );
}

const callbacks = [
  { name: "Lauren P.", when: "12:47", about: "For Sam: her colour before Friday" },
  { name: "Mark T.", when: "Yesterday", about: "Wedding party of six" },
  { name: "Withheld", when: "Mon", about: "Supplier, asked for the owner" },
];

function CallbacksScreen() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-medium tracking-[-0.02em]">Callbacks</span>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-alert text-xs font-semibold text-white">3</span>
      </div>
      {callbacks.map((c) => (
        <div key={c.name} className="flex flex-col gap-0.5 rounded-xl bg-card p-3">
          <span className="flex justify-between font-medium">
            {c.name}
            <span className="font-mono text-[11px] text-muted">{c.when}</span>
          </span>
          <span className="text-[13px] text-ink-soft">{c.about}</span>
        </div>
      ))}
      <span className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-olive font-medium text-white">Ring Lauren back</span>
    </>
  );
}

function AssistantScreen() {
  return (
    <>
      <span className={screenLabel}>ASSISTANT</span>
      <Bubble from="us">What’s my afternoon like?</Bubble>
      <Bubble from="them">Three in after lunch: Sarah at two, a skin test at quarter past three, then a blow dry at four.</Bubble>
      <Bubble from="us">Move Sarah to half two and text her.</Bubble>
      <div className="flex flex-col gap-2 rounded-[14px] border-[1.5px] border-line-strong p-3">
        <span className="font-medium">Move Sarah · 14:00 → 14:30</span>
        <span className="text-xs text-muted">and text her</span>
        <span className="flex gap-1.5">
          <span className="flex-1 rounded-full bg-olive p-2 text-center text-white">Yes</span>
          <span className="flex-1 rounded-full border border-line-strong p-2 text-center">No</span>
        </span>
      </div>
      <span className="mt-auto grid size-14 place-items-center self-center rounded-full bg-blush">
        <MicIcon />
      </span>
    </>
  );
}

const screens = [CallScreen, DiaryScreen, CallbacksScreen, AssistantScreen];

export function FeatureSwitcher() {
  const [active, setActive] = useState(0);
  const Screen = screens[active];

  return (
    <section id="handles" className="scroll-mt-6 py-30">
      <Container className="flex flex-wrap items-center gap-x-20 gap-y-12">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-2">
          <SectionHeading className="mb-8 max-w-[14ch]">Every call starts with a proper answer</SectionHeading>
          {features.map((f, i) => {
            const on = i === active;
            return (
              <button
                key={f.title}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`flex gap-6 border-t border-line py-5 text-left transition-opacity ${on ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
              >
                <span className="w-6 pt-1.5 font-mono text-[13px] text-olive-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[26px] leading-[1.15] tracking-[-0.03em]">{f.title}</span>
                  {on && <span className="max-w-[46ch] text-muted">{f.body}</span>}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid min-h-[720px] min-w-0 flex-[1_1_420px] place-items-center rounded-[28px] bg-olive-tint px-4 py-10">
          <div
            role="img"
            aria-label={`Kikai on a phone: ${features[active].title}`}
            className="h-[640px] w-[320px] rounded-[48px] bg-[#1c1c1e] p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.3)]"
          >
            <div aria-hidden="true" className="flex h-full flex-col gap-3 overflow-hidden rounded-[38px] bg-white px-[18px] pt-11 pb-[18px] text-sm">
              <Screen />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
