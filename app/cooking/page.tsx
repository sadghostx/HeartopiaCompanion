import CookingContent from "./CookingContent";
import AuthGuard from "../components/AuthGuard";

export default function CookingPage() {
  return (
    <AuthGuard>
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Cooking</h1>
        <CookingContent />
      </main>
    </AuthGuard>
  );
}