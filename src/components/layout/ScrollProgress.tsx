import { motion, useScroll, useSpring } from "motion/react";

/** A hairline readout of how far down the document the visitor is. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-ion via-nebula to-pulsar"
    />
  );
}
