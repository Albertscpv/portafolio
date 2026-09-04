import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  /** Depth 0 (far) → 1 (near). Drives size, brightness and parallax. */
  z: number;
  r: number;
  alpha: number;
  twinkle: number;
  phase: number;
  tint: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
}

const TINTS = ["#ffffff", "#ededed", "#d4d4d4", "#a3a3a3", "#fafafa"];

/**
 * The deep-field backdrop. One canvas, three parallax depths, and a meteor
 * every few seconds. It runs on a single rAF loop, pauses when the tab is
 * hidden, and renders one still frame when the visitor prefers reduced motion.
 */
export default function Starfield({ reduced = false }: { reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let frame = 0;
    let running = true;
    let nextMeteorAt = 2600;

    // Pointer parallax is smoothed toward its target so it never snaps.
    let targetPX = 0;
    let targetPY = 0;
    let px = 0;
    let py = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function build() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = dpr();
      canvas!.width = Math.floor(width * ratio);
      canvas!.height = Math.floor(height * ratio);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Density scales with viewport area, capped so phones stay smooth.
      const count = Math.max(90, Math.min(320, Math.round((width * height) / 7200)));
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: 0.35 + z * 1.35,
          alpha: 0.2 + z * 0.62,
          twinkle: 0.0006 + Math.random() * 0.0022,
          phase: Math.random() * Math.PI * 2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      });
    }

    function spawnMeteor() {
      const fromLeft = Math.random() > 0.35;
      const speed = 5.5 + Math.random() * 4;
      meteors.push({
        x: fromLeft ? -60 : width * (0.4 + Math.random() * 0.6),
        y: Math.random() * height * 0.55,
        vx: speed * (fromLeft ? 1 : -0.8),
        vy: speed * 0.42,
        life: 0,
        ttl: 620 + Math.random() * 420,
      });
    }

    function paint(time: number, scrollY: number) {
      ctx!.clearRect(0, 0, width, height);

      px += (targetPX - px) * 0.045;
      py += (targetPY - py) * 0.045;

      for (const star of stars) {
        // Nearer stars drift faster and react harder to scroll and pointer.
        const depth = 0.12 + star.z * 0.88;
        const drift = reduced ? 0 : time * 0.0016 * depth;
        const offsetY = star.y + drift + scrollY * depth * 0.07 + py * depth * 14;
        const offsetX = star.x + px * depth * 22;

        const y = ((offsetY % height) + height) % height;
        const x = ((offsetX % width) + width) % width;

        const flicker = reduced ? 1 : 0.72 + 0.28 * Math.sin(time * star.twinkle + star.phase);

        ctx!.globalAlpha = star.alpha * flicker;
        ctx!.fillStyle = star.tint;
        ctx!.beginPath();
        ctx!.arc(x, y, star.r, 0, Math.PI * 2);
        ctx!.fill();

        // The brightest few get a soft bloom so the field has hierarchy.
        if (star.z > 0.86) {
          ctx!.globalAlpha = star.alpha * flicker * 0.16;
          ctx!.beginPath();
          ctx!.arc(x, y, star.r * 5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      for (const meteor of meteors) {
        const t = meteor.life / meteor.ttl;
        const fade = Math.sin(Math.PI * t);
        const tailX = meteor.x - meteor.vx * 15;
        const tailY = meteor.y - meteor.vy * 15;
        const gradient = ctx!.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(220,240,255,${0.85 * fade})`);
        gradient.addColorStop(1, "rgba(220,240,255,0)");
        ctx!.globalAlpha = 1;
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.6;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(meteor.x, meteor.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      }

      ctx!.globalAlpha = 1;
    }

    let last = performance.now();
    function loop(time: number) {
      if (!running) return;
      const delta = Math.min(time - last, 48);
      last = time;

      if (!reduced) {
        nextMeteorAt -= delta;
        if (nextMeteorAt <= 0) {
          spawnMeteor();
          nextMeteorAt = 4200 + Math.random() * 7000;
        }
        for (const meteor of meteors) {
          meteor.x += meteor.vx * (delta / 16);
          meteor.y += meteor.vy * (delta / 16);
          meteor.life += delta;
        }
        meteors = meteors.filter((m) => m.life < m.ttl);
      }

      paint(time, window.scrollY);
      frame = requestAnimationFrame(loop);
    }

    const onPointer = (event: PointerEvent) => {
      targetPX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetPY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      build();
      if (reduced) paint(0, window.scrollY);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!reduced) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };

    build();

    if (reduced) {
      paint(0, window.scrollY);
    } else {
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  );
}
