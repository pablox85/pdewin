IMAGENES DEL PROYECTO

1) Direccion donde estan las imagenes
- Carpeta principal: public/images/


2) De donde se manejan las imagenes del main
- El main de la home esta en: src/app/(marketing)/page.tsx
- Dentro del <main> se renderiza: <ServicesSection />
- Las imagenes del carrusel del main se definen en:
  src/app/(marketing)/_sections/ServicesSection.tsx
  (const areaCarouselImages, con rutas como /images/inst1.jpg)
- El componente que muestra esas imagenes es:
  src/components/shared/PhotoCarousel.tsx
  (usa next/image para renderizar cada src)

Nota:
- En Next.js, una ruta como /images/inst1.jpg apunta al archivo fisico public/images/inst1.jpg.
