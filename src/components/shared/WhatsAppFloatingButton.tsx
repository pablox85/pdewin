"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { MouseEventHandler, PointerEventHandler } from "react";
import { siteConfig } from "@/config/site";

const BUTTON_SIZE = 58;
const SIDE_MARGIN = 16;
const BOTTOM_MARGIN = 24;
const DRAG_THRESHOLD = 6;
const MESSAGE = "Hola me gustaria hacer una consulta";

interface Position {
  x: number;
  y: number;
}

function subscribeToClientStatus() {
  return () => {};
}

function getInitialPosition(): Position | null {
  if (typeof window === "undefined") {
    return null;
  }

  const isMobile = window.innerWidth < 768;
  const initialX = window.innerWidth - BUTTON_SIZE - SIDE_MARGIN;
  const preferredY = isMobile
    ? Math.round(window.innerHeight * 0.75)
    : window.innerHeight - BUTTON_SIZE - BOTTOM_MARGIN;
  const maxY = Math.max(SIDE_MARGIN, window.innerHeight - BUTTON_SIZE - SIDE_MARGIN);
  const initialY = Math.min(Math.max(preferredY, SIDE_MARGIN), maxY);

  return { x: initialX, y: initialY };
}

export function WhatsAppFloatingButton() {
  const isClient = useSyncExternalStore(subscribeToClientStatus, () => true, () => false);
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
    active: false,
  });
  const suppressClickRef = useRef(false);

  const whatsappHref = useMemo(() => {
    const phone = siteConfig.contactPhone.replace(/\D/g, "");
    return `https://wa.me/${phone}?text=${encodeURIComponent(MESSAGE)}`;
  }, []);
  const resolvedPosition = position ?? (isClient ? getInitialPosition() : null);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const onResize = () => {
      setPosition((prev) => {
        const currentPosition = prev ?? getInitialPosition();
        if (!currentPosition) {
          return prev;
        }

        const maxX = Math.max(SIDE_MARGIN, window.innerWidth - BUTTON_SIZE - SIDE_MARGIN);
        const maxY = Math.max(SIDE_MARGIN, window.innerHeight - BUTTON_SIZE - SIDE_MARGIN);
        return {
          x: Math.min(Math.max(currentPosition.x, SIDE_MARGIN), maxX),
          y: Math.min(Math.max(currentPosition.y, SIDE_MARGIN), maxY),
        };
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isClient]);

  const openWhatsApp = () => {
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  const onPointerDown: PointerEventHandler<HTMLButtonElement> = (event) => {
    setIsSnapping(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: resolvedPosition?.x ?? 0,
      originY: resolvedPosition?.y ?? 0,
      moved: false,
      active: true,
    };
    setIsDragging(true);
  };

  const onPointerMove: PointerEventHandler<HTMLButtonElement> = (event) => {
    if (!dragRef.current.active) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;

    if (!dragRef.current.moved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
      dragRef.current.moved = true;
      suppressClickRef.current = true;
    }

    const maxX = window.innerWidth - BUTTON_SIZE - SIDE_MARGIN;
    const maxY = window.innerHeight - BUTTON_SIZE - SIDE_MARGIN;
    const nextX = Math.min(Math.max(dragRef.current.originX + deltaX, SIDE_MARGIN), maxX);
    const nextY = Math.min(Math.max(dragRef.current.originY + deltaY, SIDE_MARGIN), maxY);
    setPosition({ x: nextX, y: nextY });
  };

  const onPointerUp: PointerEventHandler<HTMLButtonElement> = () => {
    if (!dragRef.current.active) {
      return;
    }

    const moved = dragRef.current.moved;
    dragRef.current.active = false;
    setIsDragging(false);

    if (!moved) {
      openWhatsApp();
      return;
    }

    setPosition((prev) => {
      const currentPosition = prev ?? getInitialPosition();
      if (!currentPosition) {
        return prev;
      }

      const centerX = currentPosition.x + BUTTON_SIZE / 2;
      const viewportMid = window.innerWidth / 2;
      const snapX = centerX >= viewportMid ? window.innerWidth - BUTTON_SIZE - SIDE_MARGIN : SIDE_MARGIN;
      setIsSnapping(true);
      window.setTimeout(() => setIsSnapping(false), 260);
      return { x: snapX, y: currentPosition.y };
    });
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      event.preventDefault();
      return;
    }
    openWhatsApp();
  };

  if (!resolvedPosition) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Abrir WhatsApp"
      title="WhatsApp"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: `${resolvedPosition.x}px`, top: `${resolvedPosition.y}px` }}
      className={`fixed z-[70] inline-flex h-[58px] w-[58px] touch-none select-none items-center justify-center rounded-full border border-green-700/40 bg-[#25D366] text-white shadow-lg ring-offset-2 ${
        isSnapping
          ? "transition-[left,top,transform] duration-300 ease-out"
          : "transition-transform duration-200"
      } ${isDragging ? "cursor-grabbing scale-95" : "cursor-grab hover:scale-105"} ${
        isSnapping ? "scale-[1.02]" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.53 0 .22 5.3.22 11.82c0 2.08.54 4.12 1.56 5.92L0 24l6.45-1.69a11.78 11.78 0 0 0 5.6 1.42h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.15-1.23-6.11-3.37-8.43Zm-8.47 18.26h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.22-3.83 1 1.02-3.74-.24-.39a9.84 9.84 0 0 1-1.51-5.21c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.97c0 5.44-4.43 9.86-9.79 9.93Zm5.41-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48a9.02 9.02 0 0 1-1.67-2.08c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.27.3-1.03 1.01-1.03 2.46s1.05 2.86 1.2 3.06c.15.2 2.05 3.13 4.98 4.38.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </button>
  );
}
