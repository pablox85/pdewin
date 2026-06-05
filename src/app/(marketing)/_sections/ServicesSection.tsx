import { DeferredPhotoCarousel, Reveal, RouteButton, SectionTitle, SectionWrapper } from "@/components/shared";
import { BUSINESS_AREAS } from "@/features/services/data/businessAreas";

const areaStyles: Record<string, string> = {
  vehiculos: "border-blue-700/60 bg-blue-50 text-blue-900 dark:border-blue-300/70 dark:bg-blue-950/40 dark:text-blue-100",
  cardetailing:
    "border-cyan-700/60 bg-cyan-50 text-cyan-900 dark:border-cyan-300/70 dark:bg-cyan-950/40 dark:text-cyan-100",
  arquitectura:
    "border-amber-700/60 bg-amber-50 text-amber-900 dark:border-amber-300/70 dark:bg-amber-950/40 dark:text-amber-100",
};

const galleryAnchorByAreaId: Record<string, string> = {
  vehiculos: "polarizados",
  arquitectura: "home-office-and-business",
  cardetailing: "detailing",
};

type AreaCarouselImage = {
  src: string;
  alt: string;
  positionMobile?: string;
  positionDesktop?: string;
};

// Control global del autoplay del carrusel: usar 0 para dejarlo fijo.
const AREA_CAROUSEL_AUTOPLAY_MS = 1500;

const areaCarouselImages: Record<string, AreaCarouselImage[]> = {
  vehiculos: [
    { src: "/images/polarizado/pola002.jpeg", alt: "Instalación en Peugeot", positionMobile: "50% 52%", positionDesktop: "42% 45%" },
    { src: "/images/polarizado/pola022.jpeg", alt: "Láminas para vehículos", positionMobile: "50% 50%", positionDesktop: "25% 46%" },
    { src: "/images/polarizado/pola014.jpeg", alt: "Instalación Mercedes", positionMobile: "50% 50%", positionDesktop: "50% 42%" },
  ],
  cardetailing: [
    { src: "/images/detailing/det001.jpeg", alt: "Proceso de polishing", positionMobile: "50% 52%", positionDesktop: "42% 45%" },
    { src: "/images/detailing/det003.jpeg", alt: "Proceso de polishing", positionMobile: "38% 35%", positionDesktop: "32% 33%" },
    { src: "/images/detailing/det011.jpeg", alt: "Cobertura nanocerámica", positionMobile: "62% 50%", positionDesktop: "68% 48%" },
    { src: "/images/detailing/det012.jpeg", alt: "Cobertura nanocerámica", positionMobile: "45% 58%", positionDesktop: "40% 52%" },
  ],
  arquitectura: [
    { src: "/images/office/office001.jpeg", alt: "Home & Office", positionMobile: "56% 60%", positionDesktop: "60% 0%" },
    { src: "/images/office/office002.jpeg", alt: "Cartelería", positionMobile: "34% 50%", positionDesktop: "30% 46%" },
    { src: "/images/office/sorri004.jpeg", alt: "Intervención en oficina", positionMobile: "52% 60%", positionDesktop: "58% 40%" },
  ],
};

// Home: presentación de unidades con acceso a páginas dedicadas.
export function ServicesSection() {
  return (
    <SectionWrapper className="bg-slate-50 dark:bg-slate-900/40">
      <div id="soluciones">
        <SectionTitle
          eyebrow="Unidades de negocio"
          title="Elegí la solución ideal para tu objetivo"
          description="Cada unidad cuenta con una página dedicada y detalle por servicio para ayudarte a decidir rápido."
        />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BUSINESS_AREAS.map((area, index) => (
          <Reveal key={area.id} delay={Math.min(index * 0.06, 0.24)}>
            <article className="lift-card rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900">
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

              <DeferredPhotoCarousel
                className="mt-4"
                images={areaCarouselImages[area.id] ?? []}
                autoPlayMs={AREA_CAROUSEL_AUTOPLAY_MS}
                startDelayMs={index * 350}
              />

              <RouteButton
                href={area.href}
                className="cta-pop mt-6 inline-flex rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-700 hover:text-brand-700 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
              >
                Ver servicios de {area.label.toLowerCase()}
              </RouteButton>
              <RouteButton
                href={`/galeria#${galleryAnchorByAreaId[area.id] ?? ""}`}
                className="mt-3 inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-700 hover:text-brand-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-blue-300 dark:hover:text-blue-200"
              >
                Ver fotos en galería
              </RouteButton>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
