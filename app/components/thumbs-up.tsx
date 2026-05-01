"use client";

import { useState, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { incrementLikes } from "@/app/actions/likes";

type Props = {
  slug: string;
  initialCount: number;
};

export default function ThumbsUp({ slug, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");
  }, [slug]);

  async function handleClick() {
    if (liked) return;
    setLiked(true);
    setCount((c) => c + 1);
    localStorage.setItem(`liked:${slug}`, "1");
    await incrementLikes(slug);
  }

  return (
    <button
      onClick={handleClick}
      disabled={liked}
      aria-label="Like this post"
      className={`flex items-center gap-1.5 font-mono text-sm transition ${
        liked
          ? "text-orange-400 cursor-default"
          : "text-neutral-500 hover:text-orange-300 cursor-pointer"
      }`}
    >
      {liked ? <BiSolidLike size={18} /> : <BiLike size={18} />}
      <span>{count}</span>
    </button>
  );
}
