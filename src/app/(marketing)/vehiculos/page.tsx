import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("vehiculos");

export const metadata: Metadata = buildMetadata({
  title: "Polarizados para vehiculos en Ciudad de la Costa, Montevideo y Canelones",
  description:
    "Instalacion de laminas y polarizados para autos, utilitarios y flotas. Atendemos Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/vehiculos" },
  openGraph: {
    url: `${siteConfig.domain}/vehiculos`,
    title: `Polarizados para vehiculos | ${siteConfig.name}`,
    description:
      "Laminado de vidrios vehiculares con instalacion profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
  twitter: {
    title: `Polarizados para vehiculos | ${siteConfig.name}`,
    description:
      "Laminado de vidrios vehiculares con instalacion profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
});

export default function VehiculosPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Que zonas cubren para polarizados?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
        },
      },
      {
        "@type": "Question",
        name: "Hacen reparacion o cambio de vidrios?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Nos especializamos en instalacion de laminas y polarizados para vehiculos.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <AreaDetailPage area={area} />
      </main>
      <Footer />
    </>
  );
}
