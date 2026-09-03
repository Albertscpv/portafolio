import { Link } from "react-router-dom";
import { motion } from "motion/react";
import LiquidButton from "../components/ui/LiquidButton";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[58vh] flex-col items-center justify-center text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint"
      >
        404 — Out of range
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-display font-semibold text-gradient"
      >
        Nothing orbits here.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-md text-lead text-dust"
      >
        That page is not in this system. The rest of the site is still where you left it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10"
      >
        <Link to="/" className="rounded-full">
          <LiquidButton>Back to index</LiquidButton>
        </Link>
      </motion.div>
    </section>
  );
}
