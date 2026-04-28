import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("cardetailing");

export const metadata: Metadata = buildMetadata({
  title: "Car detailing y tratamiento ceramico en Ciudad de la Costa y Montevideo",
  description:
    "Servicio de car detailing con limpieza tecnica, correccion visual y tratamiento ceramico. Cobertura en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/detailing" },
  openGraph: {
    url: `${siteConfig.domain}/detailing`,
    title: `Car detailing y tratamiento ceramico | ${siteConfig.name}`,
    description:
      "Proteccion y estetica vehicular con proceso profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
  twitter: {
    title: `Car detailing y tratamiento ceramico | ${siteConfig.name}`,
    description:
      "Proteccion y estetica vehicular con proceso profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
});

export default function DetailingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cuando conviene hacer tratamiento ceramico?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cuando queres una proteccion duradera de pintura y facilitar el mantenimiento del vehiculo.",
        },
      },
      {
        "@type": "Question",
        name: "Trabajan Montevideo y Maldonado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Coordinamos agenda para Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
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
