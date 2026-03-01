# Landing MultiServicios

Landing corporativa modular construida con `Next.js + TypeScript + Tailwind + Framer Motion`, optimizada para SEO y performance.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- SEO tecnico (metadata, sitemap, robots, JSON-LD)
- Skeleton de carga (`src/app/loading.tsx`)

## Estructura principal

- `src/app`: rutas, layout global y archivos SEO de Next.
- `src/components/shared`: componentes reutilizables (`Navbar`, `Footer`, wrappers, reveal).
- `src/features`: datos y logica por dominio (services, testimonials, contact).
- `src/config`: configuracion central de sitio y navegacion.
- `src/lib`: utilidades tecnicas (SEO, analytics, animaciones).
- `public`: assets estaticos e integraciones de verificacion.

## Ejecutar en local

1. Instalar dependencias:
```bash
npm install
```

2. Levantar entorno de desarrollo:
```bash
npm run dev
```

3. Abrir en navegador:
`http://localhost:3000`

## Build de produccion

```bash
npm run build
npm run start
```

## Variables de entorno (pendiente GA4)

Crear archivo `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Checklist pendiente

- Integracion completa de GA4 (pageview + eventos).
- Verificacion de Google Search Console.
- Reemplazar placeholders en `src/config/site.ts`.
- Conectar formulario a backend/API real.
