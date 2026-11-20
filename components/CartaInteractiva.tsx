"use client";
import { useEffect, useMemo, useState } from "react";
import type { CategoriaCarta } from "@/lib/content";
import { DishCard } from "./ui";

export default function CartaInteractiva({ categorias }: { categorias: CategoriaCarta[] }) {
  const [activa, setActiva] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("categoria");
    if (c && categorias.some((x) => x.id === c)) setActiva(c);
  }, [categorias]);

  const elegir = (id: string) => {
    setActiva(id);
    const url = new URL(window.location.href);
    if (id === "todas") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", id);
    window.history.replaceState(null, "", url);
  };

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const visibles = useMemo(() => {
    const q = norm(busqueda.trim());
    return categorias
      .filter((c) => activa === "todas" || c.id === activa)
      .map((c) => ({ ...c, platos: q ? c.platos.filter((p) => norm(`${p.nombre} ${p.descripcion}`).includes(q)) : c.platos }))
      .filter((c) => c.platos.length);
  }, [categorias, activa, busqueda]);

  const total = visibles.reduce((n, c) => n + c.platos.length, 0);

  return (
    <div>
      <div className="sticky top-[var(--header-h)] z-20 -mx-4 border-b border-carbon/10 bg-marfil/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-full lg:border lg:px-3 lg:py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrar la carta por categoría" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1">
            {[{ id: "todas", nombre: "Toda la carta" }, ...categorias].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={activa === c.id}
                onClick={() => elegir(c.id)}
                className={`min-h-[44px] shrink-0 rounded-full border px-5 font-detail text-sm font-medium transition ${
                  activa === c.id ? "border-granate bg-granate text-marfil" : "border-carbon/20 bg-white/60 text-carbon hover:border-granate hover:text-granate"
                }`}
              >
                {c.nombre}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <label htmlFor="buscar-plato" className="sr-only">Buscar un plato</label>
            <input
              id="buscar-plato"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar un plato…"
              className="min-h-[44px] w-full rounded-full border border-carbon/20 bg-white/70 px-5 text-base placeholder:text-carbon-500 focus:border-granate focus:outline-none focus:ring-2 focus:ring-granate/20"
            />
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{total} platos mostrados</p>

      {visibles.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-3xl text-carbon">No encontramos ese plato.</p>
          <button type="button" className="btn-linea mt-6" onClick={() => { setBusqueda(""); elegir("todas"); }}>Ver toda la carta</button>
        </div>
      ) : null}

      {visibles.map((c) => (
        <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="pt-16">
          <header className="flex flex-col gap-2 border-b border-oro/40 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="label text-oro-700">{c.etiqueta}</span>
              <h2 id={`h-${c.id}`} className="mt-2 text-4xl font-medium text-carbon sm:text-5xl">{c.nombre}</h2>
            </div>
            <p className="text-carbon-600 sm:max-w-sm sm:text-right">{c.intro}</p>
          </header>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.platos.map((p) => (
              <DishCard key={p.id} plato={p} categoria={c.nombre} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
