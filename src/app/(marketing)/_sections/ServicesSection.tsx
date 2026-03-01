import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
import { serviceItems } from "@/features/services/data/services";

const areaStyles: Record<string, string> = {
  Vehiculos: "border-blue-700/60 bg-blue-50 text-blue-900 dark:border-blue-300/70 dark:bg-blue-950/40 dark:text-blue-100",
  Cardetailing:
    "border-cyan-700/60 bg-cyan-50 text-cyan-900 dark:border-cyan-300/70 dark:bg-cyan-950/40 dark:text-cyan-100",
  Arquitectura:
    "border-amber-700/60 bg-amber-50 text-amber-900 dark:border-amber-300/70 dark:bg-amber-950/40 dark:text-amber-100",
  Publicidad:
    "border-fuchsia-700/60 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-300/70 dark:bg-fuchsia-950/40 dark:text-fuchsia-100",
};

const areaCodes: Record<string, string> = {
  Vehiculos: "V",
  Cardetailing: "C",
  Arquitectura: "A",
  Publicidad: "P",
};

// Seccion de servicios con IDs para anclaje desde los dropdowns del navbar.
// Nota de accesibilidad: cada etiqueta incluye codigo y texto para no depender solo del color.
export function ServicesSection() {
  return (
    <SectionWrapper className="bg-slate-50 dark:bg-slate-900/40">
      <SectionTitle
        eyebrow="Unidades de negocio"
        title="Servicios especializados por area"
        description="Cada bloque esta modularizado para que puedas escalar la landing sin rehacer estructura."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {serviceItems.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.04, 0.28)}>
            <article
              id={item.id}
              className="scroll-mt-28 rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900"
            >
              <p
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${
                  areaStyles[item.area] ?? "border-slate-400 bg-slate-100 text-slate-800 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-current text-[10px] font-extrabold">
                  {areaCodes[item.area] ?? "S"}
                </span>
                <span>{item.area}</span>
              </p>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
