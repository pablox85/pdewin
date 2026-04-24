# Polarizados del Este

Landing comercial para Polarizados del Este, construida con Next.js y enfocada en mostrar servicios, generar consultas y reforzar la presencia de la marca.

## Tecnologias

- `Next.js 16` con App Router
- `React 19`
- `TypeScript 5`
- `Tailwind CSS 3`
- `Framer Motion`
- `Nodemailer` para el envio de correos desde la web

## Que incluye

- Home principal con secciones de hero, servicios, testimonios, about y contacto.
- Paginas de detalle para cada unidad de negocio:
  - `/vehiculos`
  - `/detailing`
  - `/home-business`
- Boton flotante de WhatsApp.
- Modo claro/oscuro con persistencia local.
- SEO base con metadata, `robots.txt`, `sitemap.xml` y datos estructurados.
- Integracion opcional con Google Analytics 4.
- Formulario de contacto con envio por correo.

## Estructura

- `src/app`: rutas de Next.js, layout global, SEO y API routes.
- `src/components`: componentes compartidos, UI y analytics.
- `src/features`: contenido y piezas especificas de servicios, contacto y testimonios.
- `src/config`: configuracion central del sitio, textos y navegacion.
- `src/lib`: utilidades de animacion, analytics y SEO.
- `public`: imagenes, iconos y recursos estaticos.

## Centrado manual de fotos (carousel)

Si queres ajustar el encuadre de cada foto en mobile y escritorio, edita:

- `src/app/(marketing)/_sections/ServicesSection.tsx`

Dentro de `areaCarouselImages` cada item acepta:

- `positionMobile`: posicion para mobile/tablet (ejemplo: `"50% 52%"`)
- `positionDesktop`: posicion para escritorio desde `1024px` (ejemplo: `"50% 45%"`)

Ejemplo:

```ts
{
  src: "/images/det1.jpg",
  alt: "Proceso de car detailing",
  positionMobile: "50% 52%",
  positionDesktop: "50% 46%"
}
```

Referencia tecnica:

- La logica del carousel vive en `src/components/shared/PhotoCarousel.tsx`.
- El comportamiento responsive de `object-position` se define en `src/app/globals.css` con la clase `.carousel-image`.

## Instalacion local

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Toma `.env.example` como base y copialo a `.env.local`, luego completalo con tus valores.

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abrilo en `http://localhost:3000`.

Este comando levanta la aplicacion completa de Next.js, incluida la parte de servidor que expone la API interna.

## Backend

No hay un backend separado en otro proyecto o puerto. La logica del servidor vive dentro de Next.js, en particular en:

- `src/app/api/contact/route.ts`

Ese endpoint procesa el formulario de contacto, valida datos y envia el correo mediante SMTP. Tambien puede generar un resumen interno con OpenAI si se configuran las variables correspondientes.

## Variables de entorno

Variables utiles:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu_usuario_smtp
SMTP_PASS=tu_app_password_o_clave_smtp
SMTP_FROM=correo_remitente
CONTACT_EMAIL_TO=correo_destino
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-4o-mini
```

Notas:

- `NEXT_PUBLIC_GA_ID` es opcional. Si no existe, el sitio funciona igual sin Analytics.
- Las variables `SMTP_*` son necesarias para que el formulario de contacto pueda enviar correos.
- `OPENAI_API_KEY` y `OPENAI_MODEL` son opcionales. Si no se configuran, el sistema usa un resumen local de respaldo.

## Correr el servidor en modo produccion local

```bash
npm run build
npm run start
```

Eso levanta la version compilada de Next.js, incluyendo la API interna de contacto.

## Lint

```bash
npm run lint
```

## Flujo recomendado de uso

1. Instalar dependencias con `npm install`.
2. Configurar `.env.local`.
3. Ejecutar `npm run dev` para desarrollar.
4. Probar el formulario de contacto y verificar que SMTP este funcionando.
5. Antes de publicar, correr `npm run build`.

## Despliegue

El proyecto esta listo para deploy en Vercel o cualquier entorno compatible con Next.js.

Para produccion, no olvides cargar las mismas variables de entorno del formulario y, si corresponde, la clave de Analytics y OpenAI.
