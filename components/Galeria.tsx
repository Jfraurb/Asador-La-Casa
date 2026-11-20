"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Foto } from "@/lib/content";

export default function Galeria({ fotos, categorias }: { fotos: Foto[]; categorias: string[] }) {
  const [filtro, setFiltro] = useState("Todas");
  const [indice, setIndice] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const origenRef = useRef<HTMLElement | null>(null);

  const usadas = categorias.filter((c) => fotos.some((f) => f.categoria === c));
  const visibles = filtro === "Todas" ? fotos : fotos.filter((f) => f.categoria === filtro);

  const abrir = (i: number, el: HTMLElement) => {
    origenRef.current = el;
    setIndice(i);
  };
  const cerrar = useCallback(() => setIndice(null), []);
  const mover = useCallback((d: number) => setIndice((i) => (i === null ? i : (i + d + visibles.length) % visibles.length)), [visibles.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (indice !== null && !dlg.open) dlg.showModal();
    if (indice === null && dlg.open) {
      dlg.close();
      origenRef.current?.focus();
    }
  }, [indice]);

  useEffect(() => {
    if (indice === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indice, mover]);

  const actual = indice !== null ? visibles[indice] : null;

  return (
    <div>
      {usadas.length > 1 ? (
        <div role="group" aria-label="Filtrar la galería" className="scrollbar-none -mx-1 mb-10 flex gap-2 overflow-x-auto px-1">
          {["Todas", ...usadas].map((c) => (
            <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}
              className={`min-h-[44px] shrink-0 rounded-full border px-5 font-detail text-sm font-medium transition ${filtro === c ? "border-granate bg-granate text-marfil" : "border-carbon/20 text-carbon hover:border-granate hover:text-granate"}`}>
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {visibles.map((f, i) => (
          <li key={f.src} className="break-inside-avoid">
            <button type="button" onClick={(e) => abrir(i, e.currentTarget)} className="group relative block w-full overflow-hidden rounded-sm" aria-label={`Ampliar imagen: ${f.alt}`}>
              <Image src={f.src} alt={f.alt} width={f.ancho} height={f.alto} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-carbon/70 to-transparent p-4 pt-12 text-left text-marfil opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="label text-[0.62rem] text-oro-300">{f.categoria}</span>
                {f.pie ? <span className="ml-4 text-sm">{f.pie}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} onClose={cerrar} onClick={(e) => e.target === dialogRef.current && cerrar()}
        aria-label="Visor de imágenes"
        className="m-0 h-full max-h-none w-full max-w-none bg-carbon/95 p-0 text-marfil backdrop:bg-carbon/80">
        {actual ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
              <p className="label text-oro-300" aria-live="polite">{(indice ?? 0) + 1} / {visibles.length} · {actual.categoria}</p>
              <button type="button" onClick={cerrar} className="grid h-12 w-12 place-items-center rounded-full border border-marfil/30 text-2xl hover:border-oro" aria-label="Cerrar visor">×</button>
            </div>
            <figure className="relative flex flex-1 items-center justify-center px-4 pb-4">
              <Image src={actual.src} alt={actual.alt} width={actual.ancho} height={actual.alto} sizes="100vw" className="max-h-[calc(100dvh-9rem)] w-auto object-contain" />
              {actual.pie ? <figcaption className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-carbon/70 px-3 py-1 text-sm">{actual.pie}</figcaption> : null}
            </figure>
            {visibles.length > 1 ? (
              <div className="flex justify-center gap-3 pb-6">
                <button type="button" onClick={() => mover(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-marfil/30 hover:border-oro" aria-label="Imagen anterior">←</button>
                <button type="button" onClick={() => mover(1)} className="grid h-12 w-12 place-items-center rounded-full border border-marfil/30 hover:border-oro" aria-label="Imagen siguiente">→</button>
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
