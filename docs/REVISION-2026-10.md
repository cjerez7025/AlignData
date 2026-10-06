# Revisión del sitio — octubre 2026

Revisión completa de diseño, contenido y deuda técnica de aligndata.cl (6-oct-2026) y las correcciones aplicadas en la rama `revision-2026-10`. Este documento deja constancia de **qué se cambió, qué se decidió y qué falta validar**.

## 1. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Fecha de vigencia | El sitio ya no afirma la fecha como un hecho: muestra "vigencia prevista 1-dic-2026" y un aviso con el proyecto de postergación a 2027 (ingresado al Senado en septiembre de 2026, sin aprobar). El aviso se apaga con `showPostponementNotice: false` en `site-config.js`. Los cronogramas usan plazos relativos ("meses 1–2…"), no fechas de calendario. |
| Oferta de abril | Eliminada de todo el sitio. El slide 1 del carrusel pasó a ser el **combo a precio normal**. Ya no existe el toggle "precio lista / oferta". |
| Parte legal | Se quitó a Matías (card, foto, correo, carrusel de contacto). La card pasó a **"Asesoría Legal"** genérica, sin nombre ni foto, "incorporada según el alcance de cada proyecto". Cuando haya una persona, basta editar esa card (`index.html`, sección `#equipo`). |
| "Diagnóstico gratuito" | Se separó el nombre: **Autodiagnóstico gratuito** (cuestionario online) vs. **D360°** (servicio de pago). Contacto ofrece una *reunión inicial sin costo* (supuesto: confirmar que es correcto). |
| Horas internas | Se quitaron del stepper las horas por paquete ("31–51 h", etc.) porque permitían calcular la tarifa por hora. Reversible: están en el historial de git. |
| Derechos del titular | "Cancelación" pasó a **"supresión"** y se agregó el bloqueo temporal (6 derechos). El nombre comercial "Portal ARCOP" se mantiene. |

## 2. Cambios aplicados

**Contenido**
- Una sola cifra de multas en todo el sitio: leves hasta 5.000 UTM, graves hasta 10.000, gravísimas hasta 20.000 (≈ $1.434 millones con UTM de $71.700). Antes había 4 versiones distintas.
- Se retiraron afirmaciones sin respaldo: "15 días hábiles" como plazo legal, "Art. 27", numeración de artículos, "ISO 27701 ready/certificación", "representación formal ante la APDP", "Producto principal" duplicado, dominios `portal.`/`panel.` que no existen.
- Una sola escala de madurez (0–4) en todo el sitio.
- Mapa: los países sin ficha ya no dicen "sin ley específica" sino "sin datos en este mapa"; búsqueda en español; México corregido (INAI disuelto en 2025); se quitó la leyenda "parcialmente adecuado" (sin uso).
- Autodiagnóstico: las brechas ahora se calculan con las respuestas reales (antes eran 4 textos fijos "bloqueados" que aparecían incluso con puntaje perfecto).

**Formularios y privacidad**
- Nueva `privacidad.html` (borrador genérico) enlazada desde pie, formularios y banner.
- Casilla de consentimiento obligatoria + honeypot + validación de correo + pausa entre envíos.
- Las fallas de red/tiempo ya **no** muestran "enviado" (antes el `.catch` del assessment mentía).
- Banner de cookies: el tag de Google Ads (`AW-18071612726`) solo carga si la persona acepta. Evento `generate_lead` en ambos formularios (si se define `adsLeadLabel` en `site-config.js` también dispara la conversión de Ads).
- Botones de precios abren Contacto con el servicio y plan preseleccionados (`Contacto.html?servicio=d360&plan=evalua`).

**Diseño / UX**
- El héroe con el H1 ahora es lo primero (antes quedaba bajo 420 px de carrusel); el carrusel pasó debajo de las cifras.
- Menú de 11 a 7 ítems (los secundarios en "Recursos"); logo de 100 px a 56 px; encabezado fijo más bajo en móvil.
- Carrusel: tipografía corregida (se veía en Times), sin botones subrayados, sin recorte en móvil, con pausa/reanudar, flechas como botones, `prefers-reduced-motion`, imágenes de fondo cargadas bajo demanda.
- Contraste: subidos los textos tenues sobre fondos oscuros y el teal sobre blanco (AA).
- Tildes corregidas ("público", "rectificación"…), preguntas frecuentes con marcado FAQ visible.

