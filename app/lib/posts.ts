// replace with get call

export type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  tags: string[];
};

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const rawPosts = [
  {
    id: 1,
    created_at: "2 April 2024",
    title: "AWS Series",
    tags: ["infrastructure"],
    content: "..",
  },
  {
    id: 2,
    created_at: "12 May 2024",
    title: "Working with Go for the First Time",
    tags: ["programming"],
    content: "..",
  },
  {
    id: 3,
    created_at: "1 Feb 2025",
    title: "How I Debugged a Production Nightmare",
    tags: ["thoughts"],
    content: "..",
  },
];

// Now map and inject the slug
export const posts: Post[] = rawPosts.map((post) => ({
  ...post,
  slug: slugify(post.title),
}));
