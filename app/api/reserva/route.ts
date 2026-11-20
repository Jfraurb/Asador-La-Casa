import { validarReserva } from "@/lib/forms";
import { procesarFormulario } from "@/lib/server-forms";

export async function POST(req: Request) {
  return procesarFormulario(req, {
    validar: validarReserva,
    asunto: (c) => `Solicitud de reserva (pendiente de confirmar): ${c.fecha} ${c.hora} · ${c.personas} pax · ${c.nombre} ${c.apellidos}`,
    etiquetas: { nombre: "Nombre", apellidos: "Apellidos", telefono: "Teléfono", email: "Correo", fecha: "Fecha", hora: "Hora", personas: "Personas", observaciones: "Observaciones" },
  });
}
