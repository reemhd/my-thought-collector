"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import PyramidLogo from "./PyramidLogo";

export default function Navbar() {
  return (
    <aside className="mb-6 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row gap-4">
            <Link href="/" className="text-inherit no-underline">
              <div >
                <PyramidLogo />
              </div>
            </Link>
          </div>

          <div className="flex-grow" />

          {/* Social icons */}
          <div className="flex flex-row gap-2">
            <Link
              href="https://github.com/reemhd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-orange-300"
            >
              <FaGithub size={30} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/reemhd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-orange-300"
            >
              <FaLinkedin size={30} />
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
