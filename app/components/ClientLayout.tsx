"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../../lib/auth";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const showSidebar = isAuthenticated && pathname !== "/login";

  return (
    <>
      <Sidebar />
      <main className={`${showSidebar ? "sm:ml-56" : ""} p-4`}>
        {children}
      </main>
    </>
  );
}