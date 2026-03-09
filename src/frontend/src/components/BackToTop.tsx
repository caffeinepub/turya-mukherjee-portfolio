import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      data-ocid="backtotop.button"
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "1.5rem",
        zIndex: 60,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(0.18 0.005 260 / 0.75)",
        backdropFilter: "blur(16px) saturate(120%)",
        WebkitBackdropFilter: "blur(16px) saturate(120%)",
        border: "1px solid oklch(0.65 0.008 260 / 0.35)",
        boxShadow:
          "0 4px 24px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.1)",
        cursor: "pointer",
        color: "oklch(0.82 0.006 260)",
      }}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
