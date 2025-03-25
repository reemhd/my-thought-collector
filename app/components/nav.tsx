"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GiCat } from "react-icons/gi";
import { FaCat } from "react-icons/fa6";
import Link from "next/link";

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  return (
    <aside className="mb-12 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row gap-4">
            <Link href="/" className="text-inherit no-underline">
              <span
                className="text-2xl font-semibold tracking-tighter flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {hovered ? <FaCat /> : <GiCat />}
              </span>
            </Link>
          </div>

          <div className="flex-grow" />

          {/* Social icons */}
          <div className="flex flex-row gap-2">
            <Link
              href="https://github.com/reemhd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-orange-400"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/reemhd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-orange-400"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
