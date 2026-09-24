# [BUSINESS NAME]: sprout project website

A small, static, two-page site for a home sprout-growing project in Ogden Valley, Utah.
Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step.

```
sprouts/
├── index.html          Home: hero collage, "How I keep them safe", honest note
├── protocol.html       Full process / personal reference manual (linked from home + footer only)
├── css/
│   └── style.css       All styles: palette, layout, collage, animations, print
├── js/
│   ├── config.js       ← business name, tagline, location, contact (edit here)
│   └── main.js         Fills in config values + scroll-reveal animations
├── images/             Placeholder photos (swap for your own)
└── README.md
```

## Change the business name, tagline, or contact

Open **`js/config.js`** and edit the values:

```js
window.SITE = {
  businessName: "[BUSINESS NAME]",
  tagline: "Small-batch organic sprouts, grown carefully in Ogden Valley.",
  location: "Ogden Valley, Utah",
  contact: "[contact email or phone]"
};
```

Every element with a `data-site="..."` attribute on both pages is filled in from here,
including the browser tab title. The HTML also contains the same text as a fallback for
visitors with JavaScript turned off. To update that too, find-and-replace `[BUSINESS NAME]`
across `index.html` and `protocol.html`.

## Swap the images

The `images/` folder holds labeled placeholders. The easiest way to swap one is to
**save your photo with the exact same filename**, replacing the placeholder:

| File | Where it appears | Suggested shape |
| --- | --- | --- |
| `hero-sprouts.jpg` | Large background of the hero | Landscape, ~1800 × 1200 |
| `collage-house.jpg` | Collage piece: the house | Landscape 4:3, ~800 × 600 |
| `collage-road.jpg` | Collage piece: the road | Landscape 4:3, ~800 × 600 |
| `collage-closeup-1.jpg` | Collage piece: sprout close-up | Square, ~600 × 600 |
| `collage-closeup-2.jpg` | Collage piece: sprout close-up (desktop only) | Portrait 4:5, ~600 × 750 |

Tips:
- Pieces are cropped to fit automatically (`object-fit: cover`), so exact sizes don't matter.
- Keep files small for fast loading: export at the sizes above and ~75–80% JPEG quality
  (aim for under ~400 KB for the hero, ~150 KB for the pieces). [Squoosh](https://squoosh.app) works well.
- If you use a different filename or format (`.png`, `.webp`), update the `src` in `index.html`.
- **Update the `alt` text** in `index.html` to describe your actual photo.
- To change the tilt or position of a piece, edit `.piece--house`, `.piece--road`, etc. in
  `css/style.css` (`--r` is the rotation; `top`/`left`/`right`/`bottom`/`width` set placement).
  There's a phone layout and a separate `@media (min-width: 48rem)` desktop layout.

## Edit text

- **Home page** text is in `index.html`. The six safety points are the `<li>` items
  inside `<ol class="safety-list">`.
- **Protocol page** text is in `protocol.html`. Anything you still need to fill in is wrapped
  in `<em class="fill">[...]</em>` and shows with a tan highlight on the page. Once you've
  filled one in, you can remove the `<em class="fill">` wrapper.
- To add a section to the protocol: copy an existing `<section class="doc-section">` block,
  give it a new `id`, and add a matching link to the Contents list at the top.
- Colors are defined once at the top of `css/style.css` under `:root`.

## Animations

Elements with the class `reveal` fade and slide up as they scroll into view. Headings/paragraphs with
`data-reveal-words` appear word by word, and lists with `data-reveal-stagger` appear item by item.
It uses `IntersectionObserver` and CSS transitions only. If a visitor has **reduce motion** turned on
in their operating system (or JavaScript is off), everything is shown immediately with no animation.

## Preview locally

From this folder, run any static server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly by double-clicking also works.)

## Deploy to GitHub Pages

This site lives in the `sprouts/` folder of the `Portfolio_Projects` repo.

**Option A: keep it in this repo.** If Pages is already on for this repo
(Settings → Pages → Deploy from a branch → `main` / root), then once this branch is merged into `main`
the site is live at:

```
https://<your-username>.github.io/Portfolio_Projects/sprouts/
```

**Option B: give it its own repo (cleaner URL).**
1. Create a new empty repo on GitHub, e.g. `sprouts`.
2. Copy the contents of this `sprouts/` folder into it (so `index.html` is at the repo root), then:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sprouts.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
   `main` / `(root)` → Save**.
4. After a minute or two it's live at `https://<your-username>.github.io/sprouts/`.
   A custom domain can be added on the same Settings → Pages screen.

All paths in the site are relative, so it works in either location without changes.
