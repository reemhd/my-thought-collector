import fs from "fs";
import path from "path";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

function getIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

const [title, tagsInput] = process.argv.slice(2);

if (!title) {
  console.error("Usage: node scripts/create-post.mjs <title> [tag1,tag2]");
  process.exit(1);
}

const tags = tagsInput ? tagsInput.split(",").map((t) => t.trim()) : [];
const slug = slugify(title);
const date = getIsoDate();

const frontMatter = `+++
title = "${title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"
date = ${date}
description = ""

[taxonomies]
tags = ${JSON.stringify(tags)}

[extra]
image = ""
+++

Content...
`;

const targetDir = path.join(process.cwd(), "content/posts");
const filePath = path.join(targetDir, `${slug}.md`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, frontMatter);
console.log(`Created: ${filePath}`);
