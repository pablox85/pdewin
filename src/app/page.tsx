import { Footer, Navbar } from "@/components/shared";
import { ClientEnhancements } from "@/components/client/ClientEnhancements";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { AboutSection } from "./(marketing)/_sections/AboutSection";
import { ContactSection } from "./(marketing)/_sections/ContactSection";
import { HeroSection } from "./(marketing)/_sections/HeroSection";
import { ServicesSection } from "./(marketing)/_sections/ServicesSection";
import { TestimonialsSection } from "./(marketing)/_sections/TestimonialsSection";

export const metadata = buildMetadata({
  title: "Polarizados del Este",
  alternates: {
    canonical: "/",
  },
});

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

export default function HomePage() {
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
      <ClientEnhancements />
    </>
  );
}
