# Block #35 — px-contact-modal

A contact / booking **modal** that **listens** for the custom event
`px:open-modal` — desktop **popup**, mobile **bottom-sheet**. Full-stack:
**HTML + CSS + JS + PHP + README**. `px-modal__` prefix. Generalised from the
proven `sites/therapist` contact modal.

This is the listener half of the **34 ↔ 35 decoupling**: block #34
(`px-nav-mobile`) *dispatches* `px:open-modal`, this block *receives* it. They
share nothing but the event name — ship either alone.

## How it opens (decoupled)
| Source | Mechanism |
|---|---|
| Block #34 nav CTA | dispatches `document.dispatchEvent(new CustomEvent('px:open-modal'))` |
| Block #30 banner CTA / any button | `[data-open-modal]` click (block.js wires it, except inside `.px-mnav`) |
| Your own code | `document.dispatchEvent(new CustomEvent('px:open-modal'))` |

Close: overlay click, the × button (`[data-modal-close]`), or `Escape`.

## Files
| File | Role |
|---|---|
| `index.html` | static demo + markup reference (two open paths shown) |
| `block.css` | styles + **self-contained `--px-modal-*` tokens** (popup / bottom-sheet) |
| `block.js` | open/close (GSAP optional), validation, honeypot, AJAX submit |
| `block.php` | SCF copy fields, enqueue + localize, AJAX handler, `wp_footer` render |
| `README.md` | this file |

## Self-contained tokens
Every visual knob is a `--px-modal-*` variable declared on `.px-modal`, each
falling back to a caldera token then a hard default — so the modal looks right
in isolation *and* inherits a site skin. Override on `.px-modal` or `:root`:
```css
.px-modal {
  --px-modal-accent: #C9A84C;
  --px-modal-radius: 12px;
  --px-modal-maxw:   460px;
  /* …bg, fg, muted, surface, line, overlay… */
}
```

## WordPress (full-stack) install
1. Copy this folder into the theme: `theme/blocks/35-px-contact-modal/`.
2. Require it from `functions.php`:
   ```php
   require_once get_stylesheet_directory() . '/blocks/35-px-contact-modal/block.php';
   ```
3. Done. `block.php`:
   - registers the SCF/ACF copy fields on **`acf/init`** (guarded by
     `function_exists('acf_add_local_field_group')`; **no plugin beyond
     SCF/ACF**) — eyebrow, title, sub, success message, recipient email;
   - enqueues `block.css` / `block.js` and localizes `pxModal` (admin-ajax
     URL + nonce);
   - renders the modal markup on `wp_footer`, with Greek caps via
     **`px_gr_upper()`** (no `text-transform` on Greek);
   - handles the submit over AJAX with **honeypot + WP nonce** and full
     sanitization, then `wp_mail()`.

All WP calls are guarded, so including the file in a non-WP context (or with
ACF disabled) is harmless — the modal simply falls back to its warm Greek
defaults, and the form shows a client-side success state.

## Security
- **Honeypot** `px_website` — hidden field; any value ⇒ silent success (server
  short-circuits, client shows success without sending).
- **Nonce** `px_contact_modal` — verified server-side before any mail.
- **Sanitization** — `sanitize_text_field` / `sanitize_email` /
  `sanitize_textarea_field` on every field; recipient defaults to
  `admin_email`.

## Static / non-WP use
Open `index.html`, or include `block.css` + `block.js` and drop the modal
markup near the end of `<body>`. Without `pxModal` localized, the validated
form just shows the success state (no network call) — handy for previews.

## Accessibility
`role="dialog"` + `aria-modal`, `aria-labelledby` the title, focus moves in on
open and returns on close, `Escape` closes, body scroll locked while open,
honeypot is `aria-hidden`. Respects `prefers-reduced-motion`.
