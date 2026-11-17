# WEST TN — Local Services Directory (Gafsa & Kasserine)

A bilingual (Arabic / French) directory of local services and products for the
Gafsa and Kasserine regions in western Tunisia. Visitors can search by name,
category or city, open a provider's detail page, and contact them directly by
phone or WhatsApp.

The project is a **static site**: no build step, no backend, and no runtime
dependencies. It is deployed as plain files.

---

## Features

- **Bilingual UI** — Arabic (default, RTL) and French (LTR), switchable in place.
- **Full-text search** — matches names, descriptions, addresses, category labels
  and city names in both languages, accent/diacritic-insensitive
  (`electricien` → *Électricien*, `مِيكانيكِ` → *ميكانيك*, `قفصه` → `قفصة`).
- **Filters** — city chips and category buttons, combined with the search query.
- **Provider detail pages** — hash routing (`#p<id>`), address, opening hours,
  call / WhatsApp buttons and a WhatsApp share link.
- **Featured listings** — paid providers get a ★ badge, gold border and priority
  sorting.
- **Join form** — posts to Netlify Forms and opens a pre-filled WhatsApp message.
- **In-browser photo upload** — up to 3 work photos, compressed client-side
  (longest side 1280 px, JPEG q0.7) before upload.
- **Spam protection** — Netlify honeypot plus client-side phone validation and
  normalisation to `216…`.
- **Accessible & theme-aware** — light/dark colour schemes, `aria-live` result
  count, visible keyboard focus, one `<h1>` per view.

---

## Technologies

| Layer | Choice |
|---|---|
| Markup | HTML5 (`index.html`) |
| Styling | Hand-written CSS with custom properties, `prefers-color-scheme`, `color-mix()`, logical properties for RTL/LTR |
| Behaviour | Vanilla JavaScript (ES2020, no framework, no bundler) |
| Browser APIs | Canvas, `createImageBitmap`, `FormData`, `fetch` |
| Hosting | Netlify (static files + Netlify Forms) |
| Tooling | None — no `package.json`, no build step |

---

## Architecture

```
index.html   →  empty shell; all text is injected by JS
style.css    →  design tokens (CSS variables) + light/dark themes
app.js       →  data (CONFIG, CITIES, CATS, P, T) and all logic
photos/      →  provider photos (~100 KB each)
```

`app.js` holds three concerns in one file:

1. **Data** — `CONFIG` (WhatsApp/Facebook), `CITIES`, `CATS`, `P` (providers) and
   `T` (the AR/FR translation dictionary).
2. **Rendering** — `render()` rebuilds the shell and controls; `renderList()`
   handles filtering/sorting; `route()` switches between the list and the
   `#detail` view based on `location.hash`.
3. **Behaviour** — search debounce, language toggle, photo compression pipeline
   and the Netlify form submission.

Each provider row is normalised into an object at load time, and a precomputed
`p.hay` string makes search a cheap substring test.

---

## Project structure

```
west-tn/
├── app.js          # data + logic
├── index.html      # page structure
├── style.css       # design and themes
├── photos/         # provider images (.gitkeep keeps the empty folder)
├── README.md
└── .gitignore
```

---

## Prerequisites

- A modern browser (Chrome, Edge, Firefox or Safari).
- Optional, for a local HTTP server: **Python 3**.
- Optional, for deployment: a **Netlify** account.

No package manager, SDK or environment variables are required.

