import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { getPublicImages } from "@/lib/gallery/getPublicImages";
import { buildMetadata } from "@/lib/seo/metadata";
import { GalleryStackWithModal } from "./_components/GalleryStackWithModal";

export const metadata: Metadata = buildMetadata({
  title: "Galeria de trabajos de polarizados y detailing en Uruguay",
  description:
    "Fotos reales de trabajos en polarizados, laminas, home & office y car detailing en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    url: `${siteConfig.domain}/galeria`,
    title: `Galeria | ${siteConfig.name}`,
    description:
      "Recorrido visual de trabajos reales de polarizados, detailing y laminas para hogar y comercios.",
  },
  twitter: {
    title: `Galeria | ${siteConfig.name}`,
    description:
      "Recorrido visual de trabajos reales de polarizados, detailing y laminas para hogar y comercios.",
  },
});

export default async function GaleriaPage() {
  // Ajustes manuales de layout para galeria.
  const GALLERY_CAROUSEL_HEIGHT_CLASS = "h-[38vh] min-h-[260px] sm:min-h-[300px] lg:min-h-[320px]";
  const GALLERY_AUTOPLAY_MS = 0;
  const VISIBLE_CATEGORIES = [
    "Carteleria",
    "Polarizados",
    "Maquinaria",
    "Home, Office & Business",
    "Detailing",
   ];

  const images = await getPublicImages("images");
  const categoryByPrefix: Record<string, string> = {
    car: "Carteleria",
    pola: "Polarizados",
    pesados: "Maquinaria",
    sorri: "Home, Office & Business",
    office: "Home, Office & Business",
    home: "Home, Office & Business",
    det: "Detailing",
  };

  const categoryOrder = [
    "Carteleria",
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

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-14 pt-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <section className="w-full">
          <header className="mx-auto mb-8 w-full max-w-[1200px] px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-200">Galeria</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Todas las fotos</h1>
            <p className="new-content-highlight mt-4 max-w-3xl text-base text-slate-700 dark:text-slate-300 sm:text-lg">
              Esta galeria muestra trabajos reales de instalacion de laminas para vehiculos, tratamiento
              ceramico, soluciones para home & office y proyectos de carteleria. Compartimos resultados
              para que puedas evaluar terminacion, estilo y calidad antes de solicitar presupuesto.
            </p>
            <p className="new-content-highlight mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 sm:text-lg">
              Atendemos clientes en Ciudad de la Costa, Canelones, Montevideo y Maldonado. Si la distancia
              es un factor importante para vos, coordinamos agenda por zona para facilitar el servicio.
              Total de imagenes publicadas: {images.length}.
            </p>
          </header>

          {images.length === 0 || visibleGroups.length === 0 ? (
            <div className="mx-auto w-full max-w-[1200px] rounded-2xl border border-slate-300 bg-white p-8 text-slate-700 shadow-card dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No se encontraron fotos para las categorias visibles.
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
