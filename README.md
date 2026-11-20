# La Botica de Ale · Web del restaurante

Web oficial de **La Botica de Ale**, restaurante de cocina mediterránea en Huelin (Calle Tomás Echeverría, 3 · 29002 Málaga).

Concepto creativo: *"Una botica de sabores mediterráneos"*. Paleta marfil, granate, verde botella, dorado envejecido y carbón; tipografías Cormorant Garamond, Manrope y DM Sans.

## Tecnología

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3
- Contenido en JSON (`/content`) editable desde un panel **Decap CMS** en `/admin` (sin tocar código)
- Formularios con validación en cliente y servidor, antispam (campo trampa, tiempo mínimo y límite por IP) y envío por email con Resend
- SEO: metadatos por página, Open Graph con imagen generada, `sitemap.xml`, `robots.txt`, Schema.org `Restaurant` + `Menu` + `BreadcrumbList`
- Google Analytics 4 solo tras consentimiento; verificación de Search Console por variable de entorno
- Accesibilidad WCAG 2.2 AA (auditado con axe), navegación por teclado, `prefers-reduced-motion`

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio: hero, presentación, propuesta, destacados, carta, vinos, galería, ubicación, reservas |
| `/nuestra-esencia` | Página editorial |
| `/carta` | Carta con filtros por categoría (`?categoria=`) y buscador |
| `/vinos-y-bebidas` | Bodega (estructura lista para la carta real) |
| `/galeria` | Galería con filtros y lightbox (solo fotos reales) |
| `/contacto` | Dirección, mapa, cómo llegar, formulario |
| `/reservas` | TheFork, teléfono y solicitud de reserva |
| `/alergenos`, `/aviso-legal`, `/privacidad`, `/cookies` | Información legal |

## Desarrollo

```bash
npm install
cp .env.example .env.local   # rellenar las variables
npm run dev                  # http://localhost:3000
npm run build && npm start   # producción
npm run typecheck
npm run validate:content     # revisa los JSON y avisa de datos pendientes
```

## Despliegue recomendado

Vercel (HTTPS automático, optimización de imágenes AVIF/WebP y rutas `/api`). Configura las variables de `.env.example` en el panel del proveedor.

## Documentación

- [`docs/PENDIENTES.md`](docs/PENDIENTES.md) — datos que el restaurante debe confirmar antes de publicar.
- [`docs/ADMINISTRACION.md`](docs/ADMINISTRACION.md) — cómo editar carta, precios, fotos y datos.
