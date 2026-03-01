import type { Variants } from "framer-motion";

// Variants reutilizables para animaciones de la barra de navegacion.
export const desktopDropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.14, ease: "easeIn" },
  },
};

export const mobilePanelVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export const mobileItemsVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.16, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};
