import About from "./components/about";
import Tags from "./components/tags";
import { posts } from "@/app/lib/posts";

export default function Home() {
  return (
    <section>
      <About />
      <Tags posts={posts} />
    </section>
  );
}
