import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div
        style={{
          height: "2px",
          width: `${progress}%`,
          background:
            "linear-gradient(to right, oklch(0.55 0.008 260), oklch(0.85 0.005 260), oklch(0.95 0.003 260), oklch(0.85 0.005 260), oklch(0.55 0.008 260))",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px oklch(0.85 0.005 260 / 0.6)",
        }}
      />
    </div>
  );
}
