import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Wrapper liviano: evita hidratar Framer Motion en la carga inicial.
export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
