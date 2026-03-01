interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  inverted?: boolean;
}

// Cabecera reusable para todas las secciones de la landing.
export function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
  inverted = false,
}: SectionTitleProps) {
  const titleColor = inverted ? "text-slate-100" : "text-slate-900";
  const descriptionColor = inverted ? "text-slate-300" : "text-slate-600";
  const eyebrowColor = inverted ? "text-blue-200" : "text-brand-700 dark:text-blue-300";

  return (
    <header className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-bold leading-tight sm:text-4xl dark:text-slate-100 ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base sm:text-lg dark:text-slate-300 ${descriptionColor}`}>{description}</p>
      ) : null}
    </header>
  );
}
