"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

const WhatsAppFloatingButton = dynamic(
  () => import("@/components/shared/WhatsAppFloatingButton").then((mod) => mod.WhatsAppFloatingButton),
  { ssr: false },
);

export function ClientEnhancements() {
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false);

  useEffect(() => {
    const showButton = () => setShowFloatingWhatsApp(true);
    const idleCallback = window.requestIdleCallback;

    if (idleCallback) {
      const idleId = idleCallback(showButton, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(showButton, 1800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {showFloatingWhatsApp ? <WhatsAppFloatingButton /> : null}
    </>
  );
}
