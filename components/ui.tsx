import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { enlaces, nombreAlergeno, precio, restaurante, type Plato } from "@/lib/content";
import { Alacena, Icono, Ornamento } from "./Illustrations";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label flex items-center gap-3 text-oro-700 ${className}`}><span aria-hidden="true" className="h-px w-8 bg-current" />{children}</p>;
}

export function SectionHeading({ eyebrow, title, children, center = false, as: Tag = "h2", light = false }: { eyebrow?: string; title: ReactNode; children?: ReactNode; center?: boolean; as?: "h1" | "h2"; light?: boolean }) {
  return (
    <div className={`reveal max-w-3xl ${center ? "mx-auto text-center [&_.label]:justify-center" : ""}`}>
      {eyebrow ? <Eyebrow className={light ? "!text-oro-300" : ""}>{eyebrow}</Eyebrow> : null}
      <Tag className={`mt-4 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-[3.6rem] ${light ? "text-marfil" : "text-carbon"}`}>{title}</Tag>
      {children ? <div className={`mt-5 text-[1.05rem] leading-[1.8] ${light ? "text-marfil/75" : "text-carbon-600"}`}>{children}</div> : null}
    </div>
  );
}

/** Cabecera de página interior. */
export function PageHero({ eyebrow, title, intro, tono = "marfil" }: { eyebrow: string; title: string; intro?: string; tono?: "marfil" | "botella" | "granate" }) {
  const bg = tono === "botella" ? "bg-botella text-marfil" : tono === "granate" ? "bg-granate text-marfil" : "bg-marfil-200/60 text-carbon";
  const light = tono !== "marfil";
  return (
    <section className={`grano relative overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+6rem)] ${bg}`}>
      <Alacena aria-hidden="true" role="presentation" className={`pointer-events-none absolute -right-24 -top-10 hidden h-[130%] md:block ${light ? "text-oro/15" : "text-oro/25"}`} />
      <div className="wrap relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} light={light}>
          {intro ? <p>{intro}</p> : null}
        </SectionHeading>
      </div>
    </section>
  );
}

/** Imagen real si existe; si no, una composición ilustrada decorativa (nunca una foto genérica). */
export function Visual({ src, alt, icono = "tarro", className = "", sizes = "(min-width:1024px) 50vw, 100vw", priority = false, texto }: { src?: string; alt: string; icono?: Parameters<typeof Icono>[0]["tipo"]; className?: string; sizes?: string; priority?: boolean; texto?: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`grano relative overflow-hidden bg-botella ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(195,155,101,.28),transparent_60%),radial-gradient(90%_70%_at_90%_100%,rgba(100,31,42,.55),transparent_60%)]" />
      <div className="absolute inset-5 border border-oro/30" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-4 text-oro/80">
          <Icono tipo={icono} className="h-20 w-20" />
          {texto ? <span className="label text-oro/80">{texto}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function Alergenos({ plato }: { plato: Plato }) {
  if (!plato.alergenosConfirmados) {
    return <p className="text-xs text-carbon-500">Alérgenos: consulta con nuestro equipo.</p>;
  }
  if (!plato.alergenos.length) return <p className="text-xs text-carbon-500">Sin alérgenos declarados.</p>;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Alérgenos">
      {plato.alergenos.map((a) => (
        <li key={a} className="rounded-full border border-botella/25 px-2.5 py-0.5 font-detail text-[0.68rem] font-medium text-botella">{nombreAlergeno(a)}</li>
      ))}
    </ul>
  );
}

/** Tarjeta de plato con estética de etiqueta de botica. */
export function DishCard({ plato, categoria, numero }: { plato: Plato; categoria?: string; numero?: number }) {
  return (
    <article className="etiqueta group flex h-full flex-col overflow-hidden rounded-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(41,38,33,.5)]">
      {plato.imagen ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={plato.imagen} alt={plato.imagenAlt || plato.nombre} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="label text-[0.62rem] text-oro-700">{categoria}</span>
          {numero ? <span className="font-display text-sm italic text-oro-700">Nº {String(numero).padStart(2, "0")}</span> : null}
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-[1.65rem] font-semibold leading-tight text-carbon">{plato.nombre}</h3>
          <p className="shrink-0 pt-1 font-detail text-lg font-semibold text-granate">{precio(plato.precio)}</p>
        </div>
        <p className="mt-3 flex-1 leading-relaxed text-carbon-600">{plato.descripcion}</p>
        <div className="mt-5 border-t border-dashed border-oro/40 pt-4">
          <Alergenos plato={plato} />
        </div>
      </div>
    </article>
  );
}

/** Banda de conversión reutilizable. */
export function CtaReserva({ titulo = "Tu mesa te está esperando", texto = "Reserva en pocos pasos a través de TheFork o llámanos directamente." }: { titulo?: string; texto?: string }) {
  return (
    <section className="grano relative overflow-hidden bg-granate py-20 text-marfil lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_85%_20%,rgba(195,155,101,.25),transparent_60%)]" />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="reveal">
          <Ornamento className="mb-6 w-44 text-oro" />
          <h2 className="text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">{titulo}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-marfil/80">{texto}</p>
        </div>
        <div className="reveal flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-oro">Reservar en TheFork <span aria-hidden="true">↗</span><span className="sr-only">(se abre en una pestaña nueva)</span></a>
          <a href={enlaces.tel} className="btn-linea-claro">Llamar · {restaurante.telefono.visible}</a>
          <Link href="/carta" className="btn-linea-claro">Ver la carta</Link>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
