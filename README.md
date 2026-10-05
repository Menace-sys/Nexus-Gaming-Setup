# NEXUS Gaming Setup

A responsive, single-page showcase for a premium gaming setup — built with **React 18** and **Vite 6**, deployed on **Vercel**.

## Features

- **Hero, setup, specs, gallery and contact** sections with scroll-in animations
- **Setup cards open a detail dialog** with highlights and an “Ask about this” shortcut that pre-fills the contact form
- **Gallery lightbox** with keyboard support (← → to browse, Esc to close)
- **Working contact form** with validation, a spam honeypot, and two delivery options (see below)
- Active-section highlighting in the navigation, mobile menu that closes with Esc
- Accessible by default: skip link, native `<dialog>` focus handling, visible focus rings, reduced-motion support
- Graceful image fallbacks if a remote photo ever fails to load
- Favicon, touch icon, web manifest and link-preview (Open Graph / Twitter) tags

## Getting started

Requires Node.js 18.18 or newer.

```sh
npm install
npm run dev
```

| Command                | What it does                                |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the local dev server                  |
| `npm run build`        | Create a production build in `dist/`        |
| `npm run preview`      | Serve the production build locally          |
| `npm run lint`         | Check the code with ESLint                  |
| `npm run format`       | Format the code with Prettier               |
| `npm run format:check` | Check formatting without changing any files |

## Contact form setup

The form needs a destination. Set **one** of these environment variables — locally in `.env.local` (copy `.env.example`), or in **Vercel → Project → Settings → Environment Variables**, then redeploy:

| Variable             | Behaviour                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_FORM_ENDPOINT` | Messages are sent straight from the page to a JSON form endpoint, e.g. a free [Formspree](https://formspree.io) form. Recommended. |
| `VITE_CONTACT_EMAIL` | The visitor’s email app opens with the message ready to send to this address.                                                      |

If neither is set, the form validates input but tells visitors that online messages aren’t switched on yet.

## Project structure

```
public/            favicon, touch icon, manifest, robots.txt
src/
  config.js        site settings (contact options come from env variables)
  data.js          all page content: components, specs, gallery, nav links
  components/      one file per section plus shared pieces (Modal, Reveal, SmartImage…)
  styles.css       all styles, organised by section
```

To change text, specs or photos, edit `src/data.js` — no component code needs to change.

## Images & fonts

Photos are served from [Unsplash](https://unsplash.com) (their recommended hot-linking approach) and fonts from Google Fonts. To host photos yourself, drop them into `public/images/` and point the entries in `src/data.js` at `/images/your-file.jpg`.

## Deploying

Every push to `main` is deployed by Vercel automatically. On Windows, `deploy.ps1` builds the site first, then commits and pushes in one step. GitHub Actions runs lint, formatting and build checks on every push and pull request.
