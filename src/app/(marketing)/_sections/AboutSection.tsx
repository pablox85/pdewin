import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";

// Seccion institucional para reforzar propuesta y diferenciadores.
export function AboutSection() {
  return (
    <SectionWrapper className="bg-slate-100 dark:bg-slate-950">
      <SectionTitle
        eyebrow="Sobre la empresa"
        title="Equipo multidisciplinario, foco en ejecucion"
        description="Trabajamos con procesos claros, comunicacion constante y una metodologia que prioriza resultados."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Reveal>
          <article className="rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Vision 360</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Integramos operaciones, diseno, tecnica y marketing para resolver de forma completa.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Procesos medibles</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Definimos metas, medimos avances y ajustamos estrategia segun datos.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.16}>
          <article className="rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Escalabilidad</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Estructura modular para crecer en servicios y canales sin perder calidad.
            </p>
          </article>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
