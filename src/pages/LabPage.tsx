import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Pill from "../components/ui/Pill";
import CodeBlock from "../components/lab/CodeBlock";
import NeuDemo from "../components/lab/NeuDemo";
import GlassDemo from "../components/lab/GlassDemo";
import LiquidDemo from "../components/lab/LiquidDemo";
import { styleSpecs } from "../data/lab";

const DEMOS = {
  neumorphism: <NeuDemo />,
  glassmorphism: <GlassDemo />,
  liquid: <LiquidDemo />,
} as const;

export default function LabPage() {
  return (
    <>
      <SectionHeading
        index="04 — Lab"
        title="Three surface languages, taken apart."
        lede="Neumorphism, glassmorphism and liquid are not decorations — each one simulates a different physical material, and each fails in a different way. Every demo below is live, and the snippet beside it is the code actually running it."
      />

      <div className="space-y-32">
        {styleSpecs.map((spec) => (
          <section key={spec.id} id={spec.id} aria-labelledby={`${spec.id}-title`}>
            <Reveal>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-space-700/70 pb-6">
                <div>
                  <span className="eyebrow">{spec.index}</span>
                  <h2
                    id={`${spec.id}-title`}
                    className="mt-3 text-3xl font-semibold tracking-tight text-star md:text-4xl"
                  >
                    {spec.name}
                  </h2>
                </div>
                <p className="max-w-md text-[15px] italic leading-relaxed text-dust">
                  {spec.thesis}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>{DEMOS[spec.id]}</Reveal>

              <Reveal delay={0.1} className="flex flex-col gap-7">
                <p className="text-[15px] leading-relaxed text-dust">{spec.body}</p>

                <div>
                  <p className="eyebrow mb-4">Rules</p>
                  <ul className="space-y-2.5">
                    {spec.rules.map((rule) => (
                      <li
                        key={rule}
                        className="flex gap-3 text-[14px] leading-relaxed text-dust"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ion"
                        />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-solar/25 bg-solar/[0.05] p-5">
                  <Pill accent="solar" className="mb-3">
                    Where it breaks
                  </Pill>
                  <p className="text-[14px] leading-relaxed text-dust">{spec.pitfall}</p>
                </div>

                <CodeBlock code={spec.css} label={`${spec.name} — source`} />
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <Reveal className="mt-32 rounded-2xl border border-space-700/70 bg-space-900/40 p-8 md:p-10">
        <p className="eyebrow">Note</p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-dust">
          Every effect on this page respects{" "}
          <code className="rounded bg-space-800 px-1.5 py-0.5 font-mono text-[13px] text-ion">
            prefers-reduced-motion
          </code>
          . With it enabled the springs stop, the starfield renders one still frame, and the layout
          is byte-for-byte identical. A design language that only works while it is moving is not a
          design language.
        </p>
      </Reveal>
    </>
  );
}
