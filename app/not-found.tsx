import Link from "next/link";
import { IoPawSharp } from "react-icons/io5";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reem/Not Found",
  description: "Lost?",
  openGraph: {
    images: "/404.png",
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-neutral-500 mb-6 max-w-md">
        You have wandered off the path. Follow the paw prints home.
      </p>

      <Link
        href="/"
        className="px-4 py-2 hover:text-gray-100 transition flex flex-col items-center gap-3 group"
      >
        <IoPawSharp
          className="transform -rotate-[15deg] group-hover:scale-110 transition"
          size={24}
        />
        <IoPawSharp
          className="transform rotate-[10deg] group-hover:scale-110 transition"
          size={24}
        />
      </Link>
    </div>
  );
}
