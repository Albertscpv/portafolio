import { motion } from "motion/react";

/**
 * The ALBERTDEV mark: two intersecting orbits. It is already a space figure,
 * so nothing here reinterprets it — hovering spins it a half turn, which for
 * a two-fold symmetric mark lands back on the exact canonical pose.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`relative grid h-9 w-9 shrink-0 place-items-center ${className}`}
      whileHover={{ rotate: 180 }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="17"
          transform="rotate(32 50 50)"
          stroke="currentColor"
          strokeWidth="6"
          className="text-star"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="17"
          transform="rotate(-32 50 50)"
          stroke="currentColor"
          strokeWidth="6"
          className="text-star"
        />
      </svg>
      <span className="absolute h-1.5 w-1.5 rounded-full bg-ion shadow-[0_0_8px_2px_rgba(110,231,249,0.65)]" />
    </motion.span>
  );
}
