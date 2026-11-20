"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hoyISO, validarReserva } from "@/lib/forms";
import { enlaces, restaurante } from "@/lib/content";
import { useFormulario } from "./useFormulario";
import { Campo, Trampa } from "./Campo";

export default function ReservaForm() {
  const { errores, estado, setEstado, onSubmit, onBlur, formRef, props } = useFormulario("/api/reserva", validarReserva);
  const [hoy, setHoy] = useState("");
  useEffect(() => setHoy(hoyISO()), []);

  if (estado.tipo === "ok") {
    return (
      <div role="status" className="etiqueta rounded-sm p-8 text-center">
        <p className="label text-oro-700">Solicitud recibida</p>
        <h3 className="mt-3 text-3xl font-semibold text-carbon">Gracias, hemos recibido tu solicitud</h3>
        <p className="mt-4 leading-relaxed text-carbon-600">
          <strong>Tu reserva todavía no está confirmada.</strong> El restaurante revisará la disponibilidad y se pondrá en contacto contigo para confirmarla. Si es urgente, llámanos al{" "}
          <a href={enlaces.tel} className="font-semibold text-granate underline">{restaurante.telefono.visible}</a>.
        </p>
        <button type="button" className="btn-linea mt-6" onClick={() => setEstado({ tipo: "inicial" })}>Enviar otra solicitud</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-describedby="aviso-reserva">
      <Trampa />
      <p id="aviso-reserva" className="rounded-sm border-l-2 border-oro bg-oro/10 p-4 text-sm leading-relaxed text-carbon-600 sm:col-span-2">
        Este formulario envía una <strong>solicitud</strong>: la reserva solo queda confirmada cuando el restaurante te responda. Para confirmación inmediata, usa TheFork.
      </p>
      <Campo name="nombre" label="Nombre" error={errores.nombre}><input {...props("nombre")} type="text" autoComplete="given-name" required maxLength={60} /></Campo>
      <Campo name="apellidos" label="Apellidos" error={errores.apellidos}><input {...props("apellidos")} type="text" autoComplete="family-name" required maxLength={80} /></Campo>
      <Campo name="telefono" label="Teléfono" error={errores.telefono}><input {...props("telefono")} type="tel" inputMode="tel" autoComplete="tel" required placeholder="600 000 000" /></Campo>
      <Campo name="email" label="Correo electrónico" error={errores.email}><input {...props("email")} type="email" inputMode="email" autoComplete="email" required placeholder="tu@correo.com" /></Campo>
      <Campo name="fecha" label="Fecha" error={errores.fecha}><input {...props("fecha")} type="date" min={hoy || undefined} required /></Campo>
      <Campo name="hora" label="Hora" error={errores.hora}><input {...props("hora")} type="time" step={900} required /></Campo>
      <Campo name="personas" label="Número de personas" error={errores.personas} className="sm:col-span-2">
        <select {...props("personas")} required defaultValue="">
          <option value="" disabled>Selecciona</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>{n} {n === 1 ? "persona" : "personas"}</option>
          ))}
          <option value="mas-de-12">Más de 12 (grupo)</option>
        </select>
      </Campo>
      <Campo name="observaciones" label="Observaciones" opcional error={errores.observaciones} className="sm:col-span-2">
        <textarea {...props("observaciones")} rows={4} maxLength={1000} placeholder="Alergias, celebraciones, carrito de bebé, accesibilidad…" />
      </Campo>
      <div className="campo sm:col-span-2">
        <label className="!flex items-start gap-3 !font-normal leading-relaxed text-carbon-600">
          <input {...props("privacidad")} type="checkbox" value="si" required className="!mt-1 !h-5 !min-h-0 !w-5 shrink-0 accent-granate" />
          <span>He leído y acepto la <Link href="/privacidad" className="text-granate underline">política de privacidad</Link>. Mis datos se usarán solo para gestionar esta solicitud.</span>
        </label>
        {errores.privacidad ? <p id="e-privacidad" className="error">{errores.privacidad}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-granate disabled:opacity-60" disabled={estado.tipo === "enviando"}>
          {estado.tipo === "enviando" ? "Enviando…" : "Enviar solicitud de reserva"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-granate">
          {estado.tipo === "error" ? estado.mensaje : ""}
        </p>
      </div>
      {estado.tipo === "error" && estado.noConfigurado ? (
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
          <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-oro">Reservar en TheFork</a>
          <a href={enlaces.tel} className="btn-linea">Llamar · {restaurante.telefono.visible}</a>
        </div>
      ) : null}
    </form>
  );
}
