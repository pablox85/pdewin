import type { Metadata } from "next";
import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { requireBusinessAreaById } from "@/features/services/data/businessAreas";
import { buildMetadata } from "@/lib/seo/metadata";
import { AreaDetailPage } from "../_components/AreaDetailPage";

const area = requireBusinessAreaById("arquitectura");

export const metadata: Metadata = buildMetadata({
  title: "Home & Deco",
  description: area.heroDescription,
  alternates: { canonical: "/arquitectura" },
  openGraph: {
    url: `${siteConfig.domain}/arquitectura`,
    title: `Home & Deco | ${siteConfig.name}`,
    description: area.heroDescription,
  },
  twitter: {
    title: `Home & Deco | ${siteConfig.name}`,
    description: area.heroDescription,
  },
});

export default function ArquitecturaPage() {
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
