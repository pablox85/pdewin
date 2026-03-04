import Link from "next/link";
import { Reveal, SectionWrapper } from "@/components/shared";

// Hero principal con posicionamiento comercial y CTAs claros.
export function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100 pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div
        className="ambient-orb absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl dark:bg-blue-700/30"
        aria-hidden="true"
      />
      <div
        className="ambient-orb ambient-orb--slow absolute right-0 top-10 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-600/30"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">
              Polarizados del Este
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Soluciones premium para vehiculos, car detailing y Home & Deco.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
              Elevamos la imagen y el valor de cada proyecto con procesos claros, ejecucion precisa y
              resultados que se notan desde el primer contacto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/vehiculos"
                className="cta-pop rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white outline-none transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
              >
                Explorar servicios
              </Link>
              <Link
                href="#contacto"
                className="cta-pop rounded-xl border border-slate-400 bg-white px-6 py-3 text-sm font-semibold text-slate-900 outline-none transition hover:border-brand-700 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-200"
              >
                Quiero asesoramiento
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lift-card rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Por que elegirnos</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>Diagnostico inicial para definir la mejor solucion para tu caso.</li>
              <li>Atencion personalizada para clientes particulares, empresas y flotas.</li>
              <li>Estandares de calidad consistentes en cada etapa del servicio.</li>
              <li>Seguimiento post-servicio para asegurar resultados sostenibles.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
