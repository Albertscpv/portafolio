import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { profile } from "../../data/site";

/** The navbar wraps its mark in this id so the curtain can measure the target. */
export const NAV_MARK_ID = "nav-brand-mark";

/**
 * The opening curtain. The mark sits centred and oversized, then flies to the
 * navbar and lands exactly on top of the small one — the target rect is
 * measured from the live DOM rather than guessed, so the two are pixel-aligned
 * when the curtain unmounts and the handoff is invisible.
 *
 * Plays once per browser session, never under reduced motion, and any click or
 * keypress skips straight to the flight.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const markRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<{ x: number; y: number; scale: number } | null>(null);
  const launched = useRef(false);

  const launch = useCallback(() => {
    if (launched.current) return;
    launched.current = true;

    const from = markRef.current?.getBoundingClientRect();
    const to = document.getElementById(NAV_MARK_ID)?.getBoundingClientRect();

    if (from && to && from.width > 0 && to.width > 0) {
      setFlight({
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        scale: to.width / from.width,
      });
      // Unmount only once the mark has settled onto its parked position.
      window.setTimeout(onDone, 1000);
    } else {
      // Nav not measurable (very early paint) — just leave, do not hang.
      onDone();
    }
  }, [onDone]);

  useEffect(() => {
    const timer = window.setTimeout(launch, 1500);
    window.addEventListener("keydown", launch);
    window.addEventListener("pointerdown", launch);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", launch);
      window.removeEventListener("pointerdown", launch);
    };
  }, [launch]);

  const flying = flight !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {/* The ground fades on its own so the mark stays fully opaque in flight. */}
      <motion.span
        className="absolute inset-0 bg-void"
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        ref={markRef}
        className="relative"
        initial={{ scale: 0.82, opacity: 0 }}
        animate={
          flight
            ? { x: flight.x, y: flight.y, scale: flight.scale, opacity: 1 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={
          flying
            ? { duration: 0.95, ease: [0.65, 0, 0.35, 1] }
            : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <Logo className="h-[32vmin] w-[32vmin]" interactive={false} weight={3.4} />
      </motion.div>

      <motion.div
        className="relative mt-10 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: flying ? 0 : 1, y: flying ? -8 : 0 }}
        transition={{ duration: flying ? 0.35 : 0.7, delay: flying ? 0 : 0.3 }}
      >
        <p className="text-2xl font-semibold tracking-tight text-star">{profile.short}</p>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em] text-faint">
          {profile.role}
        </p>
      </motion.div>

      <motion.span
        className="relative mt-12 block h-px w-40 bg-gradient-to-r from-transparent via-space-500 to-transparent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: flying ? 0 : 1 }}
        transition={{ duration: flying ? 0.3 : 1.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
