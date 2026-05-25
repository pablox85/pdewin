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
    label: "Vehículos",
    href: "/vehiculos",
    heroTitle: "Polarizados y laminado de vidrios para vehículos",
    heroDescription:
      "Instalamos láminas de control solar y seguridad para autos, utilitarios, vehículos de gran porte y maquinaria pesada, con terminación profesional y foco en durabilidad.",
    summary:
      "Servicio de polarizados y laminado vehicular para clientes particulares, empresas y flotas en todo el país, siempre con agenda previa.",
    details: [
      {
        id: "vehiculos-autos",
        title: "Autos",
        description:
          "Láminas de control solar para mayor confort, privacidad y protección.",
      },
      {
        id: "vehiculos-utilitarios",
        title: "Utilitarios",
        description:
          "Instalaciones pensadas para uso intensivo, con materiales resistentes y acabado profesional.",
      },
      {
        id: "vehiculos-gran-porte",
        title: "Vehículos de gran porte",
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
    heroTitle: "Car detailing y tratamiento cerámico profesional",
    heroDescription:
      "Restauramos y protegemos tu vehículo con técnicas especializadas para conservar su estética y valor, incluyendo tratamiento cerámico de alta duración.",
    summary:
      "Limpieza profunda, corrección visual y coating para clientes en todo el país, siempre con agenda previa.",
    details: [
      {
        id: "detailing-interior",
        title: "Limpieza Interior",
        description:
          "Limpieza técnica de tapizados, plásticos y superficies para recuperar confort e higiene.",
      },
      {
        id: "detailing-exterior",
        title: "Limpieza Exterior",
        description:
          "Lavado premium, descontaminado y protección de pintura con terminación uniforme.",
      },
      {
        id: "detailing-ceramico",
        title: "Tratamiento Nanocerámico",
        description:
          "Se fusiona con la pintura. Repele agua, UV y suciedad por años — sin retoques, sin perder el brillo.",
      },
      {
        id: "detailing-acrilico",
        title: "Tratamiento Acrílico",
        description:
          "Sella y protege la superficie con brillo visible desde el primer día. Mantenimiento más fácil, resultado inmediato.",
      },
    ],
  },
  {
    id: "arquitectura",
    label: "Home & Office",
    href: "/home-business",
    heroTitle: "Home, Office, Business y Carteleria para hogares y espacios comerciales",
    heroDescription:
      "Láminas para vidrios, polarizado arquitectónico y vinilos decorativos para hogares y oficinas.\nCartelería interna y exterior para reforzar la comunicación visual en espacios comerciales.",
    summary:
      "Soluciones en láminas para vidrios, polarizado arquitectónico, vinilos y cartelería para comunicar tu marca en todo el país, siempre con agenda previa.",
    details: [
      {
        id: "arquitectura-laminas",
        title: "Home",
        description: [
          "Láminas de control solar.",
          "Láminas de seguridad.",
          "Control visual.",
          "Láminas decorativas.",
          "Vinilos decorativos y de protección.",
        ],
      },
      {
        id: "arquitectura-carteleria",
        title: "Office + carteleria interna",
        description: [
          "Láminas de control solar.",
          "Láminas de seguridad.",
          "Control visual.",
          "Láminas decorativas.",
          "Vinilos decorativos y de protección.",
          "Carteleria interna.",
        ],
      },
      {
        id: "arquitectura-publicidad",
        title: "Business + carteleria exterior/publicitaria",
        description: [
          "Vinilos microperforados.",
          "Vinilos publicitarios.",
          "Lona impresa.",
          "Carteleria en general.",
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