**Técnico**
- Precios, fechas, UF y UTM en un solo lugar: `site-config.js`. Los precios del HTML y del carrusel se rellenan desde ahí (el HTML guarda el último valor como respaldo sin JS).
- Un solo cronómetro (antes dos con zona horaria distinta), un solo *reveal*, sin código muerto.
- `index.html`: 307 → ~60 estilos en línea y 40 → 0 manejadores `onclick` en línea. `styles.css`: se podaron 56 clases sin uso (~460 líneas) y se agregaron como clases los componentes que antes eran estilos en línea (precios, sliders, FAQ); el archivo queda ordenado y sin reglas muertas.
- Imágenes: 1,37 MB → 237 KB (WebP, con `width`/`height` y `loading="lazy"`); `img/` con nombres normalizados.
- Artículos: eliminados los 3 duplicados huérfanos (301 → versión vigente) y unificada la metadata (og:image, JSON-LD con fecha, canonical). Estilo común en `article.css`.
- Hosting: se quitó el `rewrite ** → index.html` (devolvía 200 con la home para cualquier URL); hay `404.html`; cabeceras de seguridad y caché; CSP en modo *report-only*.
- SRI en Bootstrap/d3/topojson; d3 y el mapa se cargan solo al acercarse a la sección.
- CI: `scripts/check-site.mjs` (enlaces, anclas, JSON-LD, sitemap) y workflows de GitHub Actions para vista previa en PR y despliegue en `main`.

## 3. Pendiente de validar con asesoría legal (cuando exista)

> No se pudo leer el texto oficial (BCN respondió 401); lo siguiente se apoyó en estudios jurídicos y prensa. Revisar antes de promocionar el sitio.

1. **Multas**: tramos 5.000 / 10.000 / 20.000 UTM, regla de reincidencia (hasta triplicar) y tope por porcentaje de ingresos (se menciona sin cifra). Ejemplos de infracciones por tramo en `multas-ley-21719.html` (orientativos).
2. **Plazos de respuesta** a solicitudes de los titulares: el sitio ya no da un número; confirmar cuál es y si conviene publicarlo.
3. **Derechos**: confirmar la lista (acceso, rectificación, supresión, oposición, portabilidad y bloqueo temporal) y la gratuidad.
4. **DPO / delegado**: si es obligatorio en algún caso (hoy se dice "la ley contempla la figura" y se recomienda designarlo) y si "punto de contacto con la APDP" es una descripción correcta del servicio.
5. **Gradualidad para empresas de menor tamaño** (hoy "cierta gradualidad en la fiscalización").
6. **Transferencias internacionales**: número de artículo (se retiró) y alcance de la afirmación "sin transferencia internacional".
7. **Política de privacidad**: es un borrador genérico. Falta el **RUT** y el domicilio completo de PrivaData SpA, el plazo de conservación concreto y confirmar las bases de licitud.
8. **Mapa**: México (autoridad tras la disolución del INAI) y Brasil (estado de la adecuación UE; hoy sin afirmación).
9. **Afirmaciones comerciales**: "alineado a ISO/IEC 27701" (no es certificación), "Datos en Chile — GCP Santiago" y "reCAPTCHA v3" (son del producto; verificar que siguen siendo ciertas).
10. Enlace de la ley en BCN: `idNorma=1209272` (corresponde a la Ley 21.719 según búsquedas; BCN no abrió desde las herramientas).

## 4. Pendiente técnico / operativo

- [ ] **Secreto de GitHub** `FIREBASE_SERVICE_ACCOUNT_ALIGNDATA_LANDING` para que funcionen los workflows (`firebase init hosting:github` lo crea). Hasta entonces, desplegar a mano: `firebase deploy --only hosting`.
- [ ] **Apps Script de formularios** (el código no está en este repo). Hoy el sitio usa `no-cors` y solo detecta fallas de red. Recomendado en el script: responder JSON `{ok:true}` (`ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON)`), validar el campo `consentimiento === true`, descartar si `web` viene lleno y limitar envíos por correo. Con eso se puede pasar a `mode:'cors'` y confirmar la entrega de verdad.
- [ ] **Google Ads**: definir `adsLeadLabel` en `site-config.js` con la etiqueta de conversión real.
- [ ] **UF y UTM** son referenciales (septiembre 2026); actualizar `ufValue` / `utmValue` / `refLabel` en `site-config.js` cada cierto tiempo.
- [ ] **CSP**: está en `Content-Security-Policy-Report-Only`. Revisar la consola en producción durante unos días y, si no hay avisos, pasar a `Content-Security-Policy`.
- [ ] **DNS**: `www.aligndata.cl` no resuelve; crear un registro y redirigir a `aligndata.cl`. Los subdominios `portal.` y `panel.` tampoco existen (ya no se muestran en el sitio).
- [ ] **Imágenes del carrusel** vienen de Unsplash (hotlink). Para independencia y privacidad conviene descargarlas, optimizarlas y servirlas desde `img/`.
- [ ] **Nombre de archivo `Contacto.html`** con mayúscula: se dejó para no romper enlaces existentes (campañas, LinkedIn). Existe redirect de `/contacto.html`.
- [ ] Agregar `og-image.png` actualizado si el texto de la imagen menciona fechas (no se revisó su contenido).
- [ ] Cuando la ley se publique con fecha definitiva (o el proyecto se archive): ajustar `lawDate` y apagar `showPostponementNotice`, y revisar los textos "vigencia prevista".
