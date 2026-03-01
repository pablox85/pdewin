import { Footer, Navbar } from "@/components/shared";
import { siteConfig } from "@/config/site";
import { AboutSection } from "./_sections/AboutSection";
import { ContactSection } from "./_sections/ContactSection";
import { HeroSection } from "./_sections/HeroSection";
import { ServicesSection } from "./_sections/ServicesSection";
import { TestimonialsSection } from "./_sections/TestimonialsSection";

// JSON-LD basico para reforzar contexto de Organization en buscadores.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.domain,
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address,
  },
};

export default function MarketingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
