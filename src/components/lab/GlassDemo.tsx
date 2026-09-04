import { useState } from "react";
import { motion } from "motion/react";

/**
 * Glass is only convincing when something is moving behind it, so the demo
 * puts three drifting color fields under the pane and hands the visitor the
 * blur and saturation dials that make or break the material.
 */
export default function GlassDemo() {
  const [blur, setBlur] = useState(18);
  const [saturate, setSaturate] = useState(150);
  const [tint, setTint] = useState(14);

  return (
    <div className="overflow-hidden rounded-2xl border border-space-700/70">
      <div className="relative grid h-[340px] place-items-center overflow-hidden bg-void">
        <motion.span
          aria-hidden="true"
          className="absolute h-64 w-64 rounded-full bg-ion/70 blur-2xl"
          animate={{ x: [-110, 90, -110], y: [-50, 40, -50] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full bg-nebula/70 blur-2xl"
          animate={{ x: [100, -80, 100], y: [40, -50, 40] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute h-44 w-44 rounded-full bg-pulsar/60 blur-2xl"
          animate={{ x: [-20, 40, -20], y: [70, -70, 70] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The pane itself — every property below is live-controlled. */}
        <div
          className="relative z-10 w-[min(88%,380px)] rounded-2xl p-8"
          style={{
            background: `linear-gradient(140deg, rgba(148,163,205,${tint / 100}) 0%, rgba(148,163,205,${
              tint / 300
            }) 45%, rgba(148,163,205,0.02) 100%)`,
            backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
            border: "1px solid rgba(180,196,240,0.16)",
            boxShadow:
              "0 8px 32px rgba(2,4,12,0.5), inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-star/70">Pane</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-star">
            blur({blur}px) saturate({saturate}%)
          </p>
          <p className="mt-3 text-sm leading-relaxed text-star/70">
            Drag blur to 0 and the pane becomes plastic. Drag saturate to 100 and it loses depth.
          </p>
        </div>
      </div>

      <div className="grid gap-6 border-t border-space-700/70 bg-space-900/60 p-6 sm:grid-cols-3">
        {[
          { id: "blur", label: "Blur", value: blur, set: setBlur, min: 0, max: 40, unit: "px" },
          {
            id: "saturate",
            label: "Saturate",
            value: saturate,
            set: setSaturate,
            min: 100,
            max: 260,
            unit: "%",
          },
          { id: "tint", label: "Tint", value: tint, set: setTint, min: 0, max: 40, unit: "%" },
        ].map((control) => (
          <div key={control.id}>
            <div className="mb-2 flex items-baseline justify-between">
              <label
                htmlFor={`glass-${control.id}`}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint"
              >
                {control.label}
              </label>
              <span className="font-mono text-[11px] text-dust">
                {control.value}
                {control.unit}
              </span>
            </div>
            <input
              id={`glass-${control.id}`}
              type="range"
              min={control.min}
              max={control.max}
              value={control.value}
              onChange={(event) => control.set(Number(event.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-space-600 accent-ion"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
