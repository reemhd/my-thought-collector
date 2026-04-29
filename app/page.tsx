import { Posts } from "./components/posts";
import { getAllPosts } from "./lib/posts";
import BackToTop from "./components/back-to-top";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <section>
      <Posts posts={posts} />
      <BackToTop />
    </section>
  );
}
