# analytics

Componentes cliente para la integración opcional con Google Analytics 4.

## Archivos actuales

- `GoogleAnalytics.tsx`: carga el script de GA4 e inicializa `gtag` cuando existe `NEXT_PUBLIC_GA_ID`.
- `PageViewTracker.tsx`: envía `page_view` en cambios de ruta del App Router.

## Dependencia

Ambos se apoyan en `src/lib/analytics/gtag.ts`.
