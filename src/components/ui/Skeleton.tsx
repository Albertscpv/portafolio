/** Shape-of-the-content placeholder. The sheen sweeps rather than pulses. */
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block overflow-hidden rounded-md bg-space-700/60 ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full animate-sheen bg-gradient-to-r from-transparent via-space-500/50 to-transparent" />
    </span>
  );
}
