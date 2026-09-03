import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay — use it to stagger siblings by index. */
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "section" | "li" | "article" | "header";
}

const OFFSET = {
  up: { y: 26, x: 0 },
  down: { y: -26, x: 0 },
  left: { x: 26, y: 0 },
  right: { x: -26, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-in reveal. Fires once, a little before the element reaches the fold,
 * so content is already settled by the time the eye lands on it.
 * Under `prefers-reduced-motion` MotionConfig strips the transform and this
 * degrades to a plain fade.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
