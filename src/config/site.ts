function resolveSiteUrl() {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envSiteUrl) {
    return envSiteUrl.replace(/\/$/, "");
  }

  return "https://polarizadosdeleste.com";
}

// Config centralizada para datos de marca, SEO y contacto.
export const siteConfig = {
  name: "Polarizados del Este",
  description: "Soluciones profesionales en vehículos, car detailing, home, office & business.",
  domain: resolveSiteUrl(),
  locale: "es_UY",
  contactEmail: "polarizadosdeleste@gmail.com",
  contactPhone: "+598 92 906 102",
  address: "Ciudad de la Costa, Uruguay",
  footer: {
    line1: "Polarizados del Este | Ciudad de la Costa, Uruguay",
    line2: "polarizadosdeleste@gmail.com | +598 92 906 102",
    line3Template: "Copyright {year}. Todos los derechos reservados.",
  },
};
