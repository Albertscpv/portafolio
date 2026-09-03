import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Wraps every route. Content rises and settles; the exit is faster than the
 * entrance so back-to-back navigation never feels like waiting.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-6xl px-5 pb-10 pt-32 md:px-8 md:pt-40"
    >
      {children}
    </motion.div>
  );
}
