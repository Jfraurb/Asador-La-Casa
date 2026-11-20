import type { ReactNode } from "react";
import { PageHero } from "./ui";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Información legal" title={title} />
      <section className="py-16">
        <div className="wrap max-w-3xl">
          <div className="space-y-5 leading-relaxed text-carbon-600 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-carbon [&_li]:ml-5 [&_li]:list-disc [&_a]:text-granate [&_a]:underline">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/** Marca de dato pendiente: visible para que nunca se publique como confirmado. */
export function Pendiente({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-oro/25 px-1 text-carbon">[{children} · pendiente]</mark>;
}
