import { motion } from "motion/react";
import Reveal from "../ui/Reveal";
import GlassPanel from "../ui/GlassPanel";
import Pill from "../ui/Pill";
import { skillGroups } from "../../data/skills";

export default function SkillsSection() {
  return (
    <section className="mt-40" aria-labelledby="skills-title">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow">02 — Instruments</span>
          <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
        </div>
        <h2 id="skills-title" className="max-w-3xl text-title font-semibold text-gradient">
          The stack I reach for.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.07}>
            <GlassPanel tilt className="h-full p-7">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-star">{group.label}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.035 }}
                  >
                    <Pill accent={group.accent}>{item}</Pill>
                  </motion.li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
