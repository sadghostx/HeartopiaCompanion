import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Heartopia Guide",
  description: "Your cozy companion app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5FB] text-zinc-700">
        {/* Sidebar appears on every page */}
        <Sidebar />

        {/* Page content shifts right on desktop */}
        <main className="sm:ml-56 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}