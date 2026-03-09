import { useCallback, useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  opacity: number;
}

// Selectors that trigger the "cursor vanish + element glow" mode
const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  "[role='button']",
  ".glass-button",
  ".blue-button",
  ".glass-card",
  "[data-interactive]",
  ".photo-interactive",
  "input",
  "textarea",
  "select",
  "label",
  "[tabindex]",
  "nav *",
];

function isOverInteractive(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y);
  if (!el) return false;
  return !!el.closest(INTERACTIVE_SELECTORS.join(","));
}

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const lastPointRef = useRef({ x: -200, y: -200 });
  const overInteractiveRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (
      canvas.width !== window.innerWidth ||
      canvas.height !== window.innerHeight
    ) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const overInteractive = overInteractiveRef.current;

    // Only add trail points when NOT over an interactive element
    if (!overInteractive) {
      const dx = mx - lastPointRef.current.x;
      const dy = my - lastPointRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 6) {
        trailRef.current.push({ x: mx, y: my, age: now, opacity: 1 });
        lastPointRef.current = { x: mx, y: my };
      }
    } else {
      // Flush trail quickly when entering interactive zone
      trailRef.current = [];
    }

    // Expire old points
    const LIFETIME = 600;
    trailRef.current = trailRef.current.filter((p) => now - p.age < LIFETIME);

    // Draw trail blobs (only when not over interactive)
    if (!overInteractive) {
      for (const p of trailRef.current) {
        const t = 1 - (now - p.age) / LIFETIME;
        const radius = 28 + t * 20;
        const alpha = t * 0.22;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `oklch(0.78 0.008 260 / ${alpha})`);
        grad.addColorStop(0.5, `oklch(0.55 0.006 260 / ${alpha * 0.5})`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Main cursor glow
      if (mx > -100) {
        const outerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        outerGrad.addColorStop(0, "oklch(0.75 0.009 260 / 0.10)");
        outerGrad.addColorStop(0.4, "oklch(0.65 0.007 260 / 0.05)");
        outerGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 90, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        const innerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
        innerGrad.addColorStop(0, "oklch(0.90 0.006 260 / 0.55)");
        innerGrad.addColorStop(0.5, "oklch(0.78 0.008 260 / 0.20)");
        innerGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.fillStyle = innerGrad;
        ctx.fill();
      }
    }
    // When over interactive: cursor dot is invisible — element handles its own glow

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      overInteractiveRef.current = isOverInteractive(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -200, y: -200 };
      trailRef.current = [];
      overInteractiveRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      overInteractiveRef.current = isOverInteractive(
        touch.clientX,
        touch.clientY,
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      overInteractiveRef.current = isOverInteractive(
        touch.clientX,
        touch.clientY,
      );
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: -200, y: -200 };
      trailRef.current = [];
      overInteractiveRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
