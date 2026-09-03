import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { designs } from "../data/designs";

const SPAN_CLASS = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
} as const;

export default function DesignsPage() {
  const [active, setActive] = useState<number | null>(null);
  const piece = active === null ? null : designs[active];

  const step = useCallback((delta: number) => {
    setActive((current) =>
      current === null ? null : (current + delta + designs.length) % designs.length,
    );
  }, []);

  // Keyboard is the only way some people navigate a gallery. Wire it up.
  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  return (
    <>
      <SectionHeading
        index="03 — Designs"
        title="Visual work, made for real clients."
        lede="Posters, brand marks and social campaigns built for entrepreneurs who needed a digital identity. Select any piece to open it full size."
      />

      <ul className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design, index) => (
          <Reveal
            as="li"
            key={design.src}
            delay={Math.min(index * 0.05, 0.4)}
            className={design.span ? SPAN_CLASS[design.span] : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive(index)}
              layoutId={`design-${design.src}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-space-700/70 bg-space-900"
              aria-label={`Open ${design.title}`}
            >
              <img
                src={design.src}
                alt={design.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-space-950/90 via-space-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block font-semibold tracking-tight text-star">{design.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-ion">
                  {design.note}
                </span>
              </span>
            </motion.button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {piece ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={piece.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-5 bg-space-950/90 p-5 backdrop-blur-xl md:p-10"
          >
            {/* layoutId matches the thumbnail, so the image physically travels
                from the grid into the lightbox instead of cross-fading. */}
            <motion.img
              layoutId={`design-${piece.src}`}
              src={piece.src}
              alt={piece.title}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[74vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous design"
                className="glass grid h-10 w-10 place-items-center rounded-full text-star transition-transform hover:-translate-x-0.5"
              >
                ←
              </button>
              <p className="text-center">
                <span className="block font-semibold tracking-tight text-star">{piece.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  {piece.note} · {(active ?? 0) + 1} / {designs.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next design"
                className="glass grid h-10 w-10 place-items-center rounded-full text-star transition-transform hover:translate-x-0.5"
              >
                →
              </button>
            </motion.div>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="glass absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-star md:right-10 md:top-10"
            >
              ✕
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