---

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bat
python -m http.server 8000
```

Then visit <http://localhost:8000>.

> Note: the Netlify form POST only works on a real deploy. Locally it fails
> silently on purpose — only the WhatsApp message opens.

---

## Configuration

There are **no environment variables**. Site configuration lives at the top of
`app.js`:

```js
const CONFIG = { whatsapp: "21658727400", facebook: "" };
```

- `whatsapp` — destination number for the join form and footer link (`216…`).
- `facebook` — Facebook page URL; leave empty to hide the footer link.

To add a provider, append a row to the `P` array (`app.js`):

```
[name_ar, name_fr, cat, city, phone, rating, featured, desc_ar, desc_fr, photo, address, hours]
```

- `photo` — path such as `photos/garage.jpg` (keep it under ~100 KB) or `""`.
- `featured` — `1` for a paid Featured listing, `0` otherwise.

---

## Deploy

1. Drag the whole project folder into Netlify (**Add new site → Deploy
   manually**), or connect the repository.
2. After the first deploy, add absolute URLs for social previews:
   - `<meta property="og:image" content="https://YOUR-SITE/og.png">` (1200×630)
   - `<link rel="canonical" href="https://YOUR-SITE/">`

   Relative URLs are ignored by WhatsApp and Facebook. Verify the preview with
   the Facebook Sharing Debugger once `og:image` exists.

The page already ships a `meta description`, Open Graph/Twitter tags, an inline
SVG favicon and a `<noscript>` fallback with the WhatsApp number.

---

## Netlify Forms and photos

- The join form posts to Netlify **and** opens a prepared WhatsApp message.
- Submissions appear in **Forms → join** in the Netlify dashboard.
- Honeypot field `bot-field`: bots see the success box but nothing is stored or
  opened.
- Phones are validated and normalised to 8 digits → `216…`.
- Work photos: up to 3 images, compressed in the browser (longest side 1280 px,
  JPEG 0.7 → usually 80–250 KB each) and posted as three separate fields
  `w0`, `w1`, `w2` (Netlify accepts one file per input field). The three hidden
  `<input type="file">` fields are declared in the HTML so Netlify registers the
  form definition, and are removed just before building the `FormData`.
- Netlify AJAX rule: send the raw `FormData` and set **no `Content-Type` header**.
- Limits: 8 MB per request, 30 s upload timeout.
- Photos travel with the form, not with WhatsApp; the message only announces the
  count. Find them under **Forms → join → submission → file links**.
- Photos are never published automatically: after approval, place the image in
  `photos/` (~100 KB) and add the row to `P`.

---

## Plans

| Plan | Price | Includes |
|---|---|---|
| Basic | 20 DT/month | Listing by city and category, detail page, call/WhatsApp buttons, share link |
| Featured | 30 DT/month | Everything in Basic + ★ badge, gold border, sorted first |

The first month is free for everyone. Payment is collected manually; there is no
online payment.

---

## Manual approval flow

1. Provider submits → lead appears in Netlify Forms + WhatsApp message.
2. Confirm details and photos with the provider on WhatsApp.
3. Add the row to `P`, add the photo to `photos/`, redeploy.
4. Set `featured = 1` once the 30 DT plan is paid; reset to `0` when it stops.
   Expiry is tracked manually for now.

---

## Accessibility

- Lighthouse: **100 accessibility / best practices / SEO**, checked in light and
  dark colour schemes.
- Contrast-safe palette (`--wa #178643`, scheme-aware `--rate`, `--pricered`,
  `--flink`).
- Exactly one `<h1>` per view; the search box has an `aria-label`, `#count` is
  `aria-live="polite"`, and keyboard focus is visible.

---

## Search behaviour

Each provider's searchable text is precomputed once (`p.hay`). Matching is
accent/diacritic-insensitive, Arabic tashkeel is stripped, `ة`→`ه` and `ى`→`ي`
are folded. Typing re-renders only the list and count after a 140 ms debounce.

---

## Roadmap

1. Move providers to `data/providers.json` loaded with `fetch`.
2. Read providers from a published Google Sheet (CSV) so new providers appear
   without redeploying.
3. Track call / WhatsApp clicks per provider and show stats.
4. Add `plan`, `exp` (expiry date) and `active` fields per provider; downgrade
   automatically when expired.
5. Light/dark theme toggle — `style.css` already honours `html[data-theme]`, but
   nothing sets it yet (add a button next to the language switch).

---

## License

No license has been specified for this project.
