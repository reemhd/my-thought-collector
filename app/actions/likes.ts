"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function getLikes(slug: string): Promise<number> {
  const count = await redis.get<number>(`likes:${slug}`);
  return count ?? 0;
}

export async function incrementLikes(slug: string): Promise<number> {
  return redis.incr(`likes:${slug}`);
}

export async function getAllLikes(slugs: string[]): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};
  const values = await redis.mget<number[]>(...slugs.map((s) => `likes:${s}`));
  return Object.fromEntries(slugs.map((slug, i) => [slug, values[i] ?? 0]));
}
