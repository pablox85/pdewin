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

const areaSeoContent: Record<
  BusinessArea["id"],
  {
    processTitle: string;
    processSteps: string[];
    seoParagraphs: string[];
    faq: Array<{ question: string; answer: string }>;
  }
> = {
  vehiculos: {
    processTitle: "Como trabajamos el polarizado y laminado vehicular",
    processSteps: [
      "Diagnostico inicial del vehiculo y recomendacion de la lamina segun uso, exposicion solar y nivel de privacidad buscado.",
      "Preparacion tecnica del vidrio y aplicacion profesional para lograr terminacion limpia, sin burbujas y con excelente adherencia.",
      "Recomendaciones de cuidado post-instalacion para extender la vida util del trabajo y mantener el acabado.",
    ],
    seoParagraphs: [
      "Nuestro servicio de polarizados para vehiculos esta pensado para quienes buscan confort termico, reduccion de reflejos y una imagen prolija. Trabajamos con autos particulares, utilitarios, flotas y unidades de gran porte, priorizando calidad de instalacion y materiales confiables.",
      "Atendemos clientes de Ciudad de la Costa, Canelones, Montevideo y Maldonado. Si la distancia es una preocupacion, coordinamos agenda por zona para facilitar tiempos y traslado, de forma que puedas resolver el servicio sin complicaciones.",
    ],
    faq: [
      {
        question: "Que zonas cubren para polarizados?",
        answer:
          "Trabajamos en Ciudad de la Costa, Canelones, Montevideo y Maldonado, con coordinacion por agenda para optimizar tiempos.",
      },
      {
        question: "Que beneficio principal tiene el laminado de vidrios?",
        answer:
          "Mejora el confort termico, reduce el impacto del sol, aumenta privacidad y ayuda a proteger el interior del vehiculo.",
      },
      {
        question: "Hacen reparacion o cambio de vidrios?",
        answer:
          "No. Nuestro enfoque esta en instalacion de laminas, polarizados y tratamientos de proteccion, no en cambio de cristales.",
      },
    ],
  },
  cardetailing: {
    processTitle: "Proceso de car detailing y tratamiento ceramico",
    processSteps: [
      "Evaluamos estado de pintura, interior y objetivos del cliente para definir el plan de trabajo mas conveniente.",
      "Realizamos limpieza tecnica, descontaminado y correcciones necesarias antes de cualquier sellado.",
      "Aplicamos tratamiento ceramico o acrilico segun necesidad, con recomendaciones de mantenimiento para sostener el resultado.",
    ],
    seoParagraphs: [
      "El car detailing profesional combina tecnica y criterio para recuperar brillo, higiene y presencia general del vehiculo. Nuestro objetivo no es solo que se vea bien un dia, sino que conserve su estado por mas tiempo con un mantenimiento razonable.",
      "Si buscas tratamiento ceramico en Ciudad de la Costa, Canelones, Montevideo o Maldonado, coordinamos trabajos por agenda para minimizar traslados y darte una experiencia ordenada de principio a fin.",
    ],
    faq: [
      {
        question: "Cuando conviene elegir tratamiento ceramico?",
        answer:
          "Es ideal cuando queres una proteccion duradera y mejor comportamiento frente a sol, suciedad y agua.",
      },
      {
        question: "Cuanto demora un trabajo de detailing?",
        answer:
          "Depende del estado del vehiculo y del paquete elegido. Te damos tiempos estimados al momento del diagnostico inicial.",
      },
      {
        question: "Trabajan clientes fuera de Ciudad de la Costa?",
        answer:
          "Si. Coordinamos servicios para Canelones, Montevideo y Maldonado con agenda por zona.",
      },
    ],
  },
  arquitectura: {
    processTitle: "Como resolvemos proyectos Home, Office & Business",
    processSteps: [
      "Relevamos necesidad de control solar, privacidad, estetica o comunicacion visual segun el tipo de espacio.",
      "Definimos materiales y propuesta de instalacion para asegurar funcionalidad y coherencia visual.",
      "Ejecutamos la aplicacion con terminacion profesional y recomendaciones de cuidado.",
    ],
    seoParagraphs: [
      "Para hogares, oficinas y negocios, combinamos laminas de control solar, vinilos decorativos y carteleria con foco en resultado real: espacios mas confortables, mejor imagen y comunicacion clara para clientes o equipos.",
      "Atendemos proyectos en Ciudad de la Costa, Canelones, Montevideo y Maldonado, coordinando por cercania para reducir friccion logistica y tiempos de ejecucion.",
    ],
    faq: [
      {
        question: "Pueden asesorarme segun el tipo de vidriado?",
        answer:
          "Si. Evaluamos tu caso y recomendamos la opcion mas conveniente en control solar, privacidad o estetica.",
      },
      {
        question: "Trabajan oficinas y comercios pequenos?",
        answer:
          "Si, trabajamos tanto hogares como oficinas y comercios, adaptando la propuesta a cada necesidad.",
      },
      {
        question: "Cubren Montevideo y Maldonado?",
        answer:
          "Si, coordinamos trabajos en Montevideo y Maldonado ademas de Ciudad de la Costa y Canelones.",
      },
    ],
  },
};

export function AreaDetailPage({ area }: AreaDetailPageProps) {
  const seoContent = areaSeoContent[area.id];

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
            <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300 whitespace-pre-line">{area.heroDescription}</p>
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
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Servicios</h2>
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
          description="Detalle de cada servicio y enfoque de trabajo."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {area.details.map((detail, index) => (
            <Reveal key={detail.id} delay={Math.min(index * 0.06, 0.2)}>
              <article
                id={detail.id}
                className={`service-anchor lift-card ${areaAnchorClasses[area.id]} scroll-mt-28 rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900`}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{detail.title}</h3>
                {Array.isArray(detail.description) ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {detail.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{detail.description}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-100 dark:bg-slate-950">
        <SectionTitle
          eyebrow="Proceso y cobertura"
          title={seoContent.processTitle}
          description="Trabajamos con metodologia clara, buena comunicacion y coordinacion por zonas."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Pasos de trabajo</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {seoContent.processSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {seoContent.seoParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="new-content-highlight mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Zona de cobertura</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>Ciudad de la Costa</li>
              <li>Canelones</li>
              <li>Montevideo</li>
              <li>Maldonado</li>
            </ul>
            <p className="new-content-highlight mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Coordinamos agenda por zona para reducir tiempos de traslado y facilitar la contratacion.
            </p>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
        <div className="mt-8 grid gap-4">
          {seoContent.faq.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.question}</h3>
              <p className="new-content-highlight mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Servicios relacionados</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/vehiculos">
              Polarizados para vehiculos
            </Link>
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/detailing">
              Car detailing y tratamiento ceramico
            </Link>
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/home-business">
              Laminas para home, office y business
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
