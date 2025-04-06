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
    created_at: "2 Apr 2025",
    title: "AWS Elastic Beanstalk Load Balancer",
    tags: ["engineering"],
  },
  // {
  //   id: 2,
  //   created_at: "12 Feb 2025",
  //   title: "Basic Web Server with Go",
  //   tags: ["engineering"],
  // },
  {
    id: 3,
    created_at: "19 Mar 2025",
    title: "Debugging a Production Nightmare",
    tags: ["engineering"],
  },
  // {
  //   id: 4,
  //   created_at: "6 April 2025",
  //   title: "CIDR",
  //   tags: ["engineering"],
  // },
];

export const posts: Post[] = rawPosts.map((post) => {
  const slug = slugify(post.title);

  return {
    ...post,
    slug,
  };
});
