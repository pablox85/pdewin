# analytics

Capa de helpers para Google Analytics 4.

## Archivo actual

- `gtag.ts`: expone `GA_MEASUREMENT_ID`, la bandera `isGaEnabled` y helpers para `trackPageView`, `trackEvent` y `trackGenerateLead`.

## Comportamiento

Si `NEXT_PUBLIC_GA_ID` no está definido, las funciones no envían eventos y el sitio sigue funcionando sin tracking.
