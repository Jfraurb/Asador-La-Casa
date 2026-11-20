import { direccionCompleta, enlaces, restaurante } from "@/lib/content";

export default function MapaUbicacion({ className = "" }: { className?: string }) {
  return (
    <div className={`etiqueta overflow-hidden rounded-sm p-2 ${className}`}>
      <iframe
        title={`Mapa de Google con la ubicación de ${restaurante.nombre}, ${direccionCompleta}`}
        src={enlaces.mapaEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-full min-h-[360px] w-full border-0 grayscale-[35%] sepia-[15%]"
        allowFullScreen
      />
    </div>
  );
}
