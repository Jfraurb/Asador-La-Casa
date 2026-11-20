import { validarContacto } from "@/lib/forms";
import { procesarFormulario } from "@/lib/server-forms";

export async function POST(req: Request) {
  return procesarFormulario(req, {
    validar: validarContacto,
    asunto: (c) => `Mensaje desde la web: ${c.nombre}`,
    etiquetas: { nombre: "Nombre", email: "Correo", telefono: "Teléfono", mensaje: "Mensaje" },
  });
}
