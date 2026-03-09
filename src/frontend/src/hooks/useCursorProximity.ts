import { useEffect } from "react";

/**
 * Adds a metallic shimmer highlight to buttons and cards
 * based on how close the cursor is.
 */
export function useCursorProximity() {
  useEffect(() => {
    const SELECTORS = [
      ".glass-button",
      ".blue-button",
      ".glass-card",
      "[data-proximity]",
    ];

    let rafId: number;
    let mx = -9999;
    let my = -9999;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const update = () => {
      const els = document.querySelectorAll<HTMLElement>(SELECTORS.join(","));
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const RADIUS = 160;

        if (dist < RADIUS) {
          const strength = 1 - dist / RADIUS; // 0-1
          const px = ((mx - rect.left) / rect.width) * 100;
          const py = ((my - rect.top) / rect.height) * 100;

          // Metallic highlight: shift from transparent to silver/chrome
          const shimmerAlpha = strength * 0.22;
          el.style.setProperty(
            "--cursor-highlight",
            `radial-gradient(circle at ${px}% ${py}%, oklch(0.88 0.006 260 / ${shimmerAlpha}) 0%, oklch(0.72 0.008 260 / ${shimmerAlpha * 0.4}) 40%, transparent 70%)`,
          );
          el.style.setProperty(
            "--cursor-border",
            `oklch(0.72 0.01 260 / ${0.12 + strength * 0.35})`,
          );
          el.style.setProperty(
            "--cursor-shadow",
            `0 0 ${20 + strength * 30}px oklch(0.65 0.008 260 / ${strength * 0.18})`,
          );
        } else {
          el.style.setProperty("--cursor-highlight", "none");
          el.style.setProperty("--cursor-border", "");
          el.style.setProperty("--cursor-shadow", "");
        }
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
