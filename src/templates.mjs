/* HTML templates. Plain template literals — no JSX, no template engine. */

export const SITE = {
  url: "https://reemdalvi.com",
  title: "Reem/",
  description: "Thought dumping ground",
  image: "/hole.png",
  author: "Reem Dalvi",
};

const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => escapeMap[c]);

/* --- icons ---------------------------------------------------------------- */

const githubIcon = `<svg viewBox="0 0 496 512" aria-hidden="true" focusable="false"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>`;

const linkedinIcon = `<svg viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>`;

const pawIcon = `<svg viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path d="M442.8 361.82c-8.8-25.1-29.31-37.82-49.11-50.12-17.23-10.71-33.5-20.83-44.14-39-29.33-50.33-45.44-80.7-93.49-80.7s-64.21 30.38-93.61 80.69c-10.65 18.21-27 28.35-44.25 39.08-19.8 12.31-40.27 25-49.1 50.05a78.06 78.06 0 0 0-5.1 28.29C64 430.85 96.45 464 132.4 464s83.31-18.13 123.76-18.13S343.31 464 379.71 464 448 430.85 448 390.11a78.3 78.3 0 0 0-5.2-28.29z"/><ellipse cx="72" cy="216" rx="56" ry="72"/><ellipse cx="184" cy="120" rx="56" ry="72"/><ellipse cx="328" cy="120" rx="56" ry="72"/><ellipse cx="440" cy="216" rx="56" ry="72"/></svg>`;

/* The eye follows the cursor and blinks — see initLogo() in site.js. */
const pyramidLogo = `<svg data-logo class="logo" viewBox="0 0 180 180" role="img" aria-label="Home">
        <defs>
          <clipPath id="triClip"><polygon points="90,22 162,155 18,155"/></clipPath>
          <clipPath id="baseClip"><rect x="0" y="0" width="180" height="154"/></clipPath>
        </defs>
        <circle class="logo__face" cx="90" cy="108" r="86" fill="#e5e5e5" clip-path="url(#baseClip)"/>
        <g clip-path="url(#triClip)">
          <polygon points="90,22 162,155 18,155" fill="#151515"/>
          <ellipse class="logo__iris" cx="90" cy="108" rx="30" ry="19" fill="#e5e5e5"/>
          <ellipse class="logo__pupil" cx="90" cy="108" rx="10" ry="15" fill="#151515"/>
        </g>
      </svg>`;

/* --- chrome --------------------------------------------------------------- */

const nav = `<nav class="nav">
      <a href="/" aria-label="Home">${pyramidLogo}</a>
      <div class="nav__spacer"></div>
      <div class="nav__social">
        <a href="https://github.com/reemhd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${githubIcon}</a>
        <a href="https://www.linkedin.com/in/reemhd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${linkedinIcon}</a>
      </div>
    </nav>`;

const footer = `<footer class="footer">
      <p><strong>Reem Dalvi</strong> - writing at the intersection of AI, philosophy of mind, and systems thinking.</p>
    </footer>`;

const backToTop = `<button class="to-top" data-to-top type="button" hidden>&uarr; top</button>`;

/* --- base document -------------------------------------------------------- */

export function layout({ title, description, image, canonical, body, backToTop: withTop = true }) {
  const ogImage = SITE.url + (image || SITE.image);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(SITE.url + canonical)}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.title)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(SITE.url + canonical)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="shell">
      ${nav}
      <main>
${body}
      </main>
      ${footer}
    </div>
    ${withTop ? backToTop : ""}
    <script src="/site.js" defer></script>
    <script src="/_vercel/insights/script.js" defer></script>
  </body>
</html>
`;
}

/* --- home ----------------------------------------------------------------- */

function postCard(post) {
  return `          <article class="post-card" data-tags="${esc(post.tags.join("|"))}">
            <span class="tag" data-tag="${esc(post.tags[0] ?? "")}">${esc(post.tags.join(", "))}</span>
            <a class="post-card__link" href="${esc(post.href)}">
              <h2 class="post-card__title">${esc(post.title)}</h2>
              <span class="post-card__description">${esc(post.description)}</span>
            </a>
            <time class="post-card__date" datetime="${esc(post.isoDate)}">${esc(post.date)}</time>
          </article>`;
}

export function homePage({ groups, tags, currentYear }) {
  const filter = `        <div class="filter" data-filter>
          <div class="filter__wrap">
            <button class="filter__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Filter by tag" data-active="false">filter</button>
            <div class="filter__menu" role="menu" hidden>
              <button class="filter__option" type="button" role="menuitemradio" aria-checked="true" data-tag="">all</button>
${tags.map((tag) => `              <button class="filter__option" type="button" role="menuitemradio" aria-checked="false" data-tag="${esc(tag)}">${esc(tag)}</button>`).join("\n")}
            </div>
          </div>
        </div>`;

  const years = groups
    .map(
      ({ year, posts }) => `        <section class="year">
${year !== currentYear ? `          <h2 class="year__label">${esc(year)}</h2>\n` : ""}          <div class="year__posts">
${posts.map(postCard).join("\n")}
          </div>
        </section>`
    )
    .join("\n");

  return layout({
    title: SITE.title,
    description: SITE.description,
    canonical: "/",
    body: `${filter}
${years}
        <p class="empty" data-empty hidden>No posts with that tag.</p>`,
  });
}

/* --- post ----------------------------------------------------------------- */

export function postPage(post) {
  return layout({
    title: `${SITE.title}${post.title}`,
    description: post.description,
    image: post.image,
    canonical: post.href,
    body: `        <article class="post">
          <header>
            <h1 class="post__title">${esc(post.title)}</h1>
            <p class="post__date"><time datetime="${esc(post.isoDate)}">${esc(post.date)}</time></p>
          </header>
          <div class="prose">
${post.html}
          </div>
        </article>`,
  });
}

/* --- 404 ------------------------------------------------------------------ */

export function notFoundPage() {
  return layout({
    title: `${SITE.title}Not Found`,
    description: "Lost?",
    image: "/404.png",
    canonical: "/404",
    backToTop: false,
    body: `        <div class="notfound">
          <h1>404 - Page Not Found</h1>
          <p>You have wandered off the path. Follow the paw prints home.</p>
          <a class="notfound__paws" href="/" aria-label="Back to home">
            ${pawIcon}
            ${pawIcon}
          </a>
        </div>`,
  });
}
