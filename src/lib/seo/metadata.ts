import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Helper para mantener metadata SEO consistente por página.
export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const isVercelPreview = process.env.VERCEL_ENV === "preview";
  const defaultSocialImage = "/preview-home.png";

  const baseMetadata: Metadata = {
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
      images: [
        {
          url: defaultSocialImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Soluciones profesionales`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [defaultSocialImage],
    },
    robots: isVercelPreview
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };

  return {
    ...baseMetadata,
    ...overrides,
    alternates: {
      ...baseMetadata.alternates,
      ...overrides?.alternates,
    }, // Mantiene canonical base y permite canonical específico por página.
    openGraph: {
      ...baseMetadata.openGraph,
      ...overrides?.openGraph,
    }, // Conserva type, locale, siteName e imagen global al sumar datos por página.
    twitter: {
      ...baseMetadata.twitter,
      ...overrides?.twitter,
    }, // Conserva card e imagen global salvo que la página los reemplace.
  };
}
