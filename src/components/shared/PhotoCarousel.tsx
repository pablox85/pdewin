"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  images: CarouselImage[];
  className?: string;
  autoPlayMs?: number;
  startDelayMs?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export function PhotoCarousel({
  images,
  className = "",
  autoPlayMs = 0,
  startDelayMs = 0,
  showDots = true,
  showArrows = true,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (autoPlayMs <= 0 || total <= 1) {
      return;
    }

    let intervalId: number | null = null;
    const startAutoPlay = () => {
      intervalId = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, autoPlayMs);
    };

    const timeoutId = window.setTimeout(startAutoPlay, Math.max(0, startDelayMs));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoPlayMs, startDelayMs, total]);

  useEffect(() => {
    if (currentIndex > total - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, total]);

  if (total === 0) {
    return null;
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      <div className="relative h-56 w-full sm:h-64">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {showArrows && total > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/70"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/70"
          >
            {">"}
          </button>
        </>
      ) : null}

      {showDots && total > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2">
          {images.map((image, index) => (
            <button
              key={`${image.src}-dot-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a foto ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
