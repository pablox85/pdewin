export interface AreaDetail {
  id: string;
  title: string;
  description: string | string[];
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
      "Aplicamos soluciones de alta calidad para autos, utilitarios, vehiculos de gran porte y maquinaria pesada, con foco en durabilidad y terminacion.",
    summary: "Polarizados y laminas profesionales para uso particular, comercial y flotas.",
    details: [
      {
        id: "vehiculos-autos",
        title: "Autos",
        description:
          "Laminas de control solar para mayor confort, privacidad y proteccion.",
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
          "Aplicaciones para camiones, omnibus, motorhome y ambulancias.",
      },
      {
        id: "vehiculos-maquinaria-pesada",
        title: "Maquinaria pesada",
        description:
          "Retroexcavadoras, palas, cuchillas y unidades de alto porte con exigencia operativa.",
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
          "Aplicacion de coating nanoceramico para brillo sostenido y resistencia superior frente al desgaste.",
      },
      {
        id: "detailing-acrilico",
        title: "Tratamiento acrilico",
        description:
          "Aplicacion de coating acrilico para brillo sostenido y resistencia superior frente al desgaste.",
      },
    ],
  },
  {
    id: "arquitectura",
    label: "Home, Deco & Business",
    href: "/arquitectura",
    heroTitle: "Home, Deco & Business para hogares y espacios comerciales",
    heroDescription:
      "Disenamos propuestas funcionales y esteticas para transformar ambientes con criterio y personalidad.",
    summary: "Ambientacion, seleccion de materiales y renovacion visual para espacios con impacto.",
    details: [
      {
        id: "arquitectura-proyectos",
        title: "Home",
        description: [
          "Laminas de control solar.",
          "Laminas de seguridad.",
          "Control Visual",
          "Laminas decorativas.",
          "Vinilos decorativos y de proteccion.",
        ],
      },
      {
        id: "arquitectura-planos",
        title: "Office",
        description: [
          "Laminas de control solar.",
          "Laminas de seguridad.",
          "Control Visual",
          "Laminas decorativas.",
          "Vinilos decorativos y de proteccion.",
          "Carteleria interna",
        ],
      },
      {
        id: "arquitectura-direccion",
        title: "Business",
        description: [
          "Microperforados",
          "Vinilos publicitarios",
          "Lona impresa",
          "Carteleria en general",
        ],
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
