#!/usr/bin/env node
/* Scaffold a post: npm run new:post -- "My Title" Technical,Philosophy */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const [title, tagsInput] = process.argv.slice(2);

if (!title) {
  console.error('Usage: npm run new:post -- "Post Title" [Tag1,Tag2]');
  process.exit(1);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now = new Date();
const date = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

const tags = tagsInput ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean) : [];
const quote = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const file = path.join(root, "content", `${slugify(title)}.md`);
if (fs.existsSync(file)) {
  console.error(`Post already exists: ${file}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(
  file,
  `---
title: ${quote(title)}
date: ${quote(date)}
description: ""
image: ""
tags: [${tags.map(quote).join(", ")}]
---

Content...
`
);

console.log(`Created: ${path.relative(root, file)}`);
