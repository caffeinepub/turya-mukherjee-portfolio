import { useEffect, useRef } from "react";

/**
 * Bidirectional scroll reveal — Apple product-site style.
 * - Fades in (+ slides up from 10%) as element enters viewport.
 * - Fades out (+ slides up off screen) as element exits above viewport.
 * Also toggles `stagger-children` class on child containers inside the element.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setChildClass = (add: string, remove: string) => {
      for (const child of el.querySelectorAll(".stagger-children")) {
        child.classList.add(add);
        child.classList.remove(remove);
      }
    };

    const applyVisible = () => {
      el.classList.add("visible");
      el.classList.remove("exited");
      setChildClass("visible", "exited");
    };

    const applyExited = () => {
      el.classList.add("exited");
      el.classList.remove("visible");
      setChildClass("exited", "visible");
    };

    const applyReset = () => {
      el.classList.remove("visible", "exited");
      for (const child of el.querySelectorAll(".stagger-children")) {
        child.classList.remove("visible", "exited");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            applyVisible();
          } else {
            const rect = entry.boundingClientRect;
            if (rect.top < 0) {
              applyExited();
            } else {
              applyReset();
            }
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
