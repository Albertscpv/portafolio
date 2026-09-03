import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal from "../ui/Reveal";
import { aiPractices } from "../../data/skills";

export default function AiSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  // The rail fills as the list scrolls past — a progress readout for the method.
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section className="mt-40" aria-labelledby="ai-title">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <div className="mb-8 flex items-center gap-4">
            <span className="eyebrow">03 — Method</span>
            <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
          </div>
          <h2 id="ai-title" className="text-title font-semibold">
            <span className="accent-gradient">Working with AI,</span>
            <br />
            <span className="text-gradient">not behind it.</span>
          </h2>
          <p className="mt-7 max-w-md text-lead text-dust">
            Learning to use AI properly was the single biggest change to how I build. Not because it
            writes code — because it forces me to state the problem precisely before anything gets
            written. Here is where it sits in my loop.
          </p>

          <div
            aria-hidden="true"
            className="mt-10 hidden h-32 w-full items-center gap-1.5 lg:flex"
          >
            {/* A quiet signal readout. Purely decorative texture. */}
            {Array.from({ length: 34 }).map((_, index) => (
              <motion.span
                key={index}
                className="w-1 rounded-full bg-gradient-to-t from-ion/15 to-nebula/60"
                initial={{ height: 6 }}
                whileInView={{ height: [6, 12 + ((index * 37) % 60), 10] }}
                viewport={{ once: false }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.045,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </Reveal>

        <ol ref={ref} className="relative space-y-4 pl-8">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[9px] top-2 w-px bg-space-700"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: railScale }}
            className="absolute bottom-2 left-[9px] top-2 w-px origin-top bg-gradient-to-b from-ion via-nebula to-pulsar"
          />

          {aiPractices.map((practice, index) => (
            <Reveal as="li" key={practice.index} delay={index * 0.06} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-6 grid h-[19px] w-[19px] place-items-center rounded-full border border-space-600 bg-space-900"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ion" />
              </span>

              <div className="group rounded-2xl border border-space-700/70 bg-space-900/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-space-500 hover:bg-space-800/50">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint transition-colors group-hover:text-ion">
                    {practice.index}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-star">
                    {practice.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dust">{practice.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
