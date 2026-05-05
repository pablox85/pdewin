import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("arquitectura");

export const metadata: Metadata = buildMetadata({
  title: "Laminas y carteleria para Home, Office y Business en todo el pais",
  description:
    "Laminas de control solar, polarizado arquitectonico, vinilos y carteleria para Home, Office y Business en todo el pais, siempre con agenda previa.",
  alternates: { canonical: "/home-business" },
  openGraph: {
    url: `${siteConfig.domain}/home-business`,
    title: `Laminas para home, office y business | ${siteConfig.name}`,
    description:
      "Carteleria, control solar y comunicacion visual para hogares, oficinas y comercios en todo el pais, siempre con agenda previa.",
  },
  twitter: {
    title: `Laminas para home, office y business | ${siteConfig.name}`,
    description:
      "Carteleria y comunicacion visual para Home, Office y Business en todo el pais, siempre con agenda previa.",
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
