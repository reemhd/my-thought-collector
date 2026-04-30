"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  const sorted = [...filtered].sort((a, b) =>
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
      <div className="flex justify-end mb-2 mt-6" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setIsOpen((o) => !o)}
            className={`flex items-center gap-1 font-mono text-xs px-2 py-1 rounded transition ${
              selectedTag
                ? "text-orange-300"
                : "text-neutral-500 hover:text-orange-300"
            }`}
            aria-label="Filter by tag"
          >
            {selectedTag ?? "filter"}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-neutral-900 border border-neutral-700 rounded shadow-lg z-10 py-1">
              <button
                onClick={() => { setSelectedTag(null); setIsOpen(false); }}
                className={`w-full text-left px-3 py-1.5 font-mono text-xs transition ${
                  !selectedTag ? "text-orange-300" : "text-neutral-400 hover:text-orange-200"
                }`}
              >
                all
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setIsOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 font-mono text-xs transition ${
                    selectedTag === tag ? "text-orange-300" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
                  <span className="font-sans text-base text-neutral-400 tracking-tight mb-1">
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
