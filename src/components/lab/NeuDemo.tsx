import { useState } from "react";
import { motion } from "motion/react";

const MODES = ["Focus", "Ambient", "Deep"];

/**
 * A soft-UI control console. Every control shares one base color (#141a2c) and
 * one light direction (top-left) — swap either and the whole thing flattens.
 */
export default function NeuDemo() {
  const [power, setPower] = useState(true);
  const [level, setLevel] = useState(62);
  const [mode, setMode] = useState(1);

  return (
    <div className="rounded-2xl bg-[#141a2c] p-7 shadow-neu-raised sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Console</p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight text-star">Soft UI panel</p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={power}
          aria-label="Power"
          onClick={() => setPower((value) => !value)}
          className="flex h-11 w-[86px] items-center rounded-full bg-[#141a2c] px-1.5 shadow-neu-inset"
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 520, damping: 34 }}
            className={`grid h-8 w-8 place-items-center rounded-full bg-[#141a2c] shadow-neu-raised-sm ${
              power ? "ml-auto" : ""
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                power ? "bg-ion shadow-[0_0_8px_2px_rgba(110,231,249,0.6)]" : "bg-space-500"
              }`}
            />
          </motion.span>
        </button>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <label
            htmlFor="neu-level"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint"
          >
            Output
          </label>
          <span className="font-mono text-[12px] text-dust">{level}%</span>
        </div>
        {/* The track is an inset groove; the fill is a lit channel inside it. */}
        <div className="relative h-6 rounded-full bg-[#141a2c] px-1.5 shadow-neu-inset">
          <div className="relative h-full">
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-ion/70 to-nebula/70 transition-[width] duration-150"
              style={{ width: `${level}%` }}
            />
            <input
              id="neu-level"
              type="range"
              min={0}
              max={100}
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
              className="absolute inset-0 w-full cursor-pointer opacity-0"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#141a2c] shadow-neu-raised-sm transition-[left] duration-150"
              style={{ left: `${level}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Mode</p>
        <div className="flex gap-3">
          {MODES.map((item, index) => {
            const active = mode === index;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(index)}
                className={`flex-1 rounded-xl bg-[#141a2c] px-4 py-3 text-sm transition-all duration-300 ${
                  active
                    ? "text-ion shadow-neu-inset"
                    : "text-dust shadow-neu-raised-sm hover:text-star"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] leading-relaxed text-faint">
        Pressed states reuse the exact same shadows, inverted with `inset`.
      </p>
    </div>
  );
}
