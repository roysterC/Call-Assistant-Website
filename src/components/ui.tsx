import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonStyles = {
  primary: "bg-olive text-on-olive hover:bg-olive-hover",
  secondary: "border border-line-strong text-ink hover:bg-card",
  inverse: "bg-on-brand text-brand hover:bg-on-brand/90",
  outlineInverse: "border border-on-brand/60 text-on-brand hover:bg-on-brand/10",
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
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-[background-color,transform] duration-200 active:scale-[0.98] ${buttonStyles[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

export function SectionHeading({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-normal tracking-[-0.035em] ${className}`}>
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
    <div className={`mx-auto w-full max-w-[1408px] px-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
