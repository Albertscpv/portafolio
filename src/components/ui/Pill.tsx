import type { ReactNode } from "react";

const ACCENTS = {
  ion: "text-ion/90 ring-ion/25 bg-ion/[0.07]",
  nebula: "text-nebula/90 ring-nebula/25 bg-nebula/[0.07]",
  pulsar: "text-pulsar/90 ring-pulsar/25 bg-pulsar/[0.07]",
  solar: "text-solar/90 ring-solar/25 bg-solar/[0.07]",
  neutral: "text-dust ring-space-500 bg-space-700/40",
} as const;

export type Accent = keyof typeof ACCENTS;

/** Small labelled chip. The mono face keeps it reading as metadata, not prose. */
export default function Pill({
  children,
  accent = "neutral",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] tracking-wide ring-1 ring-inset ${ACCENTS[accent]} ${className}`}
    >
      {children}
    </span>
  );
}
