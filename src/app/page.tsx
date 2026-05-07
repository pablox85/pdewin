import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { AboutSection } from "./(marketing)/_sections/AboutSection";
import { ContactSection } from "./(marketing)/_sections/ContactSection";
import { HeroSection } from "./(marketing)/_sections/HeroSection";
import { ServicesSection } from "./(marketing)/_sections/ServicesSection";
import { TestimonialsSection } from "./(marketing)/_sections/TestimonialsSection";

export const metadata = buildMetadata({
  title: "Polarizados del este",
  description:
    "Instalacion de laminas para vehiculos, car detailing y tratamiento ceramico. Servicio en Ciudad de la Costa, Canelones, Montevideo y Maldonado.",
  alternates: {
    canonical: "/",
  },
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: siteConfig.name,
  url: siteConfig.domain,
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address,
    addressCountry: "UY",
  },
  areaServed: [
    { "@type": "City", name: "Ciudad de la Costa" },
    { "@type": "City", name: "Canelones" },
    { "@type": "City", name: "Montevideo" },
    { "@type": "City", name: "Maldonado" },
  ],
  serviceType: [
    "Instalacion de laminas para vehiculos",
    "Polarizados para autos",
    "Car detailing",
    "Tratamiento ceramico",
  ],
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
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
