import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Robots basico para permitir rastreo y enlazar sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
sitemap:
https://pdewin.vercel.app/sitemap.xml
    },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
