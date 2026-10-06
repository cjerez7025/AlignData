/* ═══════════════════════════════════════════════
   AlignData — mapa.js
   Mapa mundial de protección de datos (#mapa). Carga d3 y topojson solo cuando
   la sección está por entrar en pantalla. Depende de: mapa-data.js
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var mapEl = document.getElementById('ad-map');
  var MAP = window.AD_MAP;
  if (!mapEl || !MAP) return;

  var LIBS = [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js', sri: 'sha384-su5kReKyYlIFrI62mbQRKXHzFobMa7BHp1cK6julLPbnYcCW9NIZKJiTODjLPeDh' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js', sri: 'sha384-9dCJK6nh7skY14HrcvlLYlFga9/MehJjL9ONWRflmiXNRuf8p2jiF4Y5PR881PTq' }
  ];
  var ATLAS = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  var W = 960, H = 500;

  var infoEl = document.getElementById('adMapInfo');
  var searchEl = document.getElementById('adMapSearch');
  var emptyHtml = infoEl ? infoEl.innerHTML : '';

  function loadScript(lib) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = lib.src; s.integrity = lib.sri; s.crossOrigin = 'anonymous';
      s.onload = resolve; s.onerror = function () { reject(new Error('No se pudo cargar ' + lib.src)); };
      document.head.appendChild(s);
    });
  }

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function norm(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function esName(en) { return MAP.es[en] || en; }

  function showInfo(en) {
    var info = MAP.countries[en];
    var name = esName(en);
    if (!info) {
      infoEl.innerHTML = '<div class="ad-map-cname">' + esc(name) + '</div>' +
        '<span class="ad-map-badge" style="background:rgba(45,61,85,.5);color:#a8b6c6;border:1px solid #2d3d55">' + esc(MAP.cats.none.label) + '</span>' +
        '<div class="ad-map-val">Este mapa no incluye información sobre este país. Eso no implica que no tenga legislación: consulte a la autoridad local o fuentes oficiales.</div>';
      return;
    }
    var c = MAP.cats[info.cat];
    var h = '<div class="ad-map-cname">' + esc(name) + (info.highlight ? ' 🇨🇱' : '') + '</div>' +
      '<span class="ad-map-badge" style="background:' + c.color + '22;color:' + c.color + ';border:1px solid ' + c.color + '44">' + esc(c.label) + '</span>';
    if (info.adequate) h += '<div class="ad-map-adequate">✓ ' + esc(info.adequate) + '</div>';
    if (info.warning) h += '<div class="ad-map-warning">⚠ ' + esc(info.warning) + '</div>';
    h += '<hr class="ad-map-divider">';
    if (info.law) h += '<div class="ad-map-lbl">Legislación</div><div class="ad-map-val">' + esc(info.law) + '</div>';
    if (info.dpa) h += '<div class="ad-map-lbl">Autoridad de protección de datos</div><div class="ad-map-val">' + esc(info.dpa) + '</div>';
    if (info.web && /^https?:\/\//.test(info.web)) h += '<div class="ad-map-lbl">Sitio web oficial</div><a class="ad-map-link" href="' + esc(info.web) + '" target="_blank" rel="noopener">' + esc(info.web) + '</a>';
    infoEl.innerHTML = h;
  }

  function init() {
    var d3 = window.d3, topojson = window.topojson;
    mapEl.setAttribute('aria-busy', 'true');
    var svg = d3.select(mapEl).append('svg')
      .attr('viewBox', '0 0 ' + W + ' ' + H)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'img')
      .attr('aria-label', 'Mapa mundial de protección de datos personales. Use el buscador para consultar un país.');
    var g = svg.append('g');
    var projection = d3.geoNaturalEarth1().fitSize([W, H], { type: 'Sphere' });
    var path = d3.geoPath().projection(projection);

    // La rueda del mouse solo hace zoom con Ctrl; así no se bloquea el scroll de la página.
    var zoom = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [W, H]])
      .filter(function (e) { return e.type === 'wheel' ? e.ctrlKey : !e.button; })
      .on('zoom', function (e) { g.attr('transform', e.transform); });
    svg.call(zoom);
    window.adZoomIn = function () { svg.transition().call(zoom.scaleBy, 1.5); };
    window.adZoomOut = function () { svg.transition().call(zoom.scaleBy, 0.67); };
    window.adZoomReset = function () { svg.transition().call(zoom.transform, d3.zoomIdentity); };

    return d3.json(ATLAS).then(function (world) {
      var feats = topojson.feature(world, world.objects.countries).features;
      var paths = g.selectAll('.ad-map-country').data(feats).join('path')
        .attr('class', 'ad-map-country')
        .attr('d', path)
        .attr('fill', function (d) {
          var en = MAP.iso[String(d.id).padStart(3, '0')];
          var info = en ? MAP.countries[en] : null;
          return MAP.cats[info ? info.cat : 'none'].color;
        })
        .on('click', function (event, d) {
          var en = MAP.iso[String(d.id).padStart(3, '0')];
          select(this, en || null);
        });
      paths.append('title').text(function (d) { var en = MAP.iso[String(d.id).padStart(3, '0')]; return en ? esName(en) : 'Sin datos'; });

      function select(node, en) {
        paths.classed('ad-selected', false);
        d3.select(node).classed('ad-selected', true);
        if (en) showInfo(en);
        else infoEl.innerHTML = '<div class="ad-map-cname">País no incluido</div><div class="ad-map-val">Este territorio no está incluido en el mapa.</div>';
      }

      window.adSearchCountry = function (val) {
        var q = norm(val).trim();
        if (q.length < 2) { paths.classed('ad-selected', false); infoEl.innerHTML = emptyHtml; return; }
        var hit = null, loose = null;
        paths.each(function (d) {
          var en = MAP.iso[String(d.id).padStart(3, '0')];
          if (!en) return;
          var a = norm(esName(en)), b = norm(en);
          if (!hit && (a.indexOf(q) === 0 || b.indexOf(q) === 0)) hit = { node: this, en: en };
          if (!loose && (a.indexOf(q) > -1 || b.indexOf(q) > -1)) loose = { node: this, en: en };
        });
        hit = hit || loose;
        if (hit) select(hit.node, hit.en);
        else { paths.classed('ad-selected', false); infoEl.innerHTML = '<div class="ad-map-val">No encontramos ese país. Pruebe con el nombre en español o en inglés.</div>'; }
      };
      mapEl.setAttribute('aria-busy', 'false');
    });
  }

  function start() {
    Promise.all(LIBS.map(loadScript)).then(init).catch(function () {
      mapEl.innerHTML = '<p class="ad-map-error">No pudimos cargar el mapa en este momento. Intente recargar la página.</p>';
      mapEl.setAttribute('aria-busy', 'false');
    });
  }

  if (searchEl) searchEl.addEventListener('input', function () { if (window.adSearchCountry) window.adSearchCountry(searchEl.value); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-map-zoom]'), function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-map-zoom');
      var fn = { in: window.adZoomIn, out: window.adZoomOut, reset: window.adZoomReset }[k];
      if (fn) fn();
    });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); start(); }
    }, { rootMargin: '500px 0px' });
    io.observe(mapEl);
  } else start();
})();
