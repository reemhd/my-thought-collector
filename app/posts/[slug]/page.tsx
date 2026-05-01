import { notFound } from "next/navigation";
import { getAllPosts } from "@/app/lib/posts";
import type { Metadata } from "next";
import BackToTop from "@/app/components/back-to-top";
import ThumbsUp from "@/app/components/thumbs-up";
import { getLikes } from "@/app/actions/likes";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const { metadata } = await import(`@/app/content/${slug}.mdx`);

  return {
    title: `Reem/${metadata.title}`,
    description: metadata.description,
    openGraph: {
      images: metadata.image,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const [{ default: Post, metadata }, initialCount] = await Promise.all([
    import(`@/app/content/${slug}.mdx`),
    getLikes(slug),
  ]);
  if (!Post) return notFound();

  return (
    <article className="prose prose-lg prose-invert text-gray-300 mt-4">
      <span className="font-serif  text-2xl mb-4">{metadata.title}</span>
      <div className="flex items-center justify-between not-prose mb-4">
        <p className="font-mono text-sm text-neutral-500">{metadata.created_at}</p>
        <ThumbsUp slug={slug} initialCount={initialCount} />
      </div>
      <Post />
      <BackToTop />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
