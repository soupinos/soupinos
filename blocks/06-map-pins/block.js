/**
 * px-map — Google Maps with custom pins and info windows.
 *
 * Reads on .px-map:
 *   data-apikey="..."       Google Maps API key
 *   data-center="lat,lng"   Initial center
 *   data-zoom="12"          Initial zoom
 *   data-mapid="..."        Optional Cloud Map ID
 *
 * Reads pins from <script type="application/json" class="px-map-data"> (JSON array).
 *
 * The Maps SDK is lazy-loaded via IntersectionObserver — only fires when
 * the map container scrolls into view. No network request until needed.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const container = document.querySelector('.px-map');
  if (!container) return;

  const apiKey  = container.dataset.apikey || '';
  const [clat, clng] = (container.dataset.center || '37.97,23.73').split(',').map(Number);
  const zoom    = parseInt(container.dataset.zoom, 10) || 12;
  const mapId   = container.dataset.mapid || '';

  // Show notice if API key is placeholder
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    const notice = document.createElement('div');
    notice.className = 'px-map-notice';
    notice.innerHTML = '<strong>Google Maps</strong>Προσθέστε ένα έγκυρο API key ως <code>data-apikey="…"</code> για να εμφανιστεί ο χάρτης.';
    container.innerHTML = '';
    container.appendChild(notice);
    return;
  }

  // Read pin data
  let pins = [];
  try {
    const dataEl = container.querySelector('.px-map-data');
    if (dataEl) pins = JSON.parse(dataEl.textContent);
  } catch (e) {
    console.warn('[px-map] Invalid JSON in .px-map-data');
  }

  // Prepare canvas
  const canvas = document.createElement('div');
  canvas.id = 'px-map-canvas';
  container.appendChild(canvas);

  // ── Lazy-load Maps SDK via IntersectionObserver ────────────────────
  let loaded = false;

  function loadMaps() {
    if (loaded) return;
    loaded = true;

    const callbackName = '__pxMapInit_' + Date.now();

    window[callbackName] = function () {
      initMap();
      delete window[callbackName];
    };

    const script = document.createElement('script');
    const params = new URLSearchParams({
      key: apiKey,
      callback: callbackName,
      loading: 'async',
      v: 'weekly',
    });
    if (mapId) params.set('map_ids', mapId);
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    document.head.appendChild(script);
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadMaps();
      observer.disconnect();
    }
  }, { rootMargin: '200px' });

  observer.observe(container);

  // ── Map initialisation ─────────────────────────────────────────────
  function initMap() {
    const google = window.google;

    const mapOptions = {
      center: { lat: clat, lng: clng },
      zoom,
      disableDefaultUI: false,
      styles: darkMapStyles(),
    };
    if (mapId) {
      mapOptions.mapId = mapId;
      delete mapOptions.styles;
    }

    const map = new google.maps.Map(canvas, mapOptions);
    container.classList.add('is-loaded');

    let openInfo = null;

    pins.forEach(pin => {
      const marker = new google.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map,
        title: pin.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#FF3B00',
          fillOpacity: 1,
          strokeColor: '#F0EDE8',
          strokeWeight: 2,
        },
      });

      const infoContent = buildInfoContent(pin);
      const infoWindow  = new google.maps.InfoWindow({ content: infoContent });

      marker.addListener('click', () => {
        if (openInfo) openInfo.close();
        infoWindow.open({ anchor: marker, map });
        openInfo = infoWindow;
      });
    });
  }

  function buildInfoContent(pin) {
    const wrap = document.createElement('div');
    wrap.className = 'px-map-infobox';
    wrap.innerHTML = `
      <h4>${pin.title || ''}</h4>
      ${pin.address ? `<p>${pin.address}</p>` : ''}
      ${pin.phone   ? `<p>${pin.phone}</p>`   : ''}
      ${pin.url     ? `<a href="${pin.url}" target="_blank" rel="noopener">Οδηγίες →</a>` : ''}
    `;
    return wrap;
  }

  // Dark map style to match brand
  function darkMapStyles() {
    return [
      { elementType: 'geometry',         stylers: [{ color: '#0f0f0f' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#a8a6a1' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#080808' }] },
      { featureType: 'road',             elementType: 'geometry', stylers: [{ color: '#161616' }] },
      { featureType: 'road.highway',     elementType: 'geometry', stylers: [{ color: '#222' }] },
      { featureType: 'water',            elementType: 'geometry', stylers: [{ color: '#050505' }] },
      { featureType: 'poi',              stylers: [{ visibility: 'off' }] },
      { featureType: 'transit',          stylers: [{ visibility: 'off' }] },
    ];
  }
})();
