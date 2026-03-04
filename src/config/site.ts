// Config centralizada para datos de marca, SEO y contacto.
export const siteConfig = {
  name: "Polarizados del Este",
  description: "Soluciones profesionales en vehiculos, car detailing y Home & Deco.",
  domain: "https://pdewin.vercel.app",
  locale: "es_UY",
  contactEmail: "contacto@pdwwin.com",
  contactPhone: "+598 92 906 102",
  address: "Montevideo, Uruguay",
  footer: {
    line1: "Polarizados del Este | Ciudad de la Costa, Uruguay",
    line2: "contacto@pdwwin.com | +598 92 906 102",
    line3Template: "Copyright {year}. Todos los derechos reservados.",
  },
} as const;
