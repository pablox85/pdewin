"use client";

import Link from "next/link";
import { useState } from "react";
import { Collapsible, Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
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
    processTitle: "Cómo trabajamos el polarizado y laminado vehicular",
    processSteps: [
      "Diagnóstico inicial del vehículo y recomendación de la lámina según uso, exposición solar y nivel de privacidad buscado.",
      "Preparación técnica del vidrio y aplicación profesional para lograr terminación limpia, sin burbujas y con excelente adherencia.",
      "Recomendaciones de cuidado post-instalación para extender la vida útil del trabajo y mantener el acabado.",
    ],
    seoParagraphs: [
      "Nuestro servicio de polarizados para vehículos está pensado para quienes buscan confort térmico, reducción de reflejos y una imagen prolija. Trabajamos con autos particulares, utilitarios, flotas y unidades de gran porte, priorizando calidad de instalación y materiales confiables.",
      "Trabajamos en todo el país, siempre con agenda previa. Si la distancia es una preocupación, coordinamos agenda por zona para facilitar tiempos y traslado, de forma que puedas resolver el servicio sin complicaciones.",
    ],
    faq: [
      {
        question: "Qué zonas cubren para polarizados?",
        answer:
          "Trabajamos en todo el país, siempre con agenda previa para optimizar tiempos.",
      },
      {
        question: "Qué beneficio principal tiene el laminado de vidrios?",
        answer:
          "Mejora el confort térmico, reduce el impacto del sol, aumenta privacidad y ayuda a proteger el interior del vehículo.",
      },
      {
        question: "Hacen reparación o cambio de vidrios?",
        answer:
          "No. Nuestro enfoque está en instalación de láminas, polarizados y tratamientos de protección, no en cambio de cristales.",
      },
    ],
  },
  cardetailing: {
    processTitle: "Proceso de car detailing y tratamiento cerámico",
    processSteps: [
      "Evaluamos estado de pintura, interior y objetivos del cliente para definir el plan de trabajo más conveniente.",
      "Realizamos limpieza técnica, descontaminado y correcciones necesarias antes de cualquier sellado.",
      "Aplicamos tratamiento cerámico o acrílico según necesidad, con recomendaciones de mantenimiento para sostener el resultado.",
    ],
    seoParagraphs: [
      "El car detailing profesional combina técnica y criterio para recuperar brillo, higiene y presencia general del vehículo. Nuestro objetivo no es solo que se vea bien un día, sino que conserve su estado por más tiempo con un mantenimiento razonable.",
      "Trabajamos en todo el país, siempre con agenda previa, para minimizar traslados y darte una experiencia ordenada de principio a fin.",
    ],
    faq: [
      {
        question: "Cuándo conviene elegir tratamiento cerámico?",
        answer:
          "Es ideal cuando querés una protección duradera y mejor comportamiento frente a sol, suciedad y agua.",
      },
      {
        question: "Cuánto demora un trabajo de detailing?",
        answer:
          "Depende del estado del vehículo y del paquete elegido. Te damos tiempos estimados al momento del diagnóstico inicial.",
      },
      {
        question: "Trabajan clientes fuera de Ciudad de la Costa?",
        answer: "Sí. Trabajamos en todo el país, siempre con agenda previa.",
      },
    ],
  },
  arquitectura: {
    processTitle: "Cómo resolvemos proyectos Home, Office, Business y Cartelería",
    processSteps: [
      "Relevamos necesidad de control solar, privacidad, estética o comunicación visual según el tipo de espacio.",
      "Definimos materiales y propuesta de instalación para asegurar funcionalidad y coherencia visual.",
      "Ejecutamos la aplicación con terminación profesional y recomendaciones de cuidado.",
    ],
    seoParagraphs: [
      "Para hogares, oficinas y negocios, combinamos láminas de control solar, polarizado arquitectónico, vinilos y cartelería interna y exterior con foco en resultado real: espacios más confortables, mejor imagen y comunicación clara para clientes o equipos.",
      "Trabajamos en todo el país, siempre con agenda previa, para ejecutar proyectos de cartelería interior/exterior y soluciones para vidrios con coordinación logística ordenada.",
    ],
    faq: [
      {
        question: "Pueden asesorarme según el tipo de vidriado?",
        answer:
          "Sí. Evaluamos tu caso y recomendamos la opción más conveniente en control solar, privacidad o estética.",
      },
      {
        question: "Trabajan oficinas y comercios pequeños?",
        answer:
          "Sí, trabajamos tanto hogares como oficinas y comercios, adaptando la propuesta a cada necesidad.",
      },
      {
        question: "También hacen cartelería para negocios?",
        answer:
          "Sí. Realizamos cartelería interna y externa, piezas publicitarias para fachada y puntos de contacto, adaptadas a cada espacio comercial.",
      },
      {
        question: "Cubren Montevideo y Maldonado?",
        answer:
          "Sí. Trabajamos en todo el país, siempre con agenda previa, incluyendo Montevideo, Maldonado, Ciudad de la Costa y Canelones.",
      },
      {
        question:"Realizan trabajos en edificios con seguridad estricta o acceso controlado?",
        answer:
          "Sí. Para proyectos en edificios con seguridad o acceso controlado, coordinamos con anticipación para cumplir con los requisitos y asegurar una instalación sin contratiempos.",
      },
    ],
  },
};

export function AreaDetailPage({ area }: AreaDetailPageProps) {
  const seoContent = areaSeoContent[area.id];
  const [openFaqItems, setOpenFaqItems] = useState<Record<string, boolean>>({});

  const toggleFaqItem = (question: string) => {
    setOpenFaqItems((prev) => ({ ...prev, [question]: !prev[question] }));
  };

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
          description="Trabajamos con metodología clara, buena comunicación y coordinación por zonas."
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
              Trabajamos en todo el país, siempre con agenda previa, para reducir tiempos de traslado y facilitar la contratación.
            </p>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
        <div className="mt-8 grid gap-4">
          {seoContent.faq.map((item) => {
            const isOpen = Boolean(openFaqItems[item.question]);
            const panelId = `faq-panel-${area.id}-${item.question.replace(/\s+/g, "-").toLowerCase()}`;

            return (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900"
              >
                <Collapsible
                  isOpen={isOpen}
                  onToggle={() => toggleFaqItem(item.question)}
                  panelId={panelId}
                  triggerClassName="text-lg font-bold text-slate-900 dark:text-slate-100"
                  title={item.question}
                >
                  <p className="new-content-highlight text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {item.answer}
                  </p>
                </Collapsible>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Servicios relacionados</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/vehiculos">
              Polarizados para vehículos
            </Link>
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/detailing">
              Car detailing y tratamiento cerámico
            </Link>
            <Link className="font-semibold text-brand-700 hover:underline dark:text-blue-200" href="/home-business">
              Láminas para home, office y business
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
