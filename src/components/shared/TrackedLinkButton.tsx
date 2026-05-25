"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/gtag";

type TrackedLinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
  children: ReactNode;
};

export function TrackedLinkButton({
  href,
  eventName,
  eventParams,
  children,
  onClick,
  ...props
}: TrackedLinkButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
