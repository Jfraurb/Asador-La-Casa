import Link from "next/link";
import Galeria from "@/components/Galeria";
import { CtaReserva, JsonLd, PageHero } from "@/components/ui";
import { Icono, Ornamento } from "@/components/Illustrations";
import { enlaces, galeria } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Galería: platos, tapas e interior",
  description: "Fotografías de los platos, tapas, especialidades, vinos e interior de La Botica de Ale, restaurante en Huelin, Málaga.",
  path: "/galeria",
});

const iconos = { Platos: "plato", Tapas: "tarro", Especialidades: "olivo", Vinos: "copa", Interior: "interior", Ambiente: "botella" } as const;

export default function GaleriaPage() {
  return (
    <>
      <PageHero eyebrow="Galería" title="La botica, en imágenes" intro="Platos, tapas, especialidades, vinos, interior y ambiente de La Botica de Ale." />
      <section className="pb-24 pt-14">
        <div className="wrap">
          {galeria.fotos.length ? (
            <Galeria fotos={galeria.fotos} categorias={galeria.categorias} />
          ) : (
            <div className="reveal">
              <div className="etiqueta mx-auto max-w-2xl rounded-sm p-8 text-center sm:p-12">
                <Ornamento className="mx-auto w-40 text-oro" />
                <h2 className="mt-6 text-3xl font-medium text-carbon sm:text-4xl">Nuestra galería se está preparando</h2>
                <p className="mt-4 leading-relaxed text-carbon-600">Muy pronto podrás ver aquí fotografías reales de nuestros platos y del local. Mientras tanto, la mejor forma de conocernos es venir.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/reservas" className="btn-granate">Reservar mesa</Link>
                  <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-linea">Ver el perfil en TheFork</a>
                </div>
              </div>
              <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Categorías de la galería">
                {galeria.categorias.map((c) => (
                  <li key={c} className="grano flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-sm bg-botella text-oro">
                    <Icono tipo={iconos[c as keyof typeof iconos] ?? "plato"} className="h-12 w-12" />
                    <span className="label text-oro-300">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <CtaReserva />
      <JsonLd data={breadcrumbSchema([{ name: "Galería", path: "/galeria" }])} />
    </>
  );
}
