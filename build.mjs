#!/usr/bin/env node
/* Static site generator for reemdalvi.com.
 *
 *   content/*.md  ->  dist/posts/<slug>.html
 *                 ->  dist/index.html   (list, newest first, grouped by year)
 *                 ->  dist/404.html
 *   static/*      ->  dist/*            (copied verbatim)
 *   src/styles.css, src/site.js -> dist/
 *
 * Run: npm run build
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import yaml from "js-yaml";
import { homePage, postPage, notFoundPage } from "./src/templates.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const dir = (...p) => path.join(root, ...p);

const CONTENT = dir("content");
const STATIC = dir("static");
const OUT = dir("dist");

/* --- frontmatter ---------------------------------------------------------- */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseFrontmatter(raw, file) {
  const match = raw.match(FRONTMATTER);
  if (!match) throw new Error(`${file}: missing --- frontmatter block`);
  const data = yaml.load(match[1]) ?? {};
  return { data, body: raw.slice(match[0].length) };
}

/* --- dates ----------------------------------------------------------------
   Posts are dated "2 Apr 2025" style. Parsed by hand rather than with
   `new Date(string)`, which is engine-dependent for formats like the
   "19 Sept 2025" used in archive/ — V8 accepts it, other engines need not.
   Parsing here is deterministic, pins the date to UTC so the year can't shift
   with the build machine's timezone, and throws on anything unrecognised
   instead of silently sorting on an Invalid Date.
   ------------------------------------------------------------------------- */

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(value, file) {
  const match = String(value).trim().match(/^(\d{1,2})\s+([A-Za-z]+)\.?\s+(\d{4})$/);
  if (!match) throw new Error(`${file}: date "${value}" is not "D Mon YYYY" (e.g. "2 Apr 2025")`);

  const [, day, monthName, year] = match;
  const month = MONTHS[monthName.slice(0, 3).toLowerCase()];
  if (month === undefined) throw new Error(`${file}: unknown month "${monthName}"`);

  return new Date(Date.UTC(Number(year), month, Number(day)));
}

/* --- markdown ------------------------------------------------------------- */

marked.setOptions({ gfm: true, breaks: false });

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/* Give headings stable ids (so #anchors work) and make images lazy. */
function enhance(html) {
  const seen = new Map();

  return html
    .replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (whole, level, inner) => {
      let id = slugify(inner);
      if (!id) return whole;
      if (seen.has(id)) {
        const n = seen.get(id) + 1;
        seen.set(id, n);
        id = `${id}-${n}`;
      } else {
        seen.set(id, 0);
      }
      return `<h${level} id="${id}">${inner}</h${level}>`;
    })
    .replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

/* --- posts ---------------------------------------------------------------- */

function readPosts() {
  if (!fs.existsSync(CONTENT)) return [];

  const posts = fs
    .readdirSync(CONTENT)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(CONTENT, file), "utf8"), file);

      for (const field of ["title", "date", "description"]) {
        if (!data[field]) throw new Error(`${file}: missing "${field}" in frontmatter`);
      }

      const published = parseDate(data.date, file);

      return {
        slug,
        href: `/posts/${slug}`,
        title: data.title,
        date: data.date,
        published,
        isoDate: published.toISOString().slice(0, 10),
        description: data.description,
        image: data.image ?? "",
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        html: enhance(marked.parse(body)),
      };
    });

  return posts.sort((a, b) => b.published - a.published);
}

function groupByYear(posts) {
  const groups = [];
  for (const post of posts) {
    const year = String(post.published.getUTCFullYear());
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.posts.push(post);
    else groups.push({ year, posts: [post] });
  }
  return groups;
}

/* --- output --------------------------------------------------------------- */

function write(relative, contents) {
  const target = path.join(OUT, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const posts = readPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  write(
    "index.html",
    homePage({
      groups: groupByYear(posts),
      tags,
      currentYear: String(new Date().getFullYear()),
    })
  );

  for (const post of posts) write(path.join("posts", `${post.slug}.html`), postPage(post));

  write("404.html", notFoundPage());

  if (fs.existsSync(STATIC)) fs.cpSync(STATIC, OUT, { recursive: true });
  fs.copyFileSync(dir("src/styles.css"), path.join(OUT, "styles.css"));
  fs.copyFileSync(dir("src/site.js"), path.join(OUT, "site.js"));

  console.log(`Built ${posts.length} post${posts.length === 1 ? "" : "s"} -> dist/`);
  for (const post of posts) console.log(`  ${post.href.padEnd(56)} ${post.date}`);
}

try {
  build();
} catch (error) {
  console.error(`\nBuild failed: ${error.message}\n`);
  process.exit(1);
}
