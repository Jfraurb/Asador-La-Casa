import Link from "next/link";
import { carta, direccionCompleta, enlaces, galeria, imagenes, platosDestacados, precio, restaurante } from "@/lib/content";
import { Alacena, Icono, Ornamento, Sello } from "@/components/Illustrations";
import { CtaReserva, DishCard, Eyebrow, SectionHeading, Visual } from "@/components/ui";
import MapaUbicacion from "@/components/MapaUbicacion";
import Image from "next/image";

export default function Inicio() {
  const r = restaurante;
  const destacados = platosDestacados();
  const etiquetas = ["Gildas", "Gazpacho", "Ajoblanco", "Tortilla", "Boquerones", "Albóndigas", "Ibéricos", "Quesos", "Pilpil"];

  return (
    <>
      {/* HERO */}
      <section className="grano relative overflow-hidden bg-marfil pt-[var(--header-h)]">
        <div className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_80%_20%,rgba(195,155,101,.22),transparent_70%)]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-12 py-12 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.08fr_1fr] lg:py-16">
          <div className="animate-rise">
            <Eyebrow>Restaurante mediterráneo · Huelin, Málaga</Eyebrow>
            <h1 className="mt-6 text-[3.1rem] font-medium leading-[0.95] tracking-[-0.02em] text-carbon sm:text-7xl xl:text-[5.6rem]">
              El sabor de Málaga tiene su propia <em className="font-normal italic text-granate">botica.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-carbon-600">
              Descubre La Botica de Ale, un rincón gastronómico en Huelin donde disfrutar de la cocina mediterránea, compartir sabores y vivir buenos momentos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/carta" className="btn-granate">Descubrir la carta</Link>
              <Link href="/reservas" className="btn-linea">Reservar mesa</Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-carbon/15 border-y border-carbon/15 py-5">
              <div className="pr-4">
                <dt className="label text-[0.6rem] text-carbon-500">Cocina</dt>
                <dd className="mt-1 font-display text-xl text-carbon sm:text-2xl">Mediterránea</dd>
              </div>
              <div className="px-4">
                <dt className="label text-[0.6rem] text-carbon-500">Precio medio</dt>
                <dd className="mt-1 font-display text-xl text-carbon sm:text-2xl">{r.precioMedio} €</dd>
              </div>
              <div className="pl-4">
                <dt className="label text-[0.6rem] text-carbon-500">Barrio</dt>
                <dd className="mt-1 font-display text-xl text-carbon sm:text-2xl">{r.direccion.barrio}</dd>
              </div>
            </dl>
            {r.valoracion.verificada ? (
              <p className="mt-5 font-detail text-sm text-carbon-600">
                <span className="text-oro-700" aria-hidden="true">★★★★★</span> {r.valoracion.nota.toLocaleString("es-ES")}/{r.valoracion.maximo} · {r.valoracion.resenas} reseñas en {r.valoracion.fuente}
              </p>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-[540px] animate-rise [animation-delay:.15s]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-botella shadow-[0_40px_80px_-40px_rgba(36,60,50,.8)]">
              {imagenes.hero ? (
                <Image src={imagenes.hero} alt={`Platos y bebidas de ${r.nombre}`} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              ) : (
                <>
                  <div className="grano absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(195,155,101,.35),transparent_65%),radial-gradient(80%_50%_at_50%_100%,rgba(100,31,42,.6),transparent_70%)]" />
                  <Alacena etiquetas={etiquetas} className="absolute inset-x-[7%] bottom-[4%] top-[8%] m-auto text-oro" />
                </>
              )}
              <div className="pointer-events-none absolute inset-3 rounded-t-[999px] border border-oro/40" />
            </div>
            <Sello className="absolute -bottom-8 -left-4 h-28 w-28 animate-[spin_40s_linear_infinite] rounded-full bg-marfil p-1 text-granate shadow-lg motion-reduce:animate-none sm:-left-10 sm:h-32 sm:w-32" />
            <div className="etiqueta absolute -right-2 top-10 hidden rotate-3 rounded-sm px-5 py-4 sm:block">
              <p className="label text-[0.6rem] text-oro-700">Fórmula de la casa</p>
              <p className="mt-1 font-display text-xl italic text-granate">Tapas · Raciones · Compartir</p>
            </div>
          </div>
        </div>
      </section>

      {/* FRANJA DE DATOS ÚTILES */}
      <section aria-label="Información práctica" className="bg-botella text-marfil">
        <div className="wrap grid divide-y divide-marfil/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <a href={enlaces.comoLlegar} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-6 sm:px-6 sm:first:pl-0">
            <Icono tipo="mapa" className="h-9 w-9 shrink-0 text-oro" />
            <span><span className="label block text-[0.62rem] text-oro-300">Dirección</span><span className="group-hover:text-oro-300">{direccionCompleta}</span></span>
          </a>
          <a href={enlaces.tel} className="group flex items-center gap-4 py-6 sm:px-6">
            <Icono tipo="copa" className="h-9 w-9 shrink-0 text-oro" />
            <span><span className="label block text-[0.62rem] text-oro-300">Teléfono</span><span className="group-hover:text-oro-300">{r.telefono.visible}</span></span>
          </a>
          <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-6 sm:px-6">
            <Icono tipo="plato" className="h-9 w-9 shrink-0 text-oro" />
            <span><span className="label block text-[0.62rem] text-oro-300">Reservas</span><span className="group-hover:text-oro-300">Reserva online en TheFork ↗</span></span>
          </a>
        </div>
      </section>

      {/* PRESENTACIÓN */}
      <section className="py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Bienvenidos" title={<>Mucho más que <em className="italic text-granate">sentarse a comer.</em></>}>
              <p>En La Botica de Ale queremos que cada visita sea una oportunidad para disfrutar de la gastronomía y compartir buenos momentos alrededor de la mesa.</p>
              <p className="mt-4">Como en las antiguas boticas, cada cosa tiene su sitio y su fórmula: tapas para abrir boca, ibéricos y quesos para picar sin prisa y platos de la casa pensados para el centro de la mesa.</p>
            </SectionHeading>
            <Link href="/nuestra-esencia" className="reveal mt-8 inline-flex items-center gap-2 font-detail text-sm font-semibold uppercase tracking-[0.16em] text-granate underline-offset-8 hover:underline">
              Descubrir el restaurante <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 lg:col-span-6">
            <Visual src={imagenes.esencia} alt={`Interior de ${r.nombre}`} icono="interior" className="col-span-1 row-span-2 aspect-[3/5] rounded-t-full" />
            <div className="etiqueta flex flex-col justify-between rounded-sm p-6">
              <span className="font-display text-5xl text-granate">{carta.categorias.reduce((n, c) => n + c.platos.length, 0)}</span>
              <span className="mt-6 text-sm leading-snug text-carbon-600">fórmulas en nuestra carta, de la gilda al plato de la casa</span>
            </div>
            <div className="flex flex-col justify-between rounded-sm bg-granate p-6 text-marfil">
              <span className="font-display text-5xl">{precio(Math.min(...carta.categorias.flatMap((c) => c.platos.map((p) => p.precio))))}</span>
              <span className="mt-6 text-sm leading-snug text-marfil/80">es lo que cuesta empezar: tapas desde ese precio</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROPUESTA */}
      <section className="grano bg-marfil-200/60 py-24 lg:py-32">
        <div className="wrap">
          <SectionHeading center eyebrow="Nuestra propuesta gastronómica" title="Tres fórmulas, un mismo espíritu mediterráneo" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { n: "I", icono: "tarro" as const, t: "Tapas para compartir", d: "Gildas, gazpacho, ajoblanco, boquerones o tortilla: la tradición de las barras andaluzas, servida para picar al centro." },
              { n: "II", icono: "olivo" as const, t: "Producto mediterráneo", d: "Ibéricos, quesos y recetas donde el producto manda. Cocina sencilla, honesta y reconocible." },
              { n: "III", icono: "plato" as const, t: "Platos de la casa", d: "Gambas al pilpil, alcachofas a la montillana o nuestro Flamenquín La Botica para quienes vienen con hambre." },
            ].map((x) => (
              <article key={x.n} className="reveal etiqueta rounded-sm p-8 text-center">
                <span className="font-display text-lg italic text-oro-700">{x.n}</span>
                <Icono tipo={x.icono} className="mx-auto mt-4 h-16 w-16 text-botella" />
                <h3 className="mt-5 text-3xl font-semibold text-carbon">{x.t}</h3>
                <p className="mt-3 leading-relaxed text-carbon-600">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Platos destacados" title="Las fórmulas que más se piden en la mesa" />
            <Link href="/carta" className="btn-linea reveal shrink-0">Ver carta completa</Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.slice(0, 6).map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <DishCard plato={p} categoria={p.categoria} numero={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARTA: CAJONES */}
      <section className="grano bg-botella py-24 text-marfil lg:py-32">
        <div className="wrap">
          <SectionHeading light eyebrow="Nuestra carta" title="Abre los cajones de la botica">
            <p>Una carta corta, clara y pensada para compartir. Elige por categoría y encuentra tu fórmula.</p>
          </SectionHeading>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {carta.categorias.map((c) => {
              const precios = c.platos.map((p) => p.precio);
              return (
                <Link key={c.id} href={`/carta?categoria=${c.id}`} className="reveal group relative overflow-hidden rounded-sm border border-oro/30 p-8 transition hover:border-oro hover:bg-botella-700">
                  <span className="label text-oro-300">{c.etiqueta}</span>
                  <h3 className="mt-4 text-4xl font-medium">{c.nombre}</h3>
                  <p className="mt-3 text-marfil/70">{c.intro}</p>
                  <p className="mt-8 flex items-center justify-between border-t border-oro/25 pt-4 font-detail text-sm text-marfil/80">
                    <span>{c.platos.length} platos · desde {precio(Math.min(...precios))}</span>
                    <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-oro/50 text-oro transition group-hover:translate-x-1 group-hover:bg-oro group-hover:text-botella">→</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* VINOS */}
      <section className="py-24 lg:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Visual src={imagenes.bodega} alt="Copas y botellas de vino" icono="botella" texto="Bodega mediterránea" className="reveal aspect-[5/4] rounded-sm" />
          <div>
            <SectionHeading eyebrow="Vinos y bebidas" title={<>Una copa para cada <em className="italic text-granate">fórmula</em></>}>
              <p>Tintos, blancos, rosados y espumosos para acompañar las tapas y los platos de la casa. Pregunta a nuestro equipo por las referencias del momento.</p>
            </SectionHeading>
            <Link href="/vinos-y-bebidas" className="btn-linea reveal mt-8">Ver vinos y bebidas</Link>
          </div>
        </div>
      </section>

      {/* GALERÍA (solo si hay fotos reales) */}
      {galeria.fotos.length ? (
        <section className="bg-marfil-200/60 py-24 lg:py-32">
          <div className="wrap">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Galería gastronómica" title="Así se vive La Botica" />
              <Link href="/galeria" className="btn-linea reveal shrink-0">Ver galería</Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {galeria.fotos.slice(0, 8).map((f, i) => (
                <div key={f.src} className={`reveal relative overflow-hidden rounded-sm ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                  <Image src={f.src} alt={f.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* UBICACIÓN */}
      <section className="grano bg-marfil-200/60 py-24 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Ubicación" title="En pleno barrio de Huelin">
              <address className="not-italic">
                {r.direccion.calle}
                <br />
                {r.direccion.codigoPostal} {r.direccion.ciudad}, {r.direccion.pais}
              </address>
            </SectionHeading>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={enlaces.comoLlegar} target="_blank" rel="noopener noreferrer" className="btn-granate">Cómo llegar</a>
              <a href={enlaces.tel} className="btn-linea">Llamar ahora</a>
            </div>
          </div>
          <MapaUbicacion className="reveal h-[420px]" />
        </div>
      </section>

      <div className="flex justify-center bg-marfil py-6" aria-hidden="true"><Ornamento className="w-56 text-oro" /></div>
      <CtaReserva />
    </>
  );
}
