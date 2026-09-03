import { useEffect } from "react";

/**
 * Publishes the pointer position as CSS custom properties on <html> so purely
 * decorative effects (cursor aura, panel sheen) can follow the cursor without
 * re-rendering React on every mousemove. Updates are coalesced into one rAF.
 */
export function usePointerVars(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const commit = () => {
      frame = 0;
      const root = document.documentElement;
      root.style.setProperty("--pointer-x", `${x}px`);
      root.style.setProperty("--pointer-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(commit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);
}
