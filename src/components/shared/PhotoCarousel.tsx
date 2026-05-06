"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface CarouselImage {
  src: string;
  alt: string;
  position?: string;
  positionMobile?: string;
  positionDesktop?: string;
}

interface PhotoCarouselProps {
  images: CarouselImage[];
  className?: string;
  imageContainerClassName?: string;
  autoPlayMs?: number;
  startDelayMs?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showCounter?: boolean;
  onImageClick?: (image: CarouselImage, index: number) => void;
}

export function PhotoCarousel({
  images,
  className = "",
  imageContainerClassName = "h-56 sm:h-64",
  autoPlayMs = 0,
  startDelayMs = 0,
  showDots = true,
  showArrows = true,
  showCounter = false,
  onImageClick,
}: PhotoCarouselProps) {
  const SWIPE_THRESHOLD_PX = 40;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
  });
  const total = images.length;
  const activeIndex = total > 0 ? currentIndex % total : 0;

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

  if (total === 0) {
    return null;
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleImageClick = () => {
    if (touchRef.current.moved) {
      touchRef.current.moved = false;
      return;
    }

    if (!onImageClick) {
      return;
    }

    onImageClick(images[activeIndex], activeIndex);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      <div
        className={`relative w-full ${imageContainerClassName} ${onImageClick ? "cursor-zoom-in" : ""}`}
        onClick={handleImageClick}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (!touch) {
            return;
          }

          touchRef.current.startX = touch.clientX;
          touchRef.current.startY = touch.clientY;
          touchRef.current.moved = false;
        }}
        onTouchMove={(event) => {
          const touch = event.touches[0];
          if (!touch) {
            return;
          }

          const deltaX = touch.clientX - touchRef.current.startX;
          const deltaY = touch.clientY - touchRef.current.startY;
          if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
            touchRef.current.moved = true;
          }
        }}
        onTouchEnd={(event) => {
          if (total <= 1) {
            return;
          }

          const touch = event.changedTouches[0];
          if (!touch) {
            return;
          }

          const deltaX = touch.clientX - touchRef.current.startX;
          const deltaY = touch.clientY - touchRef.current.startY;

          if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
          }

          if (deltaX < 0) {
            goToNext();
            return;
          }

          goToPrev();
        }}
        onKeyDown={(event) => {
          if (!onImageClick) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleImageClick();
          }
        }}
        role={onImageClick ? "button" : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        aria-label={onImageClick ? "Abrir imagen en grande" : undefined}
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="carousel-image object-cover"
              style={
                {
                  "--image-position-mobile": image.positionMobile ?? image.position ?? "50% 50%",
                  "--image-position-desktop": image.positionDesktop ?? image.position ?? image.positionMobile ?? "50% 50%",
                } as CSSProperties
              }
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

      {showCounter ? (
        <div className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
          Foto {activeIndex + 1} de {total}
        </div>
      ) : null}

      {showDots && total > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2">
          {images.map((image, index) => (
            <button
              key={`${image.src}-dot-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a foto ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
