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
    href: "/detailing",
    items: [
      { id: "detailing-interior", label: "Interior", href: "/detailing#detailing-interior" },
      { id: "detailing-exterior", label: "Exterior", href: "/detailing#detailing-exterior" },
      { id: "detailing-ceramico", label: "Ceramico", href: "/detailing#detailing-ceramico" },
      { id: "detailing-acrilico", label: "Acrilico", href: "/detailing#detailing-acrilico" },
    ],
  },
  {
    id: "arquitectura",
    label: "Home, Office & Business",
    href: "/home-business",
    items: [
      {
        id: "arquitectura-laminas",
        label: "Espacios residenciales",
        href: "/home-business#arquitectura-laminas",
      },
      {
        id: "arquitectura-carteleria",
        label: "Espacios comerciales",
        href: "/home-business#arquitectura-carteleria",
      },
      {
        id: "arquitectura-publicidad",
        label: "Asesoria decorativa",
        href: "/home-business#arquitectura-publicidad",
      },
    ],
  },
  {
    id: "galeria",
    label: "Galeria",
    href: "/galeria",
    items: [],
  },
];
