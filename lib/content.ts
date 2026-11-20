import restauranteData from "@/content/restaurante.json";
import cartaData from "@/content/carta.json";
import bebidasData from "@/content/bebidas.json";
import galeriaData from "@/content/galeria.json";
import imagenesData from "@/content/imagenes.json";

export type AlergenoId =
  | "gluten" | "crustaceos" | "huevos" | "pescado" | "cacahuetes" | "soja" | "lacteos"
  | "frutos-cascara" | "apio" | "mostaza" | "sesamo" | "sulfitos" | "altramuces" | "moluscos";

/** Los 14 alérgenos de declaración obligatoria (Reglamento UE 1169/2011, anexo II). */
export const ALERGENOS: Record<AlergenoId, string> = {
  gluten: "Gluten",
  crustaceos: "Crustáceos",
  huevos: "Huevos",
  pescado: "Pescado",
  cacahuetes: "Cacahuetes",
  soja: "Soja",
  lacteos: "Lácteos",
  "frutos-cascara": "Frutos de cáscara",
  apio: "Apio",
  mostaza: "Mostaza",
  sesamo: "Sésamo",
  sulfitos: "Sulfitos",
  altramuces: "Altramuces",
  moluscos: "Moluscos",
};

export interface Plato {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  imagenAlt?: string;
  alergenos: string[];
  alergenosConfirmados: boolean;
  destacado: boolean;
}
export interface CategoriaCarta {
  id: string;
  nombre: string;
  etiqueta: string;
  intro: string;
  platos: Plato[];
}
export interface Carta {
  aprobadaPorRestaurante: boolean;
  fuente: string;
  nota: string;
  categorias: CategoriaCarta[];
}

export interface ReferenciaBebida {
  nombre: string;
  descripcion?: string;
  origen?: string;
  precioCopa?: number | null;
  precioBotella?: number | null;
  precio?: number | null;
}
export interface CategoriaBebida {
  id: string;
  nombre: string;
  etiqueta: string;
  intro: string;
  referencias: ReferenciaBebida[];
}
export interface Bebidas {
  publicada: boolean;
  nota: string;
  categorias: CategoriaBebida[];
}

export interface Foto {
  src: string;
  alt: string;
  categoria: string;
  ancho: number;
  alto: number;
  pie?: string;
}
export interface Galeria {
  categorias: string[];
  fotos: Foto[];
}

export interface Horario {
  dia: string;
  horas: string;
}
export interface Red {
  nombre: string;
  url: string;
}
export interface Restaurante {
  nombre: string;
  actividad: string;
  cocina: string;
  direccion: { calle: string; codigoPostal: string; ciudad: string; provincia: string; pais: string; barrio: string };
  telefono: { visible: string; e164: string };
  precioMedio: number;
  reservas: { proveedor: string; url: string; widgetAutorizado: boolean; widgetUrl: string };
  valoracion: { nota: number; maximo: number; resenas: number; fuente: string; verificada: boolean; fechaVerificacion: string };
  email: string;
  horario: Horario[];
  redes: Red[];
  notaHorario: string;
}

export const restaurante = restauranteData as Restaurante;
export const carta = cartaData as Carta;
export const bebidas = bebidasData as Bebidas;
export const galeria = galeriaData as Galeria;
export const imagenes = imagenesData as Record<"hero" | "esencia" | "bodega" | "ubicacion", string>;

const r = restaurante;
export const direccionCompleta = `${r.direccion.calle}, ${r.direccion.codigoPostal} ${r.direccion.ciudad}`;
const q = encodeURIComponent(`${r.nombre}, ${direccionCompleta}, ${r.direccion.pais}`);
export const enlaces = {
  tel: `tel:${r.telefono.e164}`,
  reservar: r.reservas.url,
  comoLlegar: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  mapa: `https://www.google.com/maps/search/?api=1&query=${q}`,
  mapaEmbed: `https://www.google.com/maps?q=${q}&output=embed`,
};

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.laboticadeale.es").replace(/\/$/, "");

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
export function precio(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "";
  return eur.format(n).replace(/,00\s/, " ").replace(/,00$/, "");
}

export function platosDestacados(): (Plato & { categoria: string })[] {
  return carta.categorias.flatMap((c) => c.platos.filter((p) => p.destacado).map((p) => ({ ...p, categoria: c.nombre })));
}

export function nombreAlergeno(id: string): string {
  return ALERGENOS[id as AlergenoId] ?? id;
}
