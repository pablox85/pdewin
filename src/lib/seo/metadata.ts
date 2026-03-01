import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Helper para mantener metadata SEO consistente por pagina.
export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.domain,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    ...overrides,
  };
}
