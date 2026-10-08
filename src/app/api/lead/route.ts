import { NextResponse } from "next/server";

/**
 * Sign-ups from /start. Each one is forwarded as JSON to KIKAI_LEADS_WEBHOOK_URL
 * (the CRM, or a Zapier/Make hook until the CRM has a public endpoint).
 *
 * With no webhook configured this answers 501 rather than pretending to
 * succeed, so a lead is never silently dropped: the form then points the
 * visitor at the booking link instead.
 */

const CHANNELS = ["Phone", "WhatsApp", "Instagram", "Facebook", "Website chat"] as const;
const SIZES = ["Just me", "2–4", "5–9", "10+"] as const;

type Lead = {
  salon: string;
  postcode: string;
  size: (typeof SIZES)[number];
  channels: (typeof CHANNELS)[number][];
  bookingsToday: string;
  name: string;
  email: string;
  phone: string;
  number: "forward" | "new";
};

function text(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function parse(body: unknown): Lead | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const lead: Lead = {
    salon: text(b.salon, 120),
    postcode: text(b.postcode, 12),
    size: SIZES.includes(b.size as Lead["size"]) ? (b.size as Lead["size"]) : "Just me",
    channels: Array.isArray(b.channels) ? CHANNELS.filter((c) => (b.channels as unknown[]).includes(c)) : [],
    bookingsToday: text(b.bookingsToday, 60),
    name: text(b.name, 120),
    email: text(b.email, 200),
    phone: text(b.phone, 30),
    number: b.number === "new" ? "new" : "forward",
  };
  if (!lead.salon || !lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return null;
  return lead;
}

export async function POST(request: Request) {
  const lead = parse(await request.json().catch(() => null));
  if (!lead) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const webhook = process.env.KIKAI_LEADS_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "not_configured" }, { status: 501 });

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "website:/start", receivedAt: new Date().toISOString(), ...lead }),
  }).catch(() => null);

  if (!res?.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
