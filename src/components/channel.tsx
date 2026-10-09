import { ChatCircleText, FacebookLogo, InstagramLogo, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Channel, Outcome } from "@/content/site";

const icons = {
  Phone,
  WhatsApp: WhatsappLogo,
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
  "Website chat": ChatCircleText,
} satisfies Record<Channel, unknown>;

export function ChannelLabel({ channel, className = "" }: { channel: Channel; className?: string }) {
  const Icon = icons[channel];
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium text-ink-soft ${className}`}>
      <Icon size={18} aria-hidden="true" />
      {channel}
    </span>
  );
}

const outcomeStyle: Record<Outcome, string> = {
  Booked: "bg-accent-tint text-ink",
  "Left a message": "bg-sage text-ink",
  Enquiry: "border border-line-strong text-ink-soft",
};

export function OutcomeChip({ outcome }: { outcome: Outcome }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-[13px] font-medium ${outcomeStyle[outcome]}`}>{outcome}</span>;
}
