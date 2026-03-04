import Link from "next/link";
import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
import type { BusinessArea } from "@/features/services/data/businessAreas";

const areaAnchorClasses: Record<string, string> = {
  vehiculos: "service-anchor--vehiculos",
  cardetailing: "service-anchor--cardetailing",
  arquitectura: "service-anchor--arquitectura",
};

interface AreaDetailPageProps {
  area: BusinessArea;
}

export function AreaDetailPage({ area }: AreaDetailPageProps) {
  return (
    <>
      <SectionWrapper className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100 pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div
          className="ambient-orb absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl dark:bg-blue-700/30"
          aria-hidden="true"
        />
        <div
          className="ambient-orb ambient-orb--slow absolute right-0 top-10 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-600/30"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">
              {area.label}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {area.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300">{area.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`#${area.details[0]?.id}`}
                className="cta-pop rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white outline-none transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
              >
                Ver servicios
              </Link>
              <Link
                href="/#contacto"
                className="cta-pop rounded-xl border border-slate-400 bg-white px-6 py-3 text-sm font-semibold text-slate-900 outline-none transition hover:border-brand-700 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-200"
              >
                Solicitar asesoramiento
              </Link>
            </div>
          </div>

          <aside className="lift-card rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Accesos rapidos</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {area.details.map((detail) => (
                <li key={detail.id}>
                  <a className="font-semibold hover:text-brand-700 dark:hover:text-blue-200" href={`#${detail.id}`}>
                    {detail.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle
          eyebrow="Detalle del servicio"
          title={`Servicios de ${area.label.toLowerCase()}`}
          description="Cada bloque tiene su ancla para compartir enlaces directos con clientes."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {area.details.map((detail, index) => (
            <Reveal key={detail.id} delay={Math.min(index * 0.06, 0.2)}>
              <article
                id={detail.id}
                className={`service-anchor lift-card ${areaAnchorClasses[area.id]} scroll-mt-28 rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900`}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{detail.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{detail.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
