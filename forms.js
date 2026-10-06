/* ═══════════════════════════════════════════════
   AlignData — forms.js
   Envío compartido de formularios (Contacto y Assessment) hacia Google Apps Script.
   - Rechaza si falla la red o vence el tiempo (ya no se muestra "enviado" en falso).
   - Honeypot, validación de correo y pausa mínima entre envíos.
   NOTA: el envío usa mode:'no-cors' (respuesta opaca). Detecta fallas de red, pero no
   errores internos del script de Google; ver docs/REVISION-2026-10.md para la mejora en servidor.
   Depende de: site-config.js
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.AD_CONFIG;
  var LAST_KEY = 'ad_last_submit';
  var MIN_GAP_MS = 20000;
  var TIMEOUT_MS = 15000;

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  function tooFast() {
    try { var t = parseInt(localStorage.getItem(LAST_KEY) || '0', 10); return Date.now() - t < MIN_GAP_MS; } catch (e) { return false; }
  }
  function mark() { try { localStorage.setItem(LAST_KEY, String(Date.now())); } catch (e) { /* ignorar */ } }

  /**
   * @param {Object} payload  campos del formulario
   * @param {string} honeypot valor del campo trampa (debe venir vacío)
   * @returns {Promise<void>} resuelve si el envío salió; rechaza con Error('red'|'tiempo'|'rapido')
   */
  function send(payload, honeypot) {
    if (honeypot) return Promise.resolve();            // bot: se descarta en silencio
    if (tooFast()) return Promise.reject(new Error('rapido'));

    var body = Object.assign({}, payload, {
      consentimiento: true,
      pagina: location.pathname,
      enviado: new Date().toISOString()
    });
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);

    return fetch(CFG.leadEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function () {
      clearTimeout(timer);
      mark();
    }).catch(function (err) {
      clearTimeout(timer);
      throw new Error(err && err.name === 'AbortError' ? 'tiempo' : 'red');
    });
  }

  function errorMessage(err) {
    var m = err && err.message;
    if (m === 'rapido') return 'Ya recibimos un envío hace unos segundos. Espere un momento e intente de nuevo.';
    if (m === 'tiempo') return 'El envío tardó demasiado. Revise su conexión e intente nuevamente, o escríbanos a ' + CFG.contactEmail + '.';
    return 'No pudimos enviar el formulario. Revise su conexión e intente nuevamente, o escríbanos a ' + CFG.contactEmail + '.';
  }

  window.ADForms = { isEmail: isEmail, send: send, errorMessage: errorMessage };
})();
