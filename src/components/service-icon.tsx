import type { IconProps } from "@phosphor-icons/react";
import { CalendarBlank, ChartBar, ChatsCircle, Microphone, Phone } from "@phosphor-icons/react/ssr";
import type { ServiceIcon as Name } from "@/content/services";

const icons = { phone: Phone, calendar: CalendarBlank, microphone: Microphone, chats: ChatsCircle, chart: ChartBar } as const;

export function ServiceIcon({ name, ...props }: { name: Name } & IconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
