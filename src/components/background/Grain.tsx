/**
 * The matte finish. A tiling fractal-noise tile laid over the gradients at low
 * opacity — it lifts pure black just enough to read as a matte surface instead
 * of a glossy void, and it breaks up the banding that large soft gradients
 * always produce on 8-bit displays.
 *
 * Generated with feTurbulence and desaturated in the same filter, so it costs
 * one inline data URI and no runtime work.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Grain({
  opacity = 0.055,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ backgroundImage: NOISE, backgroundSize: "160px 160px", opacity }}
    />
  );
}
