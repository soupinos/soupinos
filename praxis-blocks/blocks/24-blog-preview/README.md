# Block #24 — blog-preview

Grid of 3 article cards, responsive, caldera skin tokens.

## Usage

**Static data:**
```html
<div class="px-bp-root" data-posts='[
  {
    "img": "/img/article1.jpg",
    "imgAlt": "Descriptive alt text",
    "tag": "Ταξίδι",
    "title": "Article Title",
    "excerpt": "Short excerpt...",
    "url": "/blog/article-slug/",
    "cta": "Διαβάστε περισσότερα"
  }
]'></div>
```

**WP REST API (auto-fetches 3 latest posts):**
```html
<div class="px-bp-root" data-rest="/wp-json/wp/v2/posts?per_page=3&_embed"></div>
```

## Files

- `block.css` — styles using caldera CSS custom properties
- `block.js` — vanilla JS, zero deps, renders from static JSON or WP REST
- Copy both to theme `assets/block24.css` + `assets/block24.js`

## Enqueue (WP)

```php
wp_enqueue_style('ll-block24', $tu . '/assets/block24.css', ['ll-caldera'], $v);
wp_enqueue_script('ll-block24', $tu . '/assets/block24.js', [], $v, true);
```

## WP Template Usage (PHP partial)

```php
<div class="px-bp-root" data-rest="<?php echo esc_url(rest_url('wp/v2/posts?per_page=3&_embed')); ?>"></div>
```
