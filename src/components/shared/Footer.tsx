import { siteConfig } from "@/config/site";
import { buildWhatsAppHref } from "@/lib/whatsapp";

// Footer simple para cierre de la landing y datos de contacto.
export function Footer() {
  const year = new Date().getFullYear();
  const footerLine3 = siteConfig.footer.line3Template.replace("{year}", String(year));
  const whatsappHref = buildWhatsAppHref();

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 dark:border-slate-700 dark:bg-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 text-sm text-slate-700 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.footer.line1}</p>
        <p>
          {siteConfig.contactEmail}{" | "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline-offset-2 hover:underline dark:text-blue-200"
          >
            {siteConfig.contactPhone}
          </a>
        </p>
        <p>{footerLine3}</p>
      </div>
    </footer>
  );
}
