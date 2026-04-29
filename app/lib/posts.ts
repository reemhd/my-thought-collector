import fs from "fs";
import path from "path";

export type Post = {
  id: number;
  created_at: string;
  title: string;
  tags: string[];
  slug: string;
  description: string
};

const blogDir = path.join(process.cwd(), "app/content");

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts: Post[] = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const slug = fileName.replace(/\.mdx$/, "");
    const file = await import(`@/app/content/${slug}.mdx`);

    const { title, created_at, tags, description } = file.metadata;

    if (!title || !created_at || !tags) {
      console.warn(`Missing metadata in file: ${fileName}`);
      continue;
    }

    posts.push({
      id: i + 1,
      title,
      created_at,
      tags,
      slug,
      description
    });
  }

  return posts;
}
