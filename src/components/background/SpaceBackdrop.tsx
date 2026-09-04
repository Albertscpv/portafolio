import Starfield from "./Starfield";
import Grain from "./Grain";

/**
 * Everything behind the content, in one fixed layer. The palette is
 * deliberately monochrome — pure black through neutral greys, no hue — so the
 * only color on the page comes from the interface itself.
 *
 *   1. pure black base with one soft wash from above the fold
 *   2. two neutral clouds drifting on long, unequal cycles
 *   3. the star canvas
 *   4. matte grain over all of it
 *   5. vignette
 */
export default function SpaceBackdrop({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-12%,#1f1f1f_0%,#0d0d0d_38%,#000000_100%)]" />

      <div
        className="absolute -left-[18%] top-[-14%] h-[64vmax] w-[64vmax] rounded-full opacity-[0.30] blur-[120px] animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.16), rgba(255,255,255,0) 64%)",
        }}
      />
      <div
        className="absolute -right-[16%] top-[26%] h-[56vmax] w-[56vmax] rounded-full opacity-[0.22] blur-[130px] animate-drift"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.13), rgba(255,255,255,0) 66%)",
        }}
      />

      <Starfield reduced={reduced} />

      <Grain />

      <div className="absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_50%,transparent_36%,rgba(0,0,0,0.80)_100%)]" />
    </div>
  );
}
