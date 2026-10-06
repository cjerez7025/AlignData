/* ═══════════════════════════════════════════════
   AlignData — consent.js
   Banner de consentimiento + carga condicionada de Google Ads / Analytics.
   El tag de Google NO se carga hasta que la persona acepta.
   Depende de: site-config.js (AD_CONFIG.adsId)
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var KEY = 'ad_consent_v1';
  var CFG = window.AD_CONFIG || {};
  var loaded = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* modo privado: se pregunta en cada visita */ } }

  function loadGoogle() {
    if (loaded || !CFG.adsId) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.adsId);
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', CFG.adsId);
  }

  /* Evento de conversión: solo se envía si hubo consentimiento. */
  window.adTrack = function (name, params) {
    if (!loaded || !window.gtag) return;
    window.gtag('event', name, params || {});
    if (name === 'generate_lead' && CFG.adsLeadLabel) {
      window.gtag('event', 'conversion', { send_to: CFG.adsId + '/' + CFG.adsLeadLabel });
    }
  };

  var CSS = '.adc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2000;max-width:760px;margin:0 auto;background:#0F1E38;color:#e8eef7;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:16px 18px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:14px/1.55 "DM Sans",system-ui,sans-serif;display:flex;gap:14px;align-items:center;flex-wrap:wrap}' +
    '.adc p{margin:0;flex:1 1 320px;color:rgba(255,255,255,.82)}.adc a{color:#00B894}' +
    '.adc-btns{display:flex;gap:8px;flex-wrap:wrap}' +
    '.adc button{font:inherit;font-weight:600;border-radius:8px;padding:9px 16px;cursor:pointer;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff}' +
    '.adc button.adc-ok{background:#00B894;border-color:#00B894;color:#04261f}' +
    '.adc button:focus-visible{outline:2px solid #fff;outline-offset:2px}';

  function banner() {
    if (document.getElementById('adConsent')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var d = document.createElement('div');
    d.id = 'adConsent'; d.className = 'adc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Preferencias de cookies');
    d.innerHTML = '<p>Usamos cookies de medición (Google) para entender qué contenido es útil. Solo se activan si usted las acepta. ' +
      'Más información en nuestra <a href="privacidad.html">Política de privacidad</a>.</p>' +
      '<div class="adc-btns"><button type="button" class="adc-no">Solo esenciales</button><button type="button" class="adc-ok">Aceptar</button></div>';
    d.querySelector('.adc-ok').addEventListener('click', function () { write('granted'); d.remove(); loadGoogle(); });
    d.querySelector('.adc-no').addEventListener('click', function () { write('denied'); d.remove(); });
    document.body.appendChild(d);
  }

  /* Permite reabrir el banner desde el pie de página: <a href="#" data-consent-open> */
  window.adConsentOpen = function () { var o = document.getElementById('adConsent'); if (o) o.remove(); banner(); };

  function init() {
    var v = read();
    if (v === 'granted') loadGoogle();
    else if (v !== 'denied') banner();
    Array.prototype.forEach.call(document.querySelectorAll('[data-consent-open]'), function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); window.adConsentOpen(); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
