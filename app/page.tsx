import { Posts } from "./components/posts";
import { getAllPosts } from "./lib/posts";


export default async function Home() {
  const posts = await getAllPosts();
  return (
    <section>
      <Posts posts={posts} />
    </section>
  );
}
