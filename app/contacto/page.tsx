import Link from "next/link";
import ContactoForm from "@/components/ContactoForm";
import MapaUbicacion from "@/components/MapaUbicacion";
import { JsonLd, PageHero } from "@/components/ui";
import { enlaces, restaurante } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contacto y ubicación en Huelin",
  description: "Dirección, teléfono y mapa de La Botica de Ale: Calle Tomás Echeverría, 3, 29002 Málaga (Huelin). Llámanos al 682 11 13 99 o reserva online.",
  path: "/contacto",
});

export default function ContactoPage() {
  const r = restaurante;
  return (
    <>
      <PageHero eyebrow="Contacto y ubicación" title="Ven a vernos a Huelin" intro="Estamos en la Calle Tomás Echeverría, 3. Llámanos, reserva online o escríbenos." />

      <section className="py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal space-y-8">
            <div>
              <h2 className="label text-oro-700">Dirección</h2>
              <address className="mt-2 font-display text-3xl not-italic leading-tight text-carbon">
                {r.direccion.calle}
                <br />
                {r.direccion.codigoPostal} {r.direccion.ciudad}, {r.direccion.pais}
              </address>
              <p className="mt-1 text-carbon-600">Barrio de {r.direccion.barrio}</p>
            </div>
            <div>
              <h2 className="label text-oro-700">Teléfono</h2>
              <a href={enlaces.tel} className="mt-2 inline-block font-display text-3xl text-granate hover:underline">{r.telefono.visible}</a>
            </div>
            <div>
              <h2 className="label text-oro-700">Horario</h2>
              {r.horario.length ? (
                <dl className="mt-2 space-y-1">
                  {r.horario.map((h) => (
                    <div key={h.dia} className="flex justify-between gap-4 border-b border-carbon/10 py-1.5"><dt>{h.dia}</dt><dd className="font-semibold">{h.horas}</dd></div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 text-carbon-600">{r.notaHorario}</p>
              )}
            </div>
            {r.email ? (
              <div>
                <h2 className="label text-oro-700">Correo electrónico</h2>
                <a href={`mailto:${r.email}`} className="mt-2 inline-block text-lg text-granate hover:underline">{r.email}</a>
              </div>
            ) : null}
            {r.redes.length ? (
              <div>
                <h2 className="label text-oro-700">Síguenos</h2>
                <ul className="mt-2 flex flex-wrap gap-4">
                  {r.redes.map((s) => (<li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-granate underline underline-offset-4">{s.nombre}</a></li>))}
                </ul>
              </div>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={enlaces.comoLlegar} target="_blank" rel="noopener noreferrer" className="btn-granate">Cómo llegar</a>
              <a href={enlaces.tel} className="btn-linea">Llamar</a>
              <Link href="/reservas" className="btn-linea">Reservar</Link>
            </div>
          </div>
          <MapaUbicacion className="reveal h-[460px] lg:h-auto" />
        </div>
      </section>

      <section className="grano bg-marfil-200/60 py-16 lg:py-24" aria-labelledby="titulo-contacto">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <span className="label text-oro-700">Escríbenos</span>
            <h2 id="titulo-contacto" className="mt-3 text-4xl font-medium text-carbon sm:text-5xl">Formulario de contacto</h2>
            <p className="mt-4 leading-relaxed text-carbon-600">Para consultas generales, grupos o celebraciones. Si quieres reservar, te recomendamos <Link href="/reservas" className="text-granate underline">la página de reservas</Link>.</p>
          </div>
          <div className="reveal rounded-sm bg-marfil-50 p-6 shadow-[0_30px_60px_-40px_rgba(41,38,33,.5)] sm:p-10">
            <ContactoForm />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Contacto", path: "/contacto" }])} />
    </>
  );
}
