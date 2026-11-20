import { LegalPage } from "@/components/Legal";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata = { title: "Política de cookies", robots: { index: false, follow: true }, alternates: { canonical: "/cookies" } };

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <p>Este sitio utiliza almacenamiento técnico necesario para su funcionamiento (por ejemplo, recordar tu elección sobre cookies).</p>
      <h2>Cookies analíticas</h2>
      <p>Solo si las aceptas expresamente, se cargará Google Analytics 4 (Google Ireland Ltd.) para obtener estadísticas anónimas de uso (cookies <code>_ga</code> y <code>_ga_*</code>, duración hasta 2 años). Si no las aceptas, no se instalan.</p>
      <h2>Contenido de terceros</h2>
      <p>El mapa de Google Maps y los enlaces a TheFork pueden instalar cookies propias de esos servicios cuando interactúas con ellos.</p>
      <h2>Cambiar tu elección</h2>
      <p>Puedes cambiar tu consentimiento en cualquier momento desde el enlace “Configurar cookies” del pie de página o borrando los datos del sitio en tu navegador. <CookieSettingsButton /></p>
    </LegalPage>
  );
}
