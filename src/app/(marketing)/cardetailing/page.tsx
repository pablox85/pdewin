import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("cardetailing");

export const metadata: Metadata = buildMetadata({
  title: "Car Detailing",
  description: area.heroDescription,
  alternates: { canonical: "/cardetailing" },
  openGraph: {
    url: `${siteConfig.domain}/cardetailing`,
    title: `Car Detailing | ${siteConfig.name}`,
    description: area.heroDescription,
  },
  twitter: {
    title: `Car Detailing | ${siteConfig.name}`,
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
