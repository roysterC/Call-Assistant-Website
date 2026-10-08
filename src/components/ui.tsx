import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonStyles = {
  primary: "bg-olive text-white hover:bg-[#333c1e]",
  secondary: "border border-line-strong text-ink hover:bg-card",
  inverse: "bg-white text-olive hover:bg-paper",
  outlineInverse: "border border-white/60 text-white hover:bg-white/10",
} as const;

const buttonSizes = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-13 px-6.5 text-base",
  xl: "min-h-14 px-7 text-[17px]",
} as const;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof buttonStyles;
  size?: keyof typeof buttonSizes;
  className?: string;
};

/** Every call to action on the site is a pill-shaped link. */
export function ButtonLink({ variant = "primary", size = "lg", className = "", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-colors ${buttonStyles[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(2.5rem,4.6vw,4rem)] leading-none font-normal tracking-[-0.04em] ${className}`}>
      {children}
    </h2>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="grid size-7 place-items-center rounded-[9px] bg-olive">
        <span className="size-2.5 rounded-full bg-blush" />
      </span>
      <span className="text-[22px] font-semibold tracking-[-0.04em]">kikai</span>
    </span>
  );
}

export function Container({ children, className = "", ...props }: ComponentProps<"div">) {
  return (
    <div className={`mx-auto w-full max-w-[1408px] px-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

type IconProps = { className?: string; strokeWidth?: number };

export function CheckIcon({ className = "size-[18px]", strokeWidth = 2.4 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PlayIcon({ className = "size-3" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4l13 8-13 8z" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-[18px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function MicIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
