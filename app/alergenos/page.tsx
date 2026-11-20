import { LegalPage } from "@/components/Legal";
import { ALERGENOS, enlaces, restaurante } from "@/lib/content";

export const metadata = { title: "Información sobre alérgenos", description: "Información sobre alérgenos en La Botica de Ale, Huelin (Málaga).", alternates: { canonical: "/alergenos" } };

export default function Alergenos() {
  return (
    <LegalPage title="Información sobre alérgenos">
      <p>De acuerdo con el Reglamento (UE) 1169/2011 y el Real Decreto 126/2015, disponemos de información sobre los alérgenos presentes en nuestros platos. Si tienes cualquier alergia o intolerancia, <strong>comunícalo a nuestro equipo antes de pedir</strong>.</p>
      <p>Puedes consultarnos también por teléfono en el <a href={enlaces.tel}>{restaurante.telefono.visible}</a>.</p>
      <h2>Los 14 alérgenos de declaración obligatoria</h2>
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {Object.values(ALERGENOS).map((a) => (<li key={a}>{a}</li>))}
      </ul>
      <p>En nuestra cocina se manipulan distintos alérgenos, por lo que no podemos descartar la presencia de trazas.</p>
    </LegalPage>
  );
}
