import { Collapsible } from "@/components/shared";

export function CoverageCollapsible() {
  return (
    <Collapsible
      containerClassName="new-content-highlight mt-3 max-w-3xl text-slate-700 dark:text-slate-300"
      title="Ver zonas de cobertura"
      titleClassName="text-base font-medium sm:text-lg"
      panelId="coverage-panel"
    >
      <p className="text-base sm:text-lg">
        Atendemos clientes en Ciudad de la Costa, Canelones, Montevideo y Maldonado. Si la distancia es un
        factor importante para vos, coordinamos agenda por zona para facilitar el servicio.
      </p>
    </Collapsible>
  );
}
