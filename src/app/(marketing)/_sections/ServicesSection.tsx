import Link from "next/link";
import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
import { BUSINESS_AREAS } from "@/features/services/data/businessAreas";

const areaStyles: Record<string, string> = {
  vehiculos: "border-blue-700/60 bg-blue-50 text-blue-900 dark:border-blue-300/70 dark:bg-blue-950/40 dark:text-blue-100",
  cardetailing:
    "border-cyan-700/60 bg-cyan-50 text-cyan-900 dark:border-cyan-300/70 dark:bg-cyan-950/40 dark:text-cyan-100",
  arquitectura:
    "border-amber-700/60 bg-amber-50 text-amber-900 dark:border-amber-300/70 dark:bg-amber-950/40 dark:text-amber-100",
};

// Home: resume cada unidad y deriva a pagina individual con anclas internas.
export function ServicesSection() {
  return (
    <SectionWrapper className="bg-slate-50 dark:bg-slate-900/40">
      <SectionTitle
        eyebrow="Lineas de negocio"
        title="Elegi un rubro y entra al detalle"
        description="Cada opcion tiene su propia pagina con informacion segmentada y navegacion por anclas."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BUSINESS_AREAS.map((area, index) => (
          <Reveal key={area.id} delay={Math.min(index * 0.06, 0.24)}>
            <article className="rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900">
              <p
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                  areaStyles[area.id] ?? "border-slate-400 bg-slate-100 text-slate-800"
                }`}
              >
                {area.label}
              </p>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">{area.heroTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{area.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {area.details.map((detail) => (
                  <li key={detail.id}>• {detail.title}</li>
                ))}
              </ul>

              <Link
                href={area.href}
                className="mt-6 inline-flex rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-700 hover:text-brand-700 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
              >
                Ver pagina de {area.label.toLowerCase()}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
