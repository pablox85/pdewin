"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/gtag";

// Tracker de navegacion para App Router.
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
