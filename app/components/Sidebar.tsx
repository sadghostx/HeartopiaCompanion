"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../lib/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-purple-200 text-purple-800 font-semibold"
      : "text-zinc-700 hover:bg-purple-100";

  const handleLogout = async () => {
    await logout();
  };

  // Don't show sidebar on login page or if not authenticated
  if (pathname === "/login" || !isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-white border rounded-lg shadow px-3 py-2"
      >
        Menu
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-56 bg-white border-r shadow-lg p-4
          flex flex-col gap-2 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          z-40
        `}
      >
        <h2 className="text-xl font-bold mb-4 text-purple-700">Heartopia</h2>

        <Link href="/" className={`px-3 py-2 rounded-lg ${linkClass("/")}`}>
          Home
        </Link>
        <Link href="/birds" className={`px-3 py-2 rounded-lg ${linkClass("/birds")}`}>
          Birds
        </Link>
        <Link href="/fish" className={`px-3 py-2 rounded-lg ${linkClass("/fish")}`}>
          Fish
        </Link>
        <Link href="/insects" className={`px-3 py-2 rounded-lg ${linkClass("/insects")}`}>
          Insects
        </Link>
        <Link href="/cooking" className={`px-3 py-2 rounded-lg ${linkClass("/cooking")}`}>
          Cooking
        </Link>
        <Link href="/flowers" className={`px-3 py-2 rounded-lg ${linkClass("/flowers")}`}>
          Flowers
        </Link>
        <Link href="/crops" className={`px-3 py-2 rounded-lg ${linkClass("/crops")}`}>
          Crops
        </Link>
        <Link href="/fashionwave" className={`px-3 py-2 rounded-lg ${linkClass("/fashionwave")}`}>
          Fashionwave
        </Link>
        <Link href="/incomplete" className={`px-3 py-2 rounded-lg ${linkClass("/incomplete")}`}>
          Incomplete
        </Link>

        <div className="mt-auto">
          <p className="text-sm text-gray-600 mb-2">
            Logged in as: {user?.displayName || user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}