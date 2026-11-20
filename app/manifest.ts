import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Botica de Ale · Restaurante en Huelin, Málaga",
    short_name: "La Botica de Ale",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0E7",
    theme_color: "#641F2A",
    lang: "es",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
