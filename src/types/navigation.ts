// Tipos base para mantener la barra de navegacion tipada y reutilizable.
export interface DropdownItem {
  id: string;
  label: string;
  href: string;
}

export interface NavMenu {
  id: string;
  label: string;
  items: DropdownItem[];
}
