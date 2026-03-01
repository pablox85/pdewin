import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

// Wrapper reutilizable para mantener ritmo visual entre secciones.
export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}
