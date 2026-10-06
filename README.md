# AlignData — sitio web (aligndata.cl)

Sitio estático (HTML + CSS + JS, sin build) publicado en **Firebase Hosting**, proyecto `aligndata-landing`.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal |
| `carousel.html` | Carrusel de destacados (se muestra en un iframe en la home) |
| `assessment-d360.html` | Autodiagnóstico gratuito (cuestionario de 8 preguntas) |
| `Contacto.html` | Formulario de contacto |
| `ley-21719-que-es.html`, `multas-ley-21719.html`, `preparar-empresa-2026.html` | Guías |
| `privacidad.html` | Política de privacidad |
| `site-config.js` | **Fechas, UF/UTM, contacto y precios (se edita aquí)** |
| `site.js` | Cuenta regresiva, precios, navegación, sliders |
| `stepper.js`, `mapa.js`, `mapa-data.js` | Camino al cumplimiento y mapa mundial |
| `forms.js`, `consent.js` | Envío de formularios y banner de cookies / Google Ads |
| `styles.css`, `article.css` | Estilos (home y guías) |
| `img/` | Imágenes optimizadas (WebP) |
| `firebase.json` | Hosting: redirecciones, cabeceras, caché |
| `scripts/check-site.mjs` | Verificación de enlaces, anclas, JSON-LD y sitemap |
| `docs/REVISION-2026-10.md` | Revisión de octubre 2026: decisiones y pendientes |

## Tareas comunes

**Cambiar un precio, la fecha de vigencia o el valor de la UF:** editar `site-config.js`. Los precios del HTML y del carrusel se rellenan desde ahí (el HTML conserva el último valor como respaldo si JavaScript no carga).

**Probar en local:**

```bash
python -m http.server 5173
```

y abrir <http://localhost:5173>.

**Verificar antes de publicar:**

```bash
node scripts/check-site.mjs
```

**Publicar:**

```bash
firebase deploy --only hosting
```

También hay workflows de GitHub Actions (vista previa en cada Pull Request y despliegue al hacer push a `main`); requieren el secreto `FIREBASE_SERVICE_ACCOUNT_ALIGNDATA_LANDING`.
