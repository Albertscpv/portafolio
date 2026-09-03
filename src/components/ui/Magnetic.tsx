import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to lean toward the pointer, in px. */
  strength?: number;
}

/**
 * Pulls its child toward the pointer while hovered, then springs back. The
 * spring is deliberately underdamped so the release overshoots slightly —
 * that tiny bounce is what makes the control feel physical rather than snappy.
 */
export default function Magnetic({ children, className = "", strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 14, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 14, mass: 0.5 });

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
