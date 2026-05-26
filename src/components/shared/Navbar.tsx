import Image from "next/image";
import Link from "next/link";
import { NAV_MENUS } from "@/config/navigation";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

const sectionHoverStyles: Record<string, string> = {
  vehiculos: "hover:text-blue-800 dark:hover:text-blue-200",
  cardetailing: "hover:text-cyan-800 dark:hover:text-cyan-200",
  arquitectura: "hover:text-amber-800 dark:hover:text-amber-200",
};

const sectionUnderlineStyles: Record<string, string> = {
  vehiculos: "bg-[#0052CC]",
  cardetailing: "bg-cyan-700 dark:bg-cyan-300",
  arquitectura: "bg-amber-700 dark:bg-amber-300",
};

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-300/70 bg-slate-100/95 md:backdrop-blur dark:border-slate-700 dark:bg-slate-950/95"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-3.5 max-[360px]:px-3 max-[360px]:py-2.5">
        <Link href="/" className="inline-flex items-center" aria-label="Ir al inicio">
          <Image
            src="/images/NEGRO-FONDO-TRANSPARENTE.png"
            alt="Polarizados del Este"
            width={172}
            height={38}
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
          {NAV_MENUS.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={`group relative inline-flex items-center px-1 py-2 text-[1rem] font-semibold text-slate-700 outline-none transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-700 dark:text-slate-300 dark:focus-visible:ring-brand-100 ${
                sectionHoverStyles[menu.id] ?? "hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {menu.label}
              <span
                className={`absolute -bottom-[9px] left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  sectionUnderlineStyles[menu.id] ?? "bg-brand-700 dark:bg-brand-100"
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="inline-flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
}
