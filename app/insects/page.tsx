import InsectsContent from "./InsectsContent";
import AuthGuard from "../components/AuthGuard";

export default function InsectsPage() {
  return (
    <AuthGuard>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Insects</h1>
        <InsectsContent />
      </div>
    </AuthGuard>
  );
}