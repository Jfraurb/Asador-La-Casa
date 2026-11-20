"use client";
import Link from "next/link";
import { validarContacto } from "@/lib/forms";
import { enlaces, restaurante } from "@/lib/content";
import { useFormulario } from "./useFormulario";
import { Campo, Trampa } from "./Campo";

export default function ContactoForm() {
  const { errores, estado, setEstado, onSubmit, onBlur, formRef, props } = useFormulario("/api/contacto", validarContacto);

  if (estado.tipo === "ok") {
    return (
      <div role="status" className="etiqueta rounded-sm p-8 text-center">
        <h3 className="text-3xl font-semibold text-carbon">Mensaje enviado</h3>
        <p className="mt-3 text-carbon-600">Gracias por escribirnos. Te responderemos lo antes posible.</p>
        <button type="button" className="btn-linea mt-6" onClick={() => setEstado({ tipo: "inicial" })}>Escribir otro mensaje</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Trampa />
      <Campo name="nombre" label="Nombre" error={errores.nombre}><input {...props("nombre")} type="text" autoComplete="name" required maxLength={100} /></Campo>
      <Campo name="email" label="Correo electrónico" error={errores.email}><input {...props("email")} type="email" inputMode="email" autoComplete="email" required /></Campo>
      <Campo name="telefono" label="Teléfono" opcional error={errores.telefono} className="sm:col-span-2"><input {...props("telefono")} type="tel" inputMode="tel" autoComplete="tel" /></Campo>
      <Campo name="mensaje" label="Mensaje" error={errores.mensaje} className="sm:col-span-2"><textarea {...props("mensaje")} rows={5} required maxLength={2000} placeholder="Grupos, celebraciones, consultas sobre la carta…" /></Campo>
      <div className="campo sm:col-span-2">
        <label className="!flex items-start gap-3 !font-normal leading-relaxed text-carbon-600">
          <input {...props("privacidad")} type="checkbox" value="si" required className="!mt-1 !h-5 !min-h-0 !w-5 shrink-0 accent-granate" />
          <span>He leído y acepto la <Link href="/privacidad" className="text-granate underline">política de privacidad</Link>.</span>
        </label>
        {errores.privacidad ? <p id="e-privacidad" className="error">{errores.privacidad}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-granate disabled:opacity-60" disabled={estado.tipo === "enviando"}>
          {estado.tipo === "enviando" ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-granate">{estado.tipo === "error" ? estado.mensaje : ""}</p>
      </div>
      {estado.tipo === "error" && estado.noConfigurado ? (
        <a href={enlaces.tel} className="btn-linea sm:col-span-2 sm:justify-self-start">Llamar · {restaurante.telefono.visible}</a>
      ) : null}
    </form>
  );
}
