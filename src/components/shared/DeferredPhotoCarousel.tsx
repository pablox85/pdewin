"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CarouselImage } from "./PhotoCarousel";

const PhotoCarousel = dynamic(() => import("./PhotoCarousel").then((mod) => mod.PhotoCarousel), {
  ssr: false,
});

interface DeferredPhotoCarouselProps {
  images: CarouselImage[];
  className?: string;
  imageContainerClassName?: string;
  autoPlayMs?: number;
  startDelayMs?: number;
}

export function DeferredPhotoCarousel({
  images,
  className = "",
  imageContainerClassName = "h-56 sm:h-64",
  autoPlayMs = 0,
  startDelayMs = 0,
}: DeferredPhotoCarouselProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || shouldRender) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 120px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={rootRef} className={className}>
      {shouldRender ? (
        <PhotoCarousel
          images={images}
          imageContainerClassName={imageContainerClassName}
          autoPlayMs={autoPlayMs}
          startDelayMs={startDelayMs}
          showArrows={false}
        />
      ) : (
        <div
          className={`rounded-2xl border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 ${imageContainerClassName}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
