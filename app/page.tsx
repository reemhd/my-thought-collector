import About from "./components/about";
import { Tags } from "./components/tags";
import { getAllPosts, getAllTagsFromPosts } from "./lib/posts";


export default async function Home() {
  const posts = await getAllPosts();
  const tags = getAllTagsFromPosts(posts);
  return (
    <section>
      <About />
      <Tags posts={posts} tags={tags} />
    </section>
  );
}
