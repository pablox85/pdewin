import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";

// Seccion institucional para reforzar propuesta y diferenciadores.
export function AboutSection() {
  return (
    <SectionWrapper className="bg-slate-100 dark:bg-slate-950">
      <SectionTitle
        eyebrow="Sobre nosotros"
        title="Estrategia, ejecucion y resultados"
        description="Combinamos criterio tecnico y comunicacion efectiva para convertir cada proyecto en una experiencia de alto valor."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Reveal>
          <article className="lift-card rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Enfoque integral</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Integramos tecnica, estetica y vision comercial para crear soluciones completas.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="lift-card rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Metodologia orientada a conversion</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Definimos objetivos, medimos impacto y optimizamos cada etapa para potenciar resultados.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.16}>
          <article className="lift-card rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold">Comunicacion clara</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              Mantenemos una comunicacion simple y directa para que sepas que se hace, cuando y por que.
            </p>
          </article>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
