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
    role: "Gerente Comercial",
    quote: "Unificaron varias areas de trabajo y logramos ejecutar mas rapido con mejor imagen de marca.",
  },
  {
    id: "t2",
    name: "Martin P.",
    role: "Director de Operaciones",
    quote: "La propuesta integral nos resolvio vehiculos, presencia digital y seguimiento de obra en un solo equipo.",
  },
  {
    id: "t3",
    name: "Sofia R.",
    role: "Emprendedora",
    quote: "El nivel de detalle fue excelente. Tuvimos resultados medibles desde el primer mes.",
  },
];
