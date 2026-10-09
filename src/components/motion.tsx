"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Wraps the page once. With "user", visitors who prefer reduced motion get
 * no movement at all: transforms are dropped and only opacity changes.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Settles content into place the first time it scrolls into view, so a
 * section reads in order.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
