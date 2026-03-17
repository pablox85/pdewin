# app

Capa de rutas y renderizado con App Router de Next.js.

## Archivos actuales

- `layout.tsx`: layout global, fuentes, script inicial de tema, GA4, transición de páginas y botón flotante de WhatsApp.
- `globals.css`: estilos globales y tokens visuales del sitio.
- `loading.tsx`: skeleton global de respaldo.
- `sitemap.ts`: genera sitemap para home y páginas de servicios.
- `robots.ts`: habilita rastreo y expone el sitemap.
- `(marketing)/`: grupo de rutas para la parte pública del sitio.

## Rutas públicas actuales

- `/`
- `/vehiculos`
- `/cardetailing`
- `/arquitectura`

## SEO

La metadata base se construye desde `src/lib/seo/metadata.ts` y cada página de detalle extiende esa base con título, descripción y canonical propios.
