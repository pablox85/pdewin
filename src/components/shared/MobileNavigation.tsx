"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_MENUS } from "@/config/navigation";

const mobileActiveStyles: Record<string, string> = {
  vehiculos: "bg-blue-100 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100",
  cardetailing: "bg-cyan-100 text-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-100",
  arquitectura: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
};

export function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", onViewportChange);
    return () => mediaQuery.removeEventListener("change", onViewportChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div ref={menuRef}>
      <button
        type="button"
        className="inline-flex min-h-[38px] min-w-[42px] items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 py-2 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus-visible:ring-brand-100"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation-panel"
        aria-label="Abrir menú principal"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        <span className="inline-flex flex-col gap-1" aria-hidden="true">
          <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
          <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
          <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
        </span>
      </button>

      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-40 bg-slate-950/45 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            id="mobile-navigation-panel"
            className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-200/20 bg-slate-950/90 px-3 pb-3 pt-2 md:hidden"
          >
            {NAV_MENUS.map((menu) => {
              const isActive = pathname === menu.href;

              return (
                <div
                  key={menu.id}
                  className="mx-auto w-full max-w-[1200px] border-b border-slate-300/20 py-1.5 last:border-b-0 dark:border-slate-700/50"
                >
                  <Link
                    href={menu.href}
                    className={`block w-full rounded-lg px-2 py-[9px] text-left text-[0.95rem] font-semibold outline-none ring-offset-2 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-700 dark:hover:bg-white/10 dark:focus-visible:ring-brand-100 ${
                      isActive
                        ? mobileActiveStyles[menu.id] ?? "bg-brand-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                        : "text-slate-100 dark:text-slate-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
