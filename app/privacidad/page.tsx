import { LegalPage, Pendiente } from "@/components/Legal";
import { restaurante } from "@/lib/content";

export const metadata = { title: "Política de privacidad", robots: { index: false, follow: true }, alternates: { canonical: "/privacidad" } };

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>Esta política explica cómo se tratan los datos personales recogidos en este sitio web, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
      <h2>Responsable del tratamiento</h2>
      <p><Pendiente>titular y NIF</Pendiente> · {restaurante.nombre} · Calle Tomás Echeverría, 3, 29002 Málaga · {restaurante.email || <Pendiente>email de contacto para privacidad</Pendiente>}</p>
      <h2>Qué datos tratamos y para qué</h2>
      <ul>
        <li><strong>Solicitudes de reserva:</strong> nombre, apellidos, teléfono, correo, fecha, hora, número de personas y observaciones, para gestionar tu solicitud y contactarte.</li>
        <li><strong>Formulario de contacto:</strong> nombre, correo, teléfono (opcional) y mensaje, para responder a tu consulta.</li>
        <li><strong>Analítica (solo con tu consentimiento):</strong> datos de navegación agregados mediante Google Analytics 4.</li>
      </ul>
      <p>Si en las observaciones nos informas de alergias o intolerancias, solo se utilizarán para atender tu visita.</p>
      <h2>Base legal</h2>
      <p>Tu consentimiento y la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).</p>
      <h2>Conservación</h2>
      <p>Los datos se conservarán el tiempo necesario para atender tu solicitud y, después, durante los plazos legales aplicables.</p>
      <h2>Destinatarios</h2>
      <p>No se ceden datos a terceros salvo obligación legal. Proveedores que pueden tratar datos por cuenta del responsable: alojamiento web y servicio de envío de correo electrónico <Pendiente>proveedores definitivos</Pendiente>. Las reservas en TheFork se rigen por la política de privacidad de TheFork.</p>
      <h2>Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo al responsable. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
    </LegalPage>
  );
}
