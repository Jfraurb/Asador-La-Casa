import { CtaReserva, JsonLd, PageHero, Visual } from "@/components/ui";
import { Icono, Ornamento } from "@/components/Illustrations";
import { bebidas, imagenes, precio } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vinos y bebidas",
  description: "Vinos tintos, blancos, rosados, espumosos y otras bebidas para acompañar las tapas y platos de La Botica de Ale en Huelin, Málaga.",
  path: "/vinos-y-bebidas",
});

const iconos = ["copa", "copa", "copa", "botella", "botella"] as const;

export default function VinosPage() {
  const hayReferencias = bebidas.publicada && bebidas.categorias.some((c) => c.referencias.length);
  return (
    <>
      <PageHero tono="botella" eyebrow="Vinos y bebidas" title="La bodega de la botica" intro="Tintos, blancos, rosados y espumosos para acompañar cada fórmula de la carta." />

      <section className="py-20 lg:py-28">
        <div className="wrap">
          {!hayReferencias ? (
            <div className="reveal etiqueta mx-auto max-w-2xl rounded-sm p-8 text-center sm:p-10">
              <Ornamento className="mx-auto w-40 text-oro" />
              <p className="mt-5 font-display text-2xl leading-snug text-carbon sm:text-3xl">{bebidas.nota}</p>
            </div>
          ) : null}

          <nav aria-label="Categorías de bebidas" className="reveal mt-14 flex flex-wrap justify-center gap-2">
            {bebidas.categorias.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="min-h-[44px] rounded-full border border-carbon/20 px-5 py-2.5 font-detail text-sm font-medium hover:border-granate hover:text-granate">{c.nombre}</a>
            ))}
          </nav>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bebidas.categorias.map((c, i) => (
              <section key={c.id} id={c.id} aria-labelledby={`b-${c.id}`} className={`reveal grano relative overflow-hidden rounded-sm bg-botella p-8 text-marfil ${i === 0 ? "lg:row-span-2" : ""}`}>
                <div className="absolute inset-3 border border-oro/25" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="label text-oro-300">{c.etiqueta}</span>
                    <Icono tipo={iconos[i % iconos.length]} className="h-10 w-10 text-oro" />
                  </div>
                  <h2 id={`b-${c.id}`} className="mt-6 text-4xl font-medium">{c.nombre}</h2>
                  <p className="mt-3 text-marfil/70">{c.intro}</p>
                  {bebidas.publicada && c.referencias.length ? (
                    <ul className="mt-8 divide-y divide-oro/20 border-t border-oro/25">
                      {c.referencias.map((v) => (
                        <li key={v.nombre} className="py-4">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="text-2xl">{v.nombre}</h3>
                            <p className="shrink-0 font-detail text-sm text-oro-300">
                              {[v.precioCopa ? `Copa ${precio(v.precioCopa)}` : "", v.precioBotella ? `Botella ${precio(v.precioBotella)}` : "", v.precio ? precio(v.precio) : ""].filter(Boolean).join(" · ")}
                            </p>
                          </div>
                          {v.origen ? <p className="label mt-1 text-[0.6rem] text-oro-300/80">{v.origen}</p> : null}
                          {v.descripcion ? <p className="mt-1 text-sm text-marfil/70">{v.descripcion}</p> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-8 border-t border-oro/25 pt-4 font-detail text-sm text-marfil/60">Consulta las referencias disponibles con nuestro equipo.</p>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
            <Visual src={imagenes.bodega} alt="Servicio de vino en La Botica de Ale" icono="botella" texto="Detalles de servicio" className="reveal aspect-[4/3] rounded-sm" />
            <div className="reveal">
              <h2 className="text-4xl font-medium text-carbon sm:text-5xl">Maridar es compartir</h2>
              <p className="mt-5 text-lg leading-relaxed text-carbon-600">Pide consejo en sala: te ayudaremos a elegir una copa que acompañe a las tapas, los ibéricos o los platos de la casa.</p>
            </div>
          </div>
        </div>
      </section>
      <CtaReserva />
      <JsonLd data={breadcrumbSchema([{ name: "Vinos y bebidas", path: "/vinos-y-bebidas" }])} />
    </>
  );
}
