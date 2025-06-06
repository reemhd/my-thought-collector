"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/app/lib/posts";

type Props = {
  posts: Post[];
  tags: string[];
};

export function Tags({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState("all");

  const filteredPosts =
    activeTag === "all"
      ? posts
      : posts.filter((post) => post.tags.includes(activeTag));

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const filteredPostsWithSlug = filteredPosts.map((post) => ({
    ...post,
    slug: slugify(post.title),
  }));

  return (
    <section>
      <div className="my-2">
        <div className="flex flex-wrap gap-4">
          {tags?.length > 1 && tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`py-1 text-sm text-left cursor-pointer hover:text-orange-300 ${
                activeTag === tag ? "text-orange-300 border-b" : "text-grey-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filteredPostsWithSlug
            .sort((a, b) => {
              return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
            })
            .map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="w-full flex flex-col md:flex-row space-x-0 md:space-x-1"
              >
                <span className="text-neutral-600 w-[120px]">
                  {post.created_at}
                </span>
                <span className="text-neutral-300 tracking-tight  hover:text-orange-300 transition">
                  {post.title}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
