export interface AreaDetail {
  id: string;
  title: string;
  description: string;
}

export interface BusinessArea {
  id: "vehiculos" | "cardetailing" | "arquitectura";
  label: string;
  href: string;
  heroTitle: string;
  heroDescription: string;
  summary: string;
  details: AreaDetail[];
}

export const BUSINESS_AREAS: BusinessArea[] = [
  {
    id: "vehiculos",
    label: "Vehiculos",
    href: "/vehiculos",
    heroTitle: "Servicios para vehiculos",
    heroDescription:
      "Soluciones profesionales para autos, utilitarios y motos con enfoque en terminacion, proteccion y durabilidad.",
    summary: "Polarizado, laminas y tratamientos para uso particular y flotas.",
    details: [
      {
        id: "vehiculos-autos",
        title: "Autos",
        description: "Polarizado y laminas de control solar para vehiculos particulares.",
      },
      {
        id: "vehiculos-utilitarios",
        title: "Utilitarios",
        description: "Instalaciones para uso intensivo en flotas y unidades de trabajo.",
      },
      {
        id: "vehiculos-motos",
        title: "Motos",
        description: "Aplicaciones de proteccion y personalizacion para motos urbanas y touring.",
      },
    ],
  },
  {
    id: "cardetailing",
    label: "Cardetailing",
    href: "/cardetailing",
    heroTitle: "Car detailing premium",
    heroDescription:
      "Tratamientos esteticos y de proteccion para mantener y recuperar el valor visual del vehiculo.",
    summary: "Limpieza profunda, correccion visual y proteccion avanzada.",
    details: [
      {
        id: "detailing-interior",
        title: "Interior",
        description: "Limpieza profunda, cuidado de tapizados y restauracion del habitaculo.",
      },
      {
        id: "detailing-exterior",
        title: "Exterior",
        description: "Lavado premium, descontaminado y proteccion de pintura con terminacion profesional.",
      },
      {
        id: "detailing-ceramico",
        title: "Tratamiento ceramico",
        description: "Aplicacion de coating ceramico para brillo sostenido y mayor resistencia.",
      },
    ],
  },
  {
    id: "arquitectura",
    label: "Home & Deco",
    href: "/arquitectura",
    heroTitle: "Home & Deco para hogares y comercios",
    heroDescription:
      "Asesoramiento, seleccion de materiales y ejecucion decorativa para transformar espacios interiores y exteriores.",
    summary: "Diseno funcional, ambientacion y renovacion estetica con foco practico.",
    details: [
      {
        id: "arquitectura-proyectos",
        title: "Espacios residenciales",
        description:
          "Propuestas de ambientacion para living, dormitorios, cocinas y exteriores con identidad propia.",
      },
      {
        id: "arquitectura-planos",
        title: "Espacios comerciales",
        description:
          "Intervenciones para locales y oficinas enfocadas en experiencia, circulacion y presencia de marca.",
      },
      {
        id: "arquitectura-direccion",
        title: "Asesoria decorativa",
        description:
          "Definicion de paletas, texturas, revestimientos y mobiliario para lograr resultados coherentes y duraderos.",
      },
    ],
  },
];

export function getBusinessAreaById(areaId: BusinessArea["id"]) {
  return BUSINESS_AREAS.find((area) => area.id === areaId);
}

export function requireBusinessAreaById(areaId: BusinessArea["id"]): BusinessArea {
  const area = getBusinessAreaById(areaId);

  if (!area) {
    throw new Error(`No se encontro configuracion para ${areaId}`);
  }

  return area;
}
