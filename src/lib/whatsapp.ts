import { siteConfig } from "@/config/site";

export const WHATSAPP_DEFAULT_MESSAGE = "Hola me gustaria hacer una consulta";

export function buildWhatsAppHref(message = WHATSAPP_DEFAULT_MESSAGE) {
  const phone = siteConfig.contactPhone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
