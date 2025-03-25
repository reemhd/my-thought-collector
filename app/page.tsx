import Image from "next/image";
import About from "./components/about";
import Tags from "./components/tags";

export default function Home() {
  return (
    <section>
      <About />
      <Tags />
    </section>
  );
}
