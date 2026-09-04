import { motion } from "motion/react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import GlassPanel from "../components/ui/GlassPanel";
import Logo from "../components/layout/Logo";
import { construction, misuse } from "../data/brand";
import { profile } from "../data/site";

/**
 * The construction diagram. Same geometry as the real mark, plus the guides
 * that produced it — centre lines, the bounding field, and both rotation axes.
 */
function Blueprint() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="97" height="97" stroke="#262626" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="47" stroke="#262626" strokeWidth="0.4" strokeDasharray="2 2" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#262626" strokeWidth="0.4" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#262626" strokeWidth="0.4" />

      {[32, -32].map((angle) => (
        <line
          key={`axis-${angle}`}
          x1="3"
          y1="50"
          x2="97"
          y2="50"
          stroke="#404040"
          strokeWidth="0.4"
          strokeDasharray="3 2"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {[32, -32].map((angle, index) => (
        <motion.ellipse
          key={angle}
          cx="50"
          cy="50"
          rx="47"
          ry="17"
          transform={`rotate(${angle} 50 50)`}
          stroke="#E9EDFA"
          strokeWidth="2.4"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2 + index * 0.35, ease: "easeInOut" }}
        />
      ))}

      <circle cx="50" cy="50" r="3.5" fill="#6EE7F9" />
    </svg>
  );
}

/** A labelled specimen cell — the repeated unit of the whole page. */
function Specimen({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-1 items-center justify-center rounded-2xl border border-space-700/70 bg-crease p-10">
        {children}
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">{label}</p>
    </div>
  );
}

