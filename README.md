# Trong Tran — Portfolio

Personal portfolio of **Trong Tran**, Flutter Developer & Mobile Engineer.
It's a static single-page site built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons. It has no backend.

All content comes from `CV_TranThienTrong_Flutter.pdf`. Nothing on the site goes beyond what the CV states.

## Requirements

- Node.js 18+ (20 or 22 recommended)
- npm

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & preview

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ on http://localhost:4173
```

### Environment variables (optional)

Copy `.env.example` to `.env` and adjust:

| Variable         | Purpose                                                                                                                                                | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `VITE_SITE_URL`  | Public URL, without a trailing slash. Enables the canonical URL, absolute Open Graph image/URL, `sitemap.xml` and the `Sitemap:` line in `robots.txt`. | empty   |
| `VITE_BASE_PATH` | Sub-path the site is served from. Use `/<repo>/` for a GitHub Pages project site.                                                                      | `/`     |

`robots.txt` is always generated. `sitemap.xml` needs absolute URLs, so it is only generated when `VITE_SITE_URL` is set. The build prints a warning when it skips the sitemap.

## Deployment

The output in `dist/` is plain static files and works on any static host. `dist/404.html` is a lightweight custom "not found" page, and GitHub Pages, Netlify and Vercel all serve it automatically.

### Vercel

Import the repository. `vercel.json` already sets `npm run build` as the build command and `dist` as the output directory. Then add `VITE_SITE_URL` (e.g. `https://your-domain.vercel.app`) under Project → Settings → Environment Variables.

### Netlify

Import the repository. `netlify.toml` configures the build. Add `VITE_SITE_URL` under Site settings → Environment variables.

### GitHub Pages

1. Push to `main`.
2. In the repository, open **Settings → Pages → Source** and select **GitHub Actions**.
3. The workflow `.github/workflows/deploy-pages.yml` builds and deploys automatically. It sets `VITE_BASE_PATH=/<repo>/` and `VITE_SITE_URL=https://<user>.github.io/<repo>`.
   If you use a custom domain or a `<user>.github.io` repository, change `VITE_BASE_PATH` to `/` and update `VITE_SITE_URL` in the workflow.

## Updating content

Content is kept separate from the UI. You normally only edit files in `src/data/` and `src/i18n/`.

| What                                              | File                     |
| ------------------------------------------------- | ------------------------ |
| Name, contact details, CV file                    | `src/data/siteConfig.ts` |
| Projects (featured + "More projects")             | `src/data/projects.ts`   |
| Work history & education                          | `src/data/experience.ts` |
| Skill groups                                      | `src/data/skills.ts`     |
| Highlight figures & release channels              | `src/data/highlights.ts` |
| Working-approach steps                            | `src/data/approach.ts`   |
| Section headings, hero/about/contact copy, labels | `src/i18n/en.ts`         |

### Contact links

In `src/data/siteConfig.ts`, set `linkedin` / `github` to a full profile URL to show them. Leave them as `null` to hide them. The same applies to `phone`: it appears on the CV but is kept off the website by default. The site never renders an empty or `#` link.

### CV

The PDF is at `public/cv/CV_TranThienTrong_Flutter.pdf`. To replace it, overwrite that file, or add a new one and update `cvPath`. Setting `cvPath: null` hides every "Download CV" button. The build warns if the configured file is missing.

### Projects

Each project in `src/data/projects.ts` supports:

- `featured`: `true` gives it a large card with a detail dialog. `false` puts it in the compact "More projects" list.
- `category`: drives the filter buttons. Categories with no projects are hidden automatically.
- `features`, `featuresToVerify`, `technologies`, `platforms`, `teamSize`, `contribution`, `relatedProducts`.
- `links`: `{ kind: 'google-play' | 'app-store' | 'website' | 'zalo', href }`. Only add verified URLs. Projects without links show no link buttons.
- `screenshots`: `{ src, alt, width, height }[]`, with paths relative to `public/`.
  Put the files in `public/images/projects/<project-id>/`, ideally as `.webp`. When a project has screenshots, the first one replaces the artwork on its card, and all of them appear in the dialog with lazy loading.

Projects without screenshots show an abstract SVG illustration (`src/components/projects/ProjectArtwork.tsx`). These are labelled in the UI as illustrative artwork, not product screenshots.

### Highlights

Every figure in `src/data/highlights.ts` comes from the CV and carries a `note` stating its scope. For example, 1M+ is labelled as a combined historical figure across products. Delete an entry to hide it, and the grid adapts.

### Adding Vietnamese

1. Copy `src/i18n/en.ts` to `src/i18n/vi.ts` and translate the values. `Dictionary` enforces the same shape.
2. Register it in `src/i18n/index.ts` and choose the locale, e.g. from the URL or a toggle.
3. Text in `src/data/*.ts` (project summaries, experience bullets) is in English. To localise it, either add per-locale data files or turn those fields into `{ en, vi }` objects.

## Project structure

```
public/
  cv/                 CV PDF (Download CV)
  images/projects/    project screenshots (optional)
  favicon.svg, og-image.png
src/
  components/
    layout/           Section, Footer
    navigation/       Navbar (sticky, active section, mobile menu, scroll progress)
    sections/         Hero, Highlights, About, Experience, Skills, Approach, Contact
    projects/         gallery, filters, card, accessible <dialog>, more projects, artwork
    ui/               Button, Tag, Reveal, BackToTop, brand icons
  data/               all editable content
  hooks/              active section, scroll state, scroll lock
  i18n/               UI copy dictionary
  lib/                small helpers
  styles/             Tailwind entry + global styles
  types/              content types
404.html              static not-found page
vite.config.ts        base path, robots/sitemap generation, CV check
```

## Accessibility & performance notes

- The page uses semantic landmarks, a skip link, a single `h1` and an ordered heading hierarchy.
- All controls work from the keyboard and have visible focus rings. The project dialog uses native `<dialog>`, so focus is trapped, Escape closes it, focus returns to the card that opened it, and background scroll is locked.
- `prefers-reduced-motion` is respected by both Framer Motion (`MotionConfig reducedMotion="user"`) and CSS.
- Fonts (Inter, JetBrains Mono) are self-hosted through Fontsource, with no third-party requests. The site has no analytics or tracking.
