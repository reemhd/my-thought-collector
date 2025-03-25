import { posts } from "@/app/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-neutral-500 mb-8">{post.created_at}</p>
      <div className="prose prose-invert">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
