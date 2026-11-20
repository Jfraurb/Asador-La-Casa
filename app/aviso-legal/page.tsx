import { LegalPage, Pendiente } from "@/components/Legal";
import { direccionCompleta, restaurante } from "@/lib/content";

export const metadata = { title: "Aviso legal", robots: { index: false, follow: true }, alternates: { canonical: "/aviso-legal" } };

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
      <ul>
        <li>Nombre comercial: {restaurante.nombre}</li>
        <li>Titular (razón social o nombre): <Pendiente>titular</Pendiente></li>
        <li>NIF/CIF: <Pendiente>NIF</Pendiente></li>
        <li>Domicilio del establecimiento: {direccionCompleta}</li>
        <li>Teléfono: {restaurante.telefono.visible}</li>
        <li>Correo electrónico: {restaurante.email || <Pendiente>email</Pendiente>}</li>
      </ul>
      <h2>Condiciones de uso</h2>
      <p>El acceso a este sitio web es gratuito e implica la aceptación de estas condiciones. La información sobre la carta, precios y disponibilidad es orientativa y puede cambiar sin previo aviso.</p>
      <h2>Reservas</h2>
      <p>Las reservas online se gestionan a través de TheFork, que aplica sus propias condiciones. Las solicitudes enviadas desde el formulario de esta web no constituyen una reserva confirmada hasta que el restaurante responda.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, diseño, logotipos e imágenes de este sitio pertenecen a su titular o se usan con autorización. No se permite su reproducción sin consentimiento.</p>
      <h2>Enlaces externos</h2>
      <p>Este sitio contiene enlaces a servicios de terceros (TheFork, Google Maps). El titular no se responsabiliza de sus contenidos ni de sus políticas.</p>
    </LegalPage>
  );
}
