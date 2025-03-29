export type Post = {
  id: number;
  created_at: string;
  title: string;
  tags: string[];
  slug: string;
};

const slugify = (str: string) =>
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
  },
  {
    id: 2,
    created_at: "12 May 2024",
    title: "Working with Go",
    tags: ["programming"],
  },
  {
    id: 3,
    created_at: "1 Feb 2025",
    title: "Debugging Production Nightmare",
    tags: ["thoughts"],
  },
];

export const posts: Post[] = rawPosts.map((post) => {
  const slug = slugify(post.title);

  return {
    ...post,
    slug,
  };
});
