import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Adds a 3D tilt that follows the pointer. Off by default — it is loud. */
  tilt?: boolean;
  /** Specular highlight sweeping under the pointer on hover. */
  sheen?: boolean;
}

/**
 * A translucent pane. The highlight tracks the pointer through springs, so the
 * light source appears to have a little mass instead of teleporting.
 */
export default function GlassPanel({
  children,
  className = "",
  tilt = false,
  sheen = true,
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalised pointer position inside the panel, 0 → 1 on each axis.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 24, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], tilt ? [-7, 7] : [0, 0]);
  const rotateX = useTransform(sy, [0, 1], tilt ? [6, -6] : [0, 0]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);
  const sheenBackground = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, rgba(160,205,255,0.16), transparent 62%)`;

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`glass group relative overflow-hidden rounded-2xl ${className}`}
    >
      {sheen ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheenBackground }}
        />
      ) : null}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
