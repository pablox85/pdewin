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
    title: "Vahiculos",
    description: "Laminas y servicion para autos particulares",
  },
  {
    id: "vehiculos-utilitarios",
    area: "Vehiculos",
    title: "Utilitarios",
    description: "Laminas y servicios para utilitarios.",
  },
  {
    id: "vehiculos-gran-porte",
    area: "Vehiculos",
    title: "Vehiculos de gran porte",
    description: "Laminas y servicios para camiones, maquinaria y unidades de alto porte.",
  },
  {
    id: "Detailing-interior",
    area: "Cardetailing",
    title: "Interior",
    description: "Limpieza profunda, cuidado de tapizados y restauracion del habitaculo.",
  },
  {
    id: "Detailing-exterior",
    area: "Cardetailing",
    title: "Exterior",
    description: "Lavado premium, descontaminado y proteccion de pintura para terminacion profesional.",
  },
  {
    id: "Detailing-ceramico",
    area: "Cardetailing",
    title: "Tratamiento Ceramico",
    description: "Aplicacion de coating ceramico para brillo sostenido y mayor resistencia.",
  },
  /*{
    id: "arquitectura-proyectos",
    area: "Arquitectura",
    title: "Proyectos",
    description: "Diseño arquitectonico integral para viviendas, locales y espacios corporativos.",
  },
  {
    id: "arquitectura-planos",
    area: "Arquitectura",
    title: "Planos",
    description: "Documentacion tecnica y planos ejecutivos para obra y habilitaciones.",
  },
  {
    id: "arquitectura-direccion",
    area: "Arquitectura",
    title: "Direccion de obra",
    description: "Coordinacion de equipos, cronograma y control de calidad durante la ejecucion.",
  },*/
  {
    id: "publicidad-digital",
    area: "Publicidad",
    title: "Digital",
    description: "Campañas de performance, estrategia social y optimizacion de conversion.",
  },
  {
    id: "publicidad-impresa",
    area: "Publicidad",
    title: "Impresa",
    description: "Piezas graficas, carteleria y material comercial con foco en marca.",
  },
  {
    id: "publicidad-branding",
    area: "Publicidad",
    title: "Branding",
    description: "Identidad visual y posicionamiento para comunicar valor de forma consistente.",
  },
];
