import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { AboutSection } from "./(marketing)/_sections/AboutSection";
import { ContactSection } from "./(marketing)/_sections/ContactSection";
import { HeroSection } from "./(marketing)/_sections/HeroSection";
import { LocalSeoSection } from "./(marketing)/_sections/LocalSeoSection";
import { ServicesSection } from "./(marketing)/_sections/ServicesSection";
import { TestimonialsSection } from "./(marketing)/_sections/TestimonialsSection";

export const metadata = buildMetadata({
  title: "Polarizados en Ciudad de la Costa", // La marca se agrega desde el template global en buildMetadata().
  description:
    "Instalación de láminas para vehículos, car detailing y tratamiento cerámico. Servicio en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: {
    canonical: "/",
  },
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/preview-home.png`,
  logo: `${siteConfig.domain}/images/NEGRO-FONDO-TRANSPARENTE.png`,
  priceRange: "$$",
  description:
    "Polarizados automotrices, láminas de seguridad, control solar, car detailing y tratamiento cerámico en Ciudad de la Costa, Canelones, Lagomar, Solymar y El Pinar.",
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de la Costa",
    addressRegion: "Canelones",
    addressCountry: "UY",
  },
  areaServed: [
    { "@type": "City", name: "Ciudad de la Costa" },
    { "@type": "AdministrativeArea", name: "Canelones" },
    { "@type": "Place", name: "Lagomar" },
    { "@type": "Place", name: "Solymar" },
    { "@type": "Place", name: "El Pinar" },
    { "@type": "City", name: "Montevideo" },
    { "@type": "City", name: "Maldonado" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Polarizados del Este",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Polarizados automotrices",
          description: "Instalación de láminas de control solar y seguridad para autos, utilitarios y flotas.",
          areaServed: "Ciudad de la Costa, Canelones, Montevideo y Maldonado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Car detailing y tratamiento cerámico",
          description: "Limpieza técnica, corrección visual, protección de pintura y tratamiento cerámico.",
          areaServed: "Ciudad de la Costa, Canelones, Montevideo y Maldonado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Láminas para home, office y business",
          description: "Láminas de control solar, privacidad, seguridad y vinilos para hogares, oficinas y comercios.",
          areaServed: "Ciudad de la Costa, Canelones, Montevideo y Maldonado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cartelería y vinilos",
          description: "Cartelería interna, exterior, vinilos publicitarios y comunicación visual para espacios comerciales.",
          areaServed: "Ciudad de la Costa, Canelones, Montevideo y Maldonado",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <LocalSeoSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
