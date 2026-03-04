import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
import { testimonials } from "@/features/testimonials/data/testimonials";

// Bloque social proof para mejorar confianza y conversion.
export function TestimonialsSection() {
  return (
    <SectionWrapper>
      <SectionTitle
        eyebrow="Casos reales"
        title="Clientes que confian en nuestro trabajo"
        description="Historias de marcas y proyectos que eligieron calidad, orden y resultados medibles."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.08, 0.24)}>
            <article className="lift-card rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">"{item.quote}"</p>
              <footer className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.role}</p>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
