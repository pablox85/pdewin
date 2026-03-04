import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("vehiculos");

export const metadata: Metadata = buildMetadata({
  title: "Vehiculos",
  description: area.heroDescription,
  alternates: { canonical: "/vehiculos" },
  openGraph: {
    url: `${siteConfig.domain}/vehiculos`,
    title: `Vehiculos | ${siteConfig.name}`,
    description: area.heroDescription,
  },
  twitter: {
    title: `Vehiculos | ${siteConfig.name}`,
    description: area.heroDescription,
  },
});

export default function VehiculosPage() {
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
