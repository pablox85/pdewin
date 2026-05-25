import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("vehiculos");
const serviceAreaServed = ["Ciudad de la Costa", "Canelones", "Montevideo", "Maldonado"];

export const metadata: Metadata = buildMetadata({
  title: "Polarizados para vehículos en Ciudad de la Costa", // La marca se agrega desde el template global en buildMetadata().
  description:
    "Instalación de láminas y polarizados para autos, utilitarios y flotas. Atendemos Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/vehiculos" },
  openGraph: {
    url: `${siteConfig.domain}/vehiculos`,
    title: `Polarizados para vehículos | ${siteConfig.name}`,
    description:
      "Laminado de vidrios vehiculares con instalación profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
  twitter: {
    title: `Polarizados para vehículos | ${siteConfig.name}`,
    description:
      "Laminado de vidrios vehiculares con instalación profesional en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  },
});

export default function VehiculosPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polarizados para vehículos",
    serviceType: "Polarizados automotrices",
    description:
      "Instalación de láminas y polarizados para autos, utilitarios y flotas en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
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
    url: `${siteConfig.domain}/vehiculos`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qué zonas cubren para polarizados?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
        },
      },
      {
        "@type": "Question",
        name: "Hacen reparación o cambio de vidrios?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Nos especializamos en instalación de láminas y polarizados para vehículos.",
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
