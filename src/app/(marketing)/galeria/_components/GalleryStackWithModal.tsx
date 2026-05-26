"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PhotoCarousel } from "@/components/shared";
import type { PublicImage } from "@/lib/gallery/getPublicImages";

interface GalleryGroup {
  title: string;
  images: PublicImage[];
}

interface GalleryStackWithModalProps {
  groups: GalleryGroup[];
  carouselHeightClassName: string;
  autoPlayMs: number;
}

interface ActiveModal {
  groupTitle: string;
  index: number;
}

function toCategoryAnchor(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-");
}

export function GalleryStackWithModal({
  groups,
  carouselHeightClassName,
  autoPlayMs,
}: GalleryStackWithModalProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const canUseDOM = typeof document !== "undefined";

  const activeGroup = useMemo(
    () => groups.find((group) => group.title === activeModal?.groupTitle) ?? null,
    [activeModal?.groupTitle, groups],
  );

  const activeImage = activeGroup && activeModal ? activeGroup.images[activeModal.index] : null;
  const activeModalBaseId = activeGroup ? `gallery-modal-${toCategoryAnchor(activeGroup.title)}` : "gallery-modal";
  const activeModalTitleId = `${activeModalBaseId}-title`;
  const activeModalDescriptionId = `${activeModalBaseId}-description`;

  useEffect(() => {
    if (!activeModal || !activeGroup) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }

      if (event.key === "ArrowRight") {
        setActiveModal((prev) => {
          if (!prev || prev.groupTitle !== activeGroup.title) {
            return prev;
          }

          return { ...prev, index: (prev.index + 1) % activeGroup.images.length };
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveModal((prev) => {
          if (!prev || prev.groupTitle !== activeGroup.title) {
            return prev;
          }

          return {
            ...prev,
            index: (prev.index - 1 + activeGroup.images.length) % activeGroup.images.length,
          };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal, activeGroup]);

  useEffect(() => {
    if (!activeModal) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-3 md:px-5 lg:grid-cols-2">
        {groups.map((group, index) => (
          <article
            key={group.title}
            id={toCategoryAnchor(group.title)}
            className="rounded-2xl border border-slate-300 bg-white p-4 shadow-card dark:border-slate-700 dark:bg-slate-900 sm:p-5"
          >
            <div className="mb-3 flex w-full items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{group.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {group.images.length} fotos
              </span>
            </div>

            <PhotoCarousel
              images={group.images.map((image) => ({ src: image.src, alt: image.alt }))}
              autoPlayMs={autoPlayMs}
              startDelayMs={index * 250}
              showDots={false}
              showArrows={group.images.length > 1}
              showCounter
              imageContainerClassName={carouselHeightClassName}
              className="rounded-xl"
              onImageClick={(_, imageIndex) => setActiveModal({ groupTitle: group.title, index: imageIndex })}
            />
          </article>
        ))}
      </div>

      {canUseDOM && activeImage && activeGroup && activeModal
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby={activeModalTitleId}
              aria-describedby={activeModalDescriptionId}
              onClick={() => setActiveModal(null)}
            >
              <div
                className="relative w-full max-w-6xl"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="absolute -top-12 right-0 rounded-md bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30"
                >
                  Cerrar
                </button>

                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 text-white">
                  <h2 id={activeModalTitleId} className="truncate text-sm font-medium">
                    {activeGroup.title}
                  </h2>
                  <p id={activeModalDescriptionId} className="text-xs text-white/80">
                    Foto {activeModal.index + 1} de {activeGroup.images.length}
                  </p>
                </div>

                {activeGroup.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveModal((prev) => {
                          if (!prev || prev.groupTitle !== activeGroup.title) {
                            return prev;
                          }

                          return {
                            ...prev,
                            index: (prev.index - 1 + activeGroup.images.length) % activeGroup.images.length,
                          };
                        })
                      }
                      aria-label="Imagen anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white transition hover:bg-white/30"
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveModal((prev) => {
                          if (!prev || prev.groupTitle !== activeGroup.title) {
                            return prev;
                          }

                          return {
                            ...prev,
                            index: (prev.index + 1) % activeGroup.images.length,
                          };
                        })
                      }
                      aria-label="Imagen siguiente"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white transition hover:bg-white/30"
                    >
                      {">"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
