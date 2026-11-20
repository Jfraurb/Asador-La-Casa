import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/carta", 0.9, "weekly"],
    ["/reservas", 0.9, "monthly"],
    ["/nuestra-esencia", 0.7, "monthly"],
    ["/vinos-y-bebidas", 0.7, "monthly"],
    ["/galeria", 0.6, "monthly"],
    ["/contacto", 0.8, "monthly"],
    ["/alergenos", 0.3, "yearly"],
  ];
  const ahora = new Date();
  return rutas.map(([p, priority, changeFrequency]) => ({ url: `${SITE_URL}${p}`, lastModified: ahora, changeFrequency, priority }));
}
