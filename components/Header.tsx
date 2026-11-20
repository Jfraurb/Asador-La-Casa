"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { enlaces, restaurante } from "@/lib/content";
import { NAV } from "@/lib/nav";


export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open ? "bg-marfil/95 shadow-[0_1px_0_rgba(41,38,33,.08)] backdrop-blur-md" : "bg-marfil/0"
      }`}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${restaurante.nombre}, ir al inicio`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-granate/50 font-display text-lg italic text-granate transition group-hover:bg-granate group-hover:text-marfil">
            B·A
          </span>
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-display text-[1.3rem] font-semibold tracking-tight text-carbon sm:text-[1.45rem]">La Botica de Ale</span>
            <span className="label mt-1 text-[0.6rem] text-oro-700">Huelin · Málaga</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 font-detail text-[0.86rem] font-medium transition hover:text-granate ${
                    isActive(n.href) ? "text-granate" : "text-carbon"
                  } after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:bg-oro after:transition-transform ${
                    isActive(n.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={enlaces.tel} className="hidden items-center gap-2 px-3 font-detail text-sm font-semibold text-botella hover:text-granate xl:inline-flex">
            <span aria-hidden="true">☏</span> {restaurante.telefono.visible}
          </a>
          <Link href="/reservas" className="btn-granate !min-h-[44px] !px-5 max-sm:hidden">
            Reservar mesa
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-carbon/20 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-px w-5 bg-carbon transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-carbon transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-5 bg-carbon transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-carbon/10 bg-marfil lg:hidden"
      >
        <nav aria-label="Navegación móvil" className="wrap flex flex-col py-6">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="flex items-baseline justify-between border-b border-carbon/10 py-4 font-display text-3xl text-carbon hover:text-granate aria-[current=page]:text-granate"
            >
              {n.label}
              <span className="label text-oro-700">Nº {String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
          <Link href="/reservas" className="flex items-baseline justify-between border-b border-carbon/10 py-4 font-display text-3xl text-granate">
            Reservas <span className="label text-oro-700">Nº 07</span>
          </Link>
          <div className="mt-8 grid gap-3">
            <a href={enlaces.reservar} target="_blank" rel="noopener noreferrer" className="btn-granate">
              Reservar en TheFork
            </a>
            <a href={enlaces.tel} className="btn-linea">Llamar · {restaurante.telefono.visible}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
