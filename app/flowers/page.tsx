import FlowersContent from "./FlowersContent";
import AuthGuard from "../components/AuthGuard";

export default function FlowersPage() {
  return (
    <AuthGuard>
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Flowers</h1>
        <FlowersContent />
      </main>
    </AuthGuard>
  );
}