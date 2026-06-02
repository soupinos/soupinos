# Lefkimmi Lines Schedule CMS

WordPress plugin that stores ferry timetables for 4 routes in `wp_options` and exposes them via a REST endpoint consumed by the `schedule-calendar` block.

---

## 1. Installation

1. Copy the `22-schedule-cms/` folder (or just `schedule-cms.php`) into `wp-content/plugins/lefkimmi-schedule-cms/`.
2. In the WordPress admin go to **Plugins → Installed Plugins** and activate **Lefkimmi Lines Schedule CMS**.
3. The menu item **Ρυθμίσεις → Δρομολόγια** appears immediately after activation.

> Single-file plugin — no Composer, no npm, no build step required.

---

## 2. Updating schedules via the Admin UI

1. Navigate to **Ρυθμίσεις → Δρομολόγια**.
2. Click one of the four tabs:
   - **ΛΕΥ → ΗΓΟ** (`ll`)
   - **ΗΓΟ → ΛΕΥ** (`hl`)
   - **ΛΕΥ → ΠΑΞΟΙ** (`lp`)
   - **ΠΑΞΟΙ → ΛΕΥ** (`pl`)
3. Edit any row's **Πλοίο**, **Αναχώρηση** or **Άφιξη** fields.
4. Click **+ Προσθήκη δρομολογίου** to append a new row.
5. Click **Διαγραφή** on a row to remove it.
6. Press **Αποθήκευση** — changes are saved to `wp_options` (`ll_schedule_data`).

> If no data has ever been saved, the plugin falls back to a hardcoded default schedule automatically.

---

## 3. Updating schedules via JSON import (admin UI)

Scroll down to the **Εισαγωγή JSON** section on the same admin page and paste a JSON object that follows this schema:

```json
{
  "ll": [
    { "ship": "Αγία Τριάδα", "dep": "06:00", "arr": "06:50" }
  ],
  "hl": [ ... ],
  "lp": [ ... ],
  "pl": [ ... ]
}
```

Click **Εισαγωγή JSON**. The entire schedule is replaced atomically. All four route keys must be present (pass an empty array `[]` for routes with no departures).

---

## 4. How an agent can update schedules

An automated agent (e.g. Claude, a script, a CI job) can update the schedule without touching the admin UI by submitting the JSON import form programmatically.

### Option A — wp-cli (recommended for server-side agents)

```bash
wp option update ll_schedule_data '{"ll":[...],"hl":[...],"lp":[...],"pl":[...]}' --allow-root
```

The REST endpoint will reflect the change immediately (no cache flush needed — `Cache-Control: max-age=300` is set at the HTTP layer only).

### Option B — HTTP POST to wp-admin (requires valid session)

```
POST /wp-admin/options-general.php?page=ll-schedule
Content-Type: application/x-www-form-urlencoded

ll_action=ll_import_json
&_wpnonce=<nonce>
&ll_json_import=<url-encoded JSON>
```

The nonce must be fetched first from the admin page HTML (`name="_wpnonce"`). This is suitable for agents that already hold an authenticated WordPress session cookie.

### Option C — Direct DB / REST (headless agents)

If the agent has a WordPress application password it can use the core WP REST API to write the option directly via a custom endpoint — or simply call `wp option update` via SSH.

**Minimal agent instruction format:**

```
{"ll": [...], "hl": [...], "lp": [...], "pl": [...]}
```

Each array element: `{ "ship": "<name>", "dep": "HH:MM", "arr": "HH:MM" }`.

---

## 5. Frontend integration — `schedule-calendar` block

The `schedule-calendar` block (block `21`) reads timetable data from a REST endpoint. Pass the site's REST base URL via a `data-api-url` attribute on the block's root element:

```html
<div
  class="schedule-calendar"
  data-api-url="https://example.com/wp-json/ll/v1/schedule"
>
  ...
</div>
```

The block's JavaScript fetches:

```
GET https://example.com/wp-json/ll/v1/schedule
```

Response shape (same as stored JSON):

```json
{
  "ll": [ { "ship": "...", "dep": "HH:MM", "arr": "HH:MM" }, ... ],
  "hl": [ ... ],
  "lp": [ ... ],
  "pl": [ ... ]
}
```

The endpoint is public (no authentication required), CORS-open (`Access-Control-Allow-Origin: *`), and returns HTTP 200 with `Cache-Control: public, max-age=300`.

If `data-api-url` is **not** set, the block falls back to its own bundled static data.

---

## Option key reference

| wp_options key   | Type   | Description                           |
|------------------|--------|---------------------------------------|
| `ll_schedule_data` | string | JSON-encoded schedule for all 4 routes |
