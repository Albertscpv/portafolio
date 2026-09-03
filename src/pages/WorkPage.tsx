import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import GlassPanel from "../components/ui/GlassPanel";
import Pill from "../components/ui/Pill";
import LiquidButton from "../components/ui/LiquidButton";
import { experience } from "../data/experience";
import { contactFormUrl } from "../data/site";

export default function WorkPage() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <>
      <SectionHeading
        index="02 — Work"
        title="Where I have been, and what it taught me."
        lede="Three tracks running in parallel: a global finance operation, independent client work, and a full stack program. Each one changed how I approach the next."
      />

      <ol ref={timelineRef} className="relative space-y-6 pl-10 md:pl-14">
        <span aria-hidden="true" className="absolute bottom-6 left-3 top-6 w-px bg-space-700" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute bottom-6 left-3 top-6 w-px origin-top bg-gradient-to-b from-ion via-nebula to-pulsar"
        />

        {experience.map((entry, index) => (
          <Reveal as="li" key={entry.id} delay={index * 0.08} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-8 grid h-[25px] w-[25px] place-items-center rounded-full border border-space-600 bg-space-900 md:-left-14"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  entry.current ? "bg-ion shadow-[0_0_10px_2px_rgba(110,231,249,0.55)]" : "bg-faint"
                }`}
              />
            </span>

            <GlassPanel className="p-7 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-star md:text-2xl">
                    {entry.org}
                  </h2>
                  <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-dust">
                    {entry.role}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  {entry.current ? (
                    <Pill accent="ion">Ongoing</Pill>
                  ) : (
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      {entry.period}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-dust">{entry.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-dust">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ion" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* The takeaway is the part a recruiter actually remembers. */}
              <blockquote className="mt-7 border-l-2 border-space-500 pl-5 text-[15px] italic leading-relaxed text-star/90">
                {entry.takeaway}
              </blockquote>

              <div className="mt-7 flex flex-wrap gap-2">
                {entry.stack.map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-20 text-center">
        <p className="text-lead text-dust">Want the full picture?</p>
        <div className="mt-7 flex justify-center">
          <LiquidButton href={contactFormUrl} external>
            Ask me anything
          </LiquidButton>
        </div>
      </Reveal>
    </>
  );
}
