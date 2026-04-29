import { Posts } from "./components/posts";
import { getAllPosts, getAllTagsFromPosts } from "./lib/posts";


export default async function Home() {
  const posts = await getAllPosts();
  const tags = getAllTagsFromPosts(posts);
  return (
    <section>
      <Posts posts={posts} tags={tags} />
    </section>
  );
}
