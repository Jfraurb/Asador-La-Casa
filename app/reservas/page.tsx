import { JsonLd, PageHero } from "@/components/ui";
import ReservaForm from "@/components/ReservaForm";
import { enlaces, restaurante } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Reservas: reserva tu mesa",
  description: "Reserva mesa en La Botica de Ale, restaurante en Huelin, Málaga. Reserva online en TheFork, llámanos al 682 11 13 99 o envía una solicitud.",
  path: "/reservas",
});

export default function ReservasPage() {
  const r = restaurante;
  return (
    <>
      <PageHero tono="granate" eyebrow="Reservas" title="Tu mesa te está esperando" intro="Elige cómo prefieres reservar. La forma más rápida es TheFork, con confirmación al momento." />

      <section className="py-16 lg:py-24">
        <div className="wrap grid gap-6 lg:grid-cols-3">
          <article className="reveal etiqueta flex flex-col rounded-sm p-8 lg:col-span-2 lg:p-10">
            <span className="label text-oro-700">Opción recomendada</span>
            <h2 className="mt-3 text-4xl font-medium text-carbon">Reserva online en TheFork</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-carbon-600">Consulta la disponibilidad real, elige día, hora y número de personas, y recibe la confirmación de TheFork al instante.</p>
            {r.reservas.widgetAutorizado && r.reservas.widgetUrl ? (
              <iframe title="Reserva en TheFork" src={r.reservas.widgetUrl} className="mt-8 h-[640px] w-full rounded-sm border border-carbon/10 bg-white" loading="lazy" />
            ) : (
              <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-granate mt-8 self-start">
                Reservar en TheFork <span aria-hidden="true">↗</span><span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            )}
          </article>
          <article className="reveal grano flex flex-col rounded-sm bg-botella p-8 text-marfil lg:p-10">
            <span className="label text-oro-300">Por teléfono</span>
            <h2 className="mt-3 text-4xl font-medium">Llámanos</h2>
            <p className="mt-3 leading-relaxed text-marfil/75">Para grupos, celebraciones o si prefieres hablar con nosotros.</p>
            <a href={enlaces.tel} className="btn-oro mt-8 self-start">{r.telefono.visible}</a>
          </article>
        </div>
      </section>

      <section className="grano bg-marfil-200/60 py-16 lg:py-24" aria-labelledby="titulo-solicitud">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <span className="label text-oro-700">Formulario</span>
            <h2 id="titulo-solicitud" className="mt-3 text-4xl font-medium text-carbon sm:text-5xl">Solicitud de reserva</h2>
            <p className="mt-4 leading-relaxed text-carbon-600">Si prefieres, déjanos tus datos y el restaurante te contactará para confirmar la disponibilidad. Hasta entonces, la reserva no está confirmada.</p>
          </div>
          <div className="reveal rounded-sm bg-marfil-50 p-6 shadow-[0_30px_60px_-40px_rgba(41,38,33,.5)] sm:p-10">
            <ReservaForm />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Reservas", path: "/reservas" }])} />
    </>
  );
}
