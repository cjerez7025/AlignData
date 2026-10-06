/* ═══════════════════════════════════════════════
   AlignData — stepper.js
   Camino al cumplimiento: 4 etapas D360° (sección #proceso)
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var STEPS = [
    {
      tag: '~30 días · Proyecto único',
      title: 'D360° Inicia',
      desc: 'Evaluación base de cumplimiento de la Ley 21.719. Kick-off con la gerencia, assessment en 8 dimensiones, análisis legal de los hallazgos y entrega de un dashboard ejecutivo con roadmap de adecuación a 3–12 meses.',
      chips: ['8 dimensiones', 'Dashboard ejecutivo', 'Informe + roadmap'],
      color: '#378ADD', bg: 'rgba(55,138,221,0.15)',
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="9" stroke="#378ADD" stroke-width="2"/><line x1="21" y1="21" x2="28" y2="28" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="14" x2="18" y2="14" stroke="#378ADD" stroke-width="1.5" stroke-linecap="round"/><line x1="14" y1="10" x2="14" y2="18" stroke="#378ADD" stroke-width="1.5" stroke-linecap="round"/></svg>',
      fill: '12%'
    },
    {
      tag: '~45 días · Proyecto único',
      title: 'D360° Evalúa',
      desc: 'Análisis profundo de sistemas, silos de datos, contratos con terceros y DPIA preliminar. Incluye todo lo del Inicia más el inventario completo de tratamientos, el mapeo de flujos y una hoja de ruta técnica priorizada.',
      chips: ['DPIA preliminar', 'Inventario de sistemas', 'Contratos con terceros'],
      color: '#00B894', bg: 'rgba(0,184,148,0.15)',
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="5" y="3" width="22" height="26" rx="3" stroke="#00B894" stroke-width="2"/><line x1="10" y1="11" x2="22" y2="11" stroke="#00B894" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="16" x2="22" y2="16" stroke="#00B894" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="21" x2="16" y2="21" stroke="#00B894" stroke-width="1.5" stroke-linecap="round"/></svg>',
      fill: '42%'
    },
    {
      tag: '3–6 meses · Alcance variable',
      title: 'D360° Acompaña',
      desc: 'Ejecución guiada del plan de adecuación con un equipo multidisciplinario: consultor principal, asesoría legal, técnico de datos e integraciones, trabajando en sprints quincenales con revisión del cliente.',
      chips: ['Equipo multidisciplinario', 'Sprints quincenales', 'Scrum Master incluido'],
      color: '#EF9F27', bg: 'rgba(239,159,39,0.15)',
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="4" stroke="#EF9F27" stroke-width="1.8"/><circle cx="22" cy="10" r="4" stroke="#EF9F27" stroke-width="1.8"/><circle cx="16" cy="22" r="4" stroke="#EF9F27" stroke-width="1.8"/><line x1="14" y1="10" x2="18" y2="10" stroke="#EF9F27" stroke-width="1.5"/><line x1="12" y1="14" x2="14" y2="18" stroke="#EF9F27" stroke-width="1.5"/><line x1="20" y1="14" x2="18" y2="18" stroke="#EF9F27" stroke-width="1.5"/></svg>',
      fill: '75%'
    },
    {
      tag: '6–12 meses · A medida',
      title: 'D360° Implementa',
      desc: 'Implementación técnica en sistemas, integración con AlignData Protect™, adecuación de contratos y capacitación de los equipos. El alcance y el precio se construyen sobre el resultado del D360° Evalúa aprobado.',
      chips: ['Diseño a medida', 'Posterior a D360° Evalúa', 'Cotización por hitos'],
      color: '#AFA9EC', bg: 'rgba(175,169,236,0.15)',
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3" y="7" width="26" height="18" rx="3" stroke="#AFA9EC" stroke-width="2"/><line x1="3" y1="13" x2="29" y2="13" stroke="#AFA9EC" stroke-width="1.5"/><circle cx="8" cy="10" r="1.5" fill="#AFA9EC"/><circle cx="13" cy="10" r="1.5" fill="#AFA9EC"/><line x1="10" y1="19" x2="22" y2="19" stroke="#AFA9EC" stroke-width="1.5" stroke-linecap="round"/></svg>',
      fill: '100%'
    }
  ];

  var cur = 0;
  var $ = function (id) { return document.getElementById(id); };

  function go(i) {
    if (i < 0 || i >= STEPS.length || !$('pcFill')) return;
    cur = i;
    var s = STEPS[i];
    $('pcFill').style.width = s.fill;
    $('pcTitle').textContent = s.title;
    $('pcDesc').textContent = s.desc;
    $('pcTag').textContent = s.tag;
    $('pcBigNum').textContent = '0' + (i + 1);
    $('pcIcon').innerHTML = s.icon;
    $('pcIcon').style.background = s.bg;
    $('pcChips').innerHTML = s.chips.map(function (c) {
      return '<span class="pc-chip" style="color:' + s.color + ';border-color:' + s.color + '55;background:' + s.color + '14;">' + c + '</span>';
    }).join('');
    for (var n = 0; n < STEPS.length; n++) {
      var btn = $('pnb' + n), nm = $('pnn' + n), dot = $('pdd' + n);
      if (btn) { btn.className = 'pc-node-btn' + (n < i ? ' done' : n === i ? ' active' : ''); btn.setAttribute('aria-current', n === i ? 'step' : 'false'); }
      if (nm) nm.className = 'pc-node-name' + (n === i ? ' active' : '');
      if (dot) dot.className = 'pc-nav-dot' + (n === i ? ' active' : '');
    }
    $('pcPrev').disabled = i === 0;
    $('pcNext').disabled = i === STEPS.length - 1;
  }

  function init() {
    if (!$('pcFill')) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-step]'), function (el) {
      el.addEventListener('click', function () { go(parseInt(el.getAttribute('data-step'), 10)); });
    });
    $('pcPrev').addEventListener('click', function () { go(cur - 1); });
    $('pcNext').addEventListener('click', function () { go(cur + 1); });
    go(0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
