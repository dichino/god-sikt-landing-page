# God Sikt — Project Showcase

A responsive, static engineering showcase for the God Sikt Android project. Built with React, TypeScript, Vite, Tailwind CSS, Manrope, and Lucide icons.

The website defaults to **Norwegian Bokmål**. The navigation’s **NO | EN** selector changes the whole presentation without a page reload and remembers the choice in localStorage. The original screenshots and app recreation keep their Norwegian interface in both modes.

## Run locally

Requires Node.js 20.19+ and npm. GitHub Actions uses Node.js 22.

```sh
npm ci
npm run dev
```

```sh
npm test        # Demo boundaries and authentic asset integrity
npm run build  # Strict TypeScript checks and production output
npm run verify:pages # Check the built site and all resources under the Pages path
npm run preview
```

Open `http://127.0.0.1:5173/god-sikt-landing-page/` during development, or `http://127.0.0.1:4173/god-sikt-landing-page/` for the production preview.

The production site is generated in `dist/`. No backend or environment variables are required.

## What is included

- Responsive maritime visual design with the original God Sikt identity.
- An interactive phone recreation: location selection, zoom, example weather, all 27 original maritime signs, reading-size controls, and About screens.
- A clickable architecture diagram and technology explanations grounded in the Android source.
- Engineering decisions, development/testing context, and authentic Figma/Android screen comparisons.
- Keyboard controls, visible focus, reduced-motion support, image descriptions, and mobile navigation.
- Local optimized images and fonts, favicon, Open Graph tags, and a 1200 × 630 social image.

The browser recreation uses **local sample data and an illustrative chart**. It does not request GPS access, contact weather services, or offer an emergency action. The original SOS interface was a proof of concept without rescue-service integration.

## Content provenance

Implementation details were checked against [the Android repository](https://github.com/dichino/GodSikt-app), commit `515e06922b207fbaa1b24bb2f04582459ac48d3e`, and the supplied matching project copy. The original Android project was not changed.

Screenshots, the God Sikt logo, team photograph, exported Figma screens, and sign resources came from the supplied project assets. The sign data preserves the original Norwegian descriptions. The [Figma prototype](https://www.figma.com/proto/WTGT0fELq5jkFXX33YFUXI/IN2000-High-Fidelity?node-id=1-404) is an exploration of a broader scope, not a claim that all features were implemented. Its remote sharing permissions could not be verified; the website includes local previews.

The report and internal university documents were used privately to understand the project. They are not bundled, embedded, linked, or downloadable from this website. Source credentials and original service configuration are not included.

## Structure

```text
src/components/  Page sections, shared presentation elements, interactive demo
src/data/        Typed project content and deterministic demo data
src/i18n/        Locale provider, localized copy, metadata, and preference handling
src/lib/urls.ts  Base-aware public resource URLs and the production site URL
src/styles.css   Responsive design system and reduced-motion rules
public/assets/   Optimized supplied imagery and original sign library
tests/           Demo, translations, public-asset integrity, and Pages path checks
scripts/         Production resource verification
.github/workflows/  Build, verify, and publish to GitHub Pages
```

The Android application is credited as a collaborative University of Oslo project. The footer separately credits creation of this website to Dichino Nguyen.

## GitHub Pages

Production URL: **https://dichino.github.io/god-sikt-landing-page/**

Vite uses `base: '/god-sikt-landing-page/'`. Public images, the sign-library fetch, and sign image paths use the shared `assetUrl` helper. Vite prefixes JavaScript, CSS, and bundled fonts automatically. Navigation uses section fragments, so no SPA rewrite or custom 404 page is needed. Canonical and sharing metadata point to the production URL.

### One-time repository setup

1. Open [Settings → Pages](https://github.com/dichino/god-sikt-landing-page/settings/pages).
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the website changes, including `.github/workflows/deploy-pages.yml`, to `main`.
4. Open [Actions](https://github.com/dichino/god-sikt-landing-page/actions) and wait for **Deploy God Sikt to GitHub Pages** to succeed. The workflow can also be started manually with **Run workflow**.

Every push to `main` installs the locked dependencies, runs the tests, builds the website, checks the production URLs, and publishes **only `dist/`**. Deployment uses GitHub's built-in token and the `github-pages` environment; no personal access token or deployment secret is required. GitHub Pages must be enabled in repository settings before the deployment job can succeed.

The Pages artifact excludes the report, internal documents, repository source, and hosting configuration. A validation step rejects unexpected file types or symbolic links in `dist/` before upload. Keep private documents outside `public/`, since Vite copies that directory into the production output.

After deployment, check the live URL, navigation, **NO | EN**, remembered language after reload, the sign library, and the Figma/Android comparison on desktop and mobile. The same checks can be performed locally with `npm run preview` before publishing.

The static HTML metadata is Norwegian for first visits and social crawlers. Switching languages updates the page title, description, Open Graph locale, sharing descriptions, and social image. `social-preview.png` is Norwegian; `social-preview-en.png` is English. A visitor’s preference is stored as `godsikt-language`. If browser storage is unavailable, language switching still works for the current visit.

## Verification

The automated tests check geographic bounds, repeatable sample data, all 27 sign records and image paths, the two allowed project destinations, exclusion of report/internal files from public assets, translation completeness, language defaults, full-page rendering in both languages, static Norwegian metadata, and resource/anchor URLs under the GitHub Pages repository path. `npm run verify:pages` additionally starts the production preview and checks every published resource over HTTP, including the generated JavaScript, CSS, fonts, all 27 sign images, and both social images. Browser checks cover the map/weather flow, sign/category/detail navigation, text sizing, About pages, the architecture diagram, engineering accordions, comparison controls, walkthrough, reset, mobile menu, language switching, and persistence after reload. These checks validate this website; they do not assert that the original Android test suite passes today.
