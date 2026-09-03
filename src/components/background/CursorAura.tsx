/**
 * A cold pool of light under the cursor. It reads --pointer-x/--pointer-y,
 * which `usePointerVars` writes outside of React, so this element never
 * re-renders — the browser just repaints a gradient position.
 */
export default function CursorAura() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(340px circle at var(--pointer-x) var(--pointer-y), rgba(110,231,249,0.075), transparent 70%)",
      }}
    />
  );
}
