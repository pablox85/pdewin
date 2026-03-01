import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Sitemap basico para indexacion inicial.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
