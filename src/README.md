# src

Código fuente principal de la aplicación.

## Organización actual

- `app`: rutas, layout raíz, estados de carga y archivos SEO de Next.
- `components`: piezas reutilizables del sitio.
- `config`: datos globales de marca, contacto y navegación.
- `features`: contenido y componentes por dominio de negocio.
- `hooks`: carpeta reservada para hooks reutilizables; hoy no tiene implementaciones.
- `lib`: utilidades técnicas compartidas.
- `styles`: espacio reservado para estilos compartidos; el estilo global actual vive en `app/globals.css`.
- `types`: tipos TypeScript compartidos.

## Criterio del proyecto

La app está separada entre:

- contenido/configuración,
- componentes reutilizables,
- utilidades técnicas,
- y páginas armadas desde App Router.

Eso permite cambiar copy, navegación o servicios sin tocar demasiado la estructura visual.
