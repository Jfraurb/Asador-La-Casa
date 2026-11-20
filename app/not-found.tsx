import Link from "next/link";
import { Alacena } from "@/components/Illustrations";

export default function NotFound() {
  return (
    <section className="grano relative overflow-hidden bg-marfil-200/60 pb-24 pt-[calc(var(--header-h)+5rem)]">
      <Alacena className="pointer-events-none absolute -right-20 top-10 hidden h-[110%] text-oro/20 md:block" aria-hidden="true" role="presentation" />
      <div className="wrap relative max-w-2xl">
        <p className="label text-oro-700">Error 404</p>
        <h1 className="mt-4 text-5xl font-medium text-carbon sm:text-6xl">Este cajón de la botica está vacío</h1>
        <p className="mt-5 text-lg text-carbon-600">La página que buscas no existe o ha cambiado de sitio.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-granate">Volver al inicio</Link>
          <Link href="/carta" className="btn-linea">Ver la carta</Link>
        </div>
      </div>
    </section>
  );
}
