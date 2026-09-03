import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Magnetic from "./Magnetic";

interface LiquidButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  /** Opens in a new tab and adds the safe rel pair. */
  external?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * The liquid control. Three layers stacked under the label:
 *   1. the pill body
 *   2. a blob that trails the pointer on a soft spring
 * Both sit inside a container carrying `filter: url(#goo-soft)`, so as the
 * blob approaches the edge the two shapes fuse and the outline bulges.
 * Clicks drop a ripple that expands and dissolves.
 */
export default function LiquidButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  external = false,
}: LiquidButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hovered, setHovered] = useState(false);

  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  // Low stiffness + real mass = the blob arrives late. That lag *is* the effect.
  const blobX = useSpring(bx, { stiffness: 110, damping: 15, mass: 0.9 });
  const blobY = useSpring(by, { stiffness: 110, damping: 15, mass: 0.9 });

  function onMove(event: ReactPointerEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    bx.set(event.clientX - rect.left - rect.width / 2);
    by.set(event.clientY - rect.top - rect.height / 2);
  }

  function onDown(event: ReactPointerEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    window.setTimeout(() => setRipples((current) => current.filter((r) => r.id !== id)), 700);
  }

  const solid = variant === "solid";

  const body = (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        bx.set(0);
        by.set(0);
      }}
      onPointerDown={onDown}
      className={`relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ filter: "url(#goo-soft)" }}
      >
        <span
          className={`absolute inset-0 rounded-full ${
            solid
              ? "bg-gradient-to-r from-ion via-nebula to-pulsar"
              : "bg-space-600/70 ring-1 ring-inset ring-space-400/60"
          }`}
        />
        <motion.span
          className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            solid ? "bg-nebula" : "bg-ion/45"
          }`}
          style={{ x: blobX, y: blobY }}
          animate={{ scale: hovered ? 1.35 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
        />
      </span>

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 h-6 w-6 rounded-full bg-white/45"
          style={{ left: ripple.x - 12, top: ripple.y - 12 }}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 11, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <span
        className={`relative z-10 font-mono text-[12px] uppercase tracking-[0.18em] ${
          solid ? "font-semibold text-space-950" : "text-star"
        }`}
      >
        {children}
      </span>
    </div>
  );

  const wrapped = <Magnetic strength={9}>{body}</Magnetic>;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        className="inline-block rounded-full"
      >
        {wrapped}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block rounded-full">
      {wrapped}
    </button>
  );
}
