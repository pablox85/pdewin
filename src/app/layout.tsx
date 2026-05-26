import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import { ClientEnhancements } from "@/components/client/ClientEnhancements";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const isClarityEnabled = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = buildMetadata({
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("pde-theme")?.value;
  const isDark = themeCookie !== "light";

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={isDark ? "dark" : undefined}
    >
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        {children}

        {isClarityEnabled ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wwpzr1zea8");
            `}
          </Script>
        ) : null}

        <ClientEnhancements />
        <Analytics />
      </body>
    </html>
  );
}
