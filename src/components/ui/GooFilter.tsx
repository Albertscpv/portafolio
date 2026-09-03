/**
 * The metaball filter behind every liquid effect. Blur the shapes, then crush
 * the alpha ramp so partially-transparent pixels snap to opaque — neighbouring
 * blobs fuse at their edges instead of overlapping.
 * Mounted once at the app root; referenced as `filter: url(#goo)`.
 */
export default function GooFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0" focusable="false">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <filter id="goo-soft">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
        </filter>
      </defs>
    </svg>
  );
}
