/**
 * px-schema-injector — Injects JSON-LD structured data into <head>.
 *
 * Config: <script type="application/json" class="px-schema-cfg">
 * [ { "type": "LocalBusiness", … }, { "type": "FerryTrip", … } ]
 * (single object also accepted)
 *
 * Supported types:
 *   LocalBusiness  — name, description, url, telephone, email, image,
 *                    address{street,city,region,zip,country},
 *                    geo{lat,lng}, openingHours[], sameAs[], priceRange, subtype
 *   FerryTrip      — name, description, from, fromAddress, to, toAddress,
 *                    duration (ISO 8601 e.g. "PT50M"), price, currency, provider
 *   AggregateRating— name, ratingValue, reviewCount, bestRating, worstRating
 *   BreadcrumbList — items[{name, url}]
 *   FAQPage        — questions[{q, a}]
 *
 * Output: <script type="application/ld+json"> in <head>.
 * ASCII straight quotes only — no curly quotes.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const cfgEl = document.querySelector('script.px-schema-cfg[type="application/json"]');
  if (!cfgEl) return;

  let schemas;
  try { schemas = JSON.parse(cfgEl.textContent); }
  catch (e) { console.warn('[px-schema] Invalid JSON config:', e); return; }

  if (!Array.isArray(schemas)) schemas = [schemas];

  function inject(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    // JSON.stringify uses ASCII quotes — safe
    s.textContent = JSON.stringify(obj, null, 0);
    document.head.appendChild(s);
  }

  function clean(obj) {
    // Strip keys with undefined / null values
    return JSON.parse(JSON.stringify(obj));
  }

  // ── Builders ───────────────────────────────────────────────────────

  function buildLocalBusiness(c) {
    return clean({
      '@context': 'https://schema.org',
      '@type': c.subtype || 'LocalBusiness',
      name:        c.name,
      description: c.description,
      url:         c.url,
      telephone:   c.telephone,
      email:       c.email,
      image:       c.image,
      priceRange:  c.priceRange,
      address: c.address ? {
        '@type':         'PostalAddress',
        streetAddress:   c.address.street,
        addressLocality: c.address.city,
        addressRegion:   c.address.region,
        postalCode:      c.address.zip,
        addressCountry:  c.address.country || 'GR'
      } : undefined,
      geo: c.geo ? {
        '@type':   'GeoCoordinates',
        latitude:  c.geo.lat,
        longitude: c.geo.lng
      } : undefined,
      openingHours: c.openingHours || undefined,
      sameAs:       c.sameAs      || undefined
    });
  }

  function buildFerryTrip(c) {
    return clean({
      '@context': 'https://schema.org',
      '@type': 'TravelAction',
      name:        c.name,
      description: c.description,
      fromLocation: {
        '@type': 'Place',
        name:    c.from,
        address: c.fromAddress
      },
      toLocation: {
        '@type': 'Place',
        name:    c.to,
        address: c.toAddress
      },
      duration: c.duration,
      offers: c.price ? {
        '@type':        'Offer',
        price:          String(c.price),
        priceCurrency:  c.currency || 'EUR',
        availability:   'https://schema.org/InStock'
      } : undefined,
      provider: c.provider ? {
        '@type': 'Organization',
        name:    c.provider
      } : undefined
    });
  }

  function buildAggregateRating(c) {
    return clean({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: c.name,
      aggregateRating: {
        '@type':      'AggregateRating',
        ratingValue:  c.ratingValue,
        reviewCount:  c.reviewCount,
        bestRating:   c.bestRating  || 5,
        worstRating:  c.worstRating || 1
      }
    });
  }

  function buildBreadcrumbList(c) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (c.items || []).map(function (item, i) {
        return { '@type': 'ListItem', position: i + 1, name: item.name, item: item.url };
      })
    };
  }

  function buildFAQPage(c) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (c.questions || []).map(function (q) {
        return {
          '@type': 'Question',
          name:    q.q,
          acceptedAnswer: { '@type': 'Answer', text: q.a }
        };
      })
    };
  }

  const BUILDERS = {
    LocalBusiness:   buildLocalBusiness,
    FerryTrip:       buildFerryTrip,
    AggregateRating: buildAggregateRating,
    BreadcrumbList:  buildBreadcrumbList,
    FAQPage:         buildFAQPage
  };

  schemas.forEach(function (item) {
    const build = BUILDERS[item.type];
    if (!build) { console.warn('[px-schema] Unknown type:', item.type); return; }
    inject(build(item));
  });
})();
