import { useCallback, useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  opacity: number;
}

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const lastPointRef = useRef({ x: -200, y: -200 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to window
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

    // Add new trail point only if mouse moved enough
    const dx = mx - lastPointRef.current.x;
    const dy = my - lastPointRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 6) {
      trailRef.current.push({ x: mx, y: my, age: now, opacity: 1 });
      lastPointRef.current = { x: mx, y: my };
    }

    // Expire old points (600ms lifetime)
    const LIFETIME = 600;
    trailRef.current = trailRef.current.filter((p) => now - p.age < LIFETIME);

    // Draw trail segments as fading glow blobs
    for (const p of trailRef.current) {
      const t = 1 - (now - p.age) / LIFETIME; // 1=fresh, 0=expired
      const radius = 28 + t * 20; // shrinks as it ages
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

    // Draw main cursor glow — larger, more intense
    if (mx > -100) {
      // Outer soft halo
      const outerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
      outerGrad.addColorStop(0, "oklch(0.75 0.009 260 / 0.10)");
      outerGrad.addColorStop(0.4, "oklch(0.65 0.007 260 / 0.05)");
      outerGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mx, my, 90, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Inner bright spot
      const innerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
      innerGrad.addColorStop(0, "oklch(0.90 0.006 260 / 0.55)");
      innerGrad.addColorStop(0.5, "oklch(0.78 0.008 260 / 0.20)");
      innerGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mx, my, 22, 0, Math.PI * 2);
      ctx.fillStyle = innerGrad;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Hide trail when cursor leaves window
    const onMouseLeave = () => {
      mouseRef.current = { x: -200, y: -200 };
      trailRef.current = [];
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
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
