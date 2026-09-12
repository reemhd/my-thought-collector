[reemdalvi.com](https://reemdalvi.com)

Built with [Zola](https://www.getzola.org/).

## Develop

```bash
zola serve
```

## New post

```bash
npm run new:post -- "Post Title" "Tag"
```

Creates `content/posts/<slug>.md`, fill in the description/image and write the content below the front matter.

## Build

```bash
zola build
```

Outputs the static site to `public/`. Deployed on Vercel via `vercel.json`, which downloads the Zola binary and runs the build (Vercel has no native Zola support).

🙃
