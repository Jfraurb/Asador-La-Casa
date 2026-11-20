/** Validación compartida entre el navegador y el servidor. */
export type Campos = Record<string, string>;
export type Errores = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL = /^\+?[0-9\s().-]{9,20}$/;

const largo = (v: string | undefined, max: number) => (v ?? "").trim().length > max;

export function hoyISO(d = new Date()) {
  const tz = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
  return `${tz.getFullYear()}-${String(tz.getMonth() + 1).padStart(2, "0")}-${String(tz.getDate()).padStart(2, "0")}`;
}

export function validarReserva(c: Campos): Errores {
  const e: Errores = {};
  if (!c.nombre?.trim()) e.nombre = "Indica tu nombre.";
  else if (largo(c.nombre, 60)) e.nombre = "El nombre es demasiado largo.";
  if (!c.apellidos?.trim()) e.apellidos = "Indica tus apellidos.";
  else if (largo(c.apellidos, 80)) e.apellidos = "Los apellidos son demasiado largos.";
  if (!c.telefono?.trim()) e.telefono = "Indica un teléfono de contacto.";
  else if (!TEL.test(c.telefono.trim()) || c.telefono.replace(/\D/g, "").length < 9) e.telefono = "Revisa el teléfono (mínimo 9 dígitos).";
  if (!c.email?.trim()) e.email = "Indica tu correo electrónico.";
  else if (!EMAIL.test(c.email.trim()) || largo(c.email, 120)) e.email = "Revisa el formato del correo electrónico.";
  if (!c.fecha) e.fecha = "Elige una fecha.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(c.fecha)) e.fecha = "Fecha no válida.";
  else if (c.fecha < hoyISO()) e.fecha = "La fecha no puede ser anterior a hoy.";
  if (!c.hora) e.hora = "Elige una hora.";
  else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(c.hora)) e.hora = "Hora no válida.";
  if (!c.personas) e.personas = "Indica el número de personas.";
  else if (!/^(\d{1,2}|mas-de-12)$/.test(c.personas)) e.personas = "Número de personas no válido.";
  if (largo(c.observaciones, 1000)) e.observaciones = "Máximo 1000 caracteres.";
  if (c.privacidad !== "si") e.privacidad = "Debes aceptar la política de privacidad.";
  return e;
}

export function validarContacto(c: Campos): Errores {
  const e: Errores = {};
  if (!c.nombre?.trim()) e.nombre = "Indica tu nombre.";
  else if (largo(c.nombre, 100)) e.nombre = "El nombre es demasiado largo.";
  if (!c.email?.trim()) e.email = "Indica tu correo electrónico.";
  else if (!EMAIL.test(c.email.trim()) || largo(c.email, 120)) e.email = "Revisa el formato del correo electrónico.";
  if (c.telefono?.trim() && (!TEL.test(c.telefono.trim()) || c.telefono.replace(/\D/g, "").length < 9)) e.telefono = "Revisa el teléfono (mínimo 9 dígitos).";
  if (!c.mensaje?.trim()) e.mensaje = "Escribe tu mensaje.";
  else if (c.mensaje.trim().length < 10) e.mensaje = "El mensaje es demasiado corto.";
  else if (largo(c.mensaje, 2000)) e.mensaje = "Máximo 2000 caracteres.";
  if (c.privacidad !== "si") e.privacidad = "Debes aceptar la política de privacidad.";
  return e;
}
