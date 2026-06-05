"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface GalleryVideo {
  src: string;
  title: string;
}

interface VideoGalleryProps {
  videos: GalleryVideo[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const canUseDOM = typeof document !== "undefined";
  const activeVideo = activeVideoIndex === null ? null : videos[activeVideoIndex];

  useEffect(() => {
    if (!activeVideo) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideoIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo, videos.length]);

  return (
    <>
      <section
        id="videos"
        aria-labelledby="videos-title"
        className="mx-auto mt-6 w-full max-w-[1600px] scroll-mt-28 px-3 md:scroll-mt-32 md:px-5"
      >
        <article className="rounded-2xl border border-slate-300 bg-white p-4 shadow-card dark:border-slate-700 dark:bg-slate-900 sm:p-5">
          <div className="mb-4 flex w-full flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">
                Videos
              </p>
              <h2 id="videos-title" className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                Procesos y resultados en video
              </h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {videos.length} videos
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <button
                key={video.src}
                type="button"
                onClick={() => setActiveVideoIndex(index)}
                className="group overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 text-left outline-none transition hover:-translate-y-1 hover:border-brand-700 hover:shadow-card focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-blue-300 dark:focus-visible:ring-blue-200"
                aria-label={`Reproducir ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <video
                    preload="metadata"
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.03] group-hover:opacity-100"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <span
                    className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-slate-950/70 text-white shadow-lg backdrop-blur transition group-hover:scale-105 group-hover:bg-brand-700/90"
                    aria-hidden="true"
                  >
                    <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{video.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                      Trabajo real
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white dark:bg-blue-500">
                    Ver
                  </span>
                </div>
              </button>
            ))}
          </div>
        </article>
      </section>

      {canUseDOM && activeVideo
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-gallery-modal-title"
              aria-describedby="video-gallery-modal-description"
              onClick={() => setActiveVideoIndex(null)}
            >
              <div
                className="w-fit max-w-[min(94vw,980px)] rounded-2xl border border-brand-400/80 bg-slate-950/88 p-3 shadow-[0_0_32px_rgba(14,165,233,0.26),0_0_58px_rgba(59,130,246,0.18)] backdrop-blur sm:p-4 dark:border-blue-300/80"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between gap-4 text-white">
                  <div>
                    <h2 id="video-gallery-modal-title" className="text-base font-bold sm:text-lg">
                      {activeVideo.title}
                    </h2>
                    <p id="video-gallery-modal-description" className="mt-1 text-xs text-white/70">
                      Video {(activeVideoIndex ?? 0) + 1} de {videos.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideoIndex(null)}
                    className="rounded-md bg-white/20 px-3 py-2 text-sm font-semibold text-white outline-none transition hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Cerrar
                  </button>
                </div>
                <video
                  controls
                  autoPlay
                  preload="metadata"
                  playsInline
                  className="mx-auto max-h-[50vh] max-w-[calc(94vw-1.5rem)] rounded-xl bg-black object-contain sm:max-w-[calc(94vw-2rem)]"
                >
                  <source src={activeVideo.src} type="video/mp4" />
                </video>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
