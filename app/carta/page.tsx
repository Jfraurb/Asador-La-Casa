import Link from "next/link";
import CartaInteractiva from "@/components/CartaInteractiva";
import { CtaReserva, JsonLd, PageHero } from "@/components/ui";
import { carta } from "@/lib/content";
import { breadcrumbSchema, menuSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Carta: tapas, ibéricos y platos mediterráneos",
  description: "Carta de La Botica de Ale en Huelin, Málaga: gildas, gazpacho, ajoblanco, boquerones, ibéricos, quesos, gambas al pilpil, flamenquín y más. Consulta precios y reserva.",
  path: "/carta",
});

export default function CartaPage() {
  return (
    <>
      <PageHero eyebrow="La carta" title="Fórmulas para compartir" intro="Tapas y entrantes, ibéricos y quesos y los platos de la casa. Filtra por categoría o busca tu plato favorito." />
      <section className="pb-24">
        <div className="wrap">
          <CartaInteractiva categorias={carta.categorias} />
          <aside className="mt-16 grid gap-4 rounded-sm border border-oro/40 bg-marfil-50 p-6 text-sm leading-relaxed text-carbon-600 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8">
            <span className="label text-oro-700">Información</span>
            <div className="space-y-2">
              <p>{carta.nota}</p>
              <p>
                Si tienes alguna alergia o intolerancia alimentaria, infórmanos antes de pedir: nuestro equipo te indicará los alérgenos de cada plato.{" "}
                <Link href="/alergenos" className="text-granate underline underline-offset-2">Información sobre alérgenos</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <CtaReserva titulo="¿Ya sabes qué vas a pedir?" texto="Reserva tu mesa y ven a probarlo." />
      <JsonLd data={menuSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Carta", path: "/carta" }])} />
    </>
  );
}
