"use client";

import { useEffect } from "react";

export function useTeslaReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[class*='reveal-']").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
