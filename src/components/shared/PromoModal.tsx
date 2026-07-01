"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROMO_MODAL_ENABLED = false;
const PROMO_MODAL_DELAY_MS = 2500;
const CONTACT_FORM_TARGET = "#contacto";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!PROMO_MODAL_ENABLED) {
      return;
    }

    let timeoutId: number | null = null;

    const openAfterDelay = () => {
      timeoutId = window.setTimeout(() => setIsOpen(true), PROMO_MODAL_DELAY_MS);
    };

    if (document.readyState === "complete") {
      openAfterDelay();
    } else {
      window.addEventListener("load", openAfterDelay, { once: true });
    }

    return () => {
      window.removeEventListener("load", openAfterDelay);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!PROMO_MODAL_ENABLED || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/72 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-6"
      onClick={() => setIsOpen(false)}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-modal-title"
        aria-describedby="promo-modal-description"
        className="promo-modal-card relative max-h-[calc(100dvh-2rem)] w-full max-w-[min(92vw,520px)] overflow-y-auto rounded-2xl border border-emerald-300/70 bg-slate-950/86 p-3 text-white shadow-2xl backdrop-blur-xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Cerrar promoción"
          onClick={() => setIsOpen(false)}
          className="absolute right-2.5 top-2.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/70 bg-slate-950/70 text-2xl leading-none text-white outline-none transition hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-xl"
        >
          ×
        </button>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:rounded-2xl sm:p-3">
          <div className="relative aspect-[928/613] overflow-hidden rounded-lg border border-emerald-200/35 bg-slate-950 sm:rounded-xl">
            <Image
              src="/images/premio_1.jpeg"
              alt="Promoción junio"
              fetchPriority="high"
              fill
              sizes="(min-width: 640px) 480px, 88vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="px-1 pb-1 pt-4 text-center sm:px-2 sm:pt-5">
          <h2
            id="promo-modal-title"
            className="text-xl font-bold leading-tight text-white min-[380px]:text-2xl sm:text-3xl"
          >
            Celebramos 14 años juntos
          </h2>

          <p
            id="promo-modal-description"
            className="mt-3 text-2xl font-extrabold leading-none text-emerald-300 min-[380px]:text-3xl sm:mt-4 sm:text-3xl"
          >
            10% DE DESCUENTO
          </p>

          <p
            id="promo-modal-terms"
            className="mt-2 text-lg font-bold leading-tight text-white min-[380px]:text-xl sm:text-3xl"
          >
            En todos nuestros servicios
          </p>

          <p
            id="promo-modal-expiry"
            className="mt-3 text-xs text-slate-400 sm:text-sm"
          >
            Durante todo el mes de junio
          </p>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              window.location.hash = CONTACT_FORM_TARGET;
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950 outline-none transition hover:bg-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:mt-5 sm:px-5"
          >
            Consultar
          </button>
        </div>
      </section>
    </div>
  );
}
