"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Banner de consentimiento (RGPD / LSSI-CE). Google Analytics 4 solo se carga
 * si existe NEXT_PUBLIC_GA_ID y el visitante acepta las cookies analíticas.
 * Si no hay GA configurado, no se muestra banner: la web no usa cookies no técnicas.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const c = readConsent();
    if (c) setAnalytics(c.analytics);
    else setVisible(true);
    const open = () => setVisible(true);
    const onChange = (e: Event) => setAnalytics((e as CustomEvent).detail.analytics);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  const decide = (ok: boolean) => {
    saveConsent(ok);
    setVisible(false);
    if (!ok && analytics) window.location.reload(); // descarga GA si se retira el consentimiento
  };

  return (
    <>
      {GA_ID && analytics ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {visible ? (
        <div role="dialog" aria-modal="false" aria-labelledby="cookies-titulo" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl border border-carbon/10 bg-marfil-50 p-6 shadow-2xl lg:bottom-6">
          <h2 id="cookies-titulo" className="font-display text-2xl text-carbon">Tu privacidad</h2>
          <p className="mt-2 text-sm leading-relaxed text-carbon-600">
            Usamos cookies técnicas necesarias y, solo si lo aceptas, cookies analíticas de Google Analytics para conocer cómo se usa la web.{" "}
            <Link href="/cookies" className="text-granate underline underline-offset-2">Más información</Link>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn-granate !min-h-[44px]" onClick={() => decide(true)}>Aceptar analíticas</button>
            <button type="button" className="btn-linea !min-h-[44px]" onClick={() => decide(false)}>Solo necesarias</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
