"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { NAV_MENUS } from "../../config/navigation";
import { mobilePanelVariants } from "../../lib/animations/navbar";
import { ThemeToggle } from "./ThemeToggle";

// Colores de hover/activo por seccion (desktop y movil).
const sectionHoverStyles: Record<
  string,
  {
    text: string;
    underline: string;
    mobileActive: string;
  }
> = {
  vehiculos: {
    text: "hover:text-blue-800 dark:hover:text-blue-200",
    underline: "bg-[#0052CC] dark:[#0052CC]",
    mobileActive: "bg-blue-100 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100",
  },
  cardetailing: {
    text: "hover:text-cyan-800 dark:hover:text-cyan-200",
    underline: "bg-cyan-700 dark:bg-cyan-300",
    mobileActive: "bg-cyan-100 text-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-100",
  },
  arquitectura: {
    text: "hover:text-amber-800 dark:hover:text-amber-200",
    underline: "bg-amber-700 dark:bg-amber-300",
    mobileActive: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
  },
  publicidad: {
    text: "hover:text-fuchsia-800 dark:hover:text-fuchsia-200",
    underline: "bg-fuchsia-700 dark:bg-fuchsia-300",
    mobileActive: "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950/40 dark:text-fuchsia-100",
  },
};

export function Navbar() {
  // Estado del menu hamburguesa en movil.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Seccion activa para remarcar navegacion.
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Cierra menu movil al hacer click fuera de la barra.
    const onClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => {
    // Al volver a desktop cerramos estado movil.
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
    // Sincroniza item activo con hash para subrayado persistente.
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-300/70 bg-slate-100/95 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95"
      ref={navRef}
      aria-label="Navegacion principal"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-3.5 max-[360px]:px-3 max-[360px]:py-2.5">
        <Link href="/" className="inline-flex items-center" aria-label="Ir al inicio">
          <Image
            src="/images/NEGRO-FONDO-TRANSPARENTE.png"
            alt="Polarizados del Este"
            width={172}
            height={38}
            priority
            className="h-auto w-[154px] dark:hidden max-[360px]:w-[130px]"
          />
          <Image
            src="/images/BLANCO-FONDO-TRANSPARENTE.png"
            alt="Polarizados del Este"
            width={172}
            height={38}
            priority
            className="hidden h-auto w-[154px] dark:block max-[360px]:w-[130px]"
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {NAV_MENUS.map((menu) => {
            const isActive = activeSection === menu.id;
            const hoverStyle = sectionHoverStyles[menu.id] ?? {
              text: "hover:text-slate-900 dark:hover:text-slate-100",
              underline: "bg-brand-700 dark:bg-brand-100",
              mobileActive: "bg-brand-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
            };

            return (
              <a
                key={menu.id}
                href={`#${menu.id}`}
                onClick={() => setActiveSection(menu.id)}
                className={`group relative inline-flex items-center px-1 py-2 text-[1rem] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-700 dark:focus-visible:ring-brand-100 ${hoverStyle.text} ${
                  isActive
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-700 dark:text-slate-300"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {menu.label}
                <span
                  className={`absolute -bottom-[9px] left-0 h-[2px] w-full origin-left transition-transform duration-300 ${hoverStyle.underline} ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
          <ThemeToggle />
        </div>

        <div className="inline-flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex min-h-[38px] min-w-[42px] items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 py-2 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus-visible:ring-brand-100"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label="Abrir menu principal"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="inline-flex flex-col gap-1" aria-hidden="true">
              <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
              <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
              <span className="block h-0.5 w-[18px] rounded-sm bg-slate-900 dark:bg-slate-100" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobilePanelVariants}
            className="overflow-hidden border-t border-slate-300 bg-slate-50 px-3 pb-3 pt-2 dark:border-slate-700 dark:bg-slate-950 md:hidden"
          >
            {NAV_MENUS.map((menu) => {
              const isActive = activeSection === menu.id;
              const hoverStyle = sectionHoverStyles[menu.id] ?? {
                text: "hover:text-slate-900 dark:hover:text-slate-100",
                underline: "bg-brand-700 dark:bg-brand-100",
                mobileActive: "bg-brand-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
              };

              return (
                <div key={menu.id} className="border-b border-slate-200 py-1.5 dark:border-slate-800">
                  <a
                    href={`#${menu.id}`}
                    className={`block w-full rounded-lg px-2 py-[9px] text-left text-[0.95rem] font-semibold outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-brand-700 dark:focus-visible:ring-brand-100 ${hoverStyle.text} ${
                      isActive
                        ? hoverStyle.mobileActive
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => {
                      setActiveSection(menu.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {menu.label}
                  </a>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
