import fs from "fs";
import path from "path";

export type Post = {
  id: number;
  created_at: string;
  title: string;
  tags: string[];
  slug: string;
};

const blogDir = path.join(process.cwd(), "app/content");

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts: Post[] = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const slug = fileName.replace(/\.mdx$/, "");
    const file = await import(`@/app/content/${slug}.mdx`);

    const { title, created_at, tags } = file.metadata;

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
    });
  }

  return posts;
}

export function getAllTagsFromPosts(posts: Post[]): string[] {
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  }

  return Array.from(tagSet);
}
