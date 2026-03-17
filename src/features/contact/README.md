# contact

Feature orientada a la captación de consultas.

## Qué contiene hoy

- `components/ContactForm.tsx`: formulario cliente usado en la sección de contacto de la home.
- `src/app/api/contact/route.ts`: endpoint del servidor para enviar consultas por SMTP.

## Estado actual

El flujo actual:

- envía `nombre`, `email`, `servicio` y `mensaje` a `POST /api/contact`,
- valida datos básicos del lado servidor,
- envía el correo con SMTP,
- dispara `generate_lead` en GA4 si el envío fue exitoso,
- muestra feedback de éxito o error en la UI.
