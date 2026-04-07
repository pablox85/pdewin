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
    href: "/detailing",
    heroTitle: "Car detailing de nivel profesional",
    heroDescription:
      "Restauramos y protegemos tu vehiculo con tecnicas especializadas para conservar su estetica y valor.",
    summary: "Limpieza profunda, correccion visual y proteccion avanzada para resultados superiores.",
    details: [
      {
        id: "detailing-interior",
        title: "Limpieza Interior",
        description:
          "Limpieza tecnica de tapizados, plasticos y superficies para recuperar confort e higiene.",
      },
      {
        id: "detailing-exterior",
        title: "Limpieza Exterior",
        description:
          "Lavado premium, descontaminado y proteccion de pintura con terminacion uniforme.",
      },
      {
        id: "detailing-ceramico",
        title: "Tratamiento Nanoceramico",
        description:
          "Se fusiona con la pintura. Repele agua, UV y suciedad por años — sin retoques, sin perder el brillo.",
      },
      {
        id: "detailing-acrilico",
        title: "Tratamiento Acrilico",
        description:
          "Sella y protege la superficie con brillo visible desde el primer día. Mantenimiento más fácil, resultado inmediato.",
      },
    ],
  },
  {
    id: "arquitectura",
    label: "Home & Office",
    href: "/home-business",
    heroTitle: "Home, Office & Business para hogares y espacios comerciales",
    heroDescription:
      "Láminas para vidrios y vinilos decorativos para hogares. \nCartelería profesional, soluciones visuales para oficinas y comercios.",
    summary: "ASoluciones en láminas y vinilos para controlar el sol, ganar privacidad, decorar espacios y comunicar tu marca.",
    details: [
      {
        id: "arquitectura-laminas", //cambiar ids arquitectura-laminas
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
        id: "arquitectura-carteleria", //cambiar ids arquitectuca-carteleria
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
        id: "arquitectura-publicidad", //cambiar ids arquitectura-publicidad
        title: "Business",
        description: [
          "Vinilos Microperforados",
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
