import { motion } from "motion/react";

interface LogoProps {
  /** Sizing lives here — pass Tailwind height/width, e.g. `h-40 w-40`. */
  className?: string;
  /** Spin a half turn on hover. Off for large decorative instances. */
  interactive?: boolean;
  /** Share a layout across mount boundaries (the intro hands off to the nav). */
  layoutId?: string;
  /** The lit core. Hidden in flat variants used for brand specimens. */
  core?: boolean;
  /** Stroke weight in the 100×100 viewBox. Large marks want a thinner ratio. */
  weight?: number;
}

/**
 * The ALBERTDEV mark: two ellipses on the same centre, mirrored at ±32°.
 * It is already a space figure, so nothing here reinterprets it — hovering
 * spins it a half turn, which on a two-fold symmetric mark lands back on the
 * exact canonical pose.
 */
export default function Logo({
  className = "h-9 w-9",
  interactive = true,
  layoutId,
  core = true,
  weight = 6,
}: LogoProps) {
  return (
    <motion.span
      layoutId={layoutId}
      className={`relative grid shrink-0 place-items-center ${className}`}
      whileHover={interactive ? { rotate: 180 } : undefined}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        {[32, -32].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="50"
            rx="47"
            ry="17"
            transform={`rotate(${angle} 50 50)`}
            stroke="currentColor"
            strokeWidth={weight}
            className="text-star"
          />
        ))}
      </svg>
      {core ? (
        <span className="absolute h-[7%] w-[7%] min-h-[5px] min-w-[5px] rounded-full bg-ion shadow-[0_0_8px_2px_rgba(110,231,249,0.65)]" />
      ) : null}
    </motion.span>
  );
}
