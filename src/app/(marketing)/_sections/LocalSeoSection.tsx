import { Collapsible, SectionWrapper, TrackedLinkButton } from "@/components/shared";
import { buildWhatsAppHref } from "@/lib/whatsapp";

// Bloque de contenido local para reforzar busquedas por zona sin reemplazar el copy anterior.
export function LocalSeoSection() {
  return (
    <SectionWrapper className="bg-white dark:bg-slate-950">
      <div className="max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700 dark:text-blue-300">
          Cobertura local
        </p>
        <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Polarizados en Ciudad de la Costa
        </h2>
        <p className="new-content-highlight mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
          Polarizados del Este realiza polarizados automotrices, láminas de seguridad y control solar
          para clientes de Ciudad de la Costa y Canelones, con atención para vehículos particulares,
          utilitarios y flotas.
        </p>

        <article className="mt-5 rounded-2xl border border-slate-300 bg-white p-5 shadow-card dark:border-slate-700 dark:bg-slate-900">
          <Collapsible
            panelId="local-seo-coverage-panel"
            title="Ver cobertura y servicios"
            triggerClassName="text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg"
            contentWrapClassName="mt-4"
          >
            <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
              <p>
                Trabajamos con vehículos particulares, utilitarios y flotas en Ciudad de la Costa y
                distintas zonas de Canelones. Atendemos clientes de Lagomar, Solymar, El Pinar y
                alrededores que buscan mejorar confort, privacidad y protección solar sin perder una
                terminación prolija. Cada instalación se evalúa según el tipo de vehículo, el uso diario
                y el resultado esperado, para recomendar una solución adecuada antes de avanzar con el
                trabajo.
              </p>
              <p>
                Instalamos láminas de control solar y láminas de seguridad para autos, camionetas,
                maquinaria y vehículos de trabajo. Este tipo de servicio ayuda a reducir calor, cuidar el
                interior del vehículo, mejorar la privacidad y sumar una protección adicional en vidrios
                expuestos. También realizamos servicios de car detailing y tratamiento cerámico para
                quienes quieren conservar la pintura, recuperar brillo, facilitar el mantenimiento diario
                y mantener una imagen cuidada por mas tiempo.
              </p>
              <p>
                Nuestro enfoque combina asesoramiento claro, materiales adecuados y ejecución cuidada. En
                Ciudad de la Costa, Canelones, Lagomar, Solymar y El Pinar trabajamos con agenda previa
                para ordenar cada proyecto, explicar las opciones disponibles y entregar un resultado
                consistente. La idea es que cada cliente pueda entender qué lámina, tratamiento o
                servicio necesita, que beneficios puede esperar y como solicitar presupuesto sin vueltas.
              </p>
            </div>
          </Collapsible>
        </article>

        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLinkButton
            href="#contacto"
            eventName="local_seo_cta_click"
            eventParams={{ destination: "contact_form", source: "local_seo_section" }}
            className="cta-pop rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white outline-none transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
          >
            Solicitar presupuesto
          </TrackedLinkButton>
          <TrackedLinkButton
            href={buildWhatsAppHref("Hola, quiero consultar por polarizados o láminas en Ciudad de la Costa.")}
            eventName="local_seo_cta_click"
            eventParams={{ destination: "whatsapp", source: "local_seo_section" }}
            className="cta-pop rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition hover:border-brand-700 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-200"
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp
          </TrackedLinkButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
