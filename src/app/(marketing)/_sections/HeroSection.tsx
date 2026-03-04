import Link from "next/link";
import { Reveal, SectionWrapper } from "@/components/shared";

// Hero principal con CTAs hacia paginas individuales y contacto.
export function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100 pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div
        className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl dark:bg-blue-700/30"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-10 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-600/30"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">
              Polarizados del Este
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Tres lineas claras de servicio con detalle por rubro.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
              Separamos vehiculos, cardetailing y Home & Deco en paginas individuales para mejorar la
              experiencia y la conversion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/vehiculos"
                className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white outline-none transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
              >
                Ver lineas de negocio
              </Link>
              <Link
                href="#contacto"
                className="rounded-xl border border-slate-400 bg-white px-6 py-3 text-sm font-semibold text-slate-900 outline-none transition hover:border-brand-700 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-200"
              >
                Solicitar asesoramiento
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Como navegar el sitio</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>Home: resumen general de los rubros.</li>
              <li>Una pagina por rubro con enfoque comercial especifico.</li>
              <li>Anclas internas para ir directo a cada opcion.</li>
              <li>Formulario unico para recibir consultas centralizadas.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
