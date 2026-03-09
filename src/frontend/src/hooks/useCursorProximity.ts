import { useEffect } from "react";

/**
 * Two modes:
 * 1. Proximity shimmer — metallic highlight on glass-card / glass-button within 160px
 * 2. Hover burst — cursor vanishes, element explodes with bright chrome glow
 */
export function useCursorProximity() {
  useEffect(() => {
    const PROXIMITY_SELECTORS = [
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

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mx = touch.clientX;
      my = touch.clientY;
    };

    const onTouchEnd = () => {
      mx = -9999;
      my = -9999;
    };

    const update = () => {
      const els = document.querySelectorAll<HTMLElement>(
        PROXIMITY_SELECTORS.join(","),
      );
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        // Check if cursor is directly over the element
        const isHovered =
          mx >= rect.left &&
          mx <= rect.right &&
          my >= rect.top &&
          my <= rect.bottom;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const RADIUS = 160;

        if (isHovered) {
          // BURST mode: cursor is invisible, element lights up hard
          const px = ((mx - rect.left) / rect.width) * 100;
          const py = ((my - rect.top) / rect.height) * 100;

          el.style.setProperty(
            "--cursor-highlight",
            `radial-gradient(circle at ${px}% ${py}%, oklch(1 0 0 / 0.22) 0%, oklch(0.88 0.008 260 / 0.18) 30%, oklch(0.72 0.01 260 / 0.08) 60%, transparent 80%)`,
          );
          el.style.setProperty(
            "--cursor-border",
            "oklch(0.85 0.012 260 / 0.75)",
          );
          el.style.setProperty(
            "--cursor-shadow",
            "0 0 40px oklch(0.78 0.010 260 / 0.35), 0 0 80px oklch(0.65 0.008 260 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.25)",
          );
        } else if (dist < RADIUS) {
          // PROXIMITY mode: gentle shimmer
          const strength = 1 - dist / RADIUS;
          const px = ((mx - rect.left) / rect.width) * 100;
          const py = ((my - rect.top) / rect.height) * 100;

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
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
