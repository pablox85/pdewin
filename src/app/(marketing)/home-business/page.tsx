import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("arquitectura");
const serviceAreaServed = ["Ciudad de la Costa", "Canelones", "Montevideo", "Maldonado"];

export const metadata: Metadata = buildMetadata({
  title: "Láminas para home, office y business en Canelones", // La marca se agrega desde el template global en buildMetadata().
  description:
    "Láminas de control solar, polarizado arquitectónico, vinilos y cartelería para Home, Office y Business en todo el país, siempre con agenda previa.",
  alternates: { canonical: "/home-business" },
  openGraph: {
    url: `${siteConfig.domain}/home-business`,
    title: `Láminas para home, office y business | ${siteConfig.name}`,
    description:
      "Cartelería, control solar y comunicación visual para hogares, oficinas y comercios en todo el país, siempre con agenda previa.",
  },
  twitter: {
    title: `Láminas para home, office y business | ${siteConfig.name}`,
    description:
      "Cartelería y comunicación visual para Home, Office y Business en todo el país, siempre con agenda previa.",
  },
});

export default function HomeBusinessPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Láminas para home, office y business",
    serviceType: "Láminas para vidrios, cartelería y vinilos",
    description:
      "Láminas de control solar, privacidad, seguridad, vinilos y cartelería para hogares, oficinas y espacios comerciales.",
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
    url: `${siteConfig.domain}/home-business`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Navbar />
      <main>
        <AreaDetailPage area={area} />
      </main>
      <Footer />
    </>
  );
}
