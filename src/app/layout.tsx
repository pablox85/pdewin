import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { buildMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Metadata global SEO para toda la app.
export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var storageKey = "pde-theme";
                var saved = localStorage.getItem(storageKey);
                var shouldUseDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (shouldUseDark) document.documentElement.classList.add("dark");
              })();
            `,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
