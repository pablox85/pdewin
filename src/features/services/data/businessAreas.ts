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
    heroTitle: "Proteccion y estilo para todo tipo de vehiculos",
    heroDescription:
      "Aplicamos soluciones de alta calidad para autos, utilitarios y vehiculos de gran porte, con foco en durabilidad y terminacion.",
    summary: "Polarizados y laminas profesionales para uso particular, comercial y flotas.",
    details: [
      {
        id: "vehiculos-autos",
        title: "Autos",
        description:
          "Polarizados y laminas de control solar para mayor confort, privacidad y proteccion.",
      },
      {
        id: "vehiculos-utilitarios",
        title: "Utilitarios",
        description:
          "Instalaciones pensadas para uso intensivo, con materiales resistentes y acabado profesional.",
      },
      {
        id: "vehiculos-gran-porte",
        title: "Vehiculos de gran porte",
        description:
          "Aplicaciones para camiones, maquinaria y unidades de alto porte con exigencia operativa.",
      },
    ],
  },
  {
    id: "cardetailing",
    label: "Car Detailing",
    href: "/cardetailing",
    heroTitle: "Car detailing de nivel profesional",
    heroDescription:
      "Restauramos y protegemos tu vehiculo con tecnicas especializadas para conservar su estetica y valor.",
    summary: "Limpieza profunda, correccion visual y proteccion avanzada para resultados superiores.",
    details: [
      {
        id: "detailing-interior",
        title: "Interior",
        description:
          "Limpieza tecnica de tapizados, plasticos y superficies para recuperar confort e higiene.",
      },
      {
        id: "detailing-exterior",
        title: "Exterior",
        description:
          "Lavado premium, descontaminado y proteccion de pintura con terminacion uniforme.",
      },
      {
        id: "detailing-ceramico",
        title: "Tratamiento ceramico",
        description:
          "Aplicacion de coating ceramico para brillo sostenido y resistencia superior frente al desgaste.",
      },
    ],
  },
  {
    id: "arquitectura",
    label: "Home & Deco",
    href: "/arquitectura",
    heroTitle: "Home & Deco para hogares y espacios comerciales",
    heroDescription:
      "Disenamos propuestas funcionales y esteticas para transformar ambientes con criterio y personalidad.",
    summary: "Ambientacion, seleccion de materiales y renovacion visual para espacios con impacto.",
    details: [
      {
        id: "arquitectura-proyectos",
        title: "Espacios residenciales",
        description:
          "Propuestas de ambientacion para living, dormitorios, cocinas y exteriores con estilo coherente.",
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
          "Definicion de paletas, texturas, revestimientos y mobiliario para lograr espacios armonicos y funcionales.",
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
