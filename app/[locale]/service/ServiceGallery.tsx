"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./service.module.css";

interface Service {
  title: string;
  description: string;
  image: string;
}

interface ServiceGalleryProps {
  services: Service[];
}

export function ServiceGallery({ services }: ServiceGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const itemsContainer = containerRef.current.parentElement?.parentElement;
    if (!itemsContainer) return;

    const items = Array.from(
      itemsContainer.querySelectorAll<HTMLDivElement>("[data-index]")
    );

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const item = entry.target as HTMLDivElement;
          item.setAttribute("data-visible", "true");
          currentObserver.unobserve(item);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const itemsContainer = containerRef.current.parentElement?.parentElement;
    if (!itemsContainer) return;

    const items = itemsContainer.querySelectorAll<HTMLDivElement>(
      `[data-index]`
    );

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      // Find which service header is closest to the viewport center
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [services.length]);

  return (
    <div ref={containerRef} className={styles.galleryContainer}>
      <div className={styles.imageDisplay}>
        <img
          src={services[activeIndex].image}
          alt={services[activeIndex].title}
          className={styles.image}
        />
      </div>
    </div>
  );
}
