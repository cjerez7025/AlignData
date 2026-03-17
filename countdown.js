/* ═══════════════════════════════════════════════
   AlignData — countdown.js
   Countdown timer + scroll reveal
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Countdown ── */
  var TARGET_DATE = new Date('2026-12-01T00:00:00-03:00');

  function pad(n, digits) {
    return String(n).padStart(digits, '0');
  }

  function updateCountdown() {
    var now  = new Date();
    var diff = TARGET_DATE - now;

    if (diff <= 0) {
      setUnits('000', '00', '00', '00');
      return;
    }

    var totalSecs = Math.floor(diff / 1000);
    var secs  = totalSecs % 60;
    var mins  = Math.floor(totalSecs / 60) % 60;
    var hrs   = Math.floor(totalSecs / 3600) % 24;
    var days  = Math.floor(totalSecs / 86400);

    setUnits(pad(days, 3), pad(hrs, 2), pad(mins, 2), pad(secs, 2));
  }

  function setUnits(d, h, m, s) {
    var elDays = document.getElementById('cd-days');
    var elHrs  = document.getElementById('cd-hrs');
    var elMin  = document.getElementById('cd-min');
    var elSec  = document.getElementById('cd-sec');

    if (elDays) elDays.textContent = d;
    if (elHrs)  elHrs.textContent  = h;
    if (elMin)  elMin.textContent  = m;
    if (elSec)  elSec.textContent  = s;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ── Scroll Reveal ── */
  function initReveal() {
    var els = document.querySelectorAll(
      '.ad-fw-card, .ad-service-card, .ad-team-card, .ad-pf-item, .ad-stat-item'
    );

    els.forEach(function (el) {
      el.classList.add('ad-reveal');
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: make all visible immediately
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach(function (el) { observer.observe(el); });
  }


  /* ── Smooth scroll for nav links ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();

        // Close Bootstrap mobile nav if open
        var navCollapse = document.getElementById('mainNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }


  /* ── Active nav link on scroll ── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.ad-nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.style.color = '';
              link.style.borderBottomColor = '';
              if (link.getAttribute('href') === '#' + id) {
                link.style.color = '#ffffff';
                link.style.borderBottomColor = 'var(--ad-teal)';
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }


  /* ── Init on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initReveal();
      initSmoothScroll();
      initActiveNav();
    });
  } else {
    initReveal();
    initSmoothScroll();
    initActiveNav();
  }

})();