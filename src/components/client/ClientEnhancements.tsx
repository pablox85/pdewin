"use client";

import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { WhatsAppFloatingButton } from "@/components/shared/WhatsAppFloatingButton";

export function ClientEnhancements() {
  return (
    <>
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <WhatsAppFloatingButton />
    </>
  );
}
