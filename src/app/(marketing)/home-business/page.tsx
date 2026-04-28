import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("arquitectura");

export const metadata: Metadata = buildMetadata({
  title: "Laminas para hogar, oficina y negocio en Canelones y Montevideo",
  description:
    "Laminas de control solar, vinilos y carteleria para home, office y business. Cobertura en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: { canonical: "/home-business" },
  openGraph: {
    url: `${siteConfig.domain}/home-business`,
    title: `Laminas para home, office y business | ${siteConfig.name}`,
    description:
      "Soluciones para control solar, privacidad y comunicacion visual en hogares y comercios.",
  },
  twitter: {
    title: `Laminas para home, office y business | ${siteConfig.name}`,
    description:
      "Soluciones para control solar, privacidad y comunicacion visual en hogares y comercios.",
  },
});

export default function HomeBusinessPage() {
  return (
    <>
      <Navbar />
      <main>
        <AreaDetailPage area={area} />
      </main>
      <Footer />
    </>
  );
}
