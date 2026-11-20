import { ImageResponse } from "next/og";

export const alt = "La Botica de Ale · Restaurante mediterráneo en Huelin, Málaga";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#243C32", color: "#F5F0E7", padding: 64, fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, border: "2px solid rgba(195,155,101,.6)", padding: 56 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#C39B65", textTransform: "uppercase" }}>Huelin · Málaga · Cocina mediterránea</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, lineHeight: 1 }}>La Botica de Ale</div>
            <div style={{ fontSize: 40, marginTop: 20, fontStyle: "italic", color: "#DCC197" }}>El sabor de Málaga tiene su propia botica.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(245,240,231,.8)" }}>Tapas · Ibéricos · Platos de la casa · Reserva tu mesa</div>
        </div>
      </div>
    ),
    size
  );
}
