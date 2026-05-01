import { Posts } from "./components/posts";
import { getAllPosts } from "./lib/posts";
import BackToTop from "./components/back-to-top";
import { getAllLikes } from "./actions/likes";

export default async function Home() {
  const posts = await getAllPosts();
  const likes = await getAllLikes(posts.map((p) => p.slug));
  return (
    <section>
      <Posts posts={posts} likes={likes} />
      <BackToTop />
    </section>
  );
}
