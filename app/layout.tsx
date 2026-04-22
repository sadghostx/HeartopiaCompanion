import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Heartopia Guide",
  description: "Your cozy companion app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5FB] text-zinc-700">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}