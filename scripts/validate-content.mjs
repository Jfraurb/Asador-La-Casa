// Comprueba los JSON de /content antes de publicar: node scripts/validate-content.mjs
import { readFileSync } from "node:fs";
const leer = (f) => JSON.parse(readFileSync(new URL(`../content/${f}`, import.meta.url), "utf8"));
const ALERG = ["gluten","crustaceos","huevos","pescado","cacahuetes","soja","lacteos","frutos-cascara","apio","mostaza","sesamo","sulfitos","altramuces","moluscos"];
const errores = [], avisos = [];
const carta = leer("carta.json");
const ids = new Set();
for (const c of carta.categorias) for (const p of c.platos) {
  if (ids.has(p.id)) errores.push(`ID repetido: ${p.id}`); ids.add(p.id);
  if (typeof p.precio !== "number" || p.precio < 0) errores.push(`Precio no válido: ${p.nombre}`);
  for (const a of p.alergenos) if (!ALERG.includes(a)) errores.push(`Alérgeno desconocido "${a}" en ${p.nombre}`);
  if (!p.alergenosConfirmados) avisos.push(`Alérgenos sin confirmar: ${p.nombre}`);
}
if (!carta.aprobadaPorRestaurante) avisos.push("La carta no está marcada como aprobada por el restaurante.");
const r = leer("restaurante.json");
if (!r.valoracion.verificada) avisos.push("Valoración sin verificar (no se muestra en la web).");
if (!r.horario.length) avisos.push("Horario sin confirmar.");
if (!r.email) avisos.push("Email sin confirmar.");
if (!r.redes.length) avisos.push("Redes sociales sin confirmar.");
for (const f of leer("galeria.json").fotos) if (!f.alt?.trim()) errores.push(`Foto sin texto alternativo: ${f.src}`);
avisos.forEach((a) => console.log("⚠ ", a));
errores.forEach((e) => console.error("✖ ", e));
console.log(errores.length ? `\n${errores.length} errores` : `\nContenido válido (${avisos.length} avisos)`);
process.exit(errores.length ? 1 : 0);
