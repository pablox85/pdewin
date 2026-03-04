import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("cardetailing");

export const metadata: Metadata = buildMetadata({
  title: "Cardetailing",
  description: area.heroDescription,
  alternates: { canonical: "/cardetailing" },
  openGraph: {
    url: `${siteConfig.domain}/cardetailing`,
    title: `Cardetailing | ${siteConfig.name}`,
    description: area.heroDescription,
  },
  twitter: {
    title: `Cardetailing | ${siteConfig.name}`,
    description: area.heroDescription,
  },
});

export default function CarDetailingPage() {
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
