import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonStyles = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-line-strong text-ink hover:bg-sunk",
} as const;

const buttonSizes = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-13 px-7 text-base",
} as const;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof buttonStyles;
  size?: keyof typeof buttonSizes;
  className?: string;
};

/** Every call to action is a pill-shaped link that gives under the finger. */
export function ButtonLink({ variant = "primary", size = "lg", className = "", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-[background-color,transform] duration-200 active:scale-[0.97] ${buttonStyles[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

/** Section headlines: display type, one size across the page. */
export function Heading({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`display text-[clamp(2.4rem,5vw,4.25rem)] ${className}`}>
      {children}
    </h2>
  );
}

/** The brand mark. Its colours are fixed: it looks the same in dark mode. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="grid size-7 place-items-center rounded-[9px] bg-brand">
        <span className="size-2.5 rounded-full bg-brand-dot" />
      </span>
      <span className="text-[22px] font-semibold tracking-[-0.04em]">kikai</span>
    </span>
  );
}

export function Container({ children, className = "", ...props }: ComponentProps<"div">) {
  return (
    <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
