import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("cardetailing");
const serviceAreaServed = ["Ciudad de la Costa", "Canelones", "Montevideo", "Maldonado"];

export const metadata: Metadata = buildMetadata({
  title: "Car detailing en Ciudad de la Costa", // La marca se agrega desde el template global en buildMetadata().
  description:
    "Servicio de car detailing con limpieza técnica, corrección visual y tratamiento cerámico. Cobertura en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/detailing" },
  openGraph: {
    url: `${siteConfig.domain}/detailing`,
    title: `Car detailing y tratamiento cerámico | ${siteConfig.name}`,
    description:
      "Protección y estética vehicular con proceso profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
  twitter: {
    title: `Car detailing y tratamiento cerámico | ${siteConfig.name}`,
    description:
      "Protección y estética vehicular con proceso profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
});

export default function DetailingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Car detailing y tratamiento cerámico",
    serviceType: "Car detailing",
    description:
      "Servicio de car detailing con limpieza técnica, corrección visual, protección de pintura y tratamiento cerámico.",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.domain,
      telephone: siteConfig.contactPhone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ciudad de la Costa",
        addressRegion: "Canelones",
        addressCountry: "UY",
      },
    },
    areaServed: serviceAreaServed.map((name) => ({ "@type": "Place", name })),
    url: `${siteConfig.domain}/detailing`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuándo conviene hacer tratamiento cerámico?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cuando querés una protección duradera de pintura y facilitar el mantenimiento del vehículo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajan Montevideo y Maldonado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Coordinamos agenda para Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <AreaDetailPage area={area} />
      </main>
      <Footer />
    </>
  );
}
