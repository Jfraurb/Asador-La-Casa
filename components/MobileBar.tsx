import Link from "next/link";
import { enlaces } from "@/lib/content";

/** Barra de acción fija en móvil: llamar · reservar · cómo llegar. */
export default function MobileBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 font-detail text-[0.68rem] font-semibold uppercase tracking-[0.12em]";
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-3 bottom-3 z-30 flex overflow-hidden rounded-2xl border border-carbon/10 bg-marfil-50/95 shadow-[0_18px_40px_-16px_rgba(41,38,33,.45)] backdrop-blur-md lg:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={enlaces.tel} className={`${item} text-botella`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
        Llamar
      </a>
      <Link href="/reservas" className={`${item} bg-granate text-marfil`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
        Reservar
      </Link>
      <a href={enlaces.comoLlegar} target="_blank" rel="noopener noreferrer" className={`${item} text-botella`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
        Cómo llegar
      </a>
    </nav>
  );
}
