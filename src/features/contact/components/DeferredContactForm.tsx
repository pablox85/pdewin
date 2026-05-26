"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./ContactForm").then((mod) => mod.ContactForm), {
  ssr: false,
});

export function DeferredContactForm() {
  const [shouldRender, setShouldRender] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || shouldRender) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 240px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={rootRef}>
      {shouldRender ? (
        <ContactForm />
      ) : (
        <div
          className="lift-card min-h-[520px] rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
