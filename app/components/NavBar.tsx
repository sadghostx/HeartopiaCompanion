"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-blue-100 text-blue-700 font-semibold border border-blue-300"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100";

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 py-3">
          <Link href="/" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/")}`}>
            Home
          </Link>
          <Link href="/birds" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/birds")}`}>
            Birds
          </Link>
          <Link href="/fish" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/fish")}`}>
            Fish
          </Link>
          <Link href="/insects" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/insects")}`}>
            Insects
          </Link>
          <Link href="/cooking" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/cooking")}`}>
            Cooking
          </Link>
          <Link href="/flowers" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/flowers")}`}>
            Flowers
          </Link>
          <Link href="/crops" className={`px-4 py-2 rounded-lg text-sm ${linkClass("/crops")}`}>
            Crops
          </Link>
        </div>
      </div>
    </nav>
  );
}