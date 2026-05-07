import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Sitemap basico para indexacion de home y paginas por rubro.
function resolveSitemapLastModified(): Date {
  const deployDateEnv = process.env.VERCEL_GIT_COMMIT_DATE ?? process.env.BUILD_DATE;

  if (deployDateEnv) {
    const parsedDate = new Date(deployDateEnv);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  // Fallback al momento de build cuando no hay variable de deploy disponible.
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/vehiculos", "/detailing", "/home-business", "/galeria"];
  const lastModified = resolveSitemapLastModified();

  return routes.map((route, index) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
