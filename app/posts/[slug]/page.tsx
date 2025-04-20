import { notFound } from "next/navigation";
import { getAllPosts } from "@/app/lib/posts";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { default: Post, metadata } = await import(`@/app/content/${slug}.mdx`);
  if (!Post) return notFound();
const title = metadata.title

  return (
    <article className="prose prose-invert text-gray-300 mt-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <Post />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
