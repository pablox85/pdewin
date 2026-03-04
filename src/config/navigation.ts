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
    label: "Cardetailing",
    href: "/cardetailing",
    items: [
      { id: "detailing-interior", label: "Interior", href: "/cardetailing#detailing-interior" },
      { id: "detailing-exterior", label: "Exterior", href: "/cardetailing#detailing-exterior" },
      { id: "detailing-ceramico", label: "Ceramico", href: "/cardetailing#detailing-ceramico" },
    ],
  },
  {
    id: "arquitectura",
    label: "Home & Deco",
    href: "/arquitectura",
    items: [
      {
        id: "arquitectura-proyectos",
        label: "Espacios residenciales",
        href: "/arquitectura#arquitectura-proyectos",
      },
      {
        id: "arquitectura-planos",
        label: "Espacios comerciales",
        href: "/arquitectura#arquitectura-planos",
      },
      {
        id: "arquitectura-direccion",
        label: "Asesoria decorativa",
        href: "/arquitectura#arquitectura-direccion",
      },
    ],
  },
];
