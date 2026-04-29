import Link from "next/link";
import type { Post } from "@/app/lib/posts";

type Props = {
  posts: Post[];
};

const tagColours: Record<string, string> = {
  Technical: "bg-sky-700/60 text-slate-200/70",
  Philosophy: "bg-green-900/60 text-green-300/70",
};

const currentYear = new Date().getFullYear().toString();

export function Posts({ posts }: Props) {
  const sorted = [...posts].sort((a, b) =>
    new Date(a.created_at) > new Date(b.created_at) ? -1 : 1,
  );

  const grouped = sorted.reduce<Record<string, Post[]>>((acc, post) => {
    const year = new Date(post.created_at).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <section>
      {years.map((year) => (
        <div key={year} className="my-4">
          {year !== currentYear && (
            <div className="font-mono text-base text-neutral-300 w-[120px] my-10">
              {year}
            </div>
          )}
          <div className="space-y-4">
            {grouped[year].map((post) => (
              <div
                key={post.id}
                className="w-full flex flex-col md:flex-col space-x-0 md:space-x-1 border-b border-neutral-700 pb-8"
              >
                <span
                  className={`font-mono text-xs w-max p-1 rounded mt-4 ${tagColours[post.tags[0]] ?? "bg-neutral-800 text-neutral-400"}`}
                >
                  {post.tags}
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="w-full flex flex-col md:flex-col space-x-0 md:space-x-1 pb-2 group"
                >
                  <span className="font-serif text-2xl text-neutral-300 tracking-tight pb-1 group-hover:text-orange-300 transition my-2">
                    {post.title}
                  </span>
                  <span className="font-sans text-base text-neutral-400 tracking-tight group-hover:text-orange-300 transition mb-1">
                    {post.description}
                  </span>
                </Link>
                <span className="font-mono text-xs text-neutral-500 w-[120px]">
                  {post.created_at}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
