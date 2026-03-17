# Polarizados del Este

Landing comercial desarrollada con `Next.js`, `TypeScript`, `Tailwind CSS` y `Framer Motion` para presentar los servicios de Polarizados del Este.

## Estado actual

El sitio ya incluye:

- Home pública con secciones de hero, unidades de negocio, testimonios, institucional y contacto.
- Tres páginas de detalle por unidad de negocio:
  - `/vehiculos`
  - `/cardetailing`
  - `/arquitectura`
- Modo claro/oscuro con persistencia local.
- Botón flotante de WhatsApp arrastrable.
- SEO base con metadata, `sitemap.xml`, `robots.txt` y JSON-LD de organización.
- Integración opcional con Google Analytics 4 mediante `NEXT_PUBLIC_GA_ID`.

## Stack

- `next@16`
- `react@19`
- `typescript@5`
- `tailwindcss@3`
- `framer-motion`

## Estructura principal

- `src/app`: App Router, layout global, rutas públicas y archivos SEO de Next.
- `src/components`: componentes compartidos y componentes de analytics.
- `src/features`: datos y piezas ligadas a servicios, testimonios y contacto.
- `src/config`: configuración central del sitio y navegación.
- `src/lib`: utilidades transversales para SEO, analytics y animaciones.
- `public`: imágenes e identidad visual usadas por la landing.
- `docs`: espacio reservado para documentación complementaria.

## Desarrollo local

```bash
npm install
npm run dev
```

Sitio disponible en `http://localhost:3000`.

## Build de producción

```bash
npm run build
npm run start
```

## Variables de entorno

Podés partir de [`.env.example`](/home/pablo/Escritorio/pdewin/.env.example) y copiarlo a `.env.local`.

`GitHub` debe guardar solo el código. Los secretos van siempre en:

- `.env.local` para desarrollo local.
- `Environment Variables` del proyecto en Vercel para preview y producción.

`.env.local` ya está ignorado por Git, así que no se sube al repo.

Si solo querés habilitar GA4:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Si la variable no existe, el sitio funciona igual y simplemente no carga tracking.

## Envio de formularios

La API de contacto vive en `POST /api/contact` y usa SMTP. Variables necesarias:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=pdpcorrales@gmail.com
SMTP_PASS=tu-clave-o-app-password
SMTP_FROM=pdpcorrales@gmail.com
CONTACT_EMAIL_TO=pdpcorrales@gmail.com
```

Si usas Gmail, lo recomendable es una app password en lugar de la clave normal.

## Resumen interno con IA

El endpoint también puede generar un resumen interno automático antes de enviar el mail. Variables opcionales:

```bash
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-4o-mini
```

Si `OPENAI_API_KEY` no está definida o falla la llamada, el sistema usa un resumen local de respaldo y el mail igual se envía.

## Deploy en GitHub + Vercel

Flujo recomendado:

1. Subir el código a GitHub.
2. Importar el repositorio en Vercel.
3. Configurar las variables de entorno en Vercel.
4. Hacer deploy desde la branch principal o previews desde branches de trabajo.

Variables mínimas para que el formulario funcione en Vercel:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=pdpcorrales@gmail.com
SMTP_PASS=tu_app_password_real
SMTP_FROM=pdpcorrales@gmail.com
CONTACT_EMAIL_TO=pdpcorrales@gmail.com
```

Importante:

- `SMTP_PASS` no puede quedar con un texto de ejemplo como `REEMPLAZAR_CON_APP_PASSWORD_DE_GMAIL`.
- Si usás Gmail, necesitás una `App Password`.
- `OPENAI_API_KEY` es opcional.
- Cada `git push` puede disparar un deploy automático en Vercel si el repo está conectado.

## Observaciones

- El formulario de contacto ahora envía datos a `POST /api/contact` y dispara el evento `generate_lead` si el envío fue exitoso.
- Varios textos y datos comerciales viven en `src/config/site.ts` y `src/features/services/data/businessAreas.ts`.
- La carpeta `src/components/ui` existe como base para futuros primitives, pero actualmente no contiene componentes.
