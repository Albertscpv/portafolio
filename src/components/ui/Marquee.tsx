interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass. Longer list → longer duration. */
  duration?: number;
}

/**
 * An endless ticker. The list is rendered twice and translated by exactly -50%,
 * so the seam lands on an identical frame and the loop is invisible.
 */
export default function Marquee({ items, duration = 38 }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className="mask-fade-x relative overflow-hidden py-2" aria-hidden="true">
      <div
        className="flex w-max animate-marquee items-center gap-10 will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-faint">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-space-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
