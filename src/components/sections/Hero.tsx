import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedHeading from "../ui/AnimatedHeading";
import LiquidButton from "../ui/LiquidButton";
import GlassPanel from "../ui/GlassPanel";
import { contactFormUrl, profile } from "../../data/site";

/** Readouts down the side of the portrait — the "instrument panel" voice. */
const READOUTS = [
  ["role", "full stack"],
  ["also", "accountant"],
  ["mode", "ai-assisted"],
  ["status", "available"],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The panel drifts slower than the text, which reads as depth on scroll.
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative grid items-center gap-14 pb-16 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.15fr_0.85fr]"
    >
      <motion.div style={{ y: textY }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-space-600/80 bg-space-800/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-dust backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ion" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ion" />
          </span>
          {profile.status}
        </motion.p>

        <AnimatedHeading
          text="Interfaces built like instruments."
          className="text-display font-semibold text-gradient"
          delay={0.12}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lead text-dust"
        >
          I am <span className="text-star">{profile.short}</span> — a{" "}
          <span className="text-star">{profile.role.toLowerCase()}</span> with an{" "}
          <span className="text-star">{profile.secondRole.toLowerCase()}</span>&apos;s eye for how a
          business actually works. I design the surface and build what runs underneath it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/projects" className="rounded-full">
            <LiquidButton>See the work</LiquidButton>
          </Link>
          <LiquidButton href={contactFormUrl} external variant="ghost">
            Start a conversation
          </LiquidButton>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: panelY }} className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassPanel tilt className="p-3">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/images/CharlaCTPE.jpeg"
                alt={`${profile.short} presenting to a classroom of students`}
                loading="eager"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent" />

              {/* Corner ticks — a viewfinder framing the subject. */}
              {[
                "left-3 top-3 border-l border-t",
                "right-3 top-3 border-r border-t",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((position) => (
                <span
                  key={position}
                  aria-hidden="true"
                  className={`absolute h-4 w-4 border-ion/60 ${position}`}
                />
              ))}
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 px-1 pb-1">
              {READOUTS.map(([key, value]) => (
                <div key={key} className="flex items-baseline justify-between gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {key}
                  </dt>
                  <dd className="font-mono text-[11px] text-dust">{value}</dd>
                </div>
              ))}
            </dl>
          </GlassPanel>
        </motion.div>

        <span
          aria-hidden="true"
          className="absolute -right-8 -top-10 -z-10 h-40 w-40 animate-orbit-slow rounded-full border border-dashed border-space-500/50"
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-0 left-0 hidden items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">Scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-space-600">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-ion"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
