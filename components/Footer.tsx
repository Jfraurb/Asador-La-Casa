import Link from "next/link";
import { direccionCompleta, enlaces, restaurante } from "@/lib/content";
import { NAV } from "@/lib/nav";
import { Sello } from "./Illustrations";
import CookieSettingsButton from "./CookieSettingsButton";

export default function Footer() {
  const r = restaurante;
  return (
    <footer className="grano relative bg-botella-800 text-marfil/80">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-4">
          <Sello className="h-24 w-24 text-oro" />
          <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-marfil">
            Una botica de sabores mediterráneos en el corazón de Huelin.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="label mb-5 font-detail text-oro">Visítanos</h2>
          <address className="not-italic leading-relaxed">
            {r.direccion.calle}
            <br />
            {r.direccion.codigoPostal} {r.direccion.ciudad} ({r.direccion.barrio})
          </address>
          <p className="mt-4">
            <a href={enlaces.tel} className="font-semibold text-marfil underline-offset-4 hover:text-oro hover:underline">
              {r.telefono.visible}
            </a>
          </p>
          {r.email ? (
            <p className="mt-1">
              <a href={`mailto:${r.email}`} className="hover:text-oro">{r.email}</a>
            </p>
          ) : null}
          <a href={enlaces.comoLlegar} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-oro-300 underline underline-offset-4 hover:text-oro">
            Cómo llegar
          </a>
        </div>

        <div className="md:col-span-2">
          <h2 className="label mb-5 font-detail text-oro">Explora</h2>
          <ul className="space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-oro">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/reservas" className="hover:text-oro">Reservas</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="label mb-5 font-detail text-oro">Horario</h2>
          {r.horario.length ? (
            <dl className="space-y-1.5">
              {r.horario.map((h) => (
                <div key={h.dia} className="flex justify-between gap-4">
                  <dt>{h.dia}</dt>
                  <dd className="text-marfil">{h.horas}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm leading-relaxed">{r.notaHorario}</p>
          )}
          <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-oro mt-6">
            Reservar mesa
          </a>
          {r.redes.length ? (
            <ul className="mt-6 flex flex-wrap gap-4">
              {r.redes.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="label text-oro-300 hover:text-oro">{s.nombre}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-marfil/10">
        <div className="wrap flex flex-col gap-3 py-6 pb-28 text-xs text-marfil/60 md:flex-row md:items-center md:justify-between lg:pb-6">
          <p>© {new Date().getFullYear()} {r.nombre} · {direccionCompleta}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/aviso-legal" className="hover:text-oro">Aviso legal</Link></li>
            <li><Link href="/privacidad" className="hover:text-oro">Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-oro">Cookies</Link></li>
            <li><Link href="/alergenos" className="hover:text-oro">Alérgenos</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