export default function BrandPage() {
  return (
    <>
      <SectionHeading
        index="04 — Brand"
        title="One figure, two orbits."
        lede="The mark is a single form built from two identical ellipses mirrored across the vertical. Everything below is derived from that one decision — nothing here is styling applied after the fact."
      />

      {/* The corner lockup, at the scale it deserves. */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-space-700/70 bg-crease">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)]"
          />
          <div className="relative flex flex-col items-center gap-10 px-6 py-24 sm:flex-row sm:justify-center sm:gap-14 sm:py-32">
            <Logo className="h-[30vmin] max-h-56 w-[30vmin] max-w-56" weight={3.4} />
            <div className="text-center sm:text-left">
              <p className="text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-none tracking-tight text-star">
                {profile.short}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.42em] text-dust sm:text-[13px]">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          Primary lockup · hover the mark
        </p>
      </Reveal>

      {/* Construction */}
      <section className="mt-28" aria-labelledby="construction-title">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="eyebrow">Construction</span>
            <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="aspect-square rounded-2xl border border-space-700/70 bg-crease p-8">
              <Blueprint />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 id="construction-title" className="text-2xl font-semibold tracking-tight text-star">
              Drawn, not decorated.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-dust">
              Both ellipses share a centre and differ only in the sign of their rotation. That
              mirror is what makes the mark two-fold symmetric — turn it 180° and it lands on
              itself, which is why the hover spin resolves cleanly instead of wobbling back.
            </p>
            <dl className="mt-8 divide-y divide-space-700/70 border-y border-space-700/70">
              {construction.map((rule) => (
                <div key={rule.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_6rem_1fr]">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                    {rule.label}
                  </dt>
                  <dd className="font-mono text-[13px] text-ion">{rule.value}</dd>
                  <dd className="text-[14px] leading-relaxed text-dust">{rule.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Variants */}
      <section className="mt-28" aria-labelledby="variants-title">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="eyebrow">Variants</span>
            <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
          </div>
          <h2 id="variants-title" className="sr-only">
            Variants
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <Specimen label="Mark" className="h-56">
              <Logo className="h-24 w-24" weight={4} />
            </Specimen>
          </Reveal>
          <Reveal delay={0.06}>
            <Specimen label="Mark · flat" className="h-56">
              <Logo className="h-24 w-24" weight={4} core={false} interactive={false} />
            </Specimen>
          </Reveal>
          <Reveal delay={0.12}>
            <Specimen label="Stacked lockup" className="h-56">
              <span className="flex flex-col items-center gap-3">
                <Logo className="h-14 w-14" weight={5} />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-star">
                  {profile.short}
                </span>
              </span>
            </Specimen>
          </Reveal>
          <Reveal delay={0.18}>
            {/* On light, the mark inverts to the ground colour — never to grey. */}
            <div className="flex h-56 flex-col">
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-space-700/70 bg-star p-10">
                <span className="text-void">
                  <svg viewBox="0 0 100 100" className="h-24 w-24" fill="none" aria-hidden="true">
                    {[32, -32].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="50"
                        cy="50"
                        rx="47"
                        ry="17"
                        transform={`rotate(${angle} 50 50)`}
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                    ))}
                  </svg>
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                On light
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Clear space and minimum size */}
      <section className="mt-28" aria-labelledby="spacing-title">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="eyebrow">Clear space &amp; scale</span>
            <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
          </div>
          <h2 id="spacing-title" className="sr-only">
            Clear space and minimum size
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <GlassPanel className="h-full p-8" sheen={false}>
              <p className="eyebrow">Clear space</p>
              <div className="mt-8 flex items-center justify-center">
                <span className="relative grid h-44 w-44 place-items-center rounded-xl border border-dashed border-ion/35">
                  <Logo className="h-20 w-20" weight={4.6} interactive={false} />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-space-900 px-2 font-mono text-[10px] text-ion">
                    ½ mark
                  </span>
                </span>
              </div>
              <p className="mt-8 text-[14px] leading-relaxed text-dust">
                Keep clear space equal to half the mark&apos;s width on every side. The orbits
                already read as motion — crowd them and the figure reads as a texture.
              </p>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassPanel className="h-full p-8" sheen={false}>
              <p className="eyebrow">Minimum size</p>
              <div className="mt-8 flex items-end justify-center gap-10">
                {[
                  { size: "h-16 w-16", label: "64", weight: 4.4 },
                  { size: "h-8 w-8", label: "32", weight: 6 },
                  { size: "h-5 w-5", label: "20", weight: 8 },
                ].map((step) => (
                  <span key={step.label} className="flex flex-col items-center gap-3">
                    <Logo className={step.size} weight={step.weight} interactive={false} />
                    <span className="font-mono text-[10px] text-faint">{step.label}px</span>
                  </span>
                ))}
              </div>
              <p className="mt-8 text-[14px] leading-relaxed text-dust">
                20px is the floor. Below it the two crossings merge into a blob, so stroke weight
                is raised as the mark shrinks to keep the openings visible.
              </p>
            </GlassPanel>
          </Reveal>
        </div>
      </section>

      {/* Misuse */}
      <section className="mt-28" aria-labelledby="misuse-title">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="eyebrow">Misuse</span>
            <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
          </div>
          <h2 id="misuse-title" className="sr-only">
            Misuse
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {misuse.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07}>
              <div className="h-full rounded-2xl border border-space-700/70 bg-space-900/40 p-6">
                <div className="mb-6 grid h-28 place-items-center rounded-xl bg-crease">
                  <span className="relative">
                    <Logo
                      className={
                        index === 0 ? "h-16 w-28" : index === 2 ? "h-16 w-16 blur-[2px]" : "h-16 w-16"
                      }
                      weight={5}
                      interactive={false}
                      core={index !== 1}
                    />
                    {index === 1 ? (
                      <span className="absolute inset-0 grid place-items-center">
                        <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
                          <ellipse
                            cx="50"
                            cy="50"
                            rx="47"
                            ry="17"
                            transform="rotate(32 50 50)"
                            stroke="#F472B6"
                            strokeWidth="5"
                          />
                        </svg>
                      </span>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] bg-pulsar/70"
                    />
                  </span>
                </div>
                <h3 className="font-semibold tracking-tight text-star">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-dust">{item.why}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-28 rounded-2xl border border-space-700/70 bg-space-900/40 p-8 md:p-10">
        <p className="eyebrow">Note</p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-dust">
          The mark on this site is drawn as inline SVG, not loaded as an image — which is why it
          can be restroked per size, inverted for light grounds, and animated without a second
          asset. The original raster lockup still lives in{" "}
          <code className="rounded bg-space-800 px-1.5 py-0.5 font-mono text-[13px] text-ion">
            /images/Logo.png
          </code>{" "}
          for anywhere a flat file is required.
        </p>
      </Reveal>
    </>
  );
}
