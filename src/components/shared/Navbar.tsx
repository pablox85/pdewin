"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_MENUS } from "../../config/navigation";
import {
  desktopDropdownVariants,
  mobileItemsVariants,
  mobilePanelVariants,
} from "../../lib/animations/navbar";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  // Dropdown activo para desktop.
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  // Estado del menu hamburguesa en movil.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Seccion activa del acordeon en movil.
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Cierra dropdowns al hacer click fuera de la barra.
    const onClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const toggleMobileSection = (menuId: string) => {
    setOpenMobileSection((prev) => (prev === menuId ? null : menuId));
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-300/70 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95"
      ref={navRef}
      aria-label="Navegacion principal"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-3.5 max-[360px]:px-3 max-[360px]:py-2.5">
        <div className="text-base font-bold tracking-[0.03em] text-slate-900 dark:text-slate-100 max-[360px]:text-sm">
          Polarizados del Este
        </div>

        <div className="flex items-center gap-2.5 max-[360px]:hidden">
          {NAV_MENUS.map((menu) => {
            const isOpen = openDesktopMenu === menu.id;

            return (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(menu.id)}
                onMouseLeave={() => setOpenDesktopMenu((prev) => (prev === menu.id ? null : prev))}
                onFocusCapture={() => setOpenDesktopMenu(menu.id)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setOpenDesktopMenu((prev) => (prev === menu.id ? null : prev));
                  }
                }}
              >
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2.5 text-[0.95rem] font-semibold text-slate-900 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-brand-100 ${
                    isOpen
                      ? "rounded-b-none border border-slate-300 border-b-transparent bg-blue-100 text-blue-900 dark:border-slate-600 dark:border-b-transparent dark:bg-slate-700 dark:text-blue-100"
                      : ""
                  }`}
                  onClick={() => setOpenDesktopMenu((prev) => (prev === menu.id ? null : menu.id))}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenDesktopMenu(null);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`dropdown-${menu.id}`}
                >
                  {menu.label}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`dropdown-${menu.id}`}
                      role="menu"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={desktopDropdownVariants}
                      className="absolute left-1/2 top-[calc(100%-1px)] z-20 min-w-[220px] -translate-x-1/2 rounded-b-xl rounded-t-none border border-slate-300 bg-white p-2 shadow-[0_12px_30px_rgba(17,24,39,0.12)] dark:border-slate-600 dark:bg-slate-900"
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setOpenDesktopMenu(null);
                        }
                      }}
                    >
                      {menu.items.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          className="block rounded-lg px-2.5 py-2.5 text-[0.92rem] text-slate-900 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-brand-100"
                          role="menuitem"
                          onClick={() => setOpenDesktopMenu(null)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <ThemeToggle />
        </div>

        <div className="hidden items-center gap-2 max-[360px]:inline-flex">
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
            className="hidden overflow-hidden border-t border-slate-300 bg-white px-3 pb-3 pt-2 dark:border-slate-700 dark:bg-slate-950 max-[360px]:block"
          >
            {NAV_MENUS.map((menu) => {
              const isSectionOpen = openMobileSection === menu.id;

              return (
                <div key={menu.id} className="border-b border-slate-200 py-1.5 dark:border-slate-800">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-transparent px-2 py-[9px] text-left text-[0.95rem] font-semibold text-slate-900 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-brand-100"
                    onClick={() => toggleMobileSection(menu.id)}
                    aria-expanded={isSectionOpen}
                    aria-controls={`mobile-section-${menu.id}`}
                  >
                    {menu.label}
                  </button>

                  <AnimatePresence>
                    {isSectionOpen && (
                      <motion.div
                        id={`mobile-section-${menu.id}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileItemsVariants}
                        className="mt-1 overflow-hidden pl-2 pb-2"
                      >
                        {menu.items.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            className="block rounded-md px-2 py-2 text-[0.88rem] text-slate-800 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-brand-100"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenMobileSection(null);
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
