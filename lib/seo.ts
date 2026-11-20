import type { Metadata } from "next";
import { carta, restaurante, SITE_URL } from "./content";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, type: "website", locale: "es_ES", siteName: restaurante.nombre },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function restaurantSchema() {
  const r = restaurante;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurante`,
    name: r.nombre,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: r.telefono.e164,
    servesCuisine: ["Mediterránea", "Española", "Tapas"],
    priceRange: `${r.precioMedio} € (precio medio)`,
    currenciesAccepted: "EUR",
    acceptsReservations: r.reservas.url,
    hasMenu: `${SITE_URL}/carta`,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.direccion.calle,
      postalCode: r.direccion.codigoPostal,
      addressLocality: r.direccion.ciudad,
      addressRegion: "Andalucía",
      addressCountry: "ES",
    },
    areaServed: { "@type": "Place", name: `${r.direccion.barrio}, ${r.direccion.ciudad}` },
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: r.reservas.url, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      result: { "@type": "FoodEstablishmentReservation", name: `Reserva en ${r.nombre}` },
    },
  };
  if (r.email) data.email = r.email;
  if (r.redes.length) data.sameAs = r.redes.map((s) => s.url);
  // La valoración solo se publica si se ha verificado (y Google no muestra
  // estrellas de valoraciones propias de LocalBusiness, por eso no se añade aggregateRating).
  return data;
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Carta de ${restaurante.nombre}`,
    url: `${SITE_URL}/carta`,
    inLanguage: "es",
    hasMenuSection: carta.categorias.map((c) => ({
      "@type": "MenuSection",
      name: c.nombre,
      hasMenuItem: c.platos.map((p) => ({
        "@type": "MenuItem",
        name: p.nombre,
        description: p.descripcion,
        offers: { "@type": "Offer", price: p.precio.toFixed(2), priceCurrency: "EUR" },
      })),
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
