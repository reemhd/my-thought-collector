import fs from "fs";
import path from "path";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

function getFormattedDate(): string {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const [title, tagsInput] = process.argv.slice(2);

if (!title) {
  console.error("Please provide a title.");
  process.exit(1);
}

const tags = tagsInput ? tagsInput.split(",").map((t) => t.trim()) : [];
const slug = slugify(title);
const date = getFormattedDate();

const metadata = {
  title,
  created_at: date,
  tags,
  description: "",
  image: "",
};

const content = `export const metadata = ${JSON.stringify(metadata, null, 2)};

Content...
`;

const targetDir = path.join(process.cwd(), "app/content");
const filePath = path.join(targetDir, `${slug}.mdx`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);
