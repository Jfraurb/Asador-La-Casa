import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Reveal from "@/components/Reveal";
import CookieConsent from "@/components/CookieConsent";
import { JsonLd } from "@/components/ui";
import { restaurante, SITE_URL } from "@/lib/content";
import { restaurantSchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });

const title = "La Botica de Ale | Restaurante en Huelin, Málaga";
const description = "Descubre La Botica de Ale, restaurante de cocina mediterránea en Huelin, Málaga. Consulta nuestra carta, descubre nuestros platos y reserva tu mesa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | La Botica de Ale, Huelin (Málaga)" },
  description,
  applicationName: restaurante.nombre,
  keywords: ["La Botica de Ale", "restaurante en Huelin", "restaurante en Málaga", "tapas en Huelin", "dónde comer en Huelin", "restaurante mediterráneo Málaga", "carta La Botica de Ale"],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: SITE_URL, siteName: restaurante.nombre, locale: "es_ES", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${manrope.variable} ${dmsans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#contenido" className="sr-only z-[60] rounded bg-carbon px-4 py-3 text-marfil focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <Reveal />
        <CookieConsent />
        <JsonLd data={restaurantSchema()} />
      </body>
    </html>
  );
}
