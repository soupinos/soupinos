# Lefkimmi Lines — WordPress Theme

Navy + gold Caldera skin, 5 colour variants, client-side i18n (9 languages),
ferry schedule CPT, and booking CTA bridge to lefkimmilines.gr.

---

## Requirements

| Requirement | Minimum |
|-------------|---------|
| PHP | 8.0+ |
| WordPress | 6.0+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| SSL | Recommended (HTTPS) |

---

## Installation

### 1. Upload the theme

**Method A — WordPress admin (recommended)**
1. Go to **Appearance → Themes → Add New → Upload Theme**
2. Choose `lefkimmi-lines-theme.zip`
3. Click **Install Now**, then **Activate**

**Method B — FTP/cPanel**
1. Unzip `lefkimmi-lines-theme.zip`
2. Upload the `lefkimmi-lines-theme/` folder to `wp-content/themes/`
3. Go to **Appearance → Themes** and activate **Lefkimmi Lines**

### 2. Set the homepage
1. Go to **Settings → Reading**
2. Set "Your homepage displays" to **A static page**
3. Create a page (e.g. "Αρχική") and select it as **Homepage**

WordPress will then serve `front-page.php` automatically.

### 3. Permalinks
Go to **Settings → Permalinks** and save once — this flushes rewrite rules
needed by the REST endpoint.

---

## Αλλαγή Δρομολογίων (Schedule CMS)

### Προσθήκη νέου δρομολογίου
1. **Δρομολόγια → Προσθήκη Δρομολογίου**
2. Συμπλήρωσε:
   - **Τίτλος** — π.χ. `ΗΓ→ΛΕΥ 07:30` (για εσωτερική χρήση)
   - **Γραμμή** — dropdown: Λευκίμμη→Ηγ, Ηγ→Λευκίμμη, Λευκ→Παξοί, Παξοί→Λευκ
   - **Πλοίο** — π.χ. `Αγία Τριάδα`
   - **Αναχώρηση / Άφιξη** — ώρα HH:MM
   - **Ενεργό** — τσεκάρισε για να εμφανιστεί στο πρόγραμμα
3. **Δημοσίευση**

> Αν δεν υπάρχουν δρομολόγια στη βάση, το theme εμφανίζει αυτόματα
> τα ενσωματωμένα προεπιλεγμένα δρομολόγια (static fallback).

### REST endpoint
Τα δρομολόγια είναι διαθέσιμα και ως JSON:
```
GET https://yoursite.gr/wp-json/ll/v1/schedule
```
Επιστρέφει αντικείμενο με κλειδιά `ll`, `hl`, `lp`, `pl`.

---

## Αλλαγή Skin (Colour Theme)

### Μέθοδος Α — WordPress Customizer (admin)
1. **Εμφάνιση → Προσαρμογή**
2. Άνοιξε το panel **Χρωματισμός (Skin)**
3. Επίλεξε από τα 5 διαθέσιμα skins:

| Skin | Χρώματα |
|------|---------|
| Caldera (default) | Navy #143352 + Gold #a6863c |
| Red | Λευκό + Κόκκινο #E30613 |
| Mediterranean | Aegean Blue + Cyan |
| Midnight | Βαθύ σκούρο + Χρυσό |
| Sand | Ζεστά μπεζ τόνοι |

4. **Δημοσίευση** — η επιλογή γίνεται το default για νέους επισκέπτες.

### Μέθοδος Β — Client-side widget
Κάθε επισκέπτης μπορεί να αλλάξει skin από το **corner widget** (κάτω δεξιά),
η επιλογή αποθηκεύεται στο localStorage του browser.

---

## Booking Form

Το φόρμα αναζήτησης (block #23) λειτουργεί σε **demo mode**:
- Συλλέγει from/to/date/passengers/vehicle
- Submit → ανοίγει `https://lefkimmilines.gr/el/reservation/` σε νέο tab
  με τα δεδομένα ως query string

Για live integration αλλάξτε `data-book-url` στο `front-page.php`
(γραμμή με `px-bf-root`) στο URL του booking provider.

---

## i18n (9 γλώσσες)

Η πολυγλωσσία γίνεται client-side μέσω `assets/i18n.js`.
Δεν απαιτείται WPML ή Polylang.

Για να προσθέσεις/αλλάξεις μετάφραση:
1. Άνοιξε `assets/i18n.js`
2. Βρες τη γλώσσα (π.χ. `en: { ... }`)
3. Άλλαξε την τιμή του κλειδιού
4. Upload — αλλαγή άμεση, χωρίς build step

Διαθέσιμες γλώσσες: GR · EN · FR · IT · DE · ES · RO · BG · RU

---

## Δομή αρχείων

```
lefkimmi-lines-theme/
├── style.css          Theme header (WP το διαβάζει)
├── index.php          Fallback template
├── front-page.php     Αρχική σελίδα (homepage)
├── header.php         <head> + nav + drawer
├── footer.php         Footer + wp_footer()
├── functions.php      Enqueue assets + helpers
├── assets/
│   ├── caldera.css    Skin tokens (navy/gold palette)
│   ├── block21.css/js Schedule calendar block
│   ├── block23.css/js Booking form block
│   ├── i18n.js        9-language dictionary
│   ├── app.js         Scroll reveal, parallax, counter
│   └── skin-picker.js 5-skin corner widget
└── inc/
    ├── schedule-cpt.php  CPT + metaboxes + REST endpoint
    └── skin-options.php  Customizer skin panel
```

---

## Συχνά Προβλήματα

**Δεν εμφανίζεται το schedule (άδειο)**
→ Βεβαιώσου ότι τα δρομολόγια είναι δημοσιευμένα και έχουν "Ενεργό" ✅.
→ Αν είναι άδεια, εμφανίζεται το static fallback.

**Το video στο hero δεν παίζει**
→ Φυσιολογικό σε ορισμένα mobile. Εμφανίζεται το Ken Burns poster.
→ Για custom video: αλλάξε τα `<source>` URLs στο `front-page.php`.

**REST endpoint δίνει 404**
→ Πήγαινε Settings → Permalinks → Save (flush rewrites).

**Fonts δεν φορτώνουν**
→ Βεβαιώσου ότι ο server επιτρέπει outbound HTTPS στο fonts.googleapis.com.
