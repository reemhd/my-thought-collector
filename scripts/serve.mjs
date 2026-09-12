#!/usr/bin/env node
/* Minimal static server for dist/, with rebuild-on-change. No dependencies.
 * Run: npm run dev */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "dist");
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function rebuild() {
  const result = spawnSync(process.execPath, [path.join(root, "build.mjs")], { stdio: "inherit" });
  return result.status === 0;
}

/* Resolve a URL path to a file inside dist/, refusing anything that escapes it. */
function resolve(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const candidate = path.join(OUT, decoded);
  if (candidate !== OUT && !candidate.startsWith(OUT + path.sep)) return null;

  for (const file of [candidate, path.join(candidate, "index.html"), candidate + ".html"]) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

if (!rebuild()) process.exit(1);

http
  .createServer((req, res) => {
    const file = resolve(req.url || "/");

    if (!file) {
      const notFound = path.join(OUT, "404.html");
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "Not found");
      return;
    }

    res.writeHead(200, {
      "content-type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`\n  http://localhost:${PORT}\n`));

/* Rebuild when sources change. Debounced — editors fire several events per save. */
let timer;
for (const watched of ["content", "src", "static", "build.mjs"]) {
  const target = path.join(root, watched);
  if (!fs.existsSync(target)) continue;
  fs.watch(target, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 100);
  });
}
