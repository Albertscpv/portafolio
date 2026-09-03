import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import LiquidButton from "../ui/LiquidButton";

const TABS = ["Orbit", "Transit", "Descent"];

/** Each trailer lags a little more than the one before it. */
const TRAILERS = [
  { size: 64, color: "bg-ion", stiffness: 260, damping: 18, mass: 0.6 },
  { size: 52, color: "bg-nebula", stiffness: 150, damping: 16, mass: 0.9 },
  { size: 40, color: "bg-pulsar", stiffness: 90, damping: 14, mass: 1.2 },
];

function Trail() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    if (!active) setActive(true);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setActive(false)}
      className="relative h-[340px] cursor-crosshair overflow-hidden rounded-2xl border border-space-700/70 bg-space-950"
    >
      {/* Everything inside this span is fused by the metaball filter. */}
      <span className="absolute inset-0" style={{ filter: "url(#goo)" }} aria-hidden="true">
        {TRAILERS.map((trailer, index) => (
          <Blob key={index} x={x} y={y} active={active} {...trailer} />
        ))}
      </span>

      <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        Move the pointer — the blobs fuse as they catch up
      </p>
    </div>
  );
}

function Blob({
  x,
  y,
  active,
  size,
  color,
  stiffness,
  damping,
  mass,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  active: boolean;
  size: number;
  color: string;
  stiffness: number;
  damping: number;
  mass: number;
}) {
  const sx = useSpring(x, { stiffness, damping, mass });
  const sy = useSpring(y, { stiffness, damping, mass });

  return (
    <motion.span
      className={`absolute rounded-full ${color}`}
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{ opacity: active ? 0.9 : 0.25, scale: active ? 1 : 0.7 }}
      transition={{ duration: 0.4 }}
    />
  );
}

export default function LiquidDemo() {
  const [tab, setTab] = useState(0);

  return (
    <div className="space-y-6">
      <Trail />

      <div className="grid gap-6 rounded-2xl border border-space-700/70 bg-space-900/50 p-6 sm:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Morphing indicator
          </p>
          {/* layoutId lets one element travel and reshape between tabs, so the
              highlight stretches instead of jumping. */}
          <div className="liquid-surface flex gap-1 rounded-full p-1.5">
            {TABS.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={tab === index}
                onClick={() => setTab(index)}
                className="relative flex-1 rounded-full px-4 py-2 text-[13px]"
              >
                {tab === index ? (
                  <motion.span
                    layoutId="liquid-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-ion to-nebula"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                ) : null}
                <span
                  className={`relative z-10 transition-colors ${
                    tab === index ? "font-semibold text-space-950" : "text-dust"
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Gooey button
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LiquidButton>Launch</LiquidButton>
            <LiquidButton variant="ghost">Abort</LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}
