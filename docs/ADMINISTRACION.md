# Administración de contenidos

Todo el contenido editable está en `/content`:

| Archivo | Qué contiene |
| --- | --- |
| `restaurante.json` | Dirección, teléfono, reservas, valoración, horario, email, redes |
| `carta.json` | Categorías, platos, precios, descripciones, fotos y alérgenos |
| `bebidas.json` | Vinos y bebidas |
| `galeria.json` | Fotografías de la galería |
| `imagenes.json` | Imágenes de portada, interior, bodega y fachada |

## Opción A · Panel `/admin` (recomendado para el restaurante)

El panel (Decap CMS) muestra formularios en español para editar platos, precios, alérgenos, fotos y datos. Cada cambio se guarda en GitHub y la web se publica de nuevo sola (1–2 minutos).

Puesta en marcha (una vez, la hace el desarrollador):

1. Crear una *OAuth App* en GitHub (Settings → Developer settings → OAuth Apps).
2. Desplegar un proxy OAuth para Decap (p. ej. `decap-proxy` en Cloudflare Workers o el adaptador de Vercel).
3. En `public/admin/config.yml`, poner la URL del proxy en `base_url` y comprobar `repo` y `branch`.
4. Dar acceso de escritura al repositorio a la cuenta GitHub de quien vaya a editar.

Alternativa: desplegar en Netlify y usar `backend: git-gateway` con Netlify Identity.

## Opción B · Editar el JSON directamente

Desde GitHub se puede editar cualquier archivo de `/content`. Antes de publicar:

```bash
npm run validate:content
```

## Reglas de contenido

- Una foto en la galería o en un plato **debe ser real** del restaurante y llevar texto alternativo.
- `alergenosConfirmados: true` solo cuando cocina haya validado la lista.
- `valoracion.verificada: true` solo tras comprobar la cifra el mismo día; actualizar `fechaVerificacion`.
- Precios en número con punto decimal (`8.5` → se muestra "8,50 €").
