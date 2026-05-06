"use client";

import { useId, useState, type ReactNode } from "react";

interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onToggle?: (nextOpen: boolean) => void;
  panelId?: string;
  containerClassName?: string;
  triggerClassName?: string;
  titleClassName?: string;
  contentWrapClassName?: string;
  contentInnerClassName?: string;
}

export function Collapsible({
  title,
  children,
  isOpen,
  defaultOpen = false,
  onToggle,
  panelId,
  containerClassName = "",
  triggerClassName = "",
  titleClassName = "",
  contentWrapClassName = "",
  contentInnerClassName = "",
}: CollapsibleProps) {
  const autoId = useId();
  const resolvedPanelId = panelId ?? `collapsible-panel-${autoId.replace(/:/g, "")}`;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen ?? internalOpen;

  const handleToggle = () => {
    const nextOpen = !open;

    if (isOpen === undefined) {
      setInternalOpen(nextOpen);
    }

    onToggle?.(nextOpen);
  };

  return (
    <div className={containerClassName}>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-3 text-left ${triggerClassName}`}
        aria-expanded={open}
        aria-controls={resolvedPanelId}
        onClick={handleToggle}
      >
        <span className={titleClassName}>{title}</span>
        <span
          className={`inline-block text-xl leading-none transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>
      <div className={`faq-answer-wrap mt-2 ${open ? "faq-answer-wrap--open" : ""} ${contentWrapClassName}`} id={resolvedPanelId}>
        <div className={`faq-answer-inner ${open ? "faq-answer-inner--open" : ""} ${contentInnerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
