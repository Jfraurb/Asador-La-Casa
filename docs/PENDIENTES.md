# Datos pendientes de confirmar antes de publicar

La web está construida para **no mostrar nunca un dato no confirmado como si lo estuviera**. Cada punto se activa desde el panel `/admin` (o editando `/content/*.json`).

## Restaurante (`content/restaurante.json`)

| Dato | Estado | Qué hace la web mientras tanto |
| --- | --- | --- |
| Valoración 4,8/5 · 104 reseñas | Sin verificar (no se pudo consultar TheFork desde el entorno de desarrollo) | **No se muestra.** Al verificarla, actualizar nota, reseñas, fuente y fecha, y marcar `verificada: true`. |
| Horario | Pendiente | Muestra "Horario pendiente de confirmación. Consulta en TheFork o llámanos." |
| Correo electrónico | Pendiente | No se muestra. |
| Redes sociales oficiales | Pendientes | No se muestran enlaces. |
| Widget de TheFork | Requiere autorización desde TheFork Manager | Botón que abre el perfil de TheFork. Con autorización: `widgetAutorizado: true` + `widgetUrl`. |
| Coordenadas exactas | No incluidas | El mapa se sitúa por dirección. Recomendado: verificar que el pin de Google Maps / Google Business Profile coincide con la puerta. |

## Carta (`content/carta.json`)

- [ ] Platos y precios: proceden de TheFork y deben ser **aprobados por el restaurante** → `aprobadaPorRestaurante: true`.
- [ ] Descripciones: redactadas sin inventar ingredientes (solo lo que indica el nombre del plato). El restaurante puede ampliarlas.
- [ ] **Alérgenos**: obligatorio informar de los 14 alérgenos (Reglamento UE 1169/2011, RD 126/2015). Hasta confirmarlos, cada plato indica "Alérgenos: consulta con nuestro equipo".
- [ ] Platos destacados: elegidos provisionalmente (ajoblanco, boquerones, gambas al pilpil, flamenquín, habitas). Confirmar con el restaurante.
- [ ] ¿IVA incluido? Si se confirma, añadirlo a la nota de la carta.

## Vinos y bebidas (`content/bebidas.json`)

- [ ] Introducir referencias reales (nombre, bodega/D.O., precio copa/botella) y activar `publicada: true`.

## Fotografías

No se han usado fotos de stock haciéndolas pasar por el restaurante. Mientras no haya fotos reales, la web usa ilustraciones propias de la marca (alacena de botica, iconos de línea).

Sesión de fotos recomendada (mínimo):
1. **Portada**: composición de tapas, ibéricos, platos y bebidas (horizontal y vertical 4:5).
2. Un plano por cada plato destacado (4:3).
3. Interior (2–3 planos), fachada, barra.
4. Copas, botellas y detalles de servicio.
5. Ambiente con clientes (solo con consentimiento de imagen firmado).

Formato: JPG/PNG de alta calidad; Next.js las sirve automáticamente en AVIF/WebP con lazy loading.

## Legal

- [ ] Aviso legal y privacidad: completar titular (razón social / nombre), NIF y email (aparecen marcados como "pendiente").
- [ ] Revisar textos legales con asesoría.

## Técnico (al publicar)

- [ ] Dominio definitivo → `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph).
- [ ] Email de recepción de formularios → `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` (dominio verificado en Resend). Sin esto, los formularios lo indican y ofrecen TheFork o llamar.
- [ ] Google Search Console: verificar dominio (`NEXT_PUBLIC_GSC_VERIFICATION`) y enviar `/sitemap.xml`.
- [ ] Google Analytics 4: crear propiedad → `NEXT_PUBLIC_GA_ID`. El banner de cookies solo aparece si está configurado.
- [ ] Google Business Profile: enlazar la web, revisar categoría "Restaurante mediterráneo", horario y fotos (clave para el SEO local en Huelin).
- [ ] Configurar el proxy OAuth del CMS (ver `ADMINISTRACION.md`).

## Recomendaciones de marketing (opcionales)

- Pedir reseñas tras la visita (QR en mesa hacia Google y TheFork).
- Publicar la carta también en Google Business Profile (enlace a `/carta`).
- Mantener coherencia NAP (nombre, dirección, teléfono) en TheFork, Google, TripAdvisor y redes.
