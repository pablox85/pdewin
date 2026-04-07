import type { NavMenu } from "../types/navigation";

// Navegacion principal por rutas con subitems anclados para cada pagina.
export const NAV_MENUS: NavMenu[] = [
  {
    id: "inicio",
    label: "Inicio",
    href: "/",
    items: [],
  },
  {
    id: "vehiculos",
    label: "Vehiculos",
    href: "/vehiculos",
    items: [
      { id: "vehiculos-autos", label: "Autos", href: "/vehiculos#vehiculos-autos" },
      { id: "vehiculos-utilitarios", label: "Utilitarios", href: "/vehiculos#vehiculos-utilitarios" },
      {
        id: "vehiculos-gran-porte",
        label: "Vehiculos de gran porte",
        href: "/vehiculos#vehiculos-gran-porte",
      },
    ],
  },
  {
    id: "cardetailing",
    label: "Car Detailing",
    href: "/cardetailing",
    items: [
      { id: "detailing-interior", label: "Interior", href: "/cardetailing#detailing-interior" },
      { id: "detailing-exterior", label: "Exterior", href: "/cardetailing#detailing-exterior" },
      { id: "detailing-ceramico", label: "Ceramico", href: "/cardetailing#detailing-ceramico" },
      { id: "detailing-acrilico", label: "Acrilico", href: "/cardetailing#detailing-acrilico" },
    ],
  },
  {
    id: "arquitectura",
    label: "Home, Office & Business",
    href: "/arquitectura",
    items: [
      {
        id: "arquitectura-laminas",
        label: "Espacios residenciales",
        href: "/arquitectura#arquitectura-laminas",
      },
      {
        id: "arquitectura-carteleria",
        label: "Espacios comerciales",
        href: "/arquitectura#arquitectura-carteleria",
      },
      {
        id: "arquitectura-publicidad",
        label: "Asesoria decorativa",
        href: "/arquitectura#arquitectura-publicidad",
      },
    ],
  },
];
