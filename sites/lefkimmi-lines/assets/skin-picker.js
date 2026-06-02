/*
 * Lefkimmi Lines — Skin Picker
 * 5 visual skins for client preview. Overrides :root CSS vars.
 * localStorage key: "ll_skin" (default: "caldera")
 * Usage: include after caldera.css. No markup needed — generates its own UI.
 * Skins: caldera | red | mediterranean | midnight | sand
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'll_skin';
  var DEFAULT_SKIN = 'caldera';

  /* ── Skin definitions ── */
  var SKINS = {
    caldera: {
      label:    'Boutique',
      vars: {
        '--navy':       '#143352',
        '--navy-deep':  '#0d2238',
        '--gold':       '#a6863c',
        '--gold-soft':  '#c2a35b',
        '--gold-deep':  '#8a6e2e',
      },
      fontH:    'Marcellus',
      fontB:    'Cormorant Garamond',
      gfont:    'Marcellus:wght@400&family=Cormorant+Garamond:wght@400;600',
    },
    red: {
      label:    'Classic',
      vars: {
        '--navy':       '#0A0A0A',
        '--navy-deep':  '#050505',
        '--gold':       '#E30613',
        '--gold-soft':  '#ff4d2e',
        '--gold-deep':  '#b5000f',
      },
      fontH:    'Manrope',
      fontB:    'Inter',
      gfont:    'Manrope:wght@400;700',
    },
    mediterranean: {
      label:    'Mediterranean',
      vars: {
        '--navy':       '#004E89',
        '--navy-deep':  '#002d50',
        '--gold':       '#0094C6',
        '--gold-soft':  '#00b8f5',
        '--gold-deep':  '#006fa8',
      },
      fontH:    'Sora',
      fontB:    'Inter',
      gfont:    'Sora:wght@400;700',
    },
    midnight: {
      label:    'Midnight',
      vars: {
        '--navy':       '#0D1117',
        '--navy-deep':  '#06080a',
        '--gold':       '#C0C0C0',
        '--gold-soft':  '#d8d8d8',
        '--gold-deep':  '#a0a0a0',
      },
      fontH:    'Marcellus',
      fontB:    'Inter',
      gfont:    null, /* Marcellus loaded by default */
    },
    sand: {
      label:    'Warm',
      vars: {
        '--navy':       '#5C3D2E',
        '--navy-deep':  '#3a2118',
        '--gold':       '#C9A84C',
        '--gold-soft':  '#d4b56a',
        '--gold-deep':  '#a8882e',
      },
      fontH:    'Playfair Display',
      fontB:    'Inter',
      gfont:    'Playfair+Display:wght@400;700',
    },
  };

  /* Fonts that are loaded by the base Caldera stylesheet — no extra <link> needed */
  var BASE_FONTS = ['Marcellus', 'Cormorant Garamond', 'Inter'];

  /* ── Font loading ── */

  var loadedFonts = {};

  function isFontLoadedAlready(familyName) {
    if (BASE_FONTS.indexOf(familyName) !== -1) return true;
    if (loadedFonts[familyName]) return true;
    /* Check if a Google Fonts link for this family already exists in <head> */
    var links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].href.indexOf(familyName.replace(/ /g, '+')) !== -1) return true;
      if (links[i].href.indexOf(familyName.replace(/ /g, '%20')) !== -1) return true;
    }
    return false;
  }

  function loadGoogleFont(skin) {
    if (!skin.gfont) return;
    if (isFontLoadedAlready(skin.fontH)) return;

    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + skin.gfont + '&display=swap';
    document.head.appendChild(link);
    loadedFonts[skin.fontH] = true;
  }

  /* ── Skin application ── */

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applySkin(key, animate) {
    var skin = SKINS[key];
    if (!skin) return;

    var root = document.documentElement;

    if (animate && !prefersReducedMotion) {
      root.style.transition = 'background-color 0.35s ease, color 0.35s ease';
      setTimeout(function () { root.style.transition = ''; }, 400);
    }

    /* Apply color vars */
    Object.keys(skin.vars).forEach(function (varName) {
      root.style.setProperty(varName, skin.vars[varName]);
    });

    /* Apply derived tints */
    root.style.setProperty('--gold-tint', hexToTint(skin.vars['--gold'], 0.92));
    root.style.setProperty('--paper',     hexToTint(skin.vars['--navy'],  0.97));
    root.style.setProperty('--paper-2',   hexToTint(skin.vars['--navy'],  0.93));

    /* Apply font vars */
    root.style.setProperty('--fontH', "'" + skin.fontH + "',serif");
    root.style.setProperty('--fontB', "'" + skin.fontB + "',system-ui,sans-serif");

    /* Load Google Font if needed */
    loadGoogleFont(skin);
  }

  /* Very simple hex → white-mixed tint. Adequate for subtle paper tones. */
  function hexToTint(hex, amount) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
    r = Math.round(r + (255 - r) * amount);
    g = Math.round(g + (255 - g) * amount);
    b = Math.round(b + (255 - b) * amount);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  /* ── Widget UI ── */

  var WIDGET_ID    = 'll-skin-widget';
  var BTN_ID       = 'll-skin-toggle';
  var PANEL_ID     = 'll-skin-panel';
  var CLOSE_ID     = 'll-skin-close';

  function buildWidget() {
    if (document.getElementById(WIDGET_ID)) return; /* already mounted */

    var wrapper = document.createElement('div');
    wrapper.id = WIDGET_ID;
    wrapper.setAttribute('aria-label', 'Style selector');
    setWrapperStyles(wrapper);

    /* Toggle button */
    var toggleBtn = document.createElement('button');
    toggleBtn.id = BTN_ID;
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', PANEL_ID);
    toggleBtn.textContent = '✦ Style';
    setToggleBtnStyles(toggleBtn);

    /* Panel */
    var panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Choose visual style');
    panel.hidden = true;
    setPanelStyles(panel);

    /* Panel header */
    var header = document.createElement('div');
    setStyles(header, {
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      marginBottom:   '12px',
    });

    var headerLabel = document.createElement('span');
    headerLabel.textContent = 'Choose your style / Διάλεξε στυλ';
    setStyles(headerLabel, {
      fontSize:    '10px',
      fontFamily:  'Inter,system-ui,sans-serif',
      color:       '#6b7682',
      letterSpacing: '0.04em',
      lineHeight:  '1.3',
      maxWidth:    '140px',
    });

    var closeBtn = document.createElement('button');
    closeBtn.id = CLOSE_ID;
    closeBtn.setAttribute('aria-label', 'Close style selector');
    closeBtn.textContent = '✕';
    setStyles(closeBtn, {
      background:  'none',
      border:      'none',
      cursor:      'pointer',
      color:       '#6b7682',
      fontSize:    '14px',
      padding:     '2px 4px',
      lineHeight:  '1',
      flexShrink:  '0',
    });

    header.appendChild(headerLabel);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    /* Skin rows */
    var activeSkin = getSavedSkin();
    Object.keys(SKINS).forEach(function (key) {
      var skin = SKINS[key];
      var row  = buildSkinRow(key, skin, key === activeSkin);
      panel.appendChild(row);
    });

    wrapper.appendChild(panel);
    wrapper.appendChild(toggleBtn);
    document.body.appendChild(wrapper);

    /* Events */
    toggleBtn.addEventListener('click', function () {
      var isOpen = !panel.hidden;
      panel.hidden = isOpen;
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      toggleBtn.style.opacity = isOpen ? '1' : '0.9';
    });

    closeBtn.addEventListener('click', function () {
      panel.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        panel.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function buildSkinRow(key, skin, isActive) {
    var row = document.createElement('button');
    row.setAttribute('data-skin', key);
    row.setAttribute('aria-pressed', String(isActive));
    row.setAttribute('aria-label', 'Apply ' + skin.label + ' style');
    setStyles(row, {
      display:        'flex',
      alignItems:     'center',
      gap:            '10px',
      width:          '100%',
      background:     isActive ? '#f1ede4' : 'transparent',
      border:         isActive ? '1px solid #e6e0d4' : '1px solid transparent',
      borderRadius:   '6px',
      padding:        '8px 10px',
      cursor:         'pointer',
      marginBottom:   '4px',
      textAlign:      'left',
      transition:     'background 0.18s ease',
      boxSizing:      'border-box',
    });

    /* Swatch */
    var swatch = document.createElement('span');
    swatch.setAttribute('aria-hidden', 'true');
    setStyles(swatch, {
      width:          '24px',
      height:         '24px',
      borderRadius:   '50%',
      background:     skin.vars['--gold'],
      flexShrink:     '0',
      display:        'block',
      border:         '2px solid rgba(0,0,0,0.06)',
    });

    /* Font preview */
    var fontPreview = document.createElement('span');
    fontPreview.textContent = 'Aa';
    fontPreview.setAttribute('aria-hidden', 'true');
    setStyles(fontPreview, {
      fontFamily:   "'" + skin.fontH + "',serif",
      fontSize:     '15px',
      color:        '#3a4654',
      minWidth:     '22px',
      lineHeight:   '1',
    });

    /* Label */
    var labelEl = document.createElement('span');
    labelEl.textContent = skin.label;
    setStyles(labelEl, {
      fontFamily: 'Inter,system-ui,sans-serif',
      fontSize:   '13px',
      color:      '#3a4654',
      flexGrow:   '1',
    });

    /* Active checkmark */
    var check = document.createElement('span');
    check.setAttribute('aria-hidden', 'true');
    check.textContent = isActive ? '✓' : '';
    setStyles(check, {
      fontFamily: 'Inter,system-ui,sans-serif',
      fontSize:   '13px',
      color:      skin.vars['--gold'],
      minWidth:   '14px',
      textAlign:  'right',
    });

    row.appendChild(swatch);
    row.appendChild(fontPreview);
    row.appendChild(labelEl);
    row.appendChild(check);

    row.addEventListener('mouseenter', function () {
      if (row.getAttribute('aria-pressed') !== 'true') {
        row.style.background = '#faf8f3';
      }
    });
    row.addEventListener('mouseleave', function () {
      if (row.getAttribute('aria-pressed') !== 'true') {
        row.style.background = 'transparent';
      }
    });

    row.addEventListener('click', function () {
      selectSkin(key);
    });

    return row;
  }

  function selectSkin(key) {
    if (!SKINS[key]) return;

    /* Persist */
    try { localStorage.setItem(STORAGE_KEY, key); } catch (e) { /* private browsing */ }

    /* Apply vars */
    applySkin(key, true);

    /* Update row states */
    var panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    var rows = panel.querySelectorAll('[data-skin]');
    Array.prototype.forEach.call(rows, function (row) {
      var rowKey    = row.getAttribute('data-skin');
      var rowSkin   = SKINS[rowKey];
      var rowActive = rowKey === key;
      row.setAttribute('aria-pressed', String(rowActive));
      row.style.background = rowActive ? '#f1ede4' : 'transparent';
      row.style.border     = rowActive ? '1px solid #e6e0d4' : '1px solid transparent';
      /* Update checkmark */
      var checkEl = row.querySelector('span:last-child');
      if (checkEl) {
        checkEl.textContent = rowActive ? '✓' : '';
        if (rowSkin) checkEl.style.color = rowSkin.vars['--gold'];
      }
    });
  }

  /* ── Styles helpers ── */

  function setStyles(el, styles) {
    Object.keys(styles).forEach(function (prop) {
      el.style[prop] = styles[prop];
    });
  }

  function setWrapperStyles(el) {
    setStyles(el, {
      position:   'fixed',
      bottom:     '90px',
      right:      '20px',
      zIndex:     '200',
      display:    'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap:        '8px',
      fontFamily: 'Inter,system-ui,sans-serif',
    });
  }

  function setToggleBtnStyles(el) {
    setStyles(el, {
      background:    'var(--navy, #143352)',
      color:         'var(--gold-soft, #c2a35b)',
      border:        '1px solid var(--gold, #a6863c)',
      borderRadius:  '20px',
      padding:       '7px 14px',
      fontSize:      '12px',
      fontWeight:    '600',
      letterSpacing: '0.05em',
      cursor:        'pointer',
      opacity:       '0.9',
      transition:    'opacity 0.2s ease',
      whiteSpace:    'nowrap',
      boxShadow:     '0 2px 8px rgba(0,0,0,0.25)',
    });
  }

  function setPanelStyles(el) {
    setStyles(el, {
      background:   '#ffffff',
      borderRadius: '10px',
      padding:      '14px',
      width:        '210px',
      boxShadow:    '0 8px 32px rgba(0,0,0,0.18)',
      border:       '1px solid #e6e0d4',
    });
  }

  /* ── Persistence ── */

  function getSavedSkin() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SKINS[saved]) return saved;
    } catch (e) { /* private browsing */ }
    return DEFAULT_SKIN;
  }

  /* ── Init ── */

  function init() {
    var skin = getSavedSkin();
    applySkin(skin, false);
    buildWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
