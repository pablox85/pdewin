import { siteConfig } from "@/config/site";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

// Footer simple para cierre de la landing y datos de contacto.
export function Footer() {
  const year = new Date().getFullYear();
  const footerLine3 = siteConfig.footer.line3Template.replace("{year}", String(year));
  const whatsappHref = buildWhatsAppHref();
  const socialLinks = [
    { href: "https://www.facebook.com/polarizadosdeleste.com.uy", label: "Facebook", icon: IconBrandFacebook },
    { href: "https://www.instagram.com/polarizadosdeleste/", label: "Instagram", icon: IconBrandInstagram },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 dark:border-slate-700 dark:bg-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 text-sm text-slate-700 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
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
        <nav aria-label="Redes sociales" className="flex items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Seguinos</span>
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${label}`} className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-300 dark:hover:text-blue-200">
              <Icon aria-hidden="true" size={20} stroke={1.8} />
            </a>
          ))}
        </nav>
        <p className="text-slate-500 dark:text-slate-400">{footerLine3}</p>
      </div>
      <p className="mx-auto mt-6 text-center text-[12px] font-normal leading-[18px] text-[#9CA3AF] [font-family:var(--font-inter)]">
        Desarrollado por:{" "}
        <a
          href="https://www.bprsoluciones.uy/?utm_source=pdewin"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          Bpr Soluciones
        </a>
      </p>
    </footer>
  );
}
