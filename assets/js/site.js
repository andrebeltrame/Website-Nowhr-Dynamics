/* ==========================================================================
   Nowhr Dynamics — site behaviour
   Language switch · beta form → downloads · OS tabs · manual TOC
   ========================================================================== */

(function () {
  'use strict';

  var CFG = window.NOWHR || {};
  var root = document.documentElement;
  var LANG_KEY = 'nowhr:lang';
  var GATE_KEY = 'nowhr:beta:';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* private mode — fall through, the page still works */ }
    return null;
  }

  /* ------------------------------------------------------------ language -- */

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    var title = document.body.getAttribute('data-title-' + lang);
    if (title) document.title = title;

    var desc = document.body.getAttribute('data-desc-' + lang);
    var metaDesc = $('meta[name="description"]');
    if (desc && metaDesc) metaDesc.setAttribute('content', desc);

    // wa.me carries the opening message, so the link has to be rebuilt when
    // the language changes.
    var wa = (CFG.support || {}).whatsapp;
    if (wa) {
      $$('[data-whatsapp]').forEach(function (el) {
        var text = el.getAttribute('data-wa-' + lang);
        el.href = 'https://wa.me/' + wa + (text ? '?text=' + encodeURIComponent(text) : '');
      });
    }

    // Screenshots of a localised interface. The markup carries the default
    // language's file, so nothing is fetched twice unless the visitor switches.
    $$('[data-img-en]').forEach(function (el) {
      var src = el.getAttribute('data-img-' + lang);
      if (src && el.getAttribute('src') !== src) el.setAttribute('src', src);
      var alt = el.getAttribute('data-alt-' + lang);
      if (alt) el.setAttribute('alt', alt);
    });

    // Text that cannot hold two <span>s — <option> labels, placeholders.
    $$('[data-en]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });
    $$('[data-ph-en]').forEach(function (el) {
      var text = el.getAttribute('data-ph-' + lang);
      if (text !== null) el.setAttribute('placeholder', text);
    });

    $$('.lang-switch button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  function initLang() {
    // The <head> bootstrap already picked a language; mirror it into the UI.
    applyLang(root.getAttribute('data-lang') === 'pt' ? 'pt' : 'en');

    $$('.lang-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        store(LANG_KEY, btn.dataset.lang);
        applyLang(btn.dataset.lang);
      });
    });
  }

  /* ------------------------------------------------------------ platform -- */

  function detectOS() {
    var ua = navigator.userAgent || '';
    if (/Win/i.test(ua)) return 'win';
    if (/Mac|iPhone|iPad/i.test(ua)) return 'mac';
    return 'mac';
  }

  /* ----------------------------------------------------------- downloads -- */

  function fillDownloads(plugin) {
    var data = (CFG.downloads || {})[plugin];
    if (!data) return;

    $$('[data-dl]').forEach(function (tile) {
      var os = tile.getAttribute('data-dl');
      var entry = data[os];
      if (!entry) return;
      tile.href = entry.url;
      // Um destino fora do site não pode ser baixado pelo atributo `download`
      // e não deve substituir a página onde a pessoa está lendo as instruções.
      if (entry.external) {
        tile.removeAttribute('download');
        tile.target = '_blank';
        tile.rel = 'noopener noreferrer';
      }
      var meta = $('.dl-tile__meta', tile);
      if (meta) meta.textContent = entry.meta;
    });

    $$('[data-version]').forEach(function (el) { el.textContent = data.version; });
  }

  function unlock(plugin, scroll) {
    var gate = $('#beta-gate');
    var panel = $('#beta-downloads');
    if (!gate || !panel) return;

    gate.hidden = true;
    panel.hidden = false;
    fillDownloads(plugin);

    if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------------------------------------------------------------- form -- */

  function initGate() {
    var form = $('#beta-form');
    if (!form) return;

    var plugin = form.getAttribute('data-plugin');

    if (store(GATE_KEY + plugin) === '1') {
      unlock(plugin, false);
      return;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      // Honeypot: bots fill every field they find.
      if (form.elements.company && form.elements.company.value) return;

      var submit = $('button[type="submit"]', form);
      var error = $('#beta-error', form);
      if (error) error.hidden = true;

      var payload = {
        name: form.elements.name.value.trim(),
        whatsapp: form.elements.whatsapp.value.trim(),
        email: form.elements.email.value.trim(),
        daw: form.elements.daw.value,
        plugin: form.getAttribute('data-plugin-label') || plugin
      };

      var cfg = CFG.form || {};
      var done = function () {
        store(GATE_KEY + plugin, '1');
        unlock(plugin, true);
      };

      if (!cfg.action) {
        console.warn(
          '[Nowhr] No Google Form configured yet — see assets/js/config.js. ' +
          'The submission was not stored.'
        );
        done();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.dataset.busy = '1';
      }

      // An empty entry id means "do not send this one" — see config.js. A
      // Google Form refuses the WHOLE submission when any single answer does
      // not fit its question, so a field that cannot be filled in correctly
      // has to be left out rather than sent wrong.
      var body = new FormData();
      Object.keys(cfg.fields || {}).forEach(function (key) {
        if (cfg.fields[key] && payload[key] !== undefined) {
          body.append(cfg.fields[key], payload[key]);
        }
      });

      // Google Forms does not send CORS headers, so the response is opaque:
      // a resolved promise means the request left the browser, not that the
      // row was written. That is the trade-off of posting to Forms directly.
      fetch(cfg.action, { method: 'POST', mode: 'no-cors', body: body })
        .then(done)
        .catch(function () {
          if (submit) { submit.disabled = false; delete submit.dataset.busy; }
          if (error) error.hidden = false;
        });
    });
  }

  /* ---------------------------------------------------------------- tabs -- */

  function initTabs() {
    $$('.tabs').forEach(function (tabs) {
      var buttons = $$('button', tabs);
      var panels = buttons.map(function (b) { return $('#' + b.getAttribute('aria-controls')); });

      function select(index) {
        buttons.forEach(function (b, i) {
          b.setAttribute('aria-selected', String(i === index));
          if (panels[i]) panels[i].hidden = i !== index;
        });
      }

      buttons.forEach(function (b, i) {
        b.addEventListener('click', function () { select(i); });
      });

      var os = detectOS();
      var initial = buttons.findIndex(function (b) { return b.dataset.os === os; });
      select(initial > -1 ? initial : 0);
    });
  }

  /* ----------------------------------------------------------------- toc -- */

  function initToc() {
    var toc = $('.manual__toc');
    if (!toc || !('IntersectionObserver' in window)) return;

    var links = $$('a[href^="#"]', toc);
    var byId = {};
    var targets = [];

    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      byId[el.id] = a;
      targets.push(el);
    });

    var visible = new Set();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });

      var current = targets.filter(function (t) { return visible.has(t.id); })[0];
      links.forEach(function (a) { a.classList.remove('is-active'); });
      if (current && byId[current.id]) byId[current.id].classList.add('is-active');
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* --------------------------------------------------------------- misc --- */

  function initMisc() {
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    if (CFG.email) {
      $$('[data-email]').forEach(function (el) {
        el.href = 'mailto:' + CFG.email;
        if (el.hasAttribute('data-email-text')) el.textContent = CFG.email;
      });
    }

    if (CFG.repo) {
      $$('[data-repo]').forEach(function (el) { el.href = CFG.repo; });
    }

    var display = (CFG.support || {}).display;
    if (display) {
      $$('[data-whatsapp-number]').forEach(function (el) { el.textContent = display; });
    }
  }

  /* --------------------------------------------------------------- boot --- */

  function boot() {
    initLang();
    initGate();
    initTabs();
    initToc();
    initMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
