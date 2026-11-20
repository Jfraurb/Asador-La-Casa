import "server-only";
import { NextResponse } from "next/server";
import type { Campos, Errores } from "./forms";

const intentos = new Map<string, number[]>();
const VENTANA = 10 * 60 * 1000;
const MAX = 5;

function limitado(ip: string) {
  const ahora = Date.now();
  const lista = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA);
  lista.push(ahora);
  intentos.set(ip, lista);
  return lista.length > MAX;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function procesarFormulario(
  req: Request,
  opts: { validar: (c: Campos) => Errores; asunto: (c: Campos) => string; etiquetas: Record<string, string> }
) {
  let datos: Campos;
  try {
    const body = await req.json();
    datos = Object.fromEntries(Object.entries(body ?? {}).map(([k, v]) => [k, typeof v === "string" ? v.slice(0, 2500) : ""]));
  } catch {
    return NextResponse.json({ ok: false, mensaje: "Solicitud no válida." }, { status: 400 });
  }

  // Antispam: campo trampa oculto + tiempo mínimo de cumplimentación.
  const t = Number(datos._t);
  if (datos.web || !t || Date.now() - t < 3000) {
    return NextResponse.json({ ok: true, enviado: true }); // respuesta neutra para bots
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limitado(ip)) {
    return NextResponse.json({ ok: false, mensaje: "Has enviado demasiadas solicitudes. Inténtalo más tarde o llámanos." }, { status: 429 });
  }

  const errores = opts.validar(datos);
  if (Object.keys(errores).length) return NextResponse.json({ ok: false, errores }, { status: 422 });

  const { RESEND_API_KEY, FORM_TO_EMAIL, FORM_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FORM_TO_EMAIL) {
    return NextResponse.json(
      { ok: false, noConfigurado: true, mensaje: "El envío online aún no está activo. Por favor, reserva en TheFork o llámanos." },
      { status: 503 }
    );
  }

  const filas = Object.entries(opts.etiquetas)
    .filter(([k]) => datos[k])
    .map(([k, l]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${esc(l)}</th><td style="padding:6px 0">${esc(datos[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FORM_FROM_EMAIL || "La Botica de Ale <onboarding@resend.dev>",
      to: FORM_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: datos.email,
      subject: opts.asunto(datos),
      html: `<table style="font-family:sans-serif;font-size:14px">${filas}</table>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.json({ ok: false, mensaje: "No hemos podido enviar tu solicitud. Llámanos o reserva en TheFork." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, enviado: true });
}
