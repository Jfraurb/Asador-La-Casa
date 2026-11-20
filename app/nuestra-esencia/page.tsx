import Link from "next/link";
import { CtaReserva, JsonLd, PageHero, SectionHeading, Visual } from "@/components/ui";
import { Icono, Ornamento } from "@/components/Illustrations";
import { imagenes, restaurante } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nuestra esencia",
  description: "La esencia de La Botica de Ale: cocina mediterránea, tapas y raciones para compartir y producto en un restaurante del barrio de Huelin, Málaga.",
  path: "/nuestra-esencia",
});

const principios = [
  { icono: "olivo" as const, t: "Cocina mediterránea", d: "Recetas de aquí y del sur: gazpacho, ajoblanco, boquerones en vinagre, alcachofas o pastel de cabracho. Sabores reconocibles que forman parte de nuestra cultura." },
  { icono: "tarro" as const, t: "Tapas y raciones", d: "Una carta pensada para picar, probar y repetir. Desde una gilda para el aperitivo hasta los platos de la casa para el centro de la mesa." },
  { icono: "plato" as const, t: "Gastronomía española", d: "Ibéricos, quesos, tortilla de patatas, flamenquín: el recetario español que se disfruta en buena compañía." },
  { icono: "botella" as const, t: "Producto", d: "La cocina sencilla depende de lo que llega a la mesa. Por eso el producto es el protagonista de cada plato." },
  { icono: "copa" as const, t: "Compartir", d: "Aquí los platos van al centro. Comer es una excusa para reunirse, conversar y alargar la sobremesa." },
  { icono: "interior" as const, t: "Experiencia", d: "Un rincón del barrio de Huelin para disfrutar sin prisa, con la atención y el cuidado de una botica de las de antes." },
];

export default function EsenciaPage() {
  return (
    <>
      <PageHero tono="granate" eyebrow="Nuestra esencia" title="La esencia de La Botica de Ale" intro="Una botica de sabores mediterráneos: un lugar donde cada plato tiene su fórmula y cada mesa, su momento." />

      <section className="py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Visual src={imagenes.esencia} alt={`Interior de ${restaurante.nombre}`} icono="interior" className="reveal aspect-[4/5] rounded-t-full lg:sticky lg:top-28" />
          </div>
          <div className="prose-botica lg:col-span-7 lg:pt-8">
            <SectionHeading eyebrow="La idea" title={<>Las antiguas boticas guardaban <em className="italic text-granate">fórmulas.</em> Nosotros, sabores.</>} />
            <div className="reveal mt-8">
              <p>Las boticas de antes eran lugares de confianza en cada barrio: estanterías ordenadas, tarros etiquetados y la seguridad de encontrar justo lo que se necesitaba. En La Botica de Ale tomamos esa idea y la llevamos a la mesa.</p>
              <p>Nuestra carta es corta y clara a propósito. Tapas y entrantes para abrir boca, ibéricos y quesos para picar sin prisa y especialidades de la casa para compartir. Cocina mediterránea y española, servida en un ambiente cercano en pleno Huelin.</p>
              <p>No buscamos complicar las cosas: buscamos que vuelvas.</p>
            </div>
            <Ornamento className="reveal my-10 w-48 text-oro" />
          </div>
        </div>
      </section>

      <section className="grano bg-marfil-200/60 py-24 lg:py-32">
        <div className="wrap">
          <SectionHeading center eyebrow="Nuestros principios" title="Seis ingredientes de la casa" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-oro/40 bg-oro/40 sm:grid-cols-2 lg:grid-cols-3">
            {principios.map((p, i) => (
              <article key={p.t} className="reveal bg-marfil-50 p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <Icono tipo={p.icono} className="h-12 w-12 text-botella" />
                  <span className="font-display text-lg italic text-oro-700">Nº {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-carbon">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-carbon-600">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-14 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/carta" className="btn-granate">Ver la carta</Link>
            <Link href="/galeria" className="btn-linea">Ver la galería</Link>
          </div>
        </div>
      </section>
      <CtaReserva />
      <JsonLd data={breadcrumbSchema([{ name: "Nuestra esencia", path: "/nuestra-esencia" }])} />
    </>
  );
}
