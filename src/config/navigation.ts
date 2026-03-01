import type { NavMenu } from "../types/navigation";

// Config centralizada de menus para que sea facil editar opciones sin tocar el componente.
export const NAV_MENUS: NavMenu[] = [
  {
    id: "vehiculos",
    label: "Vehiculos",
    items: [
      { id: "vehiculos-autos", label: "Autos", href: "#vehiculos-autos" },
      { id: "vehiculos-utilitarios", label: "Utilitarios", href: "#vehiculos-utilitarios" },
      { id: "vehiculos-motos", label: "Motos", href: "#vehiculos-motos" },
    ],
  },
  {
    id: "cardetailing",
    label: "Cardetailing",
    items: [
      { id: "detailing-interior", label: "Interior", href: "#detailing-interior" },
      { id: "detailing-exterior", label: "Exterior", href: "#detailing-exterior" },
      { id: "detailing-ceramico", label: "Ceramico", href: "#detailing-ceramico" },
    ],
  },
  {
    id: "arquitectura",
    label: "Arquitectura",
    items: [
      { id: "arquitectura-proyectos", label: "Proyectos", href: "#arquitectura-proyectos" },
      { id: "arquitectura-planos", label: "Planos", href: "#arquitectura-planos" },
      { id: "arquitectura-direccion", label: "Direccion de obra", href: "#arquitectura-direccion" },
    ],
  },
  {
    id: "publicidad",
    label: "Publicidad",
    items: [
      { id: "publicidad-digital", label: "Digital", href: "#publicidad-digital" },
      { id: "publicidad-impresa", label: "Impresa", href: "#publicidad-impresa" },
      { id: "publicidad-branding", label: "Branding", href: "#publicidad-branding" },
    ],
  },
];
