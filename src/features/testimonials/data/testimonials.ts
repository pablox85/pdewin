export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Laura M.",
    role: "Gerente comercial",
    quote:
      "Centralizamos varios servicios con un solo proveedor y mejoramos tiempos, calidad y experiencia del cliente.",
  },
  {
    id: "t2",
    name: "Martin P.",
    role: "Director de operaciones",
    quote:
      "Nos ayudaron a ordenar la ejecucion y elevar la imagen de marca en vehiculos y espacios comerciales.",
  },
  {
    id: "t3",
    name: "Sofia R.",
    role: "Emprendedora",
    quote:
      "El equipo entendio nuestro objetivo desde el inicio y entrego resultados concretos en poco tiempo.",
  },
];
