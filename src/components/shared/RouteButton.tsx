"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRouter } from "next/navigation";

type RouteButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  children: ReactNode;
};

// Boton con navegacion interna para evitar exponer el href en el tooltip del navegador.
export function RouteButton({
  href,
  replace = false,
  scroll = true,
  className,
  children,
  onClick,
  ...props
}: RouteButtonProps) {
  const router = useRouter();

  const navigate = () => {
    if (replace) {
      router.replace(href, { scroll });
      return;
    }

    router.push(href, { scroll });
  };

  const handleClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      navigate();
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
