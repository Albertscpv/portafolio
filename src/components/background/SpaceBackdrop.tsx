import Starfield from "./Starfield";

/**
 * Everything behind the content, in one fixed layer:
 *   1. a vertical gradient from deep void to a faintly lit horizon
 *   2. three nebula clouds drifting on long, unequal cycles
 *   3. the star canvas
 *   4. an academic hairline grid, radially masked so it never tiles visibly
 *   5. vignette
 */
export default function SpaceBackdrop({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#101a33_0%,#080B16_45%,#04050A_100%)]" />

      <div
        className="absolute -left-[18%] top-[-12%] h-[62vmax] w-[62vmax] rounded-full opacity-[0.42] blur-[110px] animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(110,231,249,0.5), rgba(110,231,249,0) 62%)",
        }}
      />
      <div
        className="absolute -right-[14%] top-[22%] h-[54vmax] w-[54vmax] rounded-full opacity-[0.34] blur-[120px] animate-drift"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at 60% 40%, rgba(167,139,250,0.55), rgba(167,139,250,0) 64%)",
        }}
      />
      <div
        className="absolute bottom-[-22%] left-[24%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.22] blur-[130px] animate-drift-slow"
        style={{
          animationDelay: "-18s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.5), rgba(244,114,182,0) 66%)",
        }}
      />

      <Starfield reduced={reduced} />

      <div className="absolute inset-0 bg-grid-fine bg-grid-fine [mask-image:radial-gradient(72%_58%_at_50%_38%,#000,transparent)]" />

      <div className="absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_50%,transparent_38%,rgba(4,5,10,0.72)_100%)]" />
    </div>
  );
}
