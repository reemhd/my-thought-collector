# [reemdalvi.com](https://reemdalvi.com)

🙃

A static blog. Markdown in, plain HTML and CSS out — no framework, no client-side
router, no runtime dependencies.

## Writing

```bash
npm run new:post -- "Post Title" Technical
```

That scaffolds `content/<slug>.md`:

```markdown
---
title: "Post Title"
date: "12 Sep 2026"
description: "Shown on the home page and in link previews."
image: "/aws.png"
tags: ["Technical"]
---

Content...
```

All five frontmatter fields matter: `title`, `date` and `description` are
required, `image` sets the social preview, and `tags` drive the filter on the
home page. Dates are `D Mon YYYY`, parsed as UTC so the year never shifts with the build
machine's timezone, and the build fails on anything it can't parse rather than
sorting on an invalid date.

Images live in `static/` and are referenced from the site root (`/aws.png`).
Posts in `archive/` are kept but not built.

## Developing

```bash
npm install
npm run dev
```

Serves <http://localhost:3000> and rebuilds when `content/`, `src/` or `static/`
changes. `npm run build` writes the site to `dist/`.

## How it works

| Path                | Role                                                  |
| ------------------- | ----------------------------------------------------- |
| `build.mjs`         | The generator: markdown → `dist/`                     |
| `src/templates.mjs` | HTML templates (plain template literals)               |
| `src/styles.css`    | The entire stylesheet, hand-written                    |
| `src/site.js`       | Logo, tag filter, back-to-top — progressive enhancement |
| `content/`          | Published posts                                        |
| `static/`           | Images and favicon, copied verbatim to `dist/`         |

Two build-time dependencies: `marked` (markdown) and `js-yaml` (frontmatter).
Nothing ships to the browser but the HTML, one stylesheet, and ~150 lines of JS.

## Deploying

`vercel.json` already points Vercel at `npm run build` and `dist/`.

Posts are written as `dist/posts/<slug>.html` and served extensionless, so the
live URLs stay exactly what they were under Next.js (`/posts/<slug>`, no
trailing slash, no redirect). That relies on `cleanUrls` — Vercel, Netlify and
GitHub Pages all do this. On a host that doesn't (plain nginx, S3), either
enable extensionless serving or switch `build.mjs` to write
`posts/<slug>/index.html` and link to `/posts/<slug>/`.

Vercel Analytics is loaded from `/_vercel/insights/script.js`, which only exists
once deployed — expect a 404 for it in local dev.
