import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Sitemap basico para indexacion de home y paginas por rubro.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/vehiculos", "/cardetailing", "/arquitectura"];

  return routes.map((route, index) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
