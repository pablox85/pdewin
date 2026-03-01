declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

// Bandera central para habilitar/deshabilitar tracking segun entorno.
export const isGaEnabled = GA_MEASUREMENT_ID.length > 0;

type EventParams = Record<string, string | number | boolean | undefined>;

// Evento de page view para App Router.
export function trackPageView(url: string): void {
  if (!isGaEnabled || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_location: url,
    page_path: url,
  });
}

// Helper generico para eventos personalizados de GA4.
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (!isGaEnabled || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

// Evento recomendado para formularios/consultas.
export function trackGenerateLead(serviceName: string): void {
  trackEvent("generate_lead", {
    service_name: serviceName,
    source: "landing_contact_form",
    value: 1,
  });
}
