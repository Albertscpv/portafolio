import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal from "../ui/Reveal";
import { styleSpecs } from "../../data/lab";

/** Live miniature of each surface language, one per card. */
function NeuPreview() {
  const [on, setOn] = useState(true);
  return (
    <div className="grid h-32 place-items-center rounded-xl bg-[#141a2c]">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Neumorphism preview toggle"
        onClick={() => setOn((value) => !value)}
        className="flex h-10 w-20 items-center rounded-full bg-[#141a2c] px-1.5 shadow-neu-inset transition-shadow"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
          className={`h-7 w-7 rounded-full bg-[#141a2c] shadow-neu-raised-sm ${
            on ? "ml-auto" : ""
          }`}
        >
          <span
            className={`block h-full w-full rounded-full transition-colors duration-300 ${
              on ? "bg-ion/25" : "bg-transparent"
            }`}
          />
        </motion.span>
      </button>
    </div>
  );
}

function GlassPreview() {
  return (
    <div className="relative grid h-32 place-items-center overflow-hidden rounded-xl bg-space-900">
      <motion.span
        aria-hidden="true"
        className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-ion to-pulsar blur-lg"
        animate={{ x: [-46, 46, -46], y: [16, -16, 16] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="glass relative z-10 rounded-xl px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-star">blur 18</span>
      </div>
    </div>
  );
}

function LiquidPreview() {
  return (
    <div className="grid h-32 place-items-center rounded-xl bg-space-900">
      <span
        className="relative flex h-20 w-40 items-center justify-center"
        style={{ filter: "url(#goo)" }}
        aria-hidden="true"
      >
        <motion.span
          className="absolute h-12 w-12 rounded-full bg-ion"
          animate={{ x: [-26, 26, -26] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute h-10 w-10 rounded-full bg-nebula"
          animate={{ x: [24, -24, 24] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute h-9 w-9 rounded-full bg-pulsar/80" />
      </span>
    </div>
  );
}

const PREVIEWS = {
  neumorphism: <NeuPreview />,
  glassmorphism: <GlassPreview />,
  liquid: <LiquidPreview />,
} as const;

export default function SurfacesTeaser() {
  return (
    <section className="mt-40" aria-labelledby="surfaces-title">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow">04 — Surfaces</span>
          <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="surfaces-title" className="max-w-2xl text-title font-semibold text-gradient">
            Three materials this site is made of.
          </h2>
          <Link
            to="/lab"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ion"
          >
            Open the lab
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {styleSpecs.map((spec, index) => (
          <Reveal key={spec.id} delay={index * 0.08}>
            <Link
              to="/lab"
              className="group block h-full rounded-2xl border border-space-700/70 bg-space-900/40 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-space-500"
            >
              {PREVIEWS[spec.id]}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                  {spec.index}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-star">{spec.name}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-dust">{spec.thesis}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
