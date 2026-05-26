export interface ServiceItem {
  id: string;
  area: "Vehiculos" | "Cardetailing" | "Arquitectura" | "Publicidad";
  title: string;
  description: string;
}

// Items anclados a los href definidos en la navbar.
export const serviceItems: ServiceItem[] = [
  {
    id: "vehiculos-autos",
    area: "Vehiculos",
    title: "Vehículos",
    description: "Láminas y servicios para autos particulares",
  },
  {
    id: "vehiculos-utilitarios",
    area: "Vehiculos",
    title: "Utilitarios",
    description: "Láminas y servicios para utilitarios.",
  },
  {
    id: "vehiculos-gran-porte",
    area: "Vehiculos",
    title: "Vehículos de gran porte",
    description: "Láminas y servicios para camiones, maquinaria y unidades de alto porte.",
  },
  {
    id: "detailing-interior",
    area: "Cardetailing",
    title: "Interior",
    description: "Limpieza profunda, cuidado de tapizados y restauración del habitáculo.",
  },
  {
    id: "detailing-exterior",
    area: "Cardetailing",
    title: "Exterior",
    description: "Lavado premium, descontaminado y protección de pintura para terminación profesional.",
  },
  {
    id: "detailing-ceramico",
    area: "Cardetailing",
    title: "Tratamiento Cerámico",
    description: "Aplicación de coating cerámico para brillo sostenido y mayor resistencia.",
  },
  {
    id: "detailing-acrilico",
    area: "Cardetailing",
    title: "Tratamiento Acrílico",
    description: "Aplicación de coating acrílico para realzar el brillo y proteger la superficie.",
  },
  /*{
    id: "arquitectura-proyectos",
    area: "Arquitectura",
    title: "Proyectos",
    description: "Diseño arquitectónico integral para viviendas, locales y espacios corporativos.",
  },
  {
    id: "arquitectura-planos",
    area: "Arquitectura",
    title: "Planos",
    description: "Documentación técnica y planos ejecutivos para obra y habilitaciones.",
  },
  {
    id: "arquitectura-direccion",
    area: "Arquitectura",
    title: "Dirección de obra",
    description: "Coordinación de equipos, cronograma y control de calidad durante la ejecución.",
  },*/
  {
    id: "publicidad-digital",
    area: "Publicidad",
    title: "Digital",
    description: "Campañas de performance, estrategia social y optimización de conversión.",
  },
  {
    id: "publicidad-impresa",
    area: "Publicidad",
    title: "Impresa",
    description: "Piezas gráficas, cartelería y material comercial con foco en marca.",
  },
  {
    id: "publicidad-branding",
    area: "Publicidad",
    title: "Branding",
    description: "Identidad visual y posicionamiento para comunicar valor de forma consistente.",
  },
];
