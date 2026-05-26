import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Robots básico para permitir rastreo y enlazar sitemap.
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: isPreview
      ? {
          userAgent: "*",
          disallow: "/",
        }
      : {
          userAgent: "*",
          allow: "/",
        },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
