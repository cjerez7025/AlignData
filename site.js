/* ═══════════════════════════════════════════════
   AlignData — site.js
   Cuenta regresiva · precios · reveal · navegación · sliders · utilidades
   Depende de: site-config.js
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.AD_CONFIG;
  var TARGET = new Date(CFG.lawDate);
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var pad = function (n, d) { return String(n).padStart(d, '0'); };

  /* ── Formato de pesos: 1.9M / 159K ── */
  function fmtClp(v) {
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1).replace('.', ',') + 'M';
    return '$' + Math.round(v / 1000) + 'K';
  }
  function fmtRangeUf(p) { return typeof p === 'number' ? String(p) : p.min + '–' + p.max; }
  function fmtRangeClp(p) {
    return typeof p === 'number' ? fmtClp(p * CFG.ufValue) : fmtClp(p.min * CFG.ufValue) + '–' + fmtClp(p.max * CFG.ufValue);
  }

  /* ── Precios: [data-uf="clave"] y [data-clp="clave"] ── */
  function renderPrices() {
    var P = CFG.prices;
    $$('[data-uf]').forEach(function (el) {
      var p = P[el.getAttribute('data-uf')];
      if (p != null) el.textContent = fmtRangeUf(p);
    });
    $$('[data-clp]').forEach(function (el) {
      var p = P[el.getAttribute('data-clp')];
      if (p != null) el.textContent = '≈ ' + fmtRangeClp(p) + ' CLP' + (el.getAttribute('data-clp-suffix') || '');
    });
    $$('[data-saving]').forEach(function (el) {
      var pct = Math.round((1 - P.combo / P.comboSeparado) * 100);
      el.textContent = 'Ahorro ~' + pct + '% vs. contratarlos por separado';
    });
    $$('[data-uf-ref]').forEach(function (el) {
      el.textContent = '1 UF ≈ $' + CFG.ufValue.toLocaleString('es-CL') + ' (' + CFG.refLabel + ')';
    });
    $$('[data-utm]').forEach(function (el) {
      var n = parseFloat(el.getAttribute('data-utm'));
      el.textContent = '≈ $' + Math.round(n * CFG.utmValue / 1e6).toLocaleString('es-CL') + ' millones';
    });
  }

  /* ── Cuenta regresiva (hero, ticker y carrusel): [data-cd="days|hrs|min|sec"] ── */
  function tick() {
    var diff = TARGET - new Date();
    var passed = diff <= 0;
    var s = Math.max(0, Math.floor(diff / 1000));
    var v = {
      days: Math.floor(s / 86400),
      hrs: Math.floor(s / 3600) % 24,
      min: Math.floor(s / 60) % 60,
      sec: s % 60
    };
    $$('[data-cd]').forEach(function (el) {
      var k = el.getAttribute('data-cd');
      el.textContent = k === 'days' ? (el.hasAttribute('data-pad3') ? pad(v.days, 3) : String(v.days)) : pad(v[k], 2);
    });
    document.documentElement.classList.toggle('ad-law-in-force', passed);
  }

  /* ── Aviso de postergación: se muestra solo si la configuración lo indica ── */
  function togglePostponementNotice() {
    $$('[data-postponement]').forEach(function (el) { el.hidden = !CFG.showPostponementNotice; });
  }

  /* ── Scroll reveal (una sola implementación) ── */
  function initReveal() {
    var els = $$('.ad-reveal');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) {
      var sibs = el.parentElement ? $$(':scope > .ad-reveal', el.parentElement) : [];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx, 4) * 0.1 + 's';
      io.observe(el);
    });
  }

  /* ── Navegación: scroll suave con cierre del menú móvil + enlace activo ── */
  function initNav() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var nav = document.getElementById('mainNav');
        if (nav && nav.classList.contains('show') && window.bootstrap) {
          var inst = window.bootstrap.Collapse.getInstance(nav);
          if (inst) inst.hide();
        }
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', id);
      });
    });
    var links = $$('.ad-nav-link[href^="#"], .ad-nav-dd a[href^="#"]');
    var sections = $$('section[id]');
    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = '#' + e.target.id;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ── Sliders de capturas: [data-slider] con botones [data-slide-prev|next] ── */
  function initSliders() {
    $$('[data-slider]').forEach(function (root) {
      var track = root.querySelector('[data-slider-track]');
      var slides = $$('[data-slider-track] > *', root);
      var label = root.querySelector('[data-slider-label]');
      var dotsEl = root.querySelector('[data-slider-dots]');
      var color = root.getAttribute('data-slider-color') || '#00B894';
      var cur = 0;
      var dots = slides.map(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ad-dot';
        b.setAttribute('aria-label', 'Ir a la captura ' + (i + 1) + ': ' + (s.getAttribute('data-label') || ''));
        b.addEventListener('click', function () { go(i); });
        dotsEl.appendChild(b);
        return b;
      });
      function go(n) {
        cur = ((n % slides.length) + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + cur * 100 + '%)';
        if (label) label.textContent = slides[cur].getAttribute('data-label') || '';
        slides.forEach(function (s, i) { s.setAttribute('aria-hidden', i === cur ? 'false' : 'true'); });
        dots.forEach(function (d, i) {
          d.classList.toggle('on', i === cur);
          d.style.background = i === cur ? color : '';
          d.setAttribute('aria-current', i === cur ? 'true' : 'false');
        });
      }
      root.querySelector('[data-slide-prev]').addEventListener('click', function () { go(cur - 1); });
      root.querySelector('[data-slide-next]').addEventListener('click', function () { go(cur + 1); });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') go(cur - 1);
        if (e.key === 'ArrowRight') go(cur + 1);
      });
      go(0);
    });
  }

  /* ── Tarjetas del framework: selección única ── */
  function initFramework() {
    var cards = $$('.ad-fw-card');
    cards.forEach(function (c) {
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
      var pick = function () { cards.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); }); c.classList.add('active'); c.setAttribute('aria-pressed', 'true'); };
      c.addEventListener('click', pick);
      c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }

  /* ── Alto del aviso superior: la navegación se ancla justo debajo ── */
  function syncTickerHeight() {
    var b = document.querySelector('.ad-notice-banner');
    // En móvil el aviso no es fijo: la navegación se ancla al borde superior (0 px).
    if (b) document.documentElement.style.setProperty('--ad-ticker-h', (getComputedStyle(b).position === 'sticky' ? b.offsetHeight : 0) + 'px');
  }

  function init() {
    syncTickerHeight();
    window.addEventListener('resize', syncTickerHeight);
    renderPrices();
    togglePostponementNotice();
    tick();
    setInterval(tick, 1000);
    initReveal();
    initNav();
    initSliders();
    initFramework();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
