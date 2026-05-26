import type { Metadata } from "next";
import { Footer, Navbar, TrackedLinkButton } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { getPublicImages } from "@/lib/gallery/getPublicImages";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { CoverageCollapsible } from "./_components/CoverageCollapsible";
import { GalleryStackWithModal } from "./_components/GalleryStackWithModal";

const galleryTitle = "Galería de trabajos de polarizados y detailing en Uruguay";
const galleryDescription =
  "Fotos reales de trabajos en polarizados, láminas, home & office y car detailing en Ciudad de la Costa, Canelones, Montevideo y Maldonado.";
const gallerySocialImage = "/preview-home.png";

export const metadata: Metadata = buildMetadata({
  title: galleryTitle,
  description: galleryDescription,
  alternates: { canonical: "/galeria" },
  openGraph: {
    url: `${siteConfig.domain}/galeria`,
    title: `Galería | ${siteConfig.name}`,
    description:
      "Recorrido visual de trabajos reales de polarizados, detailing y láminas para hogar y comercios.",
    images: [
      {
        url: gallerySocialImage,
        width: 1200,
        height: 630,
        alt: "Galería de trabajos de Polarizados del Este",
      },
    ],
  },
  twitter: {
    title: `Galería | ${siteConfig.name}`,
    description:
      "Recorrido visual de trabajos reales de polarizados, detailing y láminas para hogar y comercios.",
    images: [gallerySocialImage],
  },
});

export default async function GaleriaPage() {
  // Ajustes manuales de layout para galeria.
  const GALLERY_CAROUSEL_HEIGHT_CLASS = "h-[38vh] min-h-[260px] sm:min-h-[300px] lg:min-h-[320px]";
  const GALLERY_AUTOPLAY_MS = 0;
  const VISIBLE_CATEGORIES = [
    "Cartelería",
    "Polarizados",
    "Maquinaria",
    "Home, Office & Business",
    "Detailing",
   ];

  const images = await getPublicImages("images");
  const categoryByPrefix: Record<string, string> = {
    car: "Cartelería",
    pola: "Polarizados",
    pesados: "Maquinaria",
    sorri: "Home, Office & Business",
    office: "Home, Office & Business",
    home: "Home, Office & Business",
    det: "Detailing",
  };

  const categoryOrder = [
    "Cartelería",
    "Polarizados",
    "Maquinaria",
    "Home, Office & Business",
    "Detailing",
    "Otros",
  ];

  const groupedImages = images.reduce<Record<string, typeof images>>((acc, image) => {
    const fileName = decodeURIComponent(image.src.split("/").pop() ?? "").toLowerCase();
    const baseName = fileName.replace(/\.[^.]+$/, "");

    const matchedPrefix = Object.keys(categoryByPrefix).find((prefix) => baseName.startsWith(prefix));
    const category = matchedPrefix ? categoryByPrefix[matchedPrefix] : "Otros";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(image);
    return acc;
  }, {});

  const groupedEntries = Object.entries(groupedImages).sort(([a], [b]) => {
    const orderA = categoryOrder.indexOf(a);
    const orderB = categoryOrder.indexOf(b);
    const safeOrderA = orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA;
    const safeOrderB = orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB;

    if (safeOrderA !== safeOrderB) {
      return safeOrderA - safeOrderB;
    }

    return a.localeCompare(b, "es");
  }).map(([title, imagesInCategory]) => ({ title, images: imagesInCategory }));
  const visibleGroups = groupedEntries.filter((group) => VISIBLE_CATEGORIES.includes(group.title));
  const galleryUrl = `${siteConfig.domain}/galeria`;
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: galleryTitle,
    description: galleryDescription,
    url: galleryUrl,
    image: visibleGroups.flatMap((group) =>
      group.images.map((image) => ({
        "@type": "ImageObject",
        contentUrl: `${siteConfig.domain}${image.src}`,
        name: image.alt,
        caption: `${image.alt} - ${group.title}`,
      })),
    ),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Galería",
        item: galleryUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-14 pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <section className="w-full">
          <header className="mx-auto mb-8 w-full max-w-[1200px] px-5">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <TrackedLinkButton
                    href="/"
                    eventName="gallery_breadcrumb_click"
                    eventParams={{ destination: "home" }}
                    className="font-semibold text-brand-700 hover:underline dark:text-blue-200"
                  >
                    Inicio
                  </TrackedLinkButton>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Galería</li>
              </ol>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">Galería</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Todas las fotos</h1>
            <p className="new-content-highlight mt-4 max-w-3xl text-base text-slate-700 dark:text-slate-300 sm:text-lg">
              Trabajos reales de instalación de láminas para vehículos, tratamiento
              cerámico, soluciones para home & office y proyectos de cartelería. Compartimos resultados
              para que puedas evaluar terminación, estilo y calidad antes de solicitar presupuesto.
            </p>
            <CoverageCollapsible />
            <div className="mt-5 flex flex-wrap gap-3">
              <TrackedLinkButton
                href="/#contacto"
                eventName="gallery_cta_click"
                eventParams={{ destination: "contact_form", source: "gallery_header" }}
                className="cta-pop rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white outline-none transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
              >
                Solicitar presupuesto
              </TrackedLinkButton>
              <TrackedLinkButton
                href={buildWhatsAppHref("Hola, vi la galería y quiero consultar por un trabajo.")}
                eventName="gallery_cta_click"
                eventParams={{ destination: "whatsapp", source: "gallery_header" }}
                className="cta-pop rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition hover:border-brand-700 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-200"
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp
              </TrackedLinkButton>
            </div>
          </header>

          {images.length === 0 || visibleGroups.length === 0 ? (
            <div className="mx-auto w-full max-w-[1200px] rounded-2xl border border-slate-300 bg-white p-8 text-slate-700 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No se encontraron fotos para las categorías visibles.
            </div>
          ) : (
            <GalleryStackWithModal
              groups={visibleGroups}
              carouselHeightClassName={GALLERY_CAROUSEL_HEIGHT_CLASS}
              autoPlayMs={GALLERY_AUTOPLAY_MS}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
