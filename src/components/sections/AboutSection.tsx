import Reveal from "../ui/Reveal";
import NeuSurface from "../ui/NeuSurface";
import { profile } from "../../data/site";

const FACETS = [
  { key: "Engineering", value: "React, TypeScript, Java, Spring Boot" },
  { key: "Design", value: "Design systems, motion, brand identity" },
  { key: "Finance", value: "Accounting, FinOps, process analysis" },
];

export default function AboutSection() {
  return (
    <section className="mt-40" aria-labelledby="about-title">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow">01 — Abstract</span>
          <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
        </div>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <h2 id="about-title" className="text-title font-semibold text-gradient">
            Three disciplines, one way of thinking.
          </h2>
          <p className="mt-7 max-w-2xl text-lead text-dust">{profile.bio}</p>
          <p className="mt-5 max-w-2xl text-lead text-dust">{profile.statusDetail}</p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Neumorphic block: element and container share #141a2c, so the
              dividers read as creases in one sheet rather than borders. */}
          <NeuSurface className="p-2">
            <ul className="divide-y divide-[#0b1020]">
              {FACETS.map((facet) => (
                <li key={facet.key} className="px-5 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ion/80">
                    {facet.key}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dust">{facet.value}</p>
                </li>
              ))}
            </ul>
          </NeuSurface>
        </Reveal>
      </div>
    </section>
  );
}
