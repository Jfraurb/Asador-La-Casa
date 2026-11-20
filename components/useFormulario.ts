"use client";
import { useRef, useState, type FormEvent } from "react";
import type { Campos, Errores } from "@/lib/forms";

export type Estado = { tipo: "inicial" } | { tipo: "enviando" } | { tipo: "ok" } | { tipo: "error"; mensaje: string; noConfigurado?: boolean };

export function useFormulario(endpoint: string, validar: (c: Campos) => Errores) {
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<Estado>({ tipo: "inicial" });
  const inicio = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const leer = (f: HTMLFormElement): Campos => {
    const fd = new FormData(f);
    const c: Campos = {};
    fd.forEach((v, k) => (c[k] = typeof v === "string" ? v : ""));
    if (!fd.has("privacidad")) c.privacidad = "";
    return c;
  };

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = (e.target as unknown as HTMLInputElement).name;
    if (!name || !formRef.current) return;
    const err = validar(leer(formRef.current));
    setErrores((prev) => {
      const n = { ...prev };
      if (err[name]) n[name] = err[name];
      else delete n[name];
      return n;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const campos = leer(f);
    const err = validar(campos);
    setErrores(err);
    if (Object.keys(err).length) {
      const primero = f.querySelector<HTMLElement>(`[name="${Object.keys(err)[0]}"]`);
      primero?.focus();
      setEstado({ tipo: "error", mensaje: `Revisa ${Object.keys(err).length === 1 ? "el campo marcado" : `los ${Object.keys(err).length} campos marcados`}.` });
      return;
    }
    setEstado({ tipo: "enviando" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, _t: String(inicio.current) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setEstado({ tipo: "ok" });
        f.reset();
        return;
      }
      if (data.errores) setErrores(data.errores);
      setEstado({ tipo: "error", mensaje: data.mensaje || "No se ha podido enviar. Inténtalo de nuevo.", noConfigurado: data.noConfigurado });
    } catch {
      setEstado({ tipo: "error", mensaje: "Sin conexión. Comprueba tu red o llámanos." });
    }
  };

  const props = (name: string) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errores[name] ? (true as const) : undefined,
    "aria-describedby": errores[name] ? `e-${name}` : undefined,
  });

  return { errores, estado, setEstado, onSubmit, onBlur, formRef, props };
}
