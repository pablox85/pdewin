import { siteConfig } from "@/config/site";
import { Reveal, SectionTitle, SectionWrapper } from "@/components/shared";
import { ContactForm } from "@/features/contact/components/ContactForm";

// Cierre de conversion con formulario y datos de contacto.
export function ContactSection() {
  return (
    <SectionWrapper id="contacto">
      <SectionTitle
        eyebrow="Contacto"
        title="Contanos tu necesidad."
        description="Enviá tu consulta y te contactamos a la brevedad."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="rounded-2xl border border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Datos directos</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>Email: {siteConfig.contactEmail}</li>
              <li>Telefono: {siteConfig.contactPhone}</li>
              <li>Ubicacion: {siteConfig.address}</li>
            </ul>
            <p className="mt-5 rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Una vez recibido tu mensaje, un experto se contactará contigo para asesorarte.
            </p>
          </aside>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
